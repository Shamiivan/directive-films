import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAction } from "convex/react";

import { api } from "../../convex/_generated/api";
import { isConvexConfigured } from "@/cms/convex";
import { isAdminUnlocked, unlockAdmin } from "@/cms/adminAuth";
import styles from "@/cms/adminLogin.module.css";

export function meta() {
  return [{ title: "Sign in · Admin · DirectiveFilms" }];
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const validate = isConvexConfigured ? useAction(api.auth.validateAdminPassword) : null;

  useEffect(() => {
    if (isAdminUnlocked()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate) {
      setError("Convex is not configured. Set VITE_CONVEX_URL and ADMIN_PASSWORD before signing in.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      const ok = await validate({ password });
      if (!ok) {
        setError("Incorrect password.");
        return;
      }
      unlockAdmin();
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.card} onSubmit={onSubmit} aria-labelledby="admin-login-title">
        <h1 id="admin-login-title" className={styles.title}>
          DirectiveFilms<span className={styles.dot}>.</span>
        </h1>
        <p className={styles.subtitle}>Sign in to edit content.</p>

        <label className={styles.field}>
          <span className={styles.label}>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            required
            className={styles.input}
            disabled={pending}
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submit} disabled={pending || !password}>
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
