import { Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type BudgetFilterFormProps = {
    onSearch?: () => void;
    onClear?: () => void;
};

export default function BudgetFilterForm({ onSearch, onClear }: BudgetFilterFormProps) {
    return (
        <div className="bg-white p-4 border border-gray-200 rounded-md mb-4 flex gap-4 shadow-sm items-end">
            <div className="flex-1">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Đơn vị</label>
                <Select className="w-full" placeholder="Chọn đơn vị" defaultValue="ptp">
                    <Select value="ptp">CTCP Cấp thoát nước Phú Thọ (LinhPTP)</Select>
                </Select>
            </div>
            <div className="flex-1">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Mã chính sách</label>
                <Input placeholder="Nhập mã chính sách" />
            </div>
            <div className="flex-1">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Tên chính sách</label>
                <Input placeholder="Nhập tên chính sách" />
            </div>
            <div className="flex gap-2">
                <Button onClick={onClear}>Xóa lọc</Button>
                <Button type="primary" className="bg-[#0052cc]" icon={<SearchOutlined />} onClick={onSearch}>
                    Tìm kiếm
                </Button>
            </div>
        </div>
    );
}
