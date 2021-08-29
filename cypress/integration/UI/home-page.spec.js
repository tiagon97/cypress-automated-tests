/// <reference types="cypress" />

import { onHomePage } from "../../support/Pages/home.page";

beforeEach(() => {
    cy.wrap(Cypress.env("apiUrl")).as("apiUrl");
});

describe("Home page", () => {
    it("Verifies home page content", function () {
        cy.visit("/");
        onHomePage.getGlobalFeedHeading().should("be.visible");
        onHomePage.getAllArticles().should("have.length", 10);
        onHomePage.getYourlFeedHeading().should("not.exist");
        onHomePage.getTagsSidebar().should("be.visible");
        onHomePage.getPagination().should("be.visible");

        cy.intercept(`${this.apiUrl}/articles/feed?limit=10&offset=0`, {
            body: {
                articles: [],
                articlesCount: 0,
            },
            delay: 1000,
        }).as("articles");
        cy.loginToApp();
        cy.reload();
        onHomePage.getYourlFeedHeading().should("be.visible");
        onHomePage.getAllArticles().should("have.text", "Loading articles...");
        cy.wait("@articles");
    });

    it("Verifies if articles are loaded correctly", function () {
        cy.intercept(`${this.apiUrl}/articles?limit=10&offset=0`, {
            fixture: "my-articles.json",
            delay: 1000,
        }).as("articles");
        cy.visit("/");
        onHomePage.getAllArticles().should("have.text", "Loading articles...");
        cy.wait("@articles");
        onHomePage
            .getFirstArticle()
            .should("have.length", 1)
            .and("contain.text", "This title comes from my-articles.json file")
            .and(
                "contain.text",
                "This description comes from my-articles.json file"
            )
            .and("contain.text", "rad_woj97")
            .and("contain.text", "Student")
            .and("contain.text", "IT")
            .and("contain.text", "Technology");
    });

    it("Verifies if tags are loaded correctly", function () {
        cy.intercept(`${this.apiUrl}/tags`, {
            fixture: "my-tags.json",
            delay: 1000,
        });
        cy.visit("/");
        onHomePage.getLoadingSpinner().should("be.visible");

        onHomePage
            .getTagsSidebar()
            .find(".tag-default")
            .should("have.length", 7);
    });
});
