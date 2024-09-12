class LoginPage {

    constructor(page){
        this.page = page;
        this.usernameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.signInButton=page.locator("#login-button");
    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async validLogin(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}
module.exports = {LoginPage};
