import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // supportFile: 'cypress/support/index.{js,jsx,ts,tsx}',
  },
});
