import { ArrowRightOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, type FormInstance } from "antd";
import Text from "antd/es/typography/Text";

interface Props {
    form: FormInstance;
    submitting: boolean;
    onFinish: (values: any) => Promise<void>; // Event handler when user submit form
    onQuickFill: (role: 'admin' | 'employee') => void;
}

export const LoginForm = ({ form, submitting, onFinish, onQuickFill }: Props) => {
    return (

        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            autoComplete="off"
            className="space-y-4"
        >
            <Form.Item
                label={<span className="text-xs font-semibold text-gray-700">TÊN ĐĂNG NHẬP</span>}
                name="username"
                rules={[
                    { required: true, message: 'Vui lòng nhập tên đăng nhập' },
                    { type: 'string', min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự' },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Nhập tên đăng nhập hoặc email"
                    className="h-11 rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500"
                />
            </Form.Item>

            <Form.Item label={
                <div className="w-full flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-700">MẬT KHẨU</span>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            message.info('Vui lòng liên hệ Quản trị viên hệ thống để khôi phục mật khẩu!');
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                        Quên mật khẩu?
                    </a>
                </div>
            }
                name="password"
                rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                    { min: 4, message: 'Mật khẩu phải chứa ít nhất 4 ký tự!' }
                ]}
            >

                <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Nhập mật khẩu của bạn"
                    className="h-11 rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500"
                />
            </Form.Item>

            <div className="flex items-center justify-between pt-1">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-600 text-sm">Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
            </div>

            <Form.Item className="pt-2">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-none rounded-lg font-semibold text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer"
                >
                    Tiếp Tục <ArrowRightOutlined />
                </Button>
            </Form.Item>


            {/* Quick Fill Test Accounts */}
            <div className="mt-8 pt-6 border-t border-gray-100">
                <Text type="secondary" className="block text-xs text-center mb-3 font-medium uppercase tracking-wider text-gray-400">
                    Tài khoản dùng thử nhanh (Test Accounts)
                </Text>
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        size="small"
                        onClick={() => onQuickFill('admin')}
                        className="text-xs border-blue-200 hover:border-blue-500 hover:text-blue-600 rounded-md py-3 flex items-center justify-center font-medium bg-blue-50/30 cursor-pointer"
                    >
                        Quản Trị (Admin)
                    </Button>
                    <Button
                        size="small"
                        onClick={() => onQuickFill('employee')}
                        className="text-xs border-purple-200 hover:border-purple-500 hover:text-purple-600 rounded-md py-3 flex items-center justify-center font-medium bg-purple-50/30 cursor-pointer"
                    >
                        Nhân Viên (Employee)
                    </Button>
                </div>
            </div>
        </Form>



    )
}   