import { useEffect, useState } from 'react';
import { Card, message, Typography } from 'antd';
import { Form } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { usePermissionStore } from '../../store/permissionStore';
import { ROUTES } from '../../constants/routeNames';

// Import sub-components
import { LoginForm } from './LoginForm';
import { OtpForm } from './OtpForm';

const { Title, Text, Paragraph } = Typography;

export default function Login() {
    const [credentialsForm] = Form.useForm();
    const [otpForm] = Form.useForm();

    // Hook
    const navigate = useNavigate();
    const location = useLocation();
    const authStore = useAuthStore();
    const permissionStore = usePermissionStore();

    // state quản lý quy trình opt
    const [loginStep, setLoginStep] = useState<'credentials' | 'otp'>('credentials');
    const [submitting, setSubmitting] = useState(false);

    const [tempUser, setTempUser] = useState<string>('');
    const [countDown, setCountDown] = useState(0);

    // Hiệu ứng đếm ngược thời gian gửi mã OTP
    useEffect(() => {
        let interval: any;
        if (loginStep === 'otp' && countDown > 0) {
            interval = setInterval(() => {
                setCountDown(prev => prev - 1);
            }, 1000)
        }
        return () => clearInterval(interval);
    }, [loginStep, countDown])


    // Step 1: Validate by credentials
    const handleValidateCredentials = async (values: any) => {
        setSubmitting(true);
        try {
            const isValid = await authStore.verifyCredentials(values.username, values.password);
            if (isValid) {
                setTempUser(values.username);
                setCountDown(60);
                setLoginStep('otp');
            } else {
                message.error({ content: 'Tên đăng nhập hoặc mật khẩu không chính xác!', duration: 4 });
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại!');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    // Step 3: Validate OTP
    const handleOptFinish = async (values: any) => {
        setSubmitting(true);
        try {
            const isValid = await authStore.loginWithOTP(tempUser, values.otp);
            if (isValid) {
                // Successfully authenticated, now fetch permissions for the user role
                const userRole = authStore.user?.role;
                await permissionStore.fetchPermissions(userRole);

                message.success({
                    content: `Chào mừng trở lại, ${authStore.user?.name}!`,
                    duration: 3,
                });

                // Redirect
                navigate(from, { replace: true });
            } else {
                message.error({ content: 'Mã OTP không chính xác!', duration: 4 });
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại!');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    // Quick fill for testing
    const fillCredentials = (role: 'admin' | 'employee') => {
        if (role === 'admin') {
            credentialsForm.setFieldsValue({
                username: 'admin',
                password: 'admin123',
            });
        } else {
            credentialsForm.setFieldsValue({
                username: 'employee',
                password: 'employee123',
            });
        }
    };

    const fillOtp = () => {
        otpForm.setFieldsValue({
            otp: '123456',
        });
    };

    const handleResendOtp = () => {
        setCountDown(60);
        message.success({ content: 'Mã OTP đã được gửi lại!', duration: 3 });
    };

    const handleBackToLogin = () => {
        setLoginStep('credentials');
        credentialsForm.resetFields();
        otpForm.resetFields();
    };

    // Redirect path (if any was requested before redirecting to login)
    const from = (location.state as any)?.from?.pathname || ROUTES.HR.DASHBOARD;

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Column: Premium Branding Banner (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-blue-700 via-indigo-800 to-purple-900 text-white p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-500 opacity-20 blur-3xl">111</div>
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

            {/* Right Column: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <Card className="w-full max-w-md shadow-xl border border-gray-100 !rounded-2xl p-4 sm:p-6 bg-white">
                    <div className="text-center mb-8">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-extrabold text-lg">
                                D
                            </div>
                            <span className="font-extrabold text-xl tracking-wider text-indigo-900">DNP <span className="font-light text-gray-400">water</span></span>
                        </div>

                        {loginStep === 'credentials' ? (
                            <>
                                <Title level={3} className="!font-bold !text-gray-900 mb-1">
                                    Chào Mừng Trở Lại
                                </Title>
                                <Text type="secondary" className="text-sm">
                                    Vui lòng nhập tài khoản để truy cập hệ thống
                                </Text>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                                    <SafetyCertificateOutlined className="text-blue-600 text-2xl" />
                                </div>
                                <Title level={3} className="!font-bold !text-gray-900 mb-1">
                                    Xác Thực Hai Lớp (OTP)
                                </Title>
                                <Text type="secondary" className="text-sm block px-4">
                                    Chúng tôi đã gửi mã xác thực OTP 6 số đến tài khoản <strong className="text-gray-800">{tempUser}</strong>
                                </Text>
                            </>
                        )}
                    </div>

                    {/* Conditional Rendering of composed sub-components */}
                    {loginStep === 'credentials' ? (
                        <LoginForm
                            form={credentialsForm}
                            submitting={authStore.loading || submitting}
                            onFinish={handleValidateCredentials}
                            onQuickFill={fillCredentials}
                        />
                    ) : (
                        <OtpForm
                            form={otpForm}
                            submitting={authStore.loading || submitting}
                            countdown={countDown}
                            onFinish={handleOptFinish}
                            onResendOtp={handleResendOtp}
                            onBack={handleBackToLogin}
                            onQuickFillOtp={fillOtp}
                        />
                    )}
                </Card>
            </div>
        </div>
    );
}
