import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnonymousHeader from "./components/AnonymousHeader";

const DASHBOARD_TABS = [
  "space4d",
  "self_discovery",
  "mood",
  "journaling",
  "gamification",
  "mentor",
  "gocbinhyen",
  "profile"
] as const;

type DashboardTab = typeof DASHBOARD_TABS[number];

const tabSlideVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
    y: 8,
    scale: 0.99,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -16 : 16,
    y: -6,
    scale: 0.99,
    transition: {
      duration: 0.2,
      ease: [0.7, 0, 0.84, 0],
    },
  }),
};

const TabSlideWrapper = ({
  children,
  tabKey,
  direction,
}: {
  children: React.ReactNode;
  tabKey: string;
  direction: number;
}) => (
  <motion.div
    key={`tab-content-${tabKey}`}
    custom={direction}
    variants={tabSlideVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="w-full"
  >
    {children}
  </motion.div>
);
import { 
  Compass, 
  HelpCircle, 
  Heart, 
  ShieldAlert, 
  Sparkles, 
  Info,
  Calendar,
  Activity,
  Award,
  Users,
  BookOpen,
  Mail,
  Zap,
  Sun,
  Moon,
  X,
  RotateCcw,
  User,
  Menu,
  ChevronDown
} from "lucide-react";
import LandingPage from "./components/LandingPage";
import AssessmentQuiz from "./components/AssessmentQuiz";
import PersonalProfileOnboarding from "./components/PersonalProfileOnboarding";
import Space4D from "./components/Space4D";
import FlashcardsAndAi from "./components/FlashcardsAndAi";
import MoodLogger from "./components/MoodLogger";
import SelfDiscovery from "./components/SelfDiscovery";
import Gamification from "./components/Gamification";
import Journaling from "./components/Journaling";
import Community from "./components/Community";
import GocBinhYen from "./components/GocBinhYen";
import PanicButton from "./components/PanicButton";
import SosButton from "./components/SosButton";
import CuteStar from "./components/CuteStar";
import IdentityCompassWidget from "./components/IdentityCompassWidget";
import UserProfile from "./components/UserProfile";
import SidebarMenu from "./components/SidebarMenu";
import { useUserData } from "./context/UserContext";
import { RiskLevel } from "./types";

const StarryBackground = ({ theme }: { theme: "dark-indigo" | "dark-moss" }) => {
  const [standingStars] = useState(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.8,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 4}s`,
    }))
  );

  const [driftingStars] = useState(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.2 + 1.2,
      delay: `${Math.random() * 6}s`,
      duration: `${8 + Math.random() * 8}s`,
      driftY: -(120 + Math.random() * 100),
    }))
  );

  // Tiny twinkle particles overlay (twinkle 3s infinite) with different opacities
  const [particles] = useState(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.2 + 0.5,
      opacity: Math.random() * 0.5 + 0.25,
      delay: `${Math.random() * 3}s`,
    }))
  );

  const starColorClass = theme === "dark-indigo" 
    ? "bg-sky-100 shadow-[0_0_6px_rgba(125,211,252,0.8)]" 
    : "bg-amber-100 shadow-[0_0_6px_rgba(253,230,138,0.8)]";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* 1. Standing/twinkling stars */}
      {standingStars.map((star) => (
        <div
          key={`stand-${star.id}`}
          className={`absolute rounded-full animate-twinkle ${starColorClass}`}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* 2. Tiny gentle twinkle particles (twinkle 3s infinite) */}
      {particles.map((p) => (
        <div
          key={`part-${p.id}`}
          className={`absolute rounded-full bg-white/95 shadow-[0_0_3px_rgba(255,255,255,0.7)]`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `twinkle 3s ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* 3. Drifting/flying upward stars */}
      {driftingStars.map((star) => (
        <div
          key={`drift-${star.id}`}
          className={`absolute rounded-full animate-star-drift ${starColorClass}`}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
            "--drift-y": `${star.driftY}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

// Full-screen loading splash screen with subtle CoreZ logo animation
const LoadingSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 250);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 12;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      key="loading-splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white p-6 overflow-hidden select-none"
    >
      {/* Background radial glowing gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/15 rounded-full blur-[90px] animate-pulse" />

      {/* Main CoreZ Logo & Symbol Container */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-400 p-0.5 shadow-[0_0_50px_rgba(16,185,129,0.5)] flex items-center justify-center"
        >
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-emerald-400 relative overflow-hidden">
            <Compass className="w-12 h-12 text-emerald-400 animate-spin-slow" />
            <CuteStar size={48} className="absolute inset-0 m-auto text-amber-300 opacity-60 animate-ping" />
          </div>
        </motion.div>

        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-teal-400"
          >
            CoreZ
          </motion.h1>
          <p className="text-xs text-slate-400 font-light tracking-wide uppercase font-mono">
            Kết nối giá trị • Định hình tương lai
          </p>
        </div>

        {/* Loading Progress Bar & Status text */}
        <div className="w-full space-y-2 pt-4">
          <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="flex justify-between items-center text-[10.5px] text-slate-400 font-mono">
            <span>Đang tải dữ liệu...</span>
            <span className="font-bold text-emerald-400">{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const { userData, updateDiiScore, resetAllData } = useUserData();
  const [isInitializing, setIsInitializing] = useState(true);
  const assessmentLevel = userData.diiLevel;
  const assessmentScore = userData.diiScore;

  // Views: 'landing' | 'profile_onboarding' | 'quiz' | 'main'
  const [currentView, setCurrentView] = useState<"landing" | "profile_onboarding" | "quiz" | "main">("landing");
  
  // Dashboard Tabs: 'space4d' | 'self_discovery' | 'mood' | 'journaling' | 'gamification' | 'community' | 'mentor' | 'gocbinhyen' | 'profile'
  const [activeTab, setActiveTab] = useState<DashboardTab>("space4d");
  const prevTabRef = useRef<DashboardTab>(activeTab);
  const [tabDirection, setTabDirection] = useState<number>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (newTab: DashboardTab) => {
    setIsMobileMenuOpen(false);
    if (newTab === activeTab) return;
    const prevIdx = DASHBOARD_TABS.indexOf(prevTabRef.current);
    const newIdx = DASHBOARD_TABS.indexOf(newTab);
    const dir = newIdx >= prevIdx ? 1 : -1;
    setTabDirection(dir);
    prevTabRef.current = newTab;
    setActiveTab(newTab);
  };
  
  // State for Reset Confirmation Modal
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Healing Themes: 'light' | 'dark-indigo' | 'dark-moss'
  const [theme, setTheme] = useState<"light" | "dark-indigo" | "dark-moss">("light");

  // Sync theme to document.body class list
  useEffect(() => {
    document.body.classList.remove(
      "theme-light",
      "theme-indigo",
      "theme-moss",
      "dark-theme-indigo",
      "dark-theme-moss",
      "theme-dark-indigo",
      "theme-dark-moss"
    );
    if (theme === "dark-indigo") {
      document.body.classList.add("theme-indigo", "dark-theme-indigo", "theme-dark-indigo");
    } else if (theme === "dark-moss") {
      document.body.classList.add("theme-moss", "dark-theme-moss", "theme-dark-moss");
    } else {
      document.body.classList.add("theme-light");
    }
  }, [theme]);

  // Empathetic AI Mentor Trigger state
  const [showMentorToast, setShowMentorToast] = useState(false);
  const [journalingSubTab, setJournalingSubTab] = useState<"daily" | "future">("daily");

  const checkMentorTrigger = () => {
    const logs = userData.moodLogs;
    if (logs && logs.length >= 3) {
      const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));
      const last3 = sorted.slice(0, 3);
      const negativeMoods = ["sad", "tired", "anxious"];
      const all3Low = last3.every(l => l.energyLevel <= 2 || negativeMoods.includes(l.moodId));
      if (all3Low) {
        setShowMentorToast(true);
        return;
      }
    }
    setShowMentorToast(false);
  };

  // Evaluate triggers reactively when logs change
  useEffect(() => {
    checkMentorTrigger();
  }, [userData.moodLogs]);

  // Redirect to main view if already has a DII score (onboarding completed)
  useEffect(() => {
    if (userData.diiLevel && currentView === "landing") {
      setCurrentView("main");
    }
  }, [userData.diiLevel]);

  const handleStartOnboarding = () => {
    setCurrentView("profile_onboarding");
  };

  const handleCompleteProfileOnboarding = () => {
    setCurrentView("quiz");
  };

  const handleCompleteQuiz = (level: RiskLevel, score: number) => {
    updateDiiScore(score, level);
  };

  const handleNavigateToDashboard = () => {
    setCurrentView("main");
    setActiveTab("space4d");
  };

  const handleRetakeQuiz = () => {
    setCurrentView("quiz");
  };

  // Determine outer container theme class name
  const getThemeClasses = () => {
    switch (theme) {
      case "dark-indigo":
        return "min-h-screen text-slate-100 font-sans antialiased selection:bg-indigo-900 selection:text-indigo-100 transition-colors duration-500 pb-16 relative overflow-hidden dark-theme-indigo theme-indigo";
      case "dark-moss":
        return "min-h-screen text-slate-100 font-sans antialiased selection:bg-emerald-950 selection:text-emerald-100 transition-colors duration-500 pb-16 relative overflow-hidden dark-theme-moss theme-moss";
      default:
        return "min-h-screen bg-[#F8FAFC] text-[#334155] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-500 pb-16 relative overflow-hidden theme-light";
    }
  };

  return (
    <div id="app-root" key={theme} className={getThemeClasses()}>
      {/* Nút Hamburger Menu 3 gạch cố định ở góc trái */}
      <SidebarMenu 
        activeTab={activeTab} 
        onSelectTab={(tabId) => {
          if (currentView !== "main") {
            setCurrentView("main");
          }
          handleTabChange(tabId as DashboardTab);
        }} 
      />

      {/* CSS overrides for dark-indigo & dark-moss therapeutic modes */}
      <style>{`
        /* Deep Dark Indigo (Đất Trầm / Tối Tràm) overrides - Brightened & Luminous Glass Cards */
        .dark-theme-indigo {
          --bg-dark-earth: #1b1714;
          --surface-earth: rgba(255, 255, 255, 0.13);
          --text-primary-earth: #FFFFFF;
          --text-secondary-earth: #F1F5F9;
          --accent-earth: #FBBF24;
          --border-earth: rgba(255, 255, 255, 0.22);

          --bg-color: var(--bg-dark-earth);
          --card-bg: var(--surface-earth);
          --card-border: var(--border-earth);
          --text-main: var(--text-primary-earth);
          --text-sub: var(--text-secondary-earth);
          --accent-color: var(--accent-earth);

          background: var(--bg-dark-earth) !important;
          color: var(--text-primary-earth) !important;
          text-rendering: optimizeLegibility !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }

        /* Deep Dark Moss Green (Sương Rêu / Tối Rêu) overrides - Brightened & Luminous Glass Cards */
        .dark-theme-moss {
          --bg-dark-moss: #111e15;
          --surface-moss: rgba(255, 255, 255, 0.13);
          --text-primary-moss: #FFFFFF;
          --text-secondary-moss: #F1F5F9;
          --accent-moss: #34D399;
          --border-moss: rgba(255, 255, 255, 0.22);

          --bg-color: var(--bg-dark-moss);
          --card-bg: var(--surface-moss);
          --card-border: var(--border-moss);
          --text-main: var(--text-primary-moss);
          --text-sub: var(--text-secondary-moss);
          --accent-color: var(--accent-moss);

          background: var(--bg-dark-moss) !important;
          color: var(--text-primary-moss) !important;
          text-rendering: optimizeLegibility !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }

        /* Glassmorphism card & button overrides using CSS variables */
        .dark-theme-indigo .bg-white:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/40:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/50:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/60:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/65:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-indigo .bg-white\\/70:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/75:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/80:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/85:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/90:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-white\\/95:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-amber-50\\/90:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .card:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo .bg-slate-50:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo button:not(.no-dark-override):not(.bg-gradient-to-r),
        .dark-theme-moss .bg-white:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/40:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/50:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/60:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/65:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-moss .bg-white\\/70:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/75:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/80:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/85:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/90:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-white\\/95:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-amber-50\\/90:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .card:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss .bg-slate-50:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss button:not(.no-dark-override):not(.bg-gradient-to-r) {
          background: rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(14px) saturate(160%) !important;
          -webkit-backdrop-filter: blur(14px) saturate(160%) !important;
          border: 1px solid rgba(255, 255, 255, 0.22) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          transform: translate3d(0, 0, 0) !important;
        }

        /* Sticky Navigation Bar Container Styles */
        .sticky-nav-container {
          background: rgba(255, 255, 255, 0.88) !important;
          backdrop-filter: blur(16px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
        }

        .dark-theme-indigo .sticky-nav-container {
          background: rgba(28, 22, 18, 0.92) !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45) !important;
        }

        .dark-theme-moss .sticky-nav-container {
          background: rgba(18, 30, 22, 0.92) !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45) !important;
        }

        /* Active active tab button glassmorphism override */
        .dark-theme-indigo .bg-white\\/85,
        .dark-theme-moss .bg-white\\/85 {
          background: rgba(255, 255, 255, 0.15) !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
        }

        /* Typography optimizations for dark mode to ensure absolute clarity and zero blur */
        .dark-theme-indigo p:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-indigo span:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo div:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-indigo h1:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-indigo h2:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-indigo h3:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-indigo h4:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo h5:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo label:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo li:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-indigo strong:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss p:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-moss span:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss div:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-moss h1:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-moss h2:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-moss h3:not(.no-dark-override):not(.no-dark-override *), 
        .dark-theme-moss h4:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss h5:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss label:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss li:not(.no-dark-override):not(.no-dark-override *),
        .dark-theme-moss strong:not(.no-dark-override):not(.no-dark-override *) {
          color: var(--text-main) !important;
          text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4) !important;
          text-rendering: optimizeLegibility !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          transform: translate3d(0, 0, 0) !important;
        }

        /* Bold elements for maximum punch and crispness in cards */
        .dark-theme-indigo h1,
        .dark-theme-indigo h2,
        .dark-theme-indigo h3,
        .dark-theme-indigo h4,
        .dark-theme-indigo h5,
        .dark-theme-indigo strong,
        .dark-theme-indigo .font-bold,
        .dark-theme-indigo .font-extrabold,
        .dark-theme-indigo .font-semibold,
        .dark-theme-moss h1,
        .dark-theme-moss h2,
        .dark-theme-moss h3,
        .dark-theme-moss h4,
        .dark-theme-moss h5,
        .dark-theme-moss strong,
        .dark-theme-moss .font-bold,
        .dark-theme-moss .font-extrabold,
        .dark-theme-moss .font-semibold {
          font-weight: 700 !important;
          color: var(--text-main) !important;
          text-shadow: 0px 1px 6px rgba(0, 0, 0, 0.5) !important;
        }

        /* Text color overrides for primary and secondary hierarchies */
        .dark-theme-indigo .text-slate-900,
        .dark-theme-indigo .text-slate-800,
        .dark-theme-indigo .text-slate-700,
        .dark-theme-moss .text-slate-900,
        .dark-theme-moss .text-slate-800,
        .dark-theme-moss .text-slate-700 {
          color: var(--text-main) !important;
        }

        .dark-theme-indigo .text-slate-600,
        .dark-theme-indigo .text-slate-500,
        .dark-theme-indigo .text-slate-400,
        .dark-theme-moss .text-slate-600,
        .dark-theme-moss .text-slate-500,
        .dark-theme-moss .text-slate-400 {
          color: var(--text-sub) !important;
        }

        /* Image filter to reduce glare and increase deep contrast */
        .dark-theme-indigo img,
        .dark-theme-moss img {
          filter: brightness(0.8) contrast(1.1) !important;
          border-radius: 12px !important;
        }

        .dark-theme-indigo svg,
        .dark-theme-moss svg {
          filter: brightness(1.05) contrast(1.05) !important;
        }

        .dark-theme-indigo input,
        .dark-theme-indigo textarea,
        .dark-theme-indigo select,
        .dark-theme-moss input,
        .dark-theme-moss textarea,
        .dark-theme-moss select {
          background-color: var(--bg-color) !important;
          border-color: var(--card-border) !important;
          color: var(--text-main) !important;
        }

        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50% { opacity: 0.95; transform: scale(1.15); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes starryDriftUp {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(var(--drift-y, -150px)) scale(1.3);
            opacity: 0;
          }
        }
        .animate-star-drift {
          animation: starryDriftUp 10s linear infinite;
        }
      `}</style>

      {/* Dynamic Glowing Backdrops for Frosted Glass Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {theme === "light" && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7DD3FC] opacity-20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#34D399] opacity-15 blur-[120px] rounded-full"></div>
            <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-amber-200/10 blur-[90px] rounded-full"></div>
          </>
        )}
        {theme === "dark-indigo" && (
          <>
            {/* Left side cosmic purples / blues as shown in user's image */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4338ca] opacity-40 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#6d28d9] opacity-35 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
            <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-[#db2777] opacity-20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '10s' }}></div>
            <StarryBackground theme="dark-indigo" />
          </>
        )}
        {theme === "dark-moss" && (
          <>
            {/* Right side serene deep moss greens as shown in user's image */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#064e3b] opacity-45 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#022c22] opacity-45 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
            <div className="absolute top-[30%] left-[25%] w-[500px] h-[500px] bg-[#10b981] opacity-25 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '10s' }}></div>
            <StarryBackground theme="dark-moss" />
          </>
        )}
      </div>

      {/* Loading Splash Screen */}
      <AnimatePresence>
        {isInitializing && (
          <LoadingSplashScreen onFinish={() => setIsInitializing(false)} />
        )}
      </AnimatePresence>

      {/* 2. Global Floating SOS Hotline (Bottom-Right) */}
      <SosButton />

      {/* View Switcher Container */}
      <AnimatePresence mode="wait">
        
        {/* VIEW A: LANDING PAGE */}
        {currentView === "landing" && (
          <motion.div
            key="view-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <LandingPage onStart={handleStartOnboarding} />
          </motion.div>
        )}

        {/* VIEW A.2: PROFILE ONBOARDING */}
        {currentView === "profile_onboarding" && (
          <motion.div
            key="view-profile-onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <PersonalProfileOnboarding onComplete={handleCompleteProfileOnboarding} />
          </motion.div>
        )}

        {/* VIEW B: ASSESSMENT QUIZ */}
        {currentView === "quiz" && (
          <motion.div
            key="view-quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <AssessmentQuiz 
              onComplete={handleCompleteQuiz} 
              onNavigateToDashboard={handleNavigateToDashboard} 
            />
          </motion.div>
        )}

        {/* VIEW C: FULL DASHBOARD */}
        {currentView === "main" && (
          <>
            <AnonymousHeader />
            <motion.div
              key="view-main"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-5xl mx-auto px-4 pt-6 relative z-10"
            >
            {/* Empathetic AI Mentor Toast Trigger Notification */}
            <AnimatePresence>
              {showMentorToast && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="mb-6 p-4 rounded-3xl bg-amber-50/90 dark:bg-slate-900/90 backdrop-blur-md border border-amber-200/50 dark:border-white/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300 animate-bounce">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider font-mono">AI Mentor Thấu Cảm</p>
                      <p className="text-sm text-slate-700 dark:text-slate-100 font-medium leading-relaxed mt-0.5">
                        "Tớ thấy dạo này cậu có vẻ mệt. Cậu có muốn chúng mình cùng viết một Bức thư gửi tương lai để trút bỏ gánh nặng này không?"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        // Deep link navigation to Time Capsules
                        setJournalingSubTab("future");
                        handleTabChange("journaling");
                        setShowMentorToast(false);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      Viết thư gửi tương lai ✉️
                    </button>
                    <button
                      onClick={() => setShowMentorToast(false)}
                      className="p-2 hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Header / Brand Nav */}
            <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/40 pb-6 mb-8 text-center sm:text-left bg-white/40 backdrop-blur-md rounded-2xl p-4 border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/60 backdrop-blur-md text-emerald-500 border border-white/40 shadow-sm animate-float">
                  <Compass className="w-6.5 h-6.5" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center sm:justify-start gap-2 leading-tight">
                    <CuteStar size={36} className="shrink-0 animate-float" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-emerald-800 to-emerald-500">
                      CoreZ - Kết nối giá trị, định hình tương lai
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium italic mt-1 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
                    <span>Trạm Định Vị Bản Ngã Cho Gen Z</span>
                    <span className="text-slate-300 dark:text-slate-500">•</span>
                    <span className="text-emerald-500 dark:text-emerald-400 font-semibold not-italic">Identity Compass</span>
                  </p>
                </div>
              </div>

              {/* Theme Toggle & Psychological Indicators & Reset */}
              <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end">
                {/* Advanced Theme Selectors */}
                <div className="flex items-center bg-slate-500/10 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-md gap-1">
                  <button
                    onClick={() => setTheme("light")}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer font-sans select-none ${
                      theme === "light"
                        ? "bg-white text-slate-700 shadow-sm font-bold"
                        : "text-slate-400 hover:text-slate-300"
                    }`}
                    title="Giao diện Sáng"
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Sáng</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark-indigo")}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer font-sans select-none ${
                      theme === "dark-indigo"
                        ? "bg-indigo-950/70 text-indigo-200 shadow-md font-bold border border-indigo-500/40"
                        : "text-indigo-300/80 hover:text-indigo-200"
                    }`}
                    title="Giao diện Đất Trầm Dịu Mắt"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[11px]">Đất Trầm</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark-moss")}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer font-sans select-none ${
                      theme === "dark-moss"
                        ? "bg-emerald-950/70 text-emerald-200 shadow-md font-bold border border-emerald-500/40"
                        : "text-emerald-300/80 hover:text-emerald-200"
                    }`}
                    title="Giao diện Sương Rêu Trầm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px]">Sương Rêu</span>
                  </button>
                </div>

                {/* Reset Game State Button */}
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="p-1.5 rounded-2xl bg-rose-50/90 hover:bg-rose-100 text-rose-500 hover:text-rose-600 border border-rose-100 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer text-xs font-semibold no-dark-override"
                  title="Xóa dữ liệu (Reset) và bắt đầu lại từ đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden md:inline">Đặt lại dữ liệu</span>
                </button>

                {assessmentLevel && (
                  <div className="flex items-center gap-2.5 bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-4 py-2 shadow-sm">
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-mono leading-none">Chỉ số bản ngã</p>
                      <p className="text-xs font-bold text-slate-700 mt-1 leading-none">
                      {assessmentLevel === "GREEN" && "An toàn 🌱"}
                      {assessmentLevel === "YELLOW" && "Cảnh báo nhẹ ⚠️"}
                      {assessmentLevel === "ORANGE" && "Báo động 🚨"}
                      {assessmentLevel === "RED" && "Nghiêm trọng 🛑"}
                    </p>
                  </div>
                  <button
                    onClick={handleRetakeQuiz}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/50 transition-colors"
                    title="Đo lường lại chỉ số sức khỏe tinh thần"
                  >
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              )}
              </div>
            </header>

            {/* Navigation Tabs (Primary Level - 7 CoreZ Pillars) - STICKY FLOATING NAV HEADER */}
            <div className="sticky-nav-container sticky top-2 sm:top-3 z-50 transition-all duration-300 ease-in-out border border-white/50 dark:border-white/20 mb-8 bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl p-2 rounded-2xl max-w-4xl mx-auto shadow-xl">
              
              {/* Desktop Nav View (sm and larger) */}
              <nav className="hidden sm:flex gap-1.5 flex-wrap justify-center items-center w-full">
                
                {/* Tab 1: Không Gian Thực Hành 4D */}
                <button
                  id="tab-space4d"
                  onClick={() => handleTabChange("space4d")}
                  className={`py-2 px-3 text-[11px] sm:text-xs font-extrabold transition-all relative rounded-xl cursor-pointer ${
                    activeTab === "space4d"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {activeTab === "space4d" && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-emerald-500 ring-2 ring-emerald-400/50"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <Compass className="w-3.5 h-3.5 text-emerald-500 animate-spin-slow" />
                    Không Gian 4D
                  </span>
                </button>

                {/* Tab 2: Trắc Nghiệm Bản Ngã */}
                <button
                  id="tab-self-discovery"
                  onClick={() => handleTabChange("self_discovery")}
                  className={`py-2 px-3 text-[11px] sm:text-xs font-extrabold transition-all relative rounded-xl cursor-pointer ${
                    activeTab === "self_discovery"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {activeTab === "self_discovery" && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-emerald-500 ring-2 ring-emerald-400/50"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <Zap className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                    Trắc Nghiệm Bản Ngã
                  </span>
                </button>

                {/* Tab 3: Nhật Ký Cảm Xúc (Mood Log) */}
                <button
                  id="tab-mood"
                  onClick={() => handleTabChange("mood")}
                  className={`py-2 px-3 text-[11px] sm:text-xs font-extrabold transition-all relative rounded-xl cursor-pointer ${
                    activeTab === "mood"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {activeTab === "mood" && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-emerald-500 ring-2 ring-emerald-400/50"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    Nhật Ký Cảm Xúc
                  </span>
                </button>

                {/* Tab 4: Góc Phản Tư (Journaling) */}
                <button
                  id="tab-journaling"
                  onClick={() => {
                    setJournalingSubTab("daily");
                    handleTabChange("journaling");
                  }}
                  className={`py-2 px-3 text-[11px] sm:text-xs font-extrabold transition-all relative rounded-xl cursor-pointer ${
                    activeTab === "journaling"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {activeTab === "journaling" && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-emerald-500 ring-2 ring-emerald-400/50"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    Góc Phản Tư
                  </span>
                </button>

                {/* Tab 5: Kỷ Luật CoreZ (Gamification) */}
                <button
                  id="tab-gamification"
                  onClick={() => handleTabChange("gamification")}
                  className={`py-2 px-3 text-[11px] sm:text-xs font-extrabold transition-all relative rounded-xl cursor-pointer ${
                    activeTab === "gamification"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {activeTab === "gamification" && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-emerald-500 ring-2 ring-emerald-400/50"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <Award className="w-3.5 h-3.5 text-emerald-500 animate-float" />
                    Kỷ Luật CoreZ
                  </span>
                </button>

                {/* Tab 6: Bí Kíp & AI Mentor */}
                <button
                  id="tab-mentor"
                  onClick={() => handleTabChange("mentor")}
                  className={`py-2 px-3 text-[11px] sm:text-xs font-extrabold transition-all relative rounded-xl cursor-pointer ${
                    activeTab === "mentor"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {activeTab === "mentor" && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-emerald-500 ring-2 ring-emerald-400/50"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <Heart className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                    AI Mentor & Bí Kíp
                  </span>
                </button>

                {/* Tab 8: Góc Bình Yên */}
                <button
                  id="tab-gocbinhyen"
                  onClick={() => handleTabChange("gocbinhyen")}
                  className={`py-2 px-3 text-[11px] sm:text-xs font-extrabold transition-all relative rounded-xl cursor-pointer ${
                    activeTab === "gocbinhyen"
                      ? "text-rose-700 dark:text-rose-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {activeTab === "gocbinhyen" && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-rose-500 ring-2 ring-rose-400/50"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10 animate-pulse" />
                    Góc Bình Yên
                  </span>
                </button>

                {/* Tab 9: Hồ sơ Cá nhân */}
                <button
                  id="tab-profile"
                  onClick={() => handleTabChange("profile")}
                  className={`py-2 px-3 text-[11px] sm:text-xs font-extrabold transition-all relative rounded-xl cursor-pointer ${
                    activeTab === "profile"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  {activeTab === "profile" && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border-2 border-emerald-500 ring-2 ring-emerald-400/50"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <User className="w-3.5 h-3.5 text-emerald-500" />
                    Hồ sơ Cá nhân
                  </span>
                </button>

              </nav>

              {/* Mobile Floating Dropdown Navigation Bar */}
              <div className="sm:hidden flex flex-col w-full relative">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-slate-800/80 font-bold text-xs text-slate-800 dark:text-slate-100 shadow-sm border border-white/50 dark:border-slate-700 cursor-pointer active:scale-98 transition-all"
                  aria-label="Mở mục lục điều hướng"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                      {activeTab === "space4d" && <Compass className="w-4 h-4 animate-spin-slow text-emerald-500" />}
                      {activeTab === "self_discovery" && <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />}
                      {activeTab === "mood" && <Activity className="w-4 h-4 text-emerald-500" />}
                      {activeTab === "journaling" && <BookOpen className="w-4 h-4 text-emerald-500" />}
                      {activeTab === "gamification" && <Award className="w-4 h-4 text-emerald-500" />}
                      {activeTab === "mentor" && <Heart className="w-4 h-4 text-emerald-500" />}
                      {activeTab === "gocbinhyen" && <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />}
                      {activeTab === "profile" && <User className="w-4 h-4 text-emerald-500" />}
                    </span>
                    <span className="font-extrabold tracking-wide truncate">
                      {activeTab === "space4d" && "Không Gian 4D"}
                      {activeTab === "self_discovery" && "Trắc Nghiệm Bản Ngã"}
                      {activeTab === "mood" && "Nhật Ký Cảm Xúc"}
                      {activeTab === "journaling" && "Góc Phản Tư"}
                      {activeTab === "gamification" && "Kỷ Luật CoreZ"}
                      {activeTab === "mentor" && "AI Mentor & Bí Kíp"}
                      {activeTab === "gocbinhyen" && "Góc Bình Yên"}
                      {activeTab === "profile" && "Hồ Sơ & Thống Kê"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 shrink-0 ml-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Mục lục</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 mt-2 p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/50 dark:border-slate-700/80 rounded-2xl shadow-2xl z-50 flex flex-col gap-1 overflow-hidden"
                    >
                      <button
                        onClick={() => handleTabChange("space4d")}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeTab === "space4d"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Compass className="w-4 h-4 text-emerald-500 animate-spin-slow" />
                        <span>Không Gian Thực Hành 4D</span>
                      </button>

                      <button
                        onClick={() => handleTabChange("self_discovery")}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeTab === "self_discovery"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <span>Trắc Nghiệm Bản Ngã</span>
                      </button>

                      <button
                        onClick={() => handleTabChange("mood")}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeTab === "mood"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span>Nhật Ký Cảm Xúc</span>
                      </button>

                      <button
                        onClick={() => {
                          setJournalingSubTab("daily");
                          handleTabChange("journaling");
                        }}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeTab === "journaling"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        <span>Góc Phản Tư</span>
                      </button>

                      <button
                        onClick={() => handleTabChange("gamification")}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeTab === "gamification"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Award className="w-4 h-4 text-emerald-500 animate-float" />
                        <span>Kỷ Luật CoreZ</span>
                      </button>

                      <button
                        onClick={() => handleTabChange("mentor")}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeTab === "mentor"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Heart className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <span>AI Mentor & Bí Kíp</span>
                      </button>

                      <button
                        onClick={() => handleTabChange("gocbinhyen")}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeTab === "gocbinhyen"
                            ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 font-extrabold border border-rose-500/30"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20 animate-pulse" />
                        <span>Góc Bình Yên</span>
                      </button>

                      <button
                        onClick={() => handleTabChange("profile")}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          activeTab === "profile"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <User className="w-4 h-4 text-emerald-500" />
                        <span>Hồ Sơ & Thống Kê</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Inner Tabs View Render */}
            <main className="py-2 relative overflow-hidden">
              {/* Soft decorative blurred stars on left/right edges to float around the section headings and content */}
              <div className="absolute top-[-40px] left-[-30px] pointer-events-none z-0 select-none opacity-40 animate-float" style={{ animationDuration: "6s" }}>
                <CuteStar variant="blur" size={120} showSurroundings={false} />
              </div>
              <div className="absolute top-[160px] right-[-40px] pointer-events-none z-0 select-none opacity-30 animate-float" style={{ animationDuration: "8s", animationDelay: "1s" }}>
                <CuteStar variant="blur" size={90} showSurroundings={false} />
              </div>
              <div className="absolute bottom-[20px] left-[15%] pointer-events-none z-0 select-none opacity-25 animate-float" style={{ animationDuration: "7s", animationDelay: "2s" }}>
                <CuteStar variant="blur" size={80} showSurroundings={false} />
              </div>

              <AnimatePresence mode="wait" custom={tabDirection}>
                {activeTab === "space4d" && (
                  <TabSlideWrapper tabKey="space4d" direction={tabDirection}>
                    <Space4D />
                  </TabSlideWrapper>
                )}
                {activeTab === "self_discovery" && (
                  <TabSlideWrapper tabKey="self-discovery" direction={tabDirection}>
                    <SelfDiscovery />
                  </TabSlideWrapper>
                )}
                {activeTab === "mentor" && (
                  <TabSlideWrapper tabKey="mentor" direction={tabDirection}>
                    <FlashcardsAndAi />
                  </TabSlideWrapper>
                )}
                {activeTab === "mood" && (
                  <TabSlideWrapper tabKey="mood" direction={tabDirection}>
                    <MoodLogger />
                  </TabSlideWrapper>
                )}
                {activeTab === "journaling" && (
                  <TabSlideWrapper tabKey="journaling" direction={tabDirection}>
                    <Journaling initialTab={journalingSubTab} />
                  </TabSlideWrapper>
                )}
                {activeTab === "gamification" && (
                  <TabSlideWrapper tabKey="gamification" direction={tabDirection}>
                    <Gamification />
                  </TabSlideWrapper>
                )}
                {activeTab === "gocbinhyen" && (
                  <TabSlideWrapper tabKey="gocbinhyen" direction={tabDirection}>
                    <GocBinhYen />
                  </TabSlideWrapper>
                )}
                {activeTab === "profile" && (
                  <TabSlideWrapper tabKey="profile" direction={tabDirection}>
                    <UserProfile />
                  </TabSlideWrapper>
                )}
              </AnimatePresence>
            </main>

            {/* Aesthetic Footer */}
            <footer className="text-center text-[11px] text-slate-400/80 mt-12 space-y-1 font-light tracking-wide">
              <p>© 2026 Trạm Định Vị Bản Ngã Cho Gen Z (Identity Compass) • Nghiên cứu hành vi học đường Việt Nam</p>
              <p>Phòng Nghiên cứu Tâm lí học Ứng dụng&Phát triển Hành vi Xứ Lạng</p>
            </footer>
          </motion.div>
        </>
        )}

      </AnimatePresence>

      {/* 5. Glowing Interactive Identity Compass Widget */}
      {currentView === "main" && (
        <IdentityCompassWidget assessmentLevel={assessmentLevel} onNavigate={(tab) => handleTabChange(tab as DashboardTab)} />
      )}

      {/* 4. Beautiful Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div 
            onClick={() => setShowResetConfirm(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-[100] flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-sm bg-white border border-slate-100 rounded-[28px] p-6 shadow-2xl relative overflow-hidden text-slate-800 no-dark-override cursor-default"
            >
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-20%] w-48 h-48 bg-rose-200/20 blur-2xl rounded-full" />
              </div>

              <div className="relative z-10 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <div className="p-2 bg-rose-50 text-rose-500 rounded-xl">
                  <RotateCcw className="w-5 h-5 animate-spin-slow" />
                </div>
                <h4 className="font-serif text-sm font-bold text-slate-800">Đặt lại Dữ liệu cá nhân</h4>
              </div>

              <p className="relative z-10 text-xs text-slate-500 leading-relaxed mb-5">
                Hành động này sẽ xóa hoàn toàn điểm đo lường DII, điểm tích lũy karmaXP, nhật ký cảm xúc, số phút thải độc số và tiến trình phát triển của Cây bản địa. Cậu có chắc muốn làm lại từ đầu?
              </p>

              <div className="relative z-10 flex gap-2.5 w-full">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  onClick={() => {
                    resetAllData();
                    setTheme("light");
                    setCurrentView("landing");
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Đặt lại ngay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
