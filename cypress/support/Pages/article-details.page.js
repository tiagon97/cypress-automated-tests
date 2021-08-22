/// <reference types="cypress" />

class ArticleDetailsPage {
  getTitleField() {
    return cy.get("div.banner").find("h1");
  }

  getContentField() {
    return cy.get("div.article-content");
  }

  getAuthorField() {
    return cy.get(".author");
  }

  getArticleDateField() {
    return cy.get(".date");
  }

  getArticleTags() {
    return cy.get("ul.tag-list").find(".tag-default");
  }

  getSignInOrSignUpInfo() {
    return cy.contains("Sign in or sign up to add comments on this article.");
  }

  getDeleteArticleButton() {
    return cy.contains("Delete Article");
  }

  getEditButton() {
    return cy.contains("Edit Article");
  }

  getFavoriteArticleButton() {
    return cy.contains("Favorite Article");
  }

  getUnfavoriteArticleButton() {
    return cy.contains("Unfavorite Article");
  }

  getCommentInput() {
    return cy.getElementByPlaceholder("Write a comment...", "textarea");
  }

  getPostCommentButton() {
    return cy.contains("button", "Post Comment");
  }

  getComments() {
    return cy.get("div.card");
  }

  getCommentContent() {
    return this.getComments().find("div.card-block");
  }

  getTrashIcon() {
    return this.getComments().find(".ion-trash-a");
  }
}

export const onArticleDetailsPage = new ArticleDetailsPage();
