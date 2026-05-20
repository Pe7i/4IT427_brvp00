import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFilms } from "../api/films";
import type { Film } from "../types/film.types";

interface WatchlistContextValue {
  films: Film[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  addFilm: (film: Omit<Film, "id">) => void;
  removeFilm: (id: string) => void;
  toggleWatched: (id: string) => void;
  markAllAsWatched: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(
  undefined,
);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const {
    data: serverFilms = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["films"],
    queryFn: fetchFilms,
  });

  const [clientFilms, setClientFilms] = useState<Film[]>([]);

  useEffect(() => {
    if (serverFilms.length > 0 && clientFilms.length === 0) {
      setClientFilms(serverFilms);
    }
  }, [serverFilms, clientFilms.length]);

  const addFilm = (film: Omit<Film, "id">) => {
    const newFilm: Film = {
      ...film,
      id: Date.now().toString(),
    };

    setClientFilms((prevFilms) => [...prevFilms, newFilm]);
  };

  const removeFilm = (id: string) => {
    setClientFilms((prevFilms) => prevFilms.filter((film) => film.id !== id));
  };

  const toggleWatched = (id: string) => {
    setClientFilms((prevFilms) =>
      prevFilms.map((film) =>
        film.id === id ? { ...film, watched: !film.watched } : film,
      ),
    );
  };

  const markAllAsWatched = () => {
    setClientFilms((prevFilms) =>
      prevFilms.map((film) => ({ ...film, watched: true })),
    );
  };

  const value = useMemo(
    () => ({
      films: clientFilms,
      isLoading,
      isError,
      error,
      refetch,
      addFilm,
      removeFilm,
      toggleWatched,
      markAllAsWatched,
    }),
    [clientFilms, isLoading, isError, error, refetch],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }

  return context;
}
