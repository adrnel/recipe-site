import { Recipe } from '@/types';
import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import RecipeCard from './RecipeCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

const mockRecipe: Recipe = {
  id: '1',
  name: 'Spaghetti Carbonara',
  image: '/spaghetti-carbonara.jpg',
  prepTime: '15 minutes',
  cookingTime: '15 minutes',
  difficulty: 'Easy',
  serves: 4,
  ingredients: ['200g pancetta'],
  method: ['Put a large saucepan of water on to boil.'],
  summary:
    'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
  rating: 4.5,
  ratingsCount: 200,
  time: '30 minutes',
};

describe('RecipeCard component', () => {
  it('renders the recipe name', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeNameElement = screen.getByText(/Spaghetti Carbonara/i);
    expect(recipeNameElement).toBeTruthy();
  });

  it('renders the recipe summary', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeSummaryElement = screen.getByText(
      /A classic Italian pasta dish/i
    );
    expect(recipeSummaryElement).toBeTruthy();
  });

  it('renders the recipe rating', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeRatingElement = screen.getByText(/4.5/i);
    expect(recipeRatingElement).toBeTruthy();
    expect(screen.getByText(/\(200\)/i)).toBeTruthy();
  });

  it('renders the recipe cooking time', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeTimeElement = screen.getByText(/30 mins/i);
    expect(recipeTimeElement).toBeTruthy();
  });

  it('renders the recipe serves', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeServesElement = screen.getByText('4');
    expect(recipeServesElement).toBeTruthy();
  });

  it('renders the image with the correct src and alt attributes', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const imageElement = screen.getByAltText(/Spaghetti Carbonara/i);
    expect(imageElement.getAttribute('src')).toContain(
      'spaghetti-carbonara.jpg'
    );
  });

  it('renders the link with the correct href', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const linkElement = screen.getByRole('link', { name: /View Recipe/i });
    expect(linkElement.getAttribute('href')).toBe('/recipes/1');
  });
});
