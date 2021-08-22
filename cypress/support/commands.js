// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import faker from "faker";

Cypress.Commands.add("SignUpNewUser", () => {
    const apiUrl = Cypress.env("apiUrl");
    const endpoint = "/users";

    const payload = {
        user: {
            username:
                `${faker.name.firstName()}_${faker.name.lastName()}`.toLowerCase(),
            email: faker.internet.exampleEmail().toLowerCase(),
            password: faker.internet.password(),
        },
    };

    cy.request("POST", `${apiUrl}${endpoint}`, payload).then(
        ({ status, body }) => {
            expect(status).to.eq(200);
            localStorage.setItem("token", body.user.token);
        }
    );
});

Cypress.Commands.add("loginToApp", () => {
    const apiUrl = Cypress.env("apiUrl");
    const endpoint = "/users/login";

    const { userLogin, userPassword } = Cypress.env("userCredentials");

    cy.request("POST", `${apiUrl}${endpoint}`, {
        user: { email: userLogin, password: userPassword },
    }).then((response) => {
        const data = {
            ...response.body.user,
            effectiveImage: response.body.user.image,
        };
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        return response.body.user;
    });
});

Cypress.Commands.add(
    "getElementByPlaceholder",
    (placeholder, inputType = "input") => {
        return cy.get(`${inputType}[placeholder="${placeholder}"]`);
    }
);

Cypress.Commands.add("postArticle", (withTags = true) => {
    const apiUrl = Cypress.env("apiUrl");
    const endpoint = "/articles";

    const token = localStorage.getItem("token");
    console.log(token);
    cy.request({
        url: `${apiUrl}${endpoint}`,
        method: "POST",
        headers: {
            authorization: `Token ${token}`,
        },
        body: {
            article: {
                title: faker.lorem.words(4),
                description: faker.lorem.sentence(),
                body: faker.lorem.paragraph(),
                tagList: withTags ? ["Cypress", "Automation", "QA"] : [],
            },
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body.article;
    });
});

Cypress.Commands.add("addToFavorite", (link) => {
    const apiUrl = Cypress.env("apiUrl");
    const endpoint = `/articles/${link}/favorite`;

    const token = JSON.parse(localStorage.getItem("user")).token;

    cy.request({
        url: `${apiUrl}${endpoint}`,
        method: "POST",
        headers: {
            authorization: `Token ${token}`,
        },
    });
});

Cypress.Commands.add("addComment", (link, comment) => {
    const apiUrl = Cypress.env("apiUrl");
    const endpoint = `/articles/${link}/comments`;

    const token = JSON.parse(localStorage.getItem("user")).token;

    cy.request({
        url: `${apiUrl}${endpoint}`,
        method: "POST",
        headers: {
            authorization: `Token ${token}`,
        },
        body: {
            comment: {
                body: comment,
            },
        },
    });
});

Cypress.Commands.add("followUser", (userToFollow) => {
    handleFollowing("POST", userToFollow);
});

Cypress.Commands.add("unfollowUser", (userToUnfollow) => {
    handleFollowing("DELETE", userToUnfollow);
});

const handleFollowing = (method, user) => {
    const apiUrl = Cypress.env("apiUrl");
    const endpoint = `/profiles/${user}/follow`;
    const token = JSON.parse(localStorage.getItem("user")).token;

    cy.request({
        url: `${apiUrl}${endpoint}`,
        method: method,
        headers: {
            authorization: `Token ${token}`,
        },
    }).then((response) => expect(response.status).to.eq(200));
};

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach((key) => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});
