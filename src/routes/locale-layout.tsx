import { useEffect } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useCmsLocaleBundles } from "@/cms/useCmsLocaleBundles";
import { useIsEditing, useLocale } from "@/cms/EditModeProvider";

export default function LocaleLayout() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const location = useLocation();
  const editMode = useIsEditing();
  const editorLocale = useLocale();

    const supportedLanguages = ['en', 'fr'];
    const activeLocale = editMode ? editorLocale : (lang === "fr" ? "fr" : "en");

    if (lang && supportedLanguages.includes(lang) && i18n.language !== activeLocale) {
        void i18n.changeLanguage(activeLocale);
    }

    useCmsLocaleBundles(activeLocale);

    useEffect(() => {
        if (!lang || !supportedLanguages.includes(lang)) {
            // If we're at / something-else, redirect to /en/something-else
            // This handles the root / -> /en redirect too if Vercel doesn't catch it
            const pathParts = location.pathname.split('/').filter(Boolean);
            const firstPart = pathParts[0];

            const newPath = supportedLanguages.includes(firstPart)
                ? `/en/${pathParts.slice(1).join('/')}`
                : `/en/${pathParts.join('/')}`;

            navigate(newPath, { replace: true });
            return;
        }

        if (i18n.language !== activeLocale) {
            void i18n.changeLanguage(activeLocale);
        }
    }, [activeLocale, lang, i18n, navigate, location.pathname]);

    // Prevent rendering if language is invalid to avoid English flash while redirecting
    if (!lang || !supportedLanguages.includes(lang)) {
        return null;
    }

    return <Outlet />;
}
