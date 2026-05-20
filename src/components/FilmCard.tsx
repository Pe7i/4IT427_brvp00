import styles from "./FilmCard.module.css";

interface FilmCardProps {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
  onToggleWatched: (id: string) => void;
  onRemove: () => void;
}

function FilmCard({
  id,
  title,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onRemove,
}: FilmCardProps) {
  const isRatingValid = rating >= 1 && rating <= 10;

  return (
    <article className={`${styles.card} ${watched ? styles.cardWatched : ""}`}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.meta}>
            {year} • {genre}
          </p>
        </div>

        {watched && <span className={styles.badge}>✓ Zhlédnuto</span>}
      </div>

      <p className={styles.rating}>
        ⭐ {isRatingValid ? rating : "Neplatné hodnocení"}/10
      </p>

      <div className={styles.actions}>
        <button
          className={styles.toggleButton}
          onClick={() => onToggleWatched(id)}
        >
          Změnit stav
        </button>

        <button className={styles.removeButton} onClick={onRemove}>
          Odebrat
        </button>
      </div>
    </article>
  );
}

export default FilmCard;
