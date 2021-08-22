/// <reference types="cypress" />

class SettingsPage {
  getPictureUrlInput() {
    return cy.getElementByPlaceholder("URL of profile picture");
  }

  getUsernameInput() {
    return cy.getElementByPlaceholder("Username");
  }

  getBioInput() {
    return cy.getElementByPlaceholder("Short bio about you", "textarea");
  }

  getEmailInput() {
    return cy.getElementByPlaceholder("Email");
  }

  getPasswordInput() {
    return cy.getElementByPlaceholder("New Password");
  }

  getUpdateSettingsButton() {
    return cy.contains("button", "Update Settings");
  }

  updateSettings(avatar, username, shortBio) {
    this.getPictureUrlInput().clear().type(avatar);
    this.getUsernameInput().clear().type(username.toLowerCase());
    this.getBioInput().clear().type(shortBio);

    cy.intercept("**/user").as("updateUserSettings");
    this.getUpdateSettingsButton().click();
    cy.wait("@updateUserSettings");
    cy.url({ timeout: 40000 }).should(
      "include",
      `/profile/${username.toLowerCase()}`
    );
  }
}

export const onSettingsPage = new SettingsPage();
