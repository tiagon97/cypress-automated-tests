/// <reference types="cypress" />

import faker from "faker";
import { navigateTo } from "../../support/navigation";
import { onSettingsPage } from "../../support/Pages/settings.page";
import { onUserProfilePage } from "../../support/Pages/user-profile.page";

describe("User settings", () => {
  before(() => {
    cy.wrap(faker.image.avatar()).as("avatarUrl");
    cy.wrap(
      `${faker.name.firstName()}_${faker.name.lastName()}`.toLowerCase()
    ).as("username");
    cy.wrap(faker.lorem.sentences(2)).as("shortBio");

    cy.loginToApp();
    cy.visit("/");
  });

  it("updates user settings", function () {
    navigateTo.settingsPage();
    onSettingsPage.updateSettings(this.avatarUrl, this.username, this.shortBio);
  });

  it("verifies if settings are updated", function () {
    onUserProfilePage.verifyUserData(
      this.username,
      this.shortBio,
      this.avatarUrl
    );
  });
});
