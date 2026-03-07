import { useParams } from "react-router";

export function useLocalePath() {
    const { lang } = useParams();

    return (path: string) => {
        // If it's an external link or a hash-only link, return as is
        if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
            return path;
        }

        const currentLang = lang || 'en';

        // Avoid double prefixing
        if (path.startsWith('/en/') || path === '/en' || path.startsWith('/fr/') || path === '/fr') {
            return path;
        }

        // Ensure path starts with /
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;

        // Handle root path
        if (normalizedPath === '/') {
            return `/${currentLang}`;
        }

        return `/${currentLang}${normalizedPath}`;
    };
}
