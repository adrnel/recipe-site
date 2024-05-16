export interface Recipe {
  id: string;
  name: string;
  image: string;
  prepTime: string;
  cookingTime: string;
  difficulty: string;
  serves: number;
  ingredients: string[];
  method: string[];
  summary: string;
  rating: number;
  ratingsCount: number;
  time: string;
}
