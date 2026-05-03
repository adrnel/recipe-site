import { describe, expect, it, jest } from '@jest/globals';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

const addEventListener = jest.fn();
const removeEventListener = jest.fn();
const mockRouter = {
  push: jest.fn(),
  events: {
    on: addEventListener,
    off: removeEventListener,
  },
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const SearchRecipes = require('./SearchRecipes').default;

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
) as unknown as typeof fetch;

describe('SearchRecipes component', () => {
  it('renders the input element', async () => {
    await act(async () => {
      render(<SearchRecipes />);
    });
    const inputElement = screen.getByPlaceholderText('Search for recipe');
    expect(inputElement).toBeTruthy();
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
      expect(recipeLink).toBeTruthy();
    });

    expect(screen.queryByText('Chicken Alfredo')).toBeNull();
  });

  it('displays "No results found" when no recipes match the search query', async () => {
    await act(async () => {
      render(<SearchRecipes />);
    });

    const inputElement = screen.getByPlaceholderText('Search for recipe');

    fireEvent.change(inputElement, { target: { value: 'Nonexistent Recipe' } });

    await waitFor(() => {
      const noResultsElement = screen.getByText('No results found.');
      expect(noResultsElement).toBeTruthy();
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
      expect(recipeLink).toBeTruthy();
    });

    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(screen.queryByText('Spaghetti Carbonara')).toBeNull();
    });
  });
});
