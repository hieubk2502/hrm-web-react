import { Button, Form, Input, type FormInstance } from "antd";
import { ArrowLeftOutlined, KeyOutlined } from "@ant-design/icons";
import Text from "antd/es/typography/Text";

// Định nghĩa Interface Props đầu vào cho OtpForm
interface Props {
    form: FormInstance;              // Instance của Antd Form cho OTP
    submitting: boolean;             // Trạng thái loading
    countdown: number;               // Số giây đếm ngược còn lại
    onFinish: (values: any) => Promise<void>;  // Hàm xác thực OTP
    onResendOtp: () => void;         // Hàm gửi lại OTP
    onBack: () => void;              // Hàm quay về màn hình đăng nhập
    onQuickFillOtp: () => void;      // Hàm điền nhanh OTP '123456'
}

// Khai báo Component con OtpForm sử dụng chuẩn React.FC
export const OtpForm = ({
    form,
    submitting,
    countdown,
    onFinish,
    onResendOtp,
    onBack,
    onQuickFillOtp
}: Props) => {
    return (
        <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-6"
        >
            <Form.Item
                name="otp"
                rules={[
                    { required: true, message: 'Vui lòng nhập đầy đủ mã OTP!' },
                    { len: 6, message: 'Mã OTP phải có chính xác 6 ký tự!' }
                ]}
                className="text-center"
            >
                <Input.OTP
                    length={6}
                    className="justify-center gap-2 [&_input]:h-12 [&_input]:w-11 [&_input]:text-lg [&_input]:font-bold [&_input]:rounded-lg"
                    size="large"
                    autoFocus
                />
            </Form.Item>

            <div className="flex flex-col items-center justify-center gap-3">
                {countdown > 0 ? (
                    <Text className="text-sm text-gray-500">
                        Gửi lại mã sau: <span className="font-semibold text-blue-600">{countdown}s</span>
                    </Text>
                ) : (
                    <Button
                        type="link"
                        onClick={onResendOtp}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 p-0 h-auto cursor-pointer"
                    >
                        Gửi lại mã OTP qua Email
                    </Button>
                )}

                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={onBack}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
                    disabled={submitting}
                >
                    Quay lại bước đăng nhập
                </Button>
            </div>

            <Form.Item className="pt-2">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-none rounded-lg font-semibold text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer"
                >
                    Xác Thực Đăng Nhập <KeyOutlined />
                </Button>
            </Form.Item>

            {/* Quick Fill Mock OTP */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <Text type="secondary" className="block text-xs text-center mb-3 font-medium uppercase tracking-wider text-gray-400">
                    Tính năng Hỗ Trợ Đang Phát Triển (Mock OTP)
                </Text>
                <Button
                    size="small"
                    onClick={onQuickFillOtp}
                    className="w-full text-xs border-dashed border-blue-300 hover:border-blue-500 hover:text-blue-600 rounded-md py-3 flex items-center justify-center font-medium bg-blue-50/10 cursor-pointer"
                >
                    Tự động điền mã OTP thử nghiệm (123456)
                </Button>
            </div>
        </Form>
    );
};
