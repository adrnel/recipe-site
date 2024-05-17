import { render, screen } from '@testing-library/react';
import RecipePage, { getServerSideProps } from '../../pages/recipes/[id]';
import { Recipe } from '@/types';
import { GetServerSidePropsContext } from 'next';

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

    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();

    const prepTimeElements = screen.getAllByText('15 minutes');
    const cookingTimeElements = screen.getAllByText('15 minutes');
    const difficultyElements = screen.getAllByText('Easy');
    const servesElements = screen.getAllByText('4');

    // Ensure there are at least two elements for each due to mobile and desktop views
    expect(prepTimeElements.length).toBeGreaterThanOrEqual(2);
    expect(cookingTimeElements.length).toBeGreaterThanOrEqual(2);
    expect(difficultyElements.length).toBeGreaterThanOrEqual(2);
    expect(servesElements.length).toBeGreaterThanOrEqual(2);

    expect(screen.getByText('ingredient1')).toBeInTheDocument();
    expect(screen.getByText('step1')).toBeInTheDocument();
  });

  it('fetches the recipe in getServerSideProps', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockRecipe),
      })
    ) as jest.Mock;

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

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes?id=1`
    );
  });

  it('renders loading state when recipe is not provided', () => {
    render(<RecipePage recipe={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
