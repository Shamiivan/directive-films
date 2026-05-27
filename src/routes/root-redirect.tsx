import { redirect } from "react-router";

export function clientLoader({ request }: { request: Request }) {
    let lang = "en";
    if (typeof navigator !== "undefined" && navigator.languages) {
        const preferredLang = navigator.languages.find(l => l.startsWith('en') || l.startsWith('fr'));
        if (preferredLang && preferredLang.startsWith('fr')) {
            lang = 'fr';
        }
    } else if (typeof navigator !== "undefined" && navigator.language && navigator.language.startsWith("fr")) {
        lang = "fr";
    }
    const url = new URL(request.url);
    return redirect(`/${lang}${url.search}`);
}
