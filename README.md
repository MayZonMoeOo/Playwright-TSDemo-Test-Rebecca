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
* **File:** `tests/registertest.spec.ts`
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

### Register Existing User
* **File:** `tests/registertest.spec.ts`
* **Test Name:** `Register Existing User`
* **Flow:** Prevents registration using an email that already exists.
* **Steps:** 
  * Opens the register page.
  * Tries to register again using the existing email.
* **Expected Result:** 
  * Shows the error message: `"The specified email already exists"`.

---

### Scenario 2: Login Test
* **File:** `tests/logintest.spec.ts`
* **Test Name:** `Login Test`
* **Flow:** Allows a registered user to log in successfully.
* **Steps:** 
  * Opens the home page and clicks Login.
  * Enters valid email and password.
* **Expected Result:** 
  * The user's email is visible in the header.
  * The "Log out" link appears correctly.

---

### Scenario 4: Invalid Login Test
* **File:** `tests/logintest.spec.ts`
* **Test Name:** `Invalid Login Test`
* **Flow:** Shows error messages when logging in with incorrect credentials.
* **Steps:**
  * **Case A (Wrong Password):** Enters a valid email with a wrong password (`wrong`) and clicks Login.
  * **Case B (Unregistered Email):** Enters a non-existent email with a password and clicks Login.
* **Expected Result:**
  * For wrong password, expects the error message: `Login was unsuccessful. Please correct the errors and try again.` and `The credentials provided are incorrect`.
  * For unregistered email, expects the error message: `Login was unsuccessful. Please correct the errors and try again.` and `No customer account found`.

---

### Scenario 4: Dashboard Test
* **File:** `tests/dashboard.spec.ts`
* **Test Name:** `Dashboard Test`
* **Flow:** Tests hovering over the menu, filtering notebooks by display count and attributes, managing wishlist items, adding items to the shopping cart, and verifying notification messages and menu counts.
* **Steps:**
  * Hovers over the Computers Menu and clicks Notebooks.
  * Selects 4 on the Display dropdown menu.
  * Checks the '16GB' checkbox under Filter by attributes, then unchecks it.
  * Adds the second and third items to the wishlist.
  * Adds the fourth, fifth, and sixth items to the shopping cart.
* **Expected Result:**
  * Expects a notification text: The product has been added to your wishlist after adding each wishlist item.
  * Expects a notification text: The product has been added to your shopping cart after adding each shopping cart item.

  ---

  ### Scenario 5: Shopping Cart Test
* **File:** `tests/shoppingcarttest.spec.ts`
* **Test Name:** `Shopping Cart Test`
* **Flow:** Tests hovering over the shopping cart menu, navigating to the shopping cart page, verifying cart buttons, and verifying that the sum of all item prices is equal to the total price at the end of the page.
* **Steps:**
  * Hovers over the Shopping Cart menu.
  * Verifies that the 'Go To Cart' button is displayed and clicks it.
  * Verifies successful navigation to the Shopping Cart page.
  * Verifies that the buttons ('Update shopping cart', 'Continue shopping', and 'Estimate shipping') are displayed.
  * Verifies that the price sum for all items equals the Total Price at the end of the page.
* **Expected Result:**
  * Successfully navigates to the Shopping Cart page.
  * Verifies that all required buttons are correctly displayed.
  * Confirms that the sum of individual item totals matches the final Total: amount shown on the page.

  ---

  ### Scenario 6: Empty Shopping Cart Test
* **File:** `tests/emptyshoppingcarttest.spec.ts`
* **Test Name:** `Empty Shopping Cart Test`
* **Flow:** Tests deleting items from the shopping cart one by one, verifying that the item count decreases, confirming that the shopping cart becomes empty, and closing the browser.
* **Steps:**
  * Deletes the first item in the shopping cart.
  * Repeats deletion steps until the last item is removed.
  * Closes the browser.
* **Expected Result:**
  * Verifies that the number of elements in the Shopping Cart table decreases by 1 after each deletion.
  * Verifies that the Shopping Cart is completely empty.
  * uccessfully closes the browser session.

  ---