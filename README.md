# Playwright-TS-Demo-Test-Rebecca
Playwright automation testing for 'Demo Shop' website using TypeScript

## Prerequisites
Need to install the following items before running the tests:
- **Node.js** - [Download Node.js](https://nodejs.org/)
- **Visual Studio Code (VS Code)** - [Download VS Code](https://code.visualstudio.com/)

Check if Node.js is installed by running:
```bash
node -v
```
## Getting Started
Follow these steps to set up and run the project locally:

### 1. Clone or Download the Repository
Clone the repository to your local machine.

### 2. Open the Project in VS Code
- Open **VS Code**.
- Go to **File > Open Folder...** and select the project folder (`Playwright-TS-Demo-Test-Rebecca`).
- When you open the project, if you see **"Restricted Mode"** at the top, click on **Manage**.
- In the Workspace Trust window that appears, click the **Trust** button to enable all features and extensions.

### 3. Install Dependencies
Open the integrated terminal in VS Code and run the following command to install required packages:
```bash
npm install
```
### 4. Install Playwright Browsers
Run the following command to install the required browsers:
```bash
npx playwright install
```
### 5. Run Tests
You can execute the test suite using the following commands:

* **Run all test scenarios:**
```bash
npx playwright test
```
* **Run a specific test file (e.g., Register test):**
```bash
npx playwright test tests/Register.spec.ts
```
* **View the HTML test report:**
```bash
npx playwright show-report
```
### ⚙️ Test Configuration & Customization

* **Playwright Settings (`playwright.config.ts`):**
  * **Retries (`retries: 1`):** Automatically retries a failed test once to handle potential flaky tests.
  * **Trace (`trace: 'on-first-retry'`):** Captures a trace file during the first retry for easier failure debugging.
  * **Screenshot (`screenshot: 'only-on-failure'`):** Automatically takes a screenshot only when a test fails.
  * **Workers (`workers: 1`):** 
    > **⚠️ IMPORTANT:** Tests must run sequentially with a single worker (`workers: 1`) in both Local and CI/CD environments. Since multiple tests share the same user account (`VALID_USER`), parallel execution will cause state conflicts (e.g., cart/wishlist management overlapping between tests).

## 📝 Test Scenarios & Implementation

This project includes six automated test scenarios—implemented using Playwright, TypeScript, and POM—to validate core user interactions like registration, login, browsing, and shopping cart flows.

---

### Scenario 1: Register New User
* **File:** `tests/Register.spec.ts`
* **Test Name:** `Register New User`
* **Flow:** Creates a new user successfully with valid details.
* **Steps:** 
  * Opens the home page and clicks the Register link.
  * Fills out the form using a unique email (Date.now()) and a standard password
  * Submits the form.
* **Expected Result:** 
  * Shows the success message: `"Your registration completed"`.
  * Verifies the user email appears in the header and can log out successfully.

---

### Scenario 2: Register Existing User
* **File:** `tests/Register.spec.ts`
* **Test Name:** `Register Existing User`
* **Flow:** Prevents registration using an email that already exists.
* **Steps:** 
  * Opens the register page.
  * Tries to register again using the existing email.
* **Expected Result:** 
  * Shows the error message: `"The specified email already exists"`.

---

### Scenario 3: Login with Valid Credentials
* **File:** `tests/Login.spec.ts`
* **Test Name:** `Login with Valid Credentials`
* **Flow:** Allows a registered user to log in successfully.
* **Steps:** 
  * Opens the home page and clicks Login.
  * Enters valid email and password.
* **Expected Result:** 
  * The user's email is visible in the header.
  * The "Log out" link appears correctly.

---

### Scenario 4: Login with Invalid Credentials
* **File:** `tests/Login.spec.ts`
* **Test Name:** `Login with Invalid Credentials`
* **Flow:** Shows error messages when logging in with incorrect credentials.
* **Steps:**
  * **Case A (Wrong Password):** Enters a valid email with a wrong password (`wrong`) and clicks Login.
  * **Case B (Unregistered Email):** Enters a non-existent email with a password and clicks Login.
* **Expected Result:**
  * For wrong password, expects the error message: `Login was unsuccessful. Please correct the errors and try again.` and `The credentials provided are incorrect`.
  * For unregistered email, expects the error message: `Login was unsuccessful. Please correct the errors and try again.` and `No customer account found`.

---
