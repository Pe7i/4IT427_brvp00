import AddFilmForm from "../components/AddFilmForm";
import styles from "../App.module.css";

function AddFilmPage() {
  return (
    <main className={styles.app}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Film Watchlist</p>
          <h1 className={styles.title}>Přidat film</h1>
          <p className={styles.subtitle}>
            Vyplň formulář a přidej nový film do svého watchlistu.
          </p>
        </div>
      </section>

      <section className={styles.formPage}>
        <AddFilmForm />
      </section>
    </main>
  );
}

export default AddFilmPage;
