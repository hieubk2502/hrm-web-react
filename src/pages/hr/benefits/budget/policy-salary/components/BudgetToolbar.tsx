import {Button, Input} from 'antd';
import {DownloadOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';

type BudgetToolbarProps = {
    onAdd?: () => void;
    onExport?: () => void;
};

export default function BudgetToolbar({onAdd, onExport}: BudgetToolbarProps) {
    return (
        <div className="flex justify-between items-center mb-4 mt-8">
            <div className="font-medium text-gray-700">Kết quả tìm kiếm</div>
            <div className="flex gap-2">
                <Input
                    placeholder="Tìm kiếm nhanh..."
                    prefix={<SearchOutlined className="text-gray-400"/>}
                />
                <Button type="primary" className="bg-[#0052cc]" icon={<PlusOutlined/>} onClick={onAdd}>
                    Thêm mới
                </Button>
                <Button icon={<DownloadOutlined/>} onClick={onExport}>
                    Xuất Excel
                </Button>
            </div>
        </div>
    );
}
