import { render, screen } from '@testing-library/react';
import Recipes, { getServerSideProps } from '../../pages/recipes';
import { Recipe } from '@/types';
import { GetServerSidePropsContext } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
    render(<Recipes recipes={mockRecipes} />);
    const recipeCards = screen.getAllByTestId('recipe-card');
    expect(recipeCards).toHaveLength(mockRecipes.length);
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Chicken Alfredo')).toBeInTheDocument();
  });

  it('fetches recipes in getServerSideProps', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockRecipes),
      })
    ) as jest.Mock;

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
        },
      })
    );

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/api/recipes`);
  });
});
