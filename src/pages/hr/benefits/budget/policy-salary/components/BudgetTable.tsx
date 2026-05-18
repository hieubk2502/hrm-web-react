import {Button, Space, Switch, Table} from 'antd';
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import type {BudgetPolicy} from '../data/mockData';

type BudgetTableProps = {
    dataSource: BudgetPolicy[];
};

const columns = [
    {title: 'STT', dataIndex: 'stt', key: 'stt', align: 'center' as const},
    {title: 'Mã chính sách', dataIndex: 'code', key: 'code', className: 'font-medium'},
    {title: 'Tên chính sách', dataIndex: 'name', key: 'name'},
    {title: 'Đơn vị', dataIndex: 'unit', key: 'unit'},
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (val: boolean) => <Switch defaultChecked={val}/>
    },
    {title: 'Ngày cập nhật', dataIndex: 'date', key: 'date', align: 'center' as const},
    {title: 'Người cập nhật', dataIndex: 'user', key: 'user'},
    {
        title: 'Hành động',
        key: 'action',
        align: 'center' as const,
        render: () => (
            <Space>
                <Button type="text" icon={<EyeOutlined/>} size="small"/>
                <Button type="text" danger icon={<DeleteOutlined/>} size="small"/>
            </Space>
        )
    },
];

export default function BudgetTable({dataSource}: BudgetTableProps) {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
                total: dataSource.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Tổng số dòng ${total}`
            }}
            bordered={false}
            size="middle"
            rowClassName={(_record, index) => index === 0 ? 'bg-blue-50/50' : ''}
        />
    );
}
