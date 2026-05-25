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

const recipesPageModule = require('../../pages/recipes');
const Recipes = recipesPageModule.default;
const getServerSideProps = recipesPageModule.getServerSideProps;

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

describe('Recipes Page', () => {
  it('renders the recipes correctly', () => {
    render(<Recipes recipes={mockRecipes} initialSearchQuery="" />);
    const recipeCards = screen.getAllByTestId('recipe-card');
    expect(recipeCards).toHaveLength(mockRecipes.length);
    expect(screen.getByText('Recipe library')).toBeTruthy();
    expect(screen.getByText('Spaghetti Carbonara')).toBeTruthy();
    expect(screen.getByText('Chicken Alfredo')).toBeTruthy();
  });

  it('fetches recipes in getServerSideProps', async () => {
    mockGetRecipes.mockResolvedValue(mockRecipes);

    const context = {
      req: {},
      res: {},
      query: {},
      resolvedUrl: '/recipes',
    } as unknown as GetServerSidePropsContext;

    const response = await getServerSideProps(context);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          recipes: mockRecipes,
          initialSearchQuery: '',
        },
      })
    );
    expect(mockGetRecipes).toHaveBeenCalled();
  });
});
