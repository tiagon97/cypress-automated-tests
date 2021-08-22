/// <reference types="cypress" />

import { onHomePage } from "../../support/Pages/home.page";

describe("Header", () => {
  it("Checks header content", () => {
    cy.visit("/");
    onHomePage.getNavbarBrand().should("contain.text", "conduit");
    onHomePage.getNavbarLinks().then((links) => {
      expect(links).to.have.length(3);
      cy.wrap(links[0]).should("contain.text", "Home");
      cy.wrap(links[1]).should("contain.text", "Sign in");
      cy.wrap(links[2]).should("contain.text", "Sign up");
    });
    onHomePage
      .getBanner()
      .should("contain.text", "conduit")
      .and("contain.text", "A place to share your knowledge.");
  });

  it("Checks nav links when the user is logged in", () => {
    cy.loginToApp().then(({ username, image }) => {
      cy.visit("/");

      onHomePage.getNavbarLinks().then((links) => {
        expect(links).to.have.length(4);
        cy.wrap(links[0]).should("contain.text", "Home");
        cy.wrap(links[1]).should("contain.text", "New Article");
        cy.wrap(links[2]).should("contain.text", "Settings");
        cy.wrap(links[3])
          .should("contain.text", username)
          .then((link) => {
            cy.wrap(link).find("img").should("have.attr", "src", image);
          });
      });
    });
  });
});
