import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FilmCard from "./FilmCard";

const defaultProps = {
  id: "1",
  title: "Inception",
  year: 2010,
  genre: "Sci-Fi",
  rating: 9,
  watched: true,
  onToggleWatched: vi.fn(),
  onRemove: vi.fn(),
};

describe("FilmCard", () => {
  it("zobrazí název a rok filmu", () => {
    render(<FilmCard {...defaultProps} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(/2010/)).toBeInTheDocument();
  });

  it("zobrazí badge Zhlédnuto, pokud je film zhlédnutý", () => {
    render(<FilmCard {...defaultProps} watched={true} />);

    expect(screen.getByText(/✓ Zhlédnuto/i)).toBeInTheDocument();
  });

  it("nezobrazí badge Zhlédnuto, pokud film není zhlédnutý", () => {
    render(<FilmCard {...defaultProps} watched={false} />);

    expect(screen.queryByText(/✓ Zhlédnuto/i)).not.toBeInTheDocument();
  });

  it("zavolá onToggleWatched s id filmu po kliknutí na tlačítko změny stavu", async () => {
    const user = userEvent.setup();
    const onToggleWatched = vi.fn();

    render(<FilmCard {...defaultProps} onToggleWatched={onToggleWatched} />);

    await user.click(screen.getByRole("button", { name: /změnit stav/i }));

    expect(onToggleWatched).toHaveBeenCalledTimes(1);
    expect(onToggleWatched).toHaveBeenCalledWith("1");
  });
});
