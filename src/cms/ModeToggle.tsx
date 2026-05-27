import { useLocation, useNavigate } from "react-router";

import { useEditMode } from "./EditModeProvider";
import styles from "./chrome.module.css";

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function ModeToggle() {
  const { editMode, theme, toggleTheme } = useEditMode();
  const navigate = useNavigate();
  const location = useLocation();

  if (!editMode) return null;

  function exitEditMode() {
    const params = new URLSearchParams(location.search);
    params.delete("edit");
    const search = params.toString();
    navigate(
      { pathname: location.pathname, search: search ? `?${search}` : "" },
      { replace: false },
    );
  }

  return (
    <div className={`${styles.pill} ${styles.modeToggle} ${styles.enter}`} role="toolbar" aria-label="Editor mode">
      <button
        type="button"
        className={`${styles.btn} ${styles.themeBtn}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        title={`${theme === "light" ? "Dark" : "Light"} mode`}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
      <button
        type="button"
        className={`${styles.btn} ${styles.doneBtn}`}
        onClick={exitEditMode}
        aria-label="Exit edit mode"
      >
        Done
      </button>
    </div>
  );
}
