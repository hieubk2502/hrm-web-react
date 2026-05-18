export default function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
            <div className="flex items-center gap-16">
                <div>
                    <h1 className="text-[42px] text-gray-700 font-medium tracking-tight mb-1">XIN CHÀO,</h1>
                    <h2 className="text-[42px] text-[#0052cc] font-bold">Trần Minh Hiếu</h2>
                </div>
                <div>
                    {/* Welcome Image Placeholder using CSS */}
                    <div
                        className="w-[600px] h-[350px] bg-[#f0f7ff] rounded-2xl flex items-center justify-center text-[#0052cc] font-black text-7xl border-4 border-dashed border-[#bae0ff] relative overflow-hidden">
                        <span
                            className="absolute transform -rotate-12 opacity-50 text-[120px] left-10 text-blue-200">WELCOME</span>
                        <span
                            className="z-10 bg-white/80 px-8 py-4 rounded-xl shadow-sm backdrop-blur-sm">WELCOME</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
