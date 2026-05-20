import type { Film } from "../types/film.types";

export function filterFilmsByTitle(films: Film[], searchTerm: string): Film[] {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  if (!normalizedSearchTerm) {
    return films;
  }

  return films.filter((film) =>
    film.title.toLowerCase().includes(normalizedSearchTerm),
  );
}

export function calculateAverageRating(films: Film[]): number {
  if (films.length === 0) {
    return 0;
  }

  const totalRating = films.reduce((sum, film) => sum + film.rating, 0);

  return totalRating / films.length;
}
