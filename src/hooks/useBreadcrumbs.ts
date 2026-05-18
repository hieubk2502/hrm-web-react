import { useMatches } from 'react-router-dom';

type RouteMatch = {
    id: string;
    pathname: string;
    params: any;
    data: any;
    handle?: {
        title?: string;
    };
};

export function useBreadcrumbs() {
    const matches = useMatches() as RouteMatch[];

    const breadcrumbs = matches
        .filter((match) => Boolean(match.handle?.title))
        .map((match) => ({
            title: match.handle!.title,
            href: match.pathname,
        }));

    // Always prepend 'Trang chủ' if it's not already the first item
    if (breadcrumbs.length === 0 || breadcrumbs[0].title !== 'Trang chủ') {
        breadcrumbs.unshift({ title: 'Trang chủ', href: '/' });
    }

    return breadcrumbs;
}
