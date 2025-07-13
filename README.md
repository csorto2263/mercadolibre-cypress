# Crombie QA Automation Challenge – Cypress + TypeScript

This repository contains the solution to the automation challenge proposed by Crombie, using Cypress, TypeScript, and best practices such as Page Object Model (POM), ESLint, and modular structure.

## Technologies Used

- Cypress (E2E testing framework).
- TypeScript.
- Page Object Model (POM).
- ESLint.
- Node.js + npm.

## Prerequisites

- Node.js (version 18 or higher)
- npm

## Project Structure

mercadolibre-cypress/
├── cypress/
│   ├── e2e/
│   │   └── productSearch.cy.ts
│   ├── pages/
│   │   ├── HomePage.ts
│   │   └── ProductPage.ts
│   ├── support/
│   │   └── e2e.ts
├── config.json
├── cypress.config.ts
├── tsconfig.json
├── .eslintrc.json
├── package.json
└── README.md

## Configuration

The product to be searched is defined in the `config.json` file.

Recommended content:

{
  "product": "cable hdmi"
}

## Installation

1. Clone the repository:

git clone https://github.com/your-user/mercadolibre-cypress.git  
cd mercadolibre-cypress

2. Install dependencies:

npm install

## Running Tests

To open the Cypress Test Runner UI:

npx cypress open

Select the `productSearch.cy.ts` test file from the UI.

Or run it in headless mode via terminal:

npx cypress run

## Test Flow Coverage

1. Go to https://www.mercadolibre.com.ar
2. Search for the product defined in `config.json`.
3. Navigate to the second page of results.
4. Select the first product with “Free Shipping” that is **not the first item**.
5. Change the default quantity (if applicable).
6. Add the item to the cart.
7. Validate that the **account creation screen** is displayed.

## Best Practices Implemented

- TypeScript-based project.
- Page Object Model architecture.
- Modular and reusable code.
- External configuration via `config.json`.
- Exception handling for site-side JavaScript errors.
- Clean and professional folder structure.
- ESLint configured for code quality.

## ESLint

Configured in `.eslintrc.json`. You can run it manually using:

npx eslint cypress/**/*.ts

## Notes

- Cypress `cy.origin()` is used to handle multi-origin navigation across:
  - www.mercadolibre.com.ar.
  - listado.mercadolibre.com.ar.
  - articulo.mercadolibre.com.ar.
  - www.mercadolibre.com.
- The test is designed for products **without variant selection** (like size or color).
- All unexpected JavaScript exceptions from the site are safely ignored.

## Author

Carlos Sorto.
