# Recipeasy Online - Recipe Website Portfolio

Welcome to Recipeasy Online, a recipe website designed to showcase my web development skills. This project features a continuous integration and continuous deployment (CI/CD) pipeline, automated testing, and deployment to both staging and production environments.

## Project URLs

- Staging Environment: [staging.recipeasy.online](https://staging.recipeasy.online)
- Production Environment: [recipeasy.online](https://recipeasy.online)

## Overview

This project utilizes the following technologies and tools:

- Next.js for the frontend framework.
- React for building user interfaces.
- TailwindCSS for styling.
- Jest and Cypress for testing.
- GitHub Actions for CI/CD.
- Vercel for hosting and deployment.

## Getting Started

### Prerequisites

Node.js v20.12.2
npm (comes with Node.js)

### Installation

Clone the repository:

```
git clone https://github.com/adrnel/recipeasy.git
cd recipeasy
```

Install dependencies:

```
npm install
```

### Running the Application

### Development

To run the application in development mode:

```
npm run dev
```

Visit http://localhost:3000 to view the application in your browser.

### Production

To build and start the application in production mode:

```
npm run build
npm start
```

## Testing

### Linting

Run ESLint to lint your code:

```
npm run lint
```

### Jest Tests

Run Jest tests:

```
npm test
```

### Cypress Tests

Open Cypress Test Runner:

```
npm run cypress:open
```

Run Cypress tests in headless mode:

```
npm run cypress:run
```

## CI/CD Pipeline

The CI/CD pipeline is defined in the deploy.yml file using GitHub Actions. It performs the following steps:

1. Checkout Code: Checks out the code from the repository.
2. Set up Node.js: Sets up the specified Node.js version.
3. Install Dependencies: Installs the required dependencies.
4. Run Lint: Runs the linter to ensure code quality.
5. Run Jest Tests: Runs Jest tests.
6. Start Server: Starts the Next.js server.
7. Wait for Server: Waits for the server to be ready.
8. Run Cypress Tests: Runs Cypress end-to-end tests.
9. Deploy to Staging: Deploys to the staging environment if the branch is staging.
10. Deploy to Production: Deploys to the production environment if the branch is main.

## Environment Variables

Environment variables are used to configure the application. These variables should be set in the GitHub repository settings under "Environments".

### GitHub Environments

Staging Environment Variables:

1. `NEXT_PUBLIC_API_URL`
2. `NEXT_PUBLIC_ENVIRONMENT`
3. `VERCEL_TOKEN`

Production Environment Variables:

1. `NEXT_PUBLIC_API_URL`
2. `NEXT_PUBLIC_ENVIRONMENT`
3. `VERCEL_TOKEN`

## License

This project is licensed under the "No Commercial Use, No Derivatives" License.

You are not allowed to copy, distribute, or use any part of this project for commercial purposes or create derivative works from it.

## License

Feel free to explore the code, test the application, and provide any feedback. Thank you for checking out Recipeasy!

This project is licensed under the "No Commercial Use, No Derivatives" License.

You are not allowed to copy, distribute, or use any part of this project for commercial purposes or create derivative works from it.

See the [LICENSE](LICENSE.md) file for more details.
