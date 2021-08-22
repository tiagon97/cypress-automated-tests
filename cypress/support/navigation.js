class Navigation {
  homePage = () => {
    cy.contains("a", "Home").click();
  };
  newArticlePage = () => {
    cy.contains("a", "New Article").click();
  };
  settingsPage = () => {
    cy.contains("a", "Settings").click();
  };
  myProfilePage = () => {
    const username = JSON.parse(localStorage.getItem("user")).username;

    cy.contains("a", username).click();
  };
}

export const navigateTo = new Navigation();
