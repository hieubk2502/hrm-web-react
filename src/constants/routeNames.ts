export const PATHS = {
    HR: 'hr',
    DASHBOARD: 'dashboard',
    OKR: 'okr',
    ORG: 'org',
    BENEFITS: 'benefits',
    BUDGET: 'budget',
    PLAN: 'plan',
    BONUS: 'bonus',
    SALARY: 'salary',
};

export const ROUTES = {
    HOME: '/',
    HR: {
        ROOT: `/${PATHS.HR}`,
        DASHBOARD: `/${PATHS.HR}/${PATHS.DASHBOARD}`,
        OKR: `/${PATHS.HR}/${PATHS.OKR}`,
        ORG: `/${PATHS.HR}/${PATHS.ORG}`,
        BENEFITS: {
            ROOT: `/${PATHS.HR}/${PATHS.BENEFITS}`,
            BUDGET: `/${PATHS.HR}/${PATHS.BENEFITS}/${PATHS.BUDGET}`,
            PLAN: `/${PATHS.HR}/${PATHS.BENEFITS}/${PATHS.PLAN}`,
            BONUS: `/${PATHS.HR}/${PATHS.BENEFITS}/${PATHS.BONUS}`,
            SALARY: `/${PATHS.HR}/${PATHS.BENEFITS}/${PATHS.SALARY}`
        }
    }
};

export const ROLE_PATHS = {
    DASHBOARD: '/hr/dashboard',
    OKR: '/hr/okr',
    ORG: '/hr/org',
    BENEFITS: '/hr/benefits',
    BUDGET: '/hr/benefits/budget',
    BONUS: '/hr/benefits/bonus',
    SALARY: '/hr/benefits/salary',
};
