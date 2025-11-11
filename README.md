# RepMove Automation Tests
Follow these instructions to set up the project and run the tests on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher is recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd RepMoveAutotests
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the root of the project. This file is used to store sensitive information and environment-specific configurations.

    ```
    touch .env
    ```

    Open the `.env` file and add the following variables:

    ```env
    # The base URL of the application under test
    BASE_URL=https://your-app-url.com

    # The password for the standard user account
    PASSWORD=your-standard-user-password

    # API endpoints for validation
    LOGIN_API_URL=https://your-app-url.com/api/login
    SIGN_UP_API_URL=https://your-app-url.com/api/signup
    ```
    **Note:** Replace the placeholder values with the actual data for your test environment.

## Running the Tests

To execute the entire test suite, run the following command:

```bash
npx playwright test
```

To execute one of the tests, run the following command:

```bash
npx playwright test -g 'Valid login test'
```

This will launch the Playwright test runner, which will execute all tests found in the `tests` directory. By default, tests are configured to run on Chromium.

To run tests in headed mode, use:
```bash
npx playwright test --headed
```

To see the test report after execution, use:
```bash
npx playwright show-report
```

## Available Tests

The project includes the following test suites:

### 1. Login (`tests/loginTests.spec.ts`)

This suite covers the user authentication process.

-   **`Should login successfully with valid credentials`**:
    -   **Description**: Verifies that a user can log in with a valid email and password.
    -   **Checks**:
        -   Navigates to the login page.
        -   Enters valid user credentials.
        -   Asserts that the login API returns a `200 OK` status code.

-   **`Login with invalid email credentials`**:
    -   **Description**: Verifies that a user cannot log in with an incorrect email.
    -   **Checks**:
        -   Enters a valid password but an invalid email.
        -   Asserts that the login API returns a `400 Bad Request` status code.
        -   Asserts that the API response contains the `EMAIL_NOT_FOUND` error message.

-   **`Login with invalid password credentials`**:
    -   **Description**: Verifies that a user cannot log in with an incorrect password.
    -   **Checks**:
        -   Enters a valid email but an invalid password.
        -   Asserts that the login API returns a `400 Bad Request` status code.
        -   Asserts that the API response contains the `INVALID_PASSWORD` error message.

### 2. Sign Up (`tests/signUpTests.spec.ts`)

This suite covers the new user registration process.

-   **`Should create new user successfully with valid credentials`**:
    -   **Description**: Verifies that a new user can be created with all required information.
    -   **Checks**:
        -   Fills out all fields in the sign-up form with valid data.
        -   Submits the form.
        -   Asserts that the sign-up API returns a `200 OK` status code.
        -   Asserts that the API response contains the correct `email`, `companyName`, and `industry` for the newly created user.

-   **`SignUp without CompanyName field`**:
    -   **Description**: Verifies that the form shows an error if the company name is missing.
    -   **Checks**:
        -   Fills out the sign-up form but leaves the "Company Name" field empty.
        -   Submits the form.
        -   Asserts that the UI displays the error message: `The Company Name is required`.

-   **`SignUp without Email field`**:
    -   **Description**: Verifies that the form shows an error if the email is missing.
    -   **Checks**:
        -   Fills out the sign-up form but leaves the "Email" field empty.
        -   Submits the form.
        -   Asserts that the UI displays the error message: `Please, enter your email address`.

## Project Structure

```
.
├── fixtures/         # Custom Playwright fixtures
├── model/            # TypeScript models for API responses
├── pageObjects/      # Page Object Models for UI interaction
├── tests/            # Test files (specs)
├── utils/            # Utility functions and data
├── .env.example      # Example environment file
├── playwright.config.ts # Playwright configuration
└── package.json      # Project dependencies and scripts
```