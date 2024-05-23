describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.url().should('include', '/');
  });

  it('displays the hero section correctly', () => {
    cy.get('h1').should('contain.text', 'Discover Delicious Dishes');
    cy.get('.bg-hero-pattern')
      .should('have.css', 'background-image')
      .and('include', 'chili_con_carne.png');
  });

  it('displays the top recipes section with slider', () => {
    cy.get('h2').should('contain.text', 'Top Recipes');
    cy.get('.slick-slider').should('exist');
    cy.get('.slick-slide').should('have.length.greaterThan', 0);
  });

  it('renders each recipe in the slider', () => {
    cy.request('/api/recipes').then((response) => {
      const recipes = response.body;

      cy.get('.slick-slide').should('have.length', recipes.length);

      cy.get('.slick-slide').each(($slide, index) => {
        const recipe = recipes[index];
        cy.wrap($slide).within(() => {
          cy.contains(recipe.name).should('exist');
          cy.get('img').should('have.attr', 'alt', recipe.name);
        });
      });
    });
  });

  it('navigates to the recipe details page when a recipe is clicked', () => {
    cy.request('/api/recipes').then((response) => {
      const recipes = response.body;
      const recipe = recipes[0];
      cy.contains(recipe.name).click();
      cy.url().should('include', `/recipes/${recipe.id}`);
    });
  });
});
