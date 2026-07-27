import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Check, Sparkles, ShieldCheck, Activity, Leaf, Lock, Compass, Loader2 } from "lucide-react";
import CuteStar from "./CuteStar";
import { ONBOARDING_LETTER } from "../data";

interface LandingPageProps {
  onStart: () => void;
}

const VALUE_PROPOSITIONS = [
  {
    icon: Activity,
    color: "emerald",
    badge: "Thang đo 4D",
    title: "Định Vị Chỉ Số Bản Ngã DII",
    description: "Khảo sát chuẩn tâm lý học đường giúp đo lường mức độ FOMO, kiệt sức và áp lực đồng lứa.",
    borderClass: "border-emerald-200/60 dark:border-emerald-500/20",
    bgClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Leaf,
    color: "sky",
    badge: "Thải Độc Kỹ Thuật Số",
    title: "Trút Bỏ Áp Lực Ảo",
    description: "Trạm lắng nghe, nhật ký xả stress, góc bình yên và công cụ ngắt kết nối xoa dịu tâm trí.",
    borderClass: "border-sky-200/60 dark:border-sky-500/20",
    bgClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    icon: ShieldCheck,
    color: "amber",
    badge: "Bảo Mật Ẩn Danh",
    title: "Không Gian An Toàn 100%",
    description: "Mọi dữ liệu chia sẻ đều được mã hóa ẩn danh hoàn toàn, tôn trọng tuyệt đối quyền riêng tư của cậu.",
    borderClass: "border-amber-200/60 dark:border-amber-500/20",
    bgClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function LandingPage({ onStart }: LandingPageProps) {
  const [hasConsented, setHasConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState("Đang kết nối La Bàn...");

  const handleStartApp = () => {
    if (!hasConsented || isLoading) return;
    setIsLoading(true);
    setLoadingProgress(0);
  };

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onStart();
          }, 350);
          return 100;
        }
        const step = Math.floor(Math.random() * 12 + 8);
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 160);

    return () => clearInterval(interval);
  }, [isLoading, onStart]);

  useEffect(() => {
    if (loadingProgress < 30) {
      setLoadingStepText("Đang khởi tạo không gian tĩnh lặng...");
    } else if (loadingProgress < 65) {
      setLoadingStepText("Thiết lập la bàn định vị cảm xúc...");
    } else if (loadingProgress < 90) {
      setLoadingStepText("Chuẩn bị môi trường bảo mật ẩn danh...");
    } else {
      setLoadingStepText("Mở cửa trạm dừng chân chữa lành... 💚");
    }
  }, [loadingProgress]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-10 px-4 sm:px-6 relative overflow-hidden bg-transparent">
      {/* Decorative Healing Backdrop Elements */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-emerald-100/30 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl animate-pulse" />
      <div className="absolute top-10 right-1/4 w-48 h-48 rounded-full bg-amber-100/20 blur-2xl" />

      <AnimatePresence mode="wait">
        {isLoading ? (
          /* High-craft Loading Transition Screen */
          <motion.div
            key="app-loading-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-xl bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[36px] border border-white/60 dark:border-white/10 shadow-2xl p-8 sm:p-12 text-center relative z-20 flex flex-col items-center justify-center min-h-[480px]"
          >
            {/* Glowing Mascot Portal */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" />
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                }}
                className="relative z-10 p-2 bg-white/50 dark:bg-white/10 rounded-full border border-white/40 shadow-inner inline-block"
              >
                <CuteStar size={110} />
              </motion.div>
            </div>

            {/* Loading Indicator Header */}
            <div className="space-y-2 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                Đang Tải Không Gian Chữa Lành
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
                Chào mừng cậu đến với CoreZ
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 h-5 font-medium transition-all">
                {loadingStepText}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 px-1">
                <span className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  Tiến độ định vị
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{loadingProgress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-white/10 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 rounded-full shadow-sm"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
            </div>

            {/* Reassuring Quote */}
            <p className="text-xs text-slate-400 dark:text-slate-500 italic max-w-sm font-light">
              "Thế giới ảo có thể làm cậu lạc bước, nhưng la bàn nội tâm sẽ đưa cậu về nhà." 💚
            </p>
          </motion.div>
        ) : (
          /* Standard Landing Page Content with Framer Motion Entrance */
          <motion.div
            key="app-landing-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-3xl bg-white/60 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] border border-white/50 dark:border-white/10 shadow-sm p-6 sm:p-10 relative z-10"
          >
            {/* Header Branding */}
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="p-1.5 rounded-3xl bg-white/50 dark:bg-white/10 mb-4 inline-block border border-white/40 shadow-sm"
              >
                <CuteStar size={84} />
              </motion.div>
              <span className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-100/60 dark:border-emerald-800/40 mb-2">
                Identity Compass • CoreZ
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-snug flex items-center justify-center gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-emerald-700 to-emerald-500 dark:from-slate-100 dark:to-emerald-400">
                  Trạm Định Vị Bản Ngã
                </span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md font-medium">
                Dự án nghiên cứu hành vi tâm lý & Hỗ trợ phục hồi bản ngã học đường
              </p>
            </div>

            {/* Core Value Proposition Cards - Framer Motion Staggered Entrance */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3 px-1">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  3 Cột Trụ Giá Trị Của Trạm Định Vị
                </h3>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-3.5"
              >
                {VALUE_PROPOSITIONS.map((prop, idx) => {
                  const Icon = prop.icon;
                  return (
                    <motion.div
                      key={`val-prop-${idx}`}
                      variants={cardVariants}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-4 border ${prop.borderClass} shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className={`p-2 rounded-xl ${prop.bgClass} group-hover:scale-110 transition-transform`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                            {prop.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1 leading-snug">
                          {prop.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                          {prop.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* The Open Letter Card */}
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-[24px] border border-white/40 dark:border-white/10 p-6 sm:p-8 shadow-sm mb-8 leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                {ONBOARDING_LETTER.title}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light whitespace-pre-line leading-relaxed">
                {ONBOARDING_LETTER.content}
              </div>
            </div>

            {/* Ethical Consent & Launch Area */}
            <div className="space-y-6">
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 hover:border-emerald-300/60 dark:hover:border-emerald-500/30 transition-all cursor-pointer group backdrop-blur-sm">
                <div className="relative flex items-center mt-0.5">
                  <input
                    id="consent-checkbox"
                    type="checkbox"
                    checked={hasConsented}
                    onChange={(e) => setHasConsented(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5.5 h-5.5 rounded-lg border flex items-center justify-center transition-all ${
                      hasConsented
                        ? "bg-[#34D399] border-[#34D399] text-white shadow-sm"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-slate-400"
                    }`}
                  >
                    {hasConsented && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-normal">
                  Tớ đồng ý tham gia khảo sát ẩn danh và các hoạt động trải nghiệm thực hành phục vụ nghiên cứu khoa học hành vi của dự án. Thông tin của tớ hoàn toàn được bảo mật và ẩn danh.
                </div>
              </label>

              <div className="flex flex-col items-center">
                <button
                  id="start-onboarding-btn"
                  onClick={handleStartApp}
                  disabled={!hasConsented || isLoading}
                  className={`w-full sm:w-auto sm:px-14 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                    hasConsented && !isLoading
                      ? "bg-[#34D399] hover:bg-[#20c287] text-white cursor-pointer hover:scale-[1.02] active:scale-95 shadow-emerald-200 dark:shadow-none"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
                  }`}
                >
                  <span>Bắt Đầu Định Vị</span>
                  <Compass className="w-5 h-5" />
                </button>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2.5 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  <span>Mất khoảng 2 phút • Nhẹ nhàng, chữa lành & bảo mật ẩn danh</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

