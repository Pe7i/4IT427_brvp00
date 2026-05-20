import { useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import styles from "./AddFilmForm.module.css";

function AddFilmForm() {
  const { addFilm } = useWatchlist();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();

        addFilm({
          title,
          year: Number(year),
          genre,
          rating: Number(rating),
          watched: false,
        });

        setTitle("");
        setYear("");
        setGenre("");
        setRating("");
      }}
    >
      <h2 className={styles.title}>Přidat film</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          Název filmu
        </label>
        <input
          className={styles.input}
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="year">
          Rok
        </label>
        <input
          className={styles.input}
          id="year"
          type="number"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="genre">
          Žánr
        </label>
        <input
          className={styles.input}
          id="genre"
          type="text"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rating">
          Hodnocení
        </label>
        <input
          className={styles.input}
          id="rating"
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          required
        />
      </div>

      <button className={styles.button} type="submit">
        Přidat film
      </button>
    </form>
  );
}

export default AddFilmForm;
