import { useState } from 'react';
import { Tabs } from 'antd';
import PageHeader from './components/PageHeader';
import SalaryPolicyTab from './components/SalaryPolicyTab';
import SalaryComponentTab from './components/SalaryComponentTab';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';

const selectorOptions = [
    { value: 'policy-salary', label: 'Chính sách lương theo đơn vị' },
    { value: 'component-salary', label: 'Thành phần lương theo đơn vị' },
];

const tabItems = [
    {
        key: 'policy-salary',
        label: <span className="font-medium px-4">Chính sách lương</span>,
        children: <SalaryPolicyTab />,
    },
    {
        key: 'component-salary',
        label: <span className="font-medium px-4">Thành phần lương</span>,
        children: <SalaryComponentTab />,
    },
];

export default function Budget() {
    const [activeView, setActiveView] = useState('policy-salary');
    const routeBreadcrumbs = useBreadcrumbs();

    const currentLabel = selectorOptions.find(opt => opt.value === activeView)?.label || '';

    const breadcrumbItems = [
        ...routeBreadcrumbs,
        { title: currentLabel },
    ];

    return (
        <div className="flex flex-col gap-4">
            <PageHeader
                title="Chính Sách, Thành Phần Lương Theo Đơn Vị"
                breadcrumbItems={breadcrumbItems}
                selectorValue={activeView}
                selectorOptions={selectorOptions}
                onSelectorChange={setActiveView}
            />

            <Tabs
                activeKey={activeView}
                onChange={setActiveView}
                className="mt-2"
                items={tabItems}
            />
        </div>
    );
}
