/// <reference types="Cypress" />

import faker from "faker";
import { onSignInPage } from "../../support/Pages/sign-in.page";

describe("Testing sign in funcionality", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("Logins with valid credentials", () => {
    onSignInPage.loginToApplication();
    cy.log("Login sucessful");
  });

  it("Logins with invalid credentials", () => {
    const fakeLogin = faker.internet.exampleEmail();
    const fakePassword = faker.internet.password();

    onSignInPage.loginToApplication(fakeLogin, fakePassword);
    cy.get(".error-messages")
      .should("be.visible")
      .and("contain.text", "email or password is invalid");
  });
});
