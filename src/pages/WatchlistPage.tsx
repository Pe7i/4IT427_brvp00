import FilmCard from "../components/FilmCard";
import { useWatchlist } from "../context/WatchlistContext";
import styles from "../App.module.css";

function WatchlistPage() {
  const {
    films,
    isLoading,
    isError,
    error,
    refetch,
    removeFilm,
    toggleWatched,
    markAllAsWatched,
  } = useWatchlist();

  const watchedCount = films.filter((film) => film.watched).length;
  const totalCount = films.length;

  if (isLoading) {
    return (
      <main className={styles.app}>
        <p className={styles.emptyState}>Načítám…</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.app}>
        <section className={styles.errorBox}>
          <h1>Filmy se nepodařilo načíst.</h1>
          <p>{error?.message}</p>
          <button className={styles.primaryButton} onClick={() => refetch()}>
            Zkusit znovu
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.app}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Film Watchlist</p>
          <h1 className={styles.title}>Můj filmový watchlist</h1>
          <p className={styles.subtitle}>
            Filmy jsou načtené z externího JSON souboru pomocí TanStack Query.
          </p>
        </div>

        <button className={styles.primaryButton} onClick={markAllAsWatched}>
          Označit vše jako zhlédnuté
        </button>
      </section>

      <section className={styles.stats}>
        <span className={styles.statsNumber}>
          {watchedCount} / {totalCount}
        </span>
        <span className={styles.statsText}>zhlédnuto</span>
      </section>

      <section className={styles.content}>
        {films.length === 0 ? (
          <p className={styles.emptyState}>
            Ve watchlistu zatím nejsou žádné filmy.
          </p>
        ) : (
          <div className={styles.grid}>
            {films.map((film) => (
              <FilmCard
                key={film.id}
                id={film.id}
                title={film.title}
                year={film.year}
                genre={film.genre}
                rating={film.rating}
                watched={film.watched}
                onToggleWatched={toggleWatched}
                onRemove={() => removeFilm(film.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default WatchlistPage;
