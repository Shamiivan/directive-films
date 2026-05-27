import { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router";

import { useEditMode } from "@/cms/EditModeProvider";
import { isConvexConfigured } from "@/cms/convex";
import { isAdminUnlocked, lockAdmin } from "@/cms/adminAuth";
import styles from "@/cms/admin.module.css";

const PAGES = [
  { slug: "home", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "services", label: "Services" },
  { slug: "contact", label: "Contact" },
  { slug: "careers", label: "Careers" },
];

// Flip to true to re-expose the Collections nav group.
const SHOW_COLLECTIONS = false;

const COLLECTIONS = [
  { slug: "projects", label: "Projects" },
  { slug: "services", label: "Services" },
  { slug: "team", label: "Team" },
  { slug: "testimonials", label: "Testimonials" },
  { slug: "positions", label: "Open Positions" },
];

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function meta() {
  return [{ title: "Admin · DirectiveFilms" }];
}

export default function AdminLayout() {
  const { theme, toggleTheme } = useEditMode();
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const ok = isAdminUnlocked();
    setAuthed(ok);
    if (!ok) navigate("/admin/login", { replace: true });
  }, [navigate]);

  if (authed !== true) return null;

  const onSignOut = () => {
    lockAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className={styles.layout}>
      <header className={styles.topbar}>
        <Link to="/admin" className={styles.brand}>
          DirectiveFilms<span className={styles.dot}>.</span>
        </Link>
        <div className={styles.topbarRight}>
          <Link to="/en" className={styles.viewSite}>View site</Link>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            type="button"
            className={styles.viewSite}
            onClick={onSignOut}
          >
            Sign out
          </button>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <nav className={styles.navSection}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            <span>Dashboard</span>
          </NavLink>
        </nav>

        <div className={styles.navSection}>
          <span className={styles.navLabel}>Pages</span>
          {PAGES.map((page) => (
            <NavLink
              key={page.slug}
              to={`/admin/pages/${page.slug}`}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <span>{page.label}</span>
            </NavLink>
          ))}
        </div>

        {SHOW_COLLECTIONS && (
          <div className={styles.navSection}>
            <span className={styles.navLabel}>Collections</span>
            {COLLECTIONS.map((col) => (
              <NavLink
                key={col.slug}
                to={`/admin/${col.slug}`}
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
              >
                <span>{col.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        <div className={styles.navSection}>
          <span className={styles.navLabel}>System</span>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            <span>Site Settings</span>
          </NavLink>
          <NavLink
            to="/admin/media"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            <span>Media</span>
          </NavLink>
        </div>
      </aside>

      <main className={styles.main}>
        {!isConvexConfigured && (
          <div className={styles.banner}>
            <span className={styles.label}>Setup</span>
            <span>
              Convex is not connected yet. Set <code>VITE_CONVEX_URL</code> in <code>.env.local</code> and restart dev to see live data.
            </span>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
