import { onArticleDetailsPage } from "../../support/Pages/article-details.page";
import { onHomePage } from "../../support/Pages/home.page";

describe("Favourite articles", () => {
  beforeEach(() => {
    cy.loginToApp();
    cy.SignUpNewUser();
    cy.postArticle().then(({ slug, author }) => {
      cy.wrap(slug).as("link");
      cy.wrap(author).as("author");
    });
  });

  it("Adds article to favorite", function () {
    cy.visit(`/article/${this.link}`);
    cy.intercept("**/favorite").as("addToFavorite");
    onArticleDetailsPage.getFavoriteArticleButton().click();
    cy.wait("@addToFavorite");
    onArticleDetailsPage.getUnfavoriteArticleButton().should("be.visible");
  });

  it("Checks if aritcle located in home page is marked as favorite", function () {
    cy.intercept("**/articles?limit**").as("articles");
    cy.addToFavorite(this.link);
    cy.visit("/");
    onHomePage.getGlobalFeedHeading().click();
    cy.wait("@articles");

    onHomePage.getFirstArticle().then((article) => {
      cy.wrap(article)
        .find(onHomePage.getLikesFieldSel())
        .should("contain.text", 1);
      cy.wrap(article).should("contain.text", this.author.username);
    });
  });

  it("Cheks if aritcle located in favorite section in user profile page  is marked as favorite", function () {
    cy.intercept("**/articles?limit**").as("articles");
    cy.addToFavorite(this.link);

    const username = JSON.parse(localStorage.getItem("user")).username;
    cy.intercept("**/articles?limit=10&favorited**").as("favArticles");

    cy.visit(`/profile/${username}/favorites`);
    cy.wait("@favArticles");

    //FIXME common selector but not on HomePage
    onHomePage.getFirstArticle().then((favArticle) => {
      expect(favArticle).to.contain.text(this.author.username);
      expect(favArticle.find(onHomePage.getLikesFieldSel())).to.contain.text(1);
    });
  });
});
