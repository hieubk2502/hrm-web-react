import type { ReactElement } from 'react';

type RouteWithHandle = {
    path?: string;
    element?: ReactElement;
    handle?: {
        role?: string;
        title?: string;
        [key: string]: any;
    };
    children?: RouteWithHandle[];
    index?: boolean;
};

/**
 * Wrap routes to extract role information
 * This allows us to track and check permissions per route
 */
export function withRouteProtection(routes: RouteWithHandle[]): RouteWithHandle[] {
    return routes.map(route => ({
        ...route,
        children: route.children ? withRouteProtection(route.children) : undefined,
    }));
}

/**
 * Get role from route handle
 */
export function getRouteRole(handle?: any): string | undefined {
    return handle?.role;
}
