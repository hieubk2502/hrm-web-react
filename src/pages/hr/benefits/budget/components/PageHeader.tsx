import { Breadcrumb, Select } from 'antd';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
    title: React.ReactNode;
    href?: string;
};

type PageHeaderProps = {
    title: string;
    breadcrumbItems: BreadcrumbItem[];
    selectorValue?: string;
    selectorOptions?: { value: string; label: string }[];
    onSelectorChange?: (value: string) => void;
};

export default function PageHeader({
    title,
    breadcrumbItems,
    selectorValue,
    selectorOptions = [],
    onSelectorChange,
}: PageHeaderProps) {
    const formattedBreadcrumbs = breadcrumbItems.map((item) => ({
        title: item.href
            ? <Link to={item.href} className="text-gray-500 hover:text-blue-600">{item.title}</Link>
            : item.title,
    }));

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumb items={formattedBreadcrumbs} />

            <div className="flex justify-between items-center mt-2 border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 m-0">{title}</h2>
                </div>
                {selectorOptions.length > 0 && (
                    <Select
                        value={selectorValue}
                        onChange={onSelectorChange}
                        style={{ width: 320 }}
                        options={selectorOptions}
                    />
                )}
            </div>
        </div>
    );
}
