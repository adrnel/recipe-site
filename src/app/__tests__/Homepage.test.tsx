import { Recipe } from '@/types';
import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

const mockGetRecipes = jest.fn() as jest.MockedFunction<
  () => Promise<Recipe[]>
>;

jest.mock('../../lib/recipes', () => ({
  getRecipes: mockGetRecipes,
}));

const addEventListener = jest.fn();
const removeEventListener = jest.fn();
const mockRouter = {
  push: jest.fn(),
  query: {},
  events: {
    on: addEventListener,
    off: removeEventListener,
  },
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const homePageModule = require('../../pages/index');
const HomePage = homePageModule.default;
const getServerSideProps = homePageModule.getServerSideProps;

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    image: '/spaghetti-carbonara.jpg',
    prepTime: '15 minutes',
    cookingTime: '15 minutes',
    difficulty: 'Easy',
    serves: 4,
    ingredients: ['ingredient1', 'ingredient2'],
    method: ['step1', 'step2'],
    summary:
      'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    rating: 4.5,
    ratingsCount: 200,
    time: '30 minutes',
  },
  {
    id: '2',
    name: 'Chicken Alfredo',
    image: '/chicken-alfredo.jpg',
    prepTime: '20 minutes',
    cookingTime: '25 minutes',
    difficulty: 'Medium',
    serves: 4,
    ingredients: ['ingredient1', 'ingredient2'],
    method: ['step1', 'step2'],
    summary: 'Creamy chicken Alfredo pasta with a rich, flavorful sauce.',
    rating: 4.0,
    ratingsCount: 150,
    time: '45 minutes',
  },
];

describe('HomePage', () => {
  it('renders the main elements correctly', () => {
    render(<HomePage recipes={mockRecipes} />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
      'Master the art of home cooking'
    );

    expect(screen.getByText('Top Recipes')).toBeTruthy();
    expect(
      screen.getByPlaceholderText('Search recipes, ingredients, or cuisines...')
    ).toBeTruthy();

    mockRecipes.forEach((recipe) => {
      expect(screen.getAllByText(recipe.name).length).toBeGreaterThan(0);
      expect(screen.getAllByAltText(recipe.name).length).toBeGreaterThan(0);
    });
  });

  it('fetches the recipes in getServerSideProps', async () => {
    mockGetRecipes.mockResolvedValue(mockRecipes);

    const context = { params: {} } as GetServerSidePropsContext;

    const response = await getServerSideProps(context);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          recipes: mockRecipes,
        },
      })
    );
    expect(mockGetRecipes).toHaveBeenCalled();
  });
});
