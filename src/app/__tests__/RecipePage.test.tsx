import { Recipe } from '@/types';
import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import RecipePage, { getServerSideProps } from '../../pages/recipes/[id]';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const mockRecipe: Recipe = {
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
};

describe('RecipePage', () => {
  it('renders the recipe details correctly', () => {
    render(<RecipePage recipe={mockRecipe} />);

    expect(screen.getByText('Spaghetti Carbonara')).toBeTruthy();
    expect(screen.getByText('Ingredients')).toBeTruthy();
    expect(screen.getByText('Method')).toBeTruthy();

    expect(screen.getAllByText('15 minutes').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Easy')).toBeTruthy();
    expect(screen.getAllByText('4').length).toBeGreaterThan(0);
    expect(screen.getByText('30 mins')).toBeTruthy();

    expect(screen.getByText('ingredient1')).toBeTruthy();
    expect(screen.getByText('step1')).toBeTruthy();
  });

  it('fetches the recipe in getServerSideProps', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockRecipe),
      })
    ) as unknown as typeof fetch;

    const context = {
      params: { id: '1' },
    } as unknown as GetServerSidePropsContext;

    const response = await getServerSideProps(context);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          recipe: mockRecipe,
        },
      })
    );

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/api/recipes?id=1`);
  });

  it('renders loading state when recipe is not provided', () => {
    render(<RecipePage recipe={undefined} />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });
});
