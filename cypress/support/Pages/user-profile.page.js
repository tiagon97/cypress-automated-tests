/// <reference types="cypress" />

class UserProfilePage {
  getUsernameField() {
    return cy.get(".user-info").find("h4");
  }

  getUserBio() {
    return cy.get(".user-info").find("p");
  }

  getUserImage() {
    return cy.get(".user-info").find("img");
  }

  getFavoritedPosts() {
    return cy.contains("Favorited Posts");
  }

  getFollowButton() {
    return cy.get("button.action-btn");
  }

  verifyUserData(username, userBio, userImage) {
    this.getUsernameField().should("contain.text", username.toLowerCase());
    this.getUserBio().should("contain.text", userBio);
    this.getUserImage()
      .should("have.attr", "src", userImage)
      .and("have.css", "width", "100px")
      .and("have.css", "height", "100px");
  }
}

export const onUserProfilePage = new UserProfilePage();
