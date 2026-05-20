import { describe, expect, it } from "vitest";
import type { Film } from "../types/film.types";
import { calculateAverageRating, filterFilmsByTitle } from "./filmUtils";

const films: Film[] = [
  {
    id: "1",
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 9,
    watched: true,
  },
  {
    id: "2",
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8,
    watched: false,
  },
  {
    id: "3",
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
    rating: 10,
    watched: true,
  },
];

describe("filterFilmsByTitle", () => {
  it("vrátí filmy, jejichž název obsahuje hledaný text", () => {
    const result = filterFilmsByTitle(films, "matrix");

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("The Matrix");
  });

  it("ignoruje velikost písmen a mezery na začátku nebo konci", () => {
    const result = filterFilmsByTitle(films, "  INCEPTION  ");

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Inception");
  });

  it("při prázdném hledání vrátí všechny filmy", () => {
    const result = filterFilmsByTitle(films, "");

    expect(result).toEqual(films);
  });
});

describe("calculateAverageRating", () => {
  it("spočítá průměrné hodnocení filmů", () => {
    const result = calculateAverageRating(films);

    expect(result).toBe(9);
  });

  it("pro prázdné pole vrátí 0", () => {
    const result = calculateAverageRating([]);

    expect(result).toBe(0);
  });
});
