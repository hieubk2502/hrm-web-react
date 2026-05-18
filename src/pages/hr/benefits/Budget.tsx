import {Breadcrumb, Button, Input, Select, Space, Switch, Table, Tabs} from 'antd';
import {DeleteOutlined, DownloadOutlined, EyeOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

export default function Budget() {
    const dataSource = [
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

    const tabItems = [
        {
            key: '1',
            label: <span className="font-medium px-4">Chính sách lương</span>,
            children: (
                <div>
                    {/* Filter form */}
                    <div className="bg-white p-4 border border-gray-200 rounded-md mb-4 flex gap-4 shadow-sm items-end">
                        <div className="flex-1">
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Đơn vị</label>
                            <Select className="w-full" placeholder="Chọn đơn vị" defaultValue="ptp">
                                <Select.Option value="ptp">CTCP Cấp thoát nước Phú Thọ (LinhPTP)</Select.Option>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Mã chính sách</label>
                            <Input placeholder="Nhập mã chính sách"/>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Tên chính sách</label>
                            <Input placeholder="Nhập tên chính sách"/>
                        </div>
                        <div className="flex gap-2">
                            <Button>Xóa lọc</Button>
                            <Button type="primary" className="bg-[#0052cc]" icon={<SearchOutlined/>}>Tìm kiếm</Button>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between items-center mb-4 mt-8">
                        <div className="font-medium text-gray-700">Kết quả tìm kiếm</div>
                        <div className="flex gap-2">
                            <Input placeholder="Tìm kiếm nhanh..."
                                   prefix={<SearchOutlined className="text-gray-400"/>}/>
                            <Button type="primary" className="bg-[#0052cc]" icon={<PlusOutlined/>}>Thêm mới</Button>
                            <Button icon={<DownloadOutlined/>}>Xuất Excel</Button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            total: 5,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total) => `Tổng số dòng ${total}`
                        }}
                        bordered={false}
                        size="middle"
                        rowClassName={(record, index) => index === 0 ? 'bg-blue-50/50' : ''}
                    />
                </div>
            )
        },
        {
            key: '2',
            label: <span className="font-medium px-4">Thành phần lương</span>,
            children: <div
                className="py-20 text-center text-gray-500 border border-dashed border-gray-300 rounded-md bg-gray-50">Nội
                dung tab Thành phần lương</div>
        }
    ];

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumb items={[
                {title: <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>},
                {title: 'Thu nhập và phúc lợi'},
                {title: 'Ngân sách & Kế hoạch'},
                {title: 'Chính sách, thành phần lương theo đơn vị'}
            ]}/>

            <div className="flex justify-between items-center mt-2 border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 m-0">Chính Sách, Thành Phần Lương Theo Đơn Vị</h2>
                </div>
                <Select defaultValue="chinhsach" style={{width: 320}}>
                    <Select.Option value="chinhsach">Chính sách, thành phần lương theo đơn vị</Select.Option>
                </Select>
            </div>

            <Tabs
                defaultActiveKey="1"
                className="mt-2"
                items={tabItems}
            />
        </div>
    );
}
