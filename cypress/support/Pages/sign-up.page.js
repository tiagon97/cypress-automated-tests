/// <reference types="cypress" />

import { SignInPage } from "./sign-in.page";

class SignUpPage extends SignInPage {
    getUsernameInput() {
        return cy.getElementByPlaceholder("Username");
    }

    getSignUpButton() {
        return cy.contains("button", "Sign up");
    }

    getPageHeading() {
        return cy.contains("h1", "Sign up");
    }

    getLinkForAlreadyRegistered() {
        return cy.contains("a", "Have an account?");
    }

    signUp(username, email, password) {
        this.getUsernameInput().type(username);
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
        this.getSignUpButton().click();
    }
}

export const onSignUpPage = new SignUpPage();
