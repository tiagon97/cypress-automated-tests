declare namespace Cypress {
    interface Chainable {
        /**
         * Login to application via UI
         * @example
         * cy.loginToApplication() -> when parameter is not provided uses default user from cypress.json
         * cy.loginToApplication(login, password)
         */
        loginToApp(login: string, password: string);
    }
}
