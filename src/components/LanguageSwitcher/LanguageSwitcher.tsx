import { useLocation, useNavigate, useParams } from "react-router";
import styles from "./language-switcher.module.css";

export default function LanguageSwitcher() {
    const { lang } = useParams();
    const { pathname, search, hash } = useLocation();
    const navigate = useNavigate();

    const toggleLanguage = () => {
        const newLang = lang === "fr" ? "en" : "fr";
        const pathParts = pathname.split("/");
        // pathParts[1] is the current lang segment
        pathParts[1] = newLang;
        navigate(pathParts.join("/") + search + hash);
    };

    return (
        <button
            onClick={toggleLanguage}
            className={styles.switcher}
            aria-label={`Switch to ${lang === "fr" ? "English" : "French"}`}
        >
            <span className={lang === 'en' ? styles.active : ''}>EN</span>
            <span className={styles.divider}>/</span>
            <span className={lang === 'fr' ? styles.active : ''}>FR</span>
        </button>
    );
}
