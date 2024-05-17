import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import SearchRecipes from './SearchRecipes';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRecipes = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    image: '',
    prepTime: '',
    cookingTime: '',
    difficulty: '',
    serves: 4,
    ingredients: [],
    method: [],
    summary: '',
    rating: 4.5,
    ratingsCount: 200,
    time: '30 minutes',
  },
  {
    id: '2',
    name: 'Chicken Alfredo',
    image: '',
    prepTime: '',
    cookingTime: '',
    difficulty: '',
    serves: 4,
    ingredients: [],
    method: [],
    summary: '',
    rating: 4.0,
    ratingsCount: 150,
    time: '25 minutes',
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockRecipes),
  })
) as jest.Mock;

describe('SearchRecipes component', () => {
  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();
  const mockRouter = {
    push: jest.fn(),
    events: {
      on: addEventListener,
      off: removeEventListener,
    },
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders the input element', async () => {
    await act(async () => {
      render(<SearchRecipes />);
    });
    const inputElement = screen.getByPlaceholderText('Search for recipe');
    expect(inputElement).toBeInTheDocument();
  });

  it('fetches and displays recipes', async () => {
    await act(async () => {
      render(<SearchRecipes />);
    });

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith('/data/recipes.json')
    );
  });

  it('filters recipes based on search query', async () => {
    await act(async () => {
      render(<SearchRecipes />);
    });

    const inputElement = screen.getByPlaceholderText('Search for recipe');

    fireEvent.change(inputElement, { target: { value: 'Spaghetti' } });

    await waitFor(() => {
      const recipeLink = screen.getByText('Spaghetti Carbonara');
      expect(recipeLink).toBeInTheDocument();
    });

    expect(screen.queryByText('Chicken Alfredo')).not.toBeInTheDocument();
  });

  it('displays "No results found" when no recipes match the search query', async () => {
    await act(async () => {
      render(<SearchRecipes />);
    });

    const inputElement = screen.getByPlaceholderText('Search for recipe');

    fireEvent.change(inputElement, { target: { value: 'Nonexistent Recipe' } });

    await waitFor(() => {
      const noResultsElement = screen.getByText('No results found.');
      expect(noResultsElement).toBeInTheDocument();
    });
  });

  it('hides the dropdown when clicking outside the container', async () => {
    await act(async () => {
      render(<SearchRecipes />);
    });

    const inputElement = screen.getByPlaceholderText('Search for recipe');

    fireEvent.change(inputElement, { target: { value: 'Spaghetti' } });

    await waitFor(() => {
      const recipeLink = screen.getByText('Spaghetti Carbonara');
      expect(recipeLink).toBeInTheDocument();
    });

    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(screen.queryByText('Spaghetti Carbonara')).not.toBeInTheDocument();
    });
  });
});
