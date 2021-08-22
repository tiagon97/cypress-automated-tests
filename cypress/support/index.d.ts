declare namespace Cypress {
  interface Chainable {
    /**
     * Login to application via UI
     * @example
     * cy.loginToApplication() -> uses default user from cypress.json
     * cy.loginToApplication(login, password)
     */
    loginToApplication(login: string, password: string): Cypress.Chainable<JQuery>;
  }
}
