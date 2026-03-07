import { useEffect } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

export default function LocaleLayout() {
    const { lang } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const location = useLocation();

    const supportedLanguages = ['en', 'fr'];

    useEffect(() => {
        if (!lang || !supportedLanguages.includes(lang)) {
            // If we're at / something-else, redirect to /en/something-else
            // This handles the root / -> /en redirect too if Vercel doesn't catch it
            const pathParts = location.pathname.split('/').filter(Boolean);
            const firstPart = pathParts[0];

            let newPath = '';
            if (supportedLanguages.includes(firstPart)) {
                // Already has a lang but maybe it's invalid? (Shouldn't happen with routes.ts match)
                newPath = `/en/${pathParts.slice(1).join('/')}`;
            } else {
                newPath = `/en/${pathParts.join('/')}`;
            }

            navigate(newPath, { replace: true });
            return;
        }

        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n, navigate, location.pathname]);

    // Prevent rendering if language is invalid to avoid English flash while redirecting
    if (!lang || !supportedLanguages.includes(lang)) {
        return null;
    }

    return <Outlet />;
}
