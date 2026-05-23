import { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePermissionStore } from '../store/permissionStore';
import { ROUTES } from '../constants/routeNames';

const { Title, Text, Paragraph } = Typography;

export default function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const authStore = useAuthStore();
    const permissionStore = usePermissionStore();
    
    // States for 2-step authentication
    const [step, setStep] = useState<'login' | 'otp'>('login');
    const [tempCredentials, setTempCredentials] = useState<any>(null);
    const [otpValue, setOtpValue] = useState('');
    const [timer, setTimer] = useState(60);
    const [submitting, setSubmitting] = useState(false);

    // Redirect path (if any was requested before redirecting to login)
    const from = (location.state as any)?.from?.pathname || ROUTES.HR.DASHBOARD;

    // OTP Timer effect
    useEffect(() => {
        let interval: any;
        if (step === 'otp' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const handleFinish = async (values: any) => {
        setSubmitting(true);
        try {
            // First step: Verify username & password (simulated call)
            const username = values.username.toLowerCase();
            const password = values.password;
            
            await new Promise((resolve) => setTimeout(resolve, 800));

            if ((username === 'admin' && password === 'admin123') || 
                (username === 'employee' && password === 'employee123')) {
                
                // Save temp credentials and switch step
                setTempCredentials({ username: values.username, password: values.password });
                setStep('otp');
                setTimer(60);
                setOtpValue('');
                message.success('Thông tin chính xác! Mã xác minh OTP (123456) đã được gửi.');
            } else {
                message.error('Tên đăng nhập hoặc mật khẩu không chính xác!');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi. Vui lòng thử lại!');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleOtpSubmit = async () => {
        if (otpValue.length < 6) {
            message.warning('Vui lòng nhập đủ 6 số của mã OTP!');
            return;
        }

        setSubmitting(true);
        try {
            // Second step: Verify OTP code (mock validation: code '123456')
            await new Promise((resolve) => setTimeout(resolve, 800));

            if (otpValue === '123456') {
                const success = await authStore.login(tempCredentials.username, tempCredentials.password);
                if (success) {
                    const userRole = authStore.user?.role;
                    await permissionStore.fetchPermissions(userRole);

                    message.success({
                        content: `Đăng nhập thành công! Chào mừng trở lại, ${authStore.user?.name}!`,
                        duration: 3,
                    });

                    navigate(from, { replace: true });
                }
            } else {
                message.error('Mã OTP không chính xác! Hãy nhập 123456 để thử nghiệm.');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi khi xác minh OTP!');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleResendOtp = () => {
        setTimer(60);
        message.info('Đã gửi lại mã OTP (123456) qua Email/SMS của bạn.');
    };

    // Quick fill for testing
    const fillCredentials = (role: 'admin' | 'employee') => {
        if (role === 'admin') {
            form.setFieldsValue({
                username: 'admin',
                password: 'admin123',
            });
        } else {
            form.setFieldsValue({
                username: 'employee',
                password: 'employee123',
            });
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Column: Premium Branding Banner (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-blue-700 via-indigo-800 to-purple-900 text-white p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500 opacity-25 blur-3xl"></div>

                <div className="z-10 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-indigo-900 font-extrabold text-lg shadow-md">
                        D
                    </div>
                    <span className="font-extrabold text-xl tracking-wider">DNP <span className="font-light text-blue-200">water</span></span>
                </div>

                <div className="z-10 my-auto max-w-lg">
                    <Title level={1} className="!text-white !font-black !text-4xl leading-tight mb-6">
                        Hệ Thống Quản Trị Nhân Sự Doanh Nghiệp
                    </Title>
                    <Paragraph className="text-blue-100 text-lg mb-8 leading-relaxed">
                        Giải pháp tối ưu hóa quy trình quản lý nhân sự, đánh giá OKR/KPI, lập kế hoạch ngân sách phúc lợi toàn diện và minh bạch.
                    </Paragraph>

                    {/* Visual Mock Card representing HRM metrics */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <Text className="text-white/80 font-medium">Tổng Quan Nhân Sự</Text>
                            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold">Live</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                <Text className="block text-white/60 text-xs">Tổng nhân sự</Text>
                                <span className="text-xl font-bold text-white">1,248</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                <Text className="block text-white/60 text-xs">Hoàn thành OKR</Text>
                                <span className="text-xl font-bold text-green-400">92.4%</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                <Text className="block text-white/60 text-xs">Ngân sách đã chi</Text>
                                <span className="text-xl font-bold text-amber-400">78.5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="z-10 text-white/60 text-xs flex justify-between">
                    <span>© 2026 DNP Water HRM. All Rights Reserved.</span>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">Hỗ trợ kỹ thuật</a>
                </div>
            </div>

            {/* Right Column: Login / OTP Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <Card className="w-full max-w-md shadow-xl border border-gray-100 !rounded-2xl p-4 sm:p-6 bg-white transition-all duration-500">
                    
                    {step === 'login' ? (
                        /* SECTION 1: USERNAME / PASSWORD */
                        <>
                            <div className="text-center mb-8">
                                {/* Mobile Logo */}
                                <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-extrabold text-lg">
                                        D
                                    </div>
                                    <span className="font-extrabold text-xl tracking-wider text-indigo-900">DNP <span className="font-light text-gray-400">water</span></span>
                                </div>
                                <Title level={3} className="!font-bold !text-gray-900 mb-1">
                                    Chào Mừng Trở Lại
                                </Title>
                                <Text type="secondary" className="text-sm">
                                    Vui lòng nhập tài khoản để truy cập hệ thống
                                </Text>
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                requiredMark={false}
                                onFinish={handleFinish}
                                autoComplete="off"
                                className="space-y-4"
                            >
                                <Form.Item
                                    label={<span className="text-xs font-semibold text-gray-700">TÊN ĐĂNG NHẬP</span>}
                                    name="username"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tên đăng nhập hoặc email!' },
                                        { min: 4, message: 'Tên đăng nhập phải chứa ít nhất 4 ký tự!' }
                                    ]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="text-gray-400" />}
                                        placeholder="Nhập tên đăng nhập hoặc email"
                                        className="h-11 rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="w-full flex justify-between items-center">
                                            <span className="text-xs font-semibold text-gray-700">MẬT KHẨU</span>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    message.info('Vui lòng liên hệ Quản trị viên hệ thống để khôi phục mật khẩu!');
                                                }}
                                                className="text-xs text-blue-600 hover:text-blue-800"
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
                            </Form>

                            {/* Developer Mock Assist Box */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <Text type="secondary" className="block text-xs text-center mb-3 font-medium uppercase tracking-wider text-gray-400">
                                    Tài khoản dùng thử nhanh (Test Accounts)
                                </Text>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        size="small"
                                        onClick={() => fillCredentials('admin')}
                                        className="text-xs border-blue-200 hover:border-blue-500 hover:text-blue-600 rounded-md py-3 flex items-center justify-center font-medium bg-blue-50/30 cursor-pointer"
                                    >
                                        Quản Trị (Admin)
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => fillCredentials('employee')}
                                        className="text-xs border-purple-200 hover:border-purple-500 hover:text-purple-600 rounded-md py-3 flex items-center justify-center font-medium bg-purple-50/30 cursor-pointer"
                                    >
                                        Nhân Viên (Employee)
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* SECTION 2: OTP VERIFICATION */
                        <>
                            <div className="mb-6">
                                <Button 
                                    type="text" 
                                    icon={<ArrowLeftOutlined />} 
                                    onClick={() => setStep('login')} 
                                    className="p-0 text-gray-500 hover:text-gray-800 mb-4 flex items-center gap-1 cursor-pointer"
                                >
                                    Quay lại nhập mật khẩu
                                </Button>
                                <Title level={3} className="!font-bold !text-gray-900 mb-1">
                                    Xác Thực OTP
                                </Title>
                                <Text type="secondary" className="text-sm">
                                    Mã xác minh đã được gửi tới số điện thoại/email của <span className="font-bold text-gray-800">{tempCredentials?.username}</span>.
                                </Text>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col items-center justify-center py-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Nhập mã 6 chữ số</Text>
                                    <Input.OTP 
                                        length={6} 
                                        size="large"
                                        value={otpValue} 
                                        onChange={setOtpValue}
                                        formatter={(str) => str.replace(/\D/g, '')}
                                    />
                                    <Text type="secondary" className="text-xs mt-3 text-blue-500 font-semibold bg-blue-50/50 px-2.5 py-0.5 rounded-full">
                                        Mã thử nghiệm: 123456
                                    </Text>
                                </div>

                                <div className="text-center">
                                    {timer > 0 ? (
                                        <Text className="text-sm text-gray-500">
                                            Gửi lại mã sau <span className="font-bold text-blue-600">{timer}s</span>
                                        </Text>
                                    ) : (
                                        <Button 
                                            type="link" 
                                            onClick={handleResendOtp}
                                            className="text-sm font-semibold p-0 h-auto text-blue-600 hover:text-blue-800 cursor-pointer"
                                        >
                                            Gửi lại mã OTP
                                        </Button>
                                    )}
                                </div>

                                <Button
                                    type="primary"
                                    onClick={handleOtpSubmit}
                                    loading={submitting}
                                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-none rounded-lg font-semibold text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer"
                                >
                                    Xác Nhận & Đăng Nhập
                                </Button>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
