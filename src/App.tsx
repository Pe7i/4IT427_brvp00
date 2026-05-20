import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import WatchlistPage from "././pages/WatchlistPage";
import AddFilmPage from "././pages/AddFilmPage";

import styles from "./App.module.css";

function App() {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          Můj watchlist
        </NavLink>

        <NavLink
          to="/form"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          Přidat film
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<WatchlistPage />} />
        <Route path="/form" element={<AddFilmPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
