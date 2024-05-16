import { render, screen } from '@testing-library/react';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '@/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
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
    expect(recipeNameElement).toBeInTheDocument();
  });

  it('renders the recipe summary', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeSummaryElement = screen.getByText(
      /A classic Italian pasta dish/i
    );
    expect(recipeSummaryElement).toBeInTheDocument();
  });

  it('renders the recipe rating', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeRatingElement = screen.getByText(/4.5 \(200 ratings\)/i);
    expect(recipeRatingElement).toBeInTheDocument();
  });

  it('renders the recipe time', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeTimeElement = screen.getByText(/30 minutes/i);
    expect(recipeTimeElement).toBeInTheDocument();
  });

  it('renders the recipe serves', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const recipeServesElement = screen.getByText(/Serves 4/i);
    expect(recipeServesElement).toBeInTheDocument();
  });

  it('renders the image with the correct src and alt attributes', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const imageElement = screen.getByAltText(/Spaghetti Carbonara/i);
    expect(imageElement).toHaveAttribute('src', '/spaghetti-carbonara.jpg');
  });

  it('renders the link with the correct href', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const linkElement = screen.getByRole('link', { name: /View Recipe/i });
    expect(linkElement).toHaveAttribute('href', '/recipes/1');
  });
});
