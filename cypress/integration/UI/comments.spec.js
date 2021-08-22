import { onArticleDetailsPage } from "../../support/Pages/article-details.page";
import faker from "faker";

describe("Comments", () => {
  beforeEach(() => {
    cy.loginToApp().then(({ username }) => cy.wrap(username).as("username"));
    cy.SignUpNewUser();
    cy.postArticle().then(({ slug, author }) => {
      cy.wrap(author).as("author");
      cy.wrap(slug).as("slug");
    });
    cy.wrap(faker.lorem.sentence(7)).as("comment");
    cy.intercept("GET", "**/comments").as("comments");
  });

  it("Adds comment to an article", function () {
    cy.visit(`/article/${this.slug}`);
    onArticleDetailsPage.getComments().should("not.exist");
    onArticleDetailsPage.getCommentInput().type(this.comment);
    onArticleDetailsPage.getPostCommentButton().click();
    cy.wait("@comments");
    onArticleDetailsPage
      .getComments()
      .should("have.length", 1)
      .and("contain.text", this.username);
    onArticleDetailsPage
      .getCommentContent()
      .should("contain.text", this.comment);
    onArticleDetailsPage.getCommentInput().invoke("val").should("be.empty");
  });

  it("Removes comment", function () {
    cy.addComment(this.slug, this.comment);
    cy.visit(`/article/${this.slug}`);
    cy.wait("@comments");

    onArticleDetailsPage
      .getComments()
      .should("have.length", 1)
      .and("contain.text", this.username);
    onArticleDetailsPage.getTrashIcon().click();
    onArticleDetailsPage.getComments().should("not.exist");
  });
});
