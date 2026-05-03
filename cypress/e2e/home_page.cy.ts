describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.url().should('include', '/');
  });

  it('displays the hero section correctly', () => {
    cy.get('h1').should('contain.text', 'Master the art of home cooking');
    cy.get(
      'input[placeholder="Search recipes, ingredients, or cuisines..."]'
    ).should('exist');
  });

  it('displays the top recipes section with cards', () => {
    cy.get('h2').should('contain.text', 'Top Recipes');
    cy.get('[data-testid="recipe-card"]').should('have.length.greaterThan', 0);
  });

  it('filters visible recipes from the search input', () => {
    cy.get(
      'input[placeholder="Search recipes, ingredients, or cuisines..."]'
    ).type('Parmesan');

    cy.get('[data-testid="recipe-card"]').should(
      'contain.text',
      'Chicken Parmesan'
    );
    cy.get('[data-testid="recipe-card"]').should(
      'not.contain.text',
      'Tikka Masala'
    );
  });

  it('renders each featured recipe card', () => {
    cy.request('/api/recipes').then((response) => {
      const recipes = response.body;

      cy.get('[data-testid="recipe-card"]').should(
        'have.length',
        recipes.length
      );

      recipes.forEach((recipe: { name: string }) => {
        cy.contains('[data-testid="recipe-card"]', recipe.name).should('exist');
      });
    });
  });

  it('navigates to the recipe details page when a recipe is clicked', () => {
    cy.request('/api/recipes').then((response) => {
      const recipes = response.body;
      const recipe = recipes[0];

      cy.contains('[data-testid="recipe-card"]', recipe.name)
        .find('a')
        .first()
        .click();
      cy.url().should('include', `/recipes/${recipe.id}`);
    });
  });
});
