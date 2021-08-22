import { onHomePage } from "../../support/Pages/home.page";
import { onUserProfilePage } from "../../support/Pages/user-profile.page";

let userToUnfollow;

describe("Follow user", () => {
  beforeEach(() => {
    cy.loginToApp();
    cy.SignUpNewUser().then(({ body }) => {
      cy.wrap(body.user.username).as("username");
      cy.intercept("GET", `**/profiles/${body.user.username}`).as(
        "userProfile"
      );
    });
  });

  it("Follows user", function () {
    cy.visit(`/profile/${this.username}`);
    cy.wait("@userProfile");
    onUserProfilePage
      .getFollowButton()
      .should("contain.text", `Follow ${this.username}`)
      .click();
    onUserProfilePage
      .getFollowButton()
      .should("contain.text", `Unfollow ${this.username}`);
  });

  it("Checks if followed user's articles are visible in 'Your Feed' section", function () {
    cy.postArticle();
    cy.followUser(this.username);
    cy.intercept("**/articles/feed**").as("articles");
    cy.visit("/");
    cy.wait("@articles");
    onHomePage.getFirstArticle().should("contain.text", this.username);
    userToUnfollow = this.username;
  });

  after(function () {
    cy.unfollowUser(userToUnfollow);
  });
});
