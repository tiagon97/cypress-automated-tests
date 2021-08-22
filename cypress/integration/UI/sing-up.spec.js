/// <reference types="Cypress" />

import faker from "faker";
import { onSignUpPage } from "../../support/Pages/sign-up.page";

describe("Testing sign up funcionality", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/user/register");
    onSignUpPage.getPageHeading().should("be.visible");
    cy.wrap(faker.internet.exampleEmail().toLowerCase()).as("email");
    cy.wrap(
      `${faker.name.firstName()}_${faker.name.lastName()}`.toLowerCase()
    ).as("username");
    cy.wrap(faker.internet.password()).as("password");
  });

  it("Enrolls new account", function () {
    onSignUpPage.signUp(this.username, this.email, this.password);
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("Verifies request and response body", function () {
    cy.intercept("**/api/users").as("register");
    onSignUpPage.signUp(this.username, this.email, this.password);
    cy.url().should("eq", Cypress.config().baseUrl);

    cy.wait("@register").then(({ response, request }) => {
      const {
        user: { email: req_email, password: req_pass, username: req_username },
      } = request.body;

      expect(this.username).to.eq(req_username);
      expect(this.email).to.eq(req_email);
      expect(this.password).to.eq(req_pass);

      const {
        user: { email: res_email, username: res_username, token },
      } = response.body;

      expect(response.statusCode).to.eq(200);
      expect(res_email).to.eq(this.email);
      expect(res_username).to.eq(this.username);
      expect(token).to.not.eq(null);
    });
  });

  it("Should navigate to sign in page", () => {
    onSignUpPage.getLinkForAlreadyRegistered().should("be.visible").click();
    cy.url().should("include", "/user/login");
  });
});
