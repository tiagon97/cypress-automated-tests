/// <reference types="cypress" />

export class SignInPage {
  getEmailInput() {
    return cy.getElementByPlaceholder("Email");
  }

  getPasswordInput() {
    return cy.getElementByPlaceholder("Password");
  }

  getSignInButton() {
    return cy.contains("button", "Sign in");
  }

  loginToApplication(login, password) {
    cy.intercept("**/login").as("login");
    const { userLogin, userPassword } = Cypress.env("userCredentials");
    cy.contains(".nav-item", "Sign in").should("be.visible").click();
    this.getEmailInput().type(login || userLogin);
    this.getPasswordInput().type(password || userPassword);
    this.getSignInButton().click();
    cy.wait("@login").then(({ response }) => {
      if (response.body.statusCode === 200) {
        const { token, username } = response.body.user;
        localStorage.setItem("access_token", token);
        return username;
      }
    });
  }
}

export const onSignInPage = new SignInPage();
