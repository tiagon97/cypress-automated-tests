/// <reference types="cypress" />

class NewArticlePage {
  getArticleTitleInput = function () {
    return cy.getElementByPlaceholder("Article Title");
  };

  getArticleDescriptionInput = function () {
    return cy.getElementByPlaceholder("What's this article about?");
  };

  getArticleContentInput = function () {
    return cy.getElementByPlaceholder(
      "Write your article (in markdown)",
      "textarea"
    );
  };

  getTagsInput = function () {
    return cy.getElementByPlaceholder("Enter tags");
  };

  getTagList = function () {
    return cy.get(".tag-list").find("span.tag-default");
  };

  publishArticle = function () {
    cy.contains("button", "Publish Article").click();
  };

  updateArticle() {
    cy.contains("button", "Update Article").click();
  }

  createArticle = function (title, desc, articleContent, tags = []) {
    this.getArticleTitleInput().clear().type(title);
    this.getArticleDescriptionInput().clear().type(desc);
    this.getArticleContentInput().clear().type(articleContent);

    if (tags.length) {
      tags.forEach((tag, index) => {
        this.getTagsInput().type(`${tag}{enter}`);
        this.getTagList()
          .should("have.length", index + 1)
          .eq(index)
          .and("be.visible")
          .and("contain.text", tag);
      });
    }
  };
}

export const onNewArticlePage = new NewArticlePage();
