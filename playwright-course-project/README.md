# QA Automation Coursework Project

This project was created as part of a QA automation course. It contains automated end-to-end tests for a web application using [Playwright](https://playwright.dev/), TypeScript, and Allure reports.

## 🎯 Project Goals

- Learn and apply Playwright for E2E testing
- Structure tests using the Page Object Model (POM)
- Integrate test reporting with Allure
- Use GitHub Actions and Docker (optionally) for CI/CD automation

---

## ⚙️ Setup and Run Tests

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file in the project root

Use the example below or copy from `env.example`.

```env
TEST_EMAIL=your-email@example.com
TEST_PASSWORD=yourSecurePassword123
```

### 3. Run all tests

```bash
npm run test
```

### 4. Run tests with visible browser (headed mode)

```bash
npm run test:headed
```

---

## 📊 Allure Reports

### 1. Run tests with Allure results

```bash
npx playwright test --reporter=line,allure-playwright
```

### 2. Generate and open the Allure report

```bash
npm run allure:report
```

If you don't have Allure installed globally, you can use `npx`:

```bash
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

Or install it globally:

```bash
npm install -g allure-commandline --save-dev
```

---

## 📁 Project Structure

```
├── .github/workflows/         # GitHub Actions config
├── src/
│   └── pages/                 # Page Object classes (POM)
├── tests/                     # Test specifications
├── .env                       # Environment variables (not committed)
├── .gitignore
├── README.md
└── package.json
```

---

## 🧪 Test Files Overview

- `login.spec.ts` — login tests with validations
- `incomings.spec.ts` — test for adding income
- `expenses.spec.ts` — test for adding expense
- `e2e-tax-flow.spec.ts` — full flow: income + expense + tax submission + report validation

---

## ✅ .gitignore Recommendations

Make sure the following are ignored:

```
.env
allure-results/
allure-report/
```

---

## 📜 Available Scripts

```json
"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "allure:generate": "allure generate ./allure-results --clean -o ./allure-report",
  "allure:open": "allure open ./allure-report",
  "allure:report": "npm run allure:generate && npm run allure:open"
}
```

---

## 🧩 Example .env

```env
TEST_EMAIL=your-email@example.com
TEST_PASSWORD=yourSecurePassword123
```