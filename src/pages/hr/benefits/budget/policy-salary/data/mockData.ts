export type BudgetPolicy = {
    key: string;
    stt: number;
    code: string;
    name: string;
    unit: string;
    status: boolean;
    date: string;
    user: string;
};

export const budgetDataSource: BudgetPolicy[] = [
    {
        key: '1',
        stt: 1,
        code: '3P_KDT',
        name: '3P_Khoán doanh thu',
        unit: 'CTCP Cấp thoát nước Phú Thọ (LinhPTP)',
        status: true,
        date: '14/04/2026',
        user: 'quynhnt'
    },
    {
        key: '2',
        stt: 2,
        code: '3P_BDH',
        name: '3P_Ban điều hành',
        unit: 'CTCP Cấp thoát nước Phú Thọ (LinhPTP)',
        status: true,
        date: '15/09/2025',
        user: 'linhptp'
    },
    {
        key: '3',
        stt: 3,
        code: '3P_CBQL',
        name: '3P_Cán bộ quản lý',
        unit: 'CTCP Cấp thoát nước Phú Thọ (LinhPTP)',
        status: true,
        date: '15/09/2025',
        user: 'linhptp'
    },
    {
        key: '4',
        stt: 4,
        code: '3P_HQCV',
        name: '3P_Hiệu quả công việc',
        unit: 'CTCP Cấp thoát nước Phú Thọ (LinhPTP)',
        status: true,
        date: '15/09/2025',
        user: 'linhptp'
    },
    {
        key: '5',
        stt: 5,
        code: '3P_KCV',
        name: '3P_Khoán công việc',
        unit: 'CTCP Cấp thoát nước Phú Thọ (LinhPTP)',
        status: true,
        date: '15/09/2025',
        user: 'linhptp'
    },
];
