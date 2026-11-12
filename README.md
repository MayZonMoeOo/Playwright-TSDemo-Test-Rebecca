# Playwright-TS-Demo-Test-Rebecca
Playwright automation testing for 'Demo Shop' website using TypeScript

## Prerequisites
The following tools are required to set up and run this project:
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
npx playwright test tests/registertest.spec.ts
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
    > **⚠️ IMPORTANT:** Tests are configured to run sequentially using a single worker (`workers: 1`) to reduce potential state conflicts caused by shared test accounts, shopping cart data, and wishlist data.

## 📝 Test Scenarios & Implementation

This project includes six automated test scenarios—implemented using Playwright, TypeScript, and POM—to validate core user interactions like registration, login, browsing, and shopping cart flows.

---


### Scenario 1.1: Register New User
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


### Scenario 1.2: Register Existing User
* **File:** `tests/registertest.spec.ts`
* **Test Name:** `Register Existing User`
* **Flow:** Verifies that the application prevents duplicate registration using an email address that has already been registered during the test.
* **Steps:** 
  * Registers a new user with a unique email address.
  * Verifies successful registration.
  * Logs out after registration.
  * Attempts to register again using the same email address.
* **Expected Result:** 
  * Displays the error message: `"The specified email already exists"`.

---


### Scenario 2: Login Test
* **File:** `tests/logintest.spec.ts`
* **Test Name:** `Login Test`
* **Flow:** Allows a registered user to log in successfully.
* **Steps:** 
  * Registers a new user with a unique email address.
  * Verifies the registration success message.
  * Logs out after successful registration.
  * Logs in again using the same email and password.
  * Verifies the Welcome heading.
  * Verifies the account email and Logout link.
  * Logs out after successful login.
* **Expected Result:** 
  * Displays the Welcome heading after successful login.
  * The user's email is visible in the header.
  * The "Log out" link appears correctly.
  * Successfully logs out after verification.

---


### Scenario 3: Invalid Login Test
* **File:** `tests/logintest.spec.ts`
* **Test Name:** `Invalid Login Test`
* **Flow:** Shows error messages when logging in with incorrect credentials.
* **Steps:**
  * Creates a new account with a unique email address.
  * Logs out after registration.
  * **Case A (Unregistered Email):** Attempts to log in using a non-existent email.
  * **Case B (Wrong Password):** Attempts to log in using the registered email with an incorrect password (`wrong`).
* **Expected Result:**
  * For wrong password, expects the error message: `Login was unsuccessful. Please correct the errors and try again.` and `The credentials provided are incorrect`.
  * For unregistered email, expects the error message: `Login was unsuccessful. Please correct the errors and try again.` and `No customer account found`.

---


### Scenario 4: Dashboard Test
* **File:** `tests/dashboard.spec.ts`
* **Test Name:** `Dashboard Test with Encapsulated POM Actions & Expects`
* **Flow:** Tests product searching, category navigation, product price validation, price filtering, wishlist management, shopping cart operations, and notification and quantity verification.
* **Steps:**
  * Clears existing items from the Shopping Cart and Wishlist before testing.
  * Searches for Com in the store search bar and verifies the Computing and Internet product page.
  * Hovers over the Computers menu and navigates to the Desktops category.
  * Selects 4 from the Display dropdown menu.
  * Verifies the Desktops category heading.
  * Verifies all four product prices before applying the filter.
  * Verifies the product count before filtering (4 products).
  * Applies the $1200 price filter.
  * Verifies the filtered product count (1 product).
  * Verifies the filtered product price.
  * Removes the price filter.
  * Verifies that the product count returns to 4.
  * Verifies all product prices after removing the filter.
  * Adds the Black & White Diamond Heart product from the Jewelry category to the Wishlist.
  * Verifies the Wishlist success notification and quantity (1).
  * Adds the Blue and green Sneaker product from the Apparel & Shoes category to the Wishlist.
  * Verifies the Wishlist success notification and quantity (2).
  * Adds three products to the Shopping Cart:
    - Build your own computer
    - Build your own cheap computer
    - 14.1-inch Laptop
  * Verifies the full Shopping Cart success notification and cart quantity after each product addition (1, 2, and 3).
  * Navigates to the Shopping Cart and Wishlist pages.
  
* **Expected Result:**
  * Successfully searches for and verifies the Computing and Internet product page.
  * Displays the correct Desktops category heading.
  * Displays four products before filtering.
  * Displays one product after applying the $1200 price filter.
  * Displays four products again after removing the filter.
  * Successfully adds two products to the Wishlist and verifies the Wishlist quantity.
  * Successfully adds three products to the Shopping Cart.
  * Verifies the full success notification and updated cart quantity after each product addition.

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
* **File:** `tests/emptyshoppingcart.spec.ts`
* **Test Name:** `Empty Shopping Cart Test`
* **Flow:** Tests deleting items from the shopping cart one by one, verifying that the item count decreases, confirming that the shopping cart becomes empty, and closing the browser.
* **Steps:**
  * Deletes the first item in the shopping cart.
  * Repeats deletion steps until the last item is removed.
  * Closes the browser.
* **Expected Result:**
  * Verifies that the number of elements in the Shopping Cart table decreases by 1 after each deletion.
  * Verifies that the Shopping Cart is completely empty.
  * Successfully closes the browser session.

  ---

