/// <reference types="cypress" />

class HomePage {
  getFirstArticle() {
    return cy.get(".article-preview").first();
  }

  getAllArticles() {
    return cy.get(".article-preview");
  }

  getLikesFieldSel() {
    return ".pull-xs-right";
  }

  getGlobalFeedHeading() {
    return cy.contains("a", "Global Feed");
  }

  getYourlFeedHeading() {
    return cy.contains("a", "Your Feed");
  }

  getNavbarLinks() {
    return cy.get("nav.navbar").find("li").find("a");
  }

  getNavbarBrand() {
    return cy.get(".navbar-brand");
  }

  getBanner() {
    return cy.get(".banner");
  }

  getTagsSidebar() {
    return cy.contains(".sidebar", "Popular Tags");
  }

  getPagination() {
    return cy.get(".pagination");
  }

  getLoadingSpinner() {
    return cy.get(".loading-spinner");
  }
}

export const onHomePage = new HomePage();
