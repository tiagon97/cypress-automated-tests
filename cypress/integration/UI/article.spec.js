/// <reference types="cypress" />

import dayjs from "dayjs";
import "dayjs/locale/pl";
import { navigateTo } from "../../support/navigation";
import { onNewArticlePage } from "../../support/Pages/new-article.page";
import { onArticleDetailsPage } from "../../support/Pages/article-details.page";
import { onHomePage } from "../../support/Pages/home.page";

describe("Article creation", () => {
  beforeEach(() => {
    cy.loginToApp();
    cy.wrap("Is cypress the automation tool of the future?").as("articleTitle");
    cy.wrap("This article is about Cypress framework").as("articleDescription");
    cy.wrap(
      "Cypress is a next-generation front end testing tool for reliably testing anything built for the modern web which addresses the key pain points developers and QA engineers face when testing modern applications."
    ).as("articleContent");
    cy.wrap(["Cypress", "Automation", "QA"]).as("articleTags");
  });

  it("Creates new article with all mandatory data", function () {
    cy.visit("/");
    navigateTo.newArticlePage();
    onNewArticlePage.createArticle(
      this.articleTitle,
      this.articleDescription,
      this.articleContent,
      this.articleTags
    );
    cy.intercept("**/articles/**").as("articles");
    onNewArticlePage.publishArticle();
    cy.wait("@articles");
  });

  it("Verifies content of just created article", function () {
    cy.postArticle().then((article) => {
      const {
        slug,
        author: { username },
        title,
        body,
        createdAt,
      } = article;
      const date = dayjs(createdAt).locale("pl").format("MMMM D, YYYY");
      cy.visit(`/article/${slug}`);
      compareValues(onArticleDetailsPage.getAuthorField(), username);
      compareValues(onArticleDetailsPage.getArticleDateField(), date);
      onArticleDetailsPage.getTitleField().should("contain.text", title);
      onArticleDetailsPage.getContentField().should("contain.text", body);
    });

    onArticleDetailsPage.getArticleTags().then(function (tags) {
      expect(tags).to.have.length(3);
      const self = this;
      tags.each(function (index) {
        expect(Cypress.$(this).text().trim()).to.eq(self.articleTags[index]);
      });
    });
  });

  it("Checks if not logged user can see article in global feed and views its details", function () {
    cy.intercept("**/articles**").as("articles");
    cy.postArticle().then((article) => {
      const { slug, title, description } = article;
      cy.clearLocalStorage();
      cy.visit("/");
      cy.wait("@articles");

      onHomePage
        .getFirstArticle()
        .should("be.visible")
        .and("contain.text", title)
        .and("contain.text", description)
        .click();

      cy.url().should("include", slug);
      onArticleDetailsPage.getSignInOrSignUpInfo().should("be.visible");
    });
  });

  it("Deletes an article", () => {
    cy.intercept("DELETE", "**/articles/**").as("deleteArticle");
    cy.postArticle().then(({ slug }) => cy.visit(`/article/${slug}`));
    onArticleDetailsPage.getDeleteArticleButton().click();
    cy.wait("@deleteArticle").then(({ response }) =>
      expect(response.statusCode).to.eq(204)
    );
    cy.url().should("eq", `${Cypress.config("baseUrl")}`);
  });

  it("Edits an article", function () {
    cy.postArticle(false).then(({ slug }) => {
      cy.visit(`/article/${slug}`);
    });
    onArticleDetailsPage.getEditButton().click();
    cy.url().should("include", `editor/`);

    onNewArticlePage.createArticle(
      this.articleTitle,
      this.articleDescription,
      this.articleContent,
      this.articleTags
    );
    cy.intercept("PUT", "**/articles/**").as("updateArticle");
    onNewArticlePage.updateArticle();
    cy.wait("@updateArticle").then(({ response }) =>
      expect(response.statusCode).to.eq(200)
    );
  });
});

const compareValues = (selector, expectedValue) => {
  selector.should("have.length", 2).then(($el) => {
    expect($el[0]).to.contain.text(expectedValue);
    expect($el[1]).to.contain.text(expectedValue);
  });
};
