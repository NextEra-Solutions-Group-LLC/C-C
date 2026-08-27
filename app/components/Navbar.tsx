"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Hind_Siliguri } from "next/font/google";
import {
    User,
    Calendar,
    X,
    Info,
    Mail,
    Loader2,
    CheckCircle2,
    ArrowLeft,
    MapPin,
    Phone,
    ChevronLeft,
    ChevronRight,
    CalendarCheck2,
} from "lucide-react";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

// Blog is now last, and points to the external blog subdomain
const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "ServiceArea", href: "/serviceArea" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Showcase", href: "/counterTop" },
    { label: "Blog", href: "https://blog-candc.vercel.app", external: true },
];

// Digital supports credits shown on the left of the topbar
const DIGITAL_SUPPORT_LINKS = [
    { label: "EraHub.app", href: "https://erahub.app" },
    { label: "EraKit.us", href: "https://erakit.us" },
    { label: "EraSync.us", href: "https://erasync.us" },
];

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_LABELS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

// How many years ahead appointments can be booked
const BOOKING_WINDOW_YEARS = 30;

function stripTime(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // ----- Estimate Modal & OTP States -----
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [step, setStep] = useState<"form" | "otp" | "success">("form");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
    });

    const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    // ----- Book an Appointment Modal States -----
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isBookingLoading, setIsBookingLoading] = useState(false);
    const [bookingStep, setBookingStep] = useState<"calendar" | "form" | "success">("calendar");
    const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

    const today = useMemo(() => stripTime(new Date()), []);
    const minBookableDate = useMemo(() => {
        const d = new Date(today);
        d.setDate(d.getDate() + 1);
        return d;
    }, [today]);
    const maxBookableDate = useMemo(() => {
        const d = new Date(today);
        d.setFullYear(d.getFullYear() + BOOKING_WINDOW_YEARS);
        return d;
    }, [today]);

    const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [bookingFormData, setBookingFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
    });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ================= ESTIMATE MODAL HANDLERS =================

    const handleOpenEstimateModal = () => {
        setMobileOpen(false);
        setIsLoadingModal(true);
        setIsModalOpen(true);

        setTimeout(() => {
            setIsLoadingModal(false);
        }, 700);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setStep("form");
            setIsLoadingModal(false);
            setFormData({ name: "", address: "", phone: "", email: "" });
            setOtpValues(["", "", "", "", "", ""]);
        }, 300);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOtpChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const newValues = [...otpValues];
        newValues[index] = value.substring(value.length - 1);
        setOtpValues(newValues);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (!otpValues[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            } else {
                const newValues = [...otpValues];
                newValues[index] = "";
                setOtpValues(newValues);
            }
        }
    };

    const handleSendOTP = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setStep("otp");
        }, 1200);
    };

    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setStep("success");
        }, 1200);
    };

    // ================= BOOK AN APPOINTMENT MODAL HANDLERS =================

    const handleOpenBookingModal = () => {
        setMobileOpen(false);
        setIsBookingLoading(true);
        setIsBookingOpen(true);
        setViewMonth(new Date(today.getFullYear(), today.getMonth(), 1));

        setTimeout(() => {
            setIsBookingLoading(false);
        }, 700);
    };

    const handleCloseBookingModal = () => {
        setIsBookingOpen(false);
        setTimeout(() => {
            setBookingStep("calendar");
            setIsBookingLoading(false);
            setSelectedDate(null);
            setBookingFormData({ name: "", phone: "", email: "", address: "", notes: "" });
        }, 300);
    };

    const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBookingFormData({ ...bookingFormData, [e.target.name]: e.target.value });
    };

    const goToPrevMonth = () => {
        setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const isDateSelectable = (date: Date) => {
        return date >= minBookableDate && date <= maxBookableDate;
    };

    const handleSelectDate = (date: Date) => {
        if (!isDateSelectable(date)) return;
        setSelectedDate(date);
        setBookingStep("form");
    };

    const handleBackToCalendar = () => {
        setBookingStep("calendar");
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsBookingSubmitting(true);

        setTimeout(() => {
            setIsBookingSubmitting(false);
            setBookingStep("success");
        }, 1200);
    };

    // Build the calendar grid (leading blanks + all days in viewMonth)
    const calendarCells = useMemo(() => {
        const year = viewMonth.getFullYear();
        const month = viewMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const leadingBlanks = firstDay.getDay();

        const cells: Array<{ date: Date | null }> = [];
        for (let i = 0; i < leadingBlanks; i++) {
            cells.push({ date: null });
        }
        for (let day = 1; day <= daysInMonth; day++) {
            cells.push({ date: new Date(year, month, day) });
        }
        return cells;
    }, [viewMonth]);

    const yearOptions = useMemo(() => {
        const years: number[] = [];
        for (let y = minBookableDate.getFullYear(); y <= maxBookableDate.getFullYear(); y++) {
            years.push(y);
        }
        return years;
    }, [minBookableDate, maxBookableDate]);

    const handleJumpToYear = (year: number) => {
        setViewMonth((prev) => {
            let month = prev.getMonth();
            // Clamp into the bookable range if the resulting month/year falls outside it
            let candidate = new Date(year, month, 1);
            if (candidate < new Date(minBookableDate.getFullYear(), minBookableDate.getMonth(), 1)) {
                candidate = new Date(minBookableDate.getFullYear(), minBookableDate.getMonth(), 1);
            }
            if (candidate > new Date(maxBookableDate.getFullYear(), maxBookableDate.getMonth(), 1)) {
                candidate = new Date(maxBookableDate.getFullYear(), maxBookableDate.getMonth(), 1);
            }
            return candidate;
        });
    };

    const handleJumpToMonth = (monthIndex: number) => {
        setViewMonth((prev) => {
            let candidate = new Date(prev.getFullYear(), monthIndex, 1);
            if (candidate < new Date(minBookableDate.getFullYear(), minBookableDate.getMonth(), 1)) {
                candidate = new Date(minBookableDate.getFullYear(), minBookableDate.getMonth(), 1);
            }
            if (candidate > new Date(maxBookableDate.getFullYear(), maxBookableDate.getMonth(), 1)) {
                candidate = new Date(maxBookableDate.getFullYear(), maxBookableDate.getMonth(), 1);
            }
            return candidate;
        });
    };

    const canGoPrevMonth = useMemo(() => {
        const lastDayOfPrevViewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 0);
        return lastDayOfPrevViewMonth >= minBookableDate;
    }, [viewMonth, minBookableDate]);

    const canGoNextMonth = useMemo(() => {
        const firstDayOfNextViewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
        return firstDayOfNextViewMonth <= maxBookableDate;
    }, [viewMonth, maxBookableDate]);

    const formattedSelectedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    return (
        <>
            <motion.header
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] fixed top-0 left-0 z-50 w-full transition-all duration-300 bg-white shadow-md`}
            >
                {/* Subnav / Topbar */}
                <div className="border-b border-slate-100 bg-white text-slate-800 text-xs py-2 px-6 lg:px-10">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4">
                        {/* LEFT: Digital supports credit */}
                        <div className="flex flex-wrap items-center justify-center gap-1.5 whitespace-nowrap text-[11px] text-slate-500 md:justify-start">
                            <span className="font-medium">All Digital Supports by:</span>
                            {DIGITAL_SUPPORT_LINKS.map((item, idx) => (
                                <span key={item.label} className="flex items-center gap-1.5">
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-slate-700 transition-colors hover:text-blue-600"
                                    >
                                        {item.label}
                                    </a>
                                    {idx < DIGITAL_SUPPORT_LINKS.length - 1 && (
                                        <span className="text-slate-300">|</span>
                                    )}
                                </span>
                            ))}
                        </div>

                        {/* CENTER: Location */}
                        <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700">
                            <MapPin className="h-3.5 w-3.5 text-blue-600" />
                            TX, USA
                        </div>

                        {/* RIGHT: Phone (two sizes) + Email */}
                        <div className="flex items-center justify-center gap-4 md:justify-end">
                            <a href="tel:2602263242" className="group flex items-center gap-2">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
                                </span>
                                <span className="flex flex-col leading-none">
                                    <span className="font-bold tracking-wide text-slate-700 transition-colors group-hover:text-blue-600">
                                        (260) CANDC GC
                                    </span>
                                    <span className="mt-1 text-[9px] font-medium tracking-wide text-slate-400">
                                        (260) 226 3242
                                    </span>
                                </span>
                            </a>

                            <span className="hidden h-6 w-px bg-slate-200 sm:block" />

                            <a href="/contact" aria-label="Email us" className="group flex items-center gap-2">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <Mail className="h-3.5 w-3.5" strokeWidth={2.5} />
                                </span>
                                <span className="font-medium text-slate-700 transition-colors group-hover:text-blue-600">
                                    contact@candcgc.us
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <div className="relative h-14 w-44 sm:w-52 md:w-60 overflow-hidden">
                            <Image
                                src="/image.png"
                                alt="C&C GC Construction Logo"
                                fill
                                className="object-contain object-left drop-shadow-sm"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop nav links */}
                    <nav className="hidden items-center gap-8 lg:flex">
                        {NAV_LINKS.map((link) =>
                            link.external ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative text-[15px] font-bold tracking-wide text-slate-700 transition-colors duration-200 hover:text-blue-600"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1.5 left-0 h-[2.5px] w-0 rounded-full bg-blue-600 transition-all duration-300 ease-out group-hover:w-full" />
                                </a>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="group relative text-[15px] font-bold tracking-wide text-slate-700 transition-colors duration-200 hover:text-blue-600"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1.5 left-0 h-[2.5px] w-0 rounded-full bg-blue-600 transition-all duration-300 ease-out group-hover:w-full" />
                                </Link>
                            )
                        )}
                    </nav>

                    {/* Desktop CTAs */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <button
                            onClick={handleOpenEstimateModal}
                            className="flex items-center gap-2 rounded-full border-2 border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                        >
                            <User className="h-4 w-4" strokeWidth={2.5} />
                            Request Estimate
                        </button>
                        <button
                            onClick={handleOpenBookingModal}
                            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 active:scale-95"
                        >
                            <Calendar className="h-4 w-4" strokeWidth={2.5} />
                            Book an Appointment
                        </button>
                    </div>

                    {/* Mobile Hamburger Toggle Button */}
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-700 lg:hidden shadow-sm transition-all active:scale-95"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <X className="h-6 w-6 text-slate-700" />
                        ) : (
                            <div className="flex flex-col justify-between w-5 h-4">
                                <span className="block h-0.5 w-full bg-slate-700 rounded-full"></span>
                                <span className="block h-0.5 w-full bg-slate-700 rounded-full"></span>
                                <span className="block h-0.5 w-full bg-slate-700 rounded-full"></span>
                            </div>
                        )}
                    </button>
                </div>

                {/* Mobile Glass Overlay Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileOpen(false)}
                                className="fixed inset-0 top-[110px] bg-black/50 backdrop-blur-sm lg:hidden z-40"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: -15, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full left-4 right-4 mt-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl lg:hidden z-50"
                            >
                                <nav className="flex flex-col gap-4">
                                    {NAV_LINKS.map((link) =>
                                        link.external ? (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setMobileOpen(false)}
                                                className="text-base font-bold text-slate-800 transition-colors hover:text-blue-600 border-b border-slate-100 pb-2"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                key={link.label}
                                                href={link.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="text-base font-bold text-slate-800 transition-colors hover:text-blue-600 border-b border-slate-100 pb-2"
                                            >
                                                {link.label}
                                            </Link>
                                        )
                                    )}
                                </nav>
                                <div className="mt-6 flex flex-col gap-3">
                                    <button
                                        onClick={handleOpenEstimateModal}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-100 active:scale-95"
                                    >
                                        <User className="h-4 w-4" strokeWidth={2.5} />
                                        Request Estimate
                                    </button>
                                    <button
                                        onClick={handleOpenBookingModal}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 active:scale-95"
                                    >
                                        <Calendar className="h-4 w-4" strokeWidth={2.5} />
                                        Book an Appointment
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* ESTIMATE MODAL WITH 6-BOX OTP FUNCTIONALITY */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-slate-800 shadow-2xl z-10 my-auto"
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {isLoadingModal ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                                    <Loader2 className="h-12 w-12 animate-spin text-sky-500" />
                                    <p className="text-sm font-semibold text-slate-600">
                                        Preparing your estimate form...
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* --- STEP 1: FORM --- */}
                                    {step === "form" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                        >
                                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0088FF]">
                                                Request a Free Estimate
                                            </h2>
                                            <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                                                Our estimate is so much transparent that we will show you our pricing to the nails.
                                            </p>

                                            <form onSubmit={handleSendOTP} className="mt-6 flex flex-col gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        placeholder="Alexander Vance"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/20"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        required
                                                        placeholder="1023 Architect Blvd, NY"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/20"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Phone <span className="text-slate-400 font-normal">(Optional)</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        placeholder="Type Here..."
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/20"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        placeholder="example@global-corp.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/20"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="mt-2 flex w-full items-center justify-center rounded-full bg-[#0088FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0088FF]/25 transition-all hover:bg-blue-600 active:scale-[0.99] disabled:opacity-70"
                                                >
                                                    {isSubmitting ? (
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        "Send OTP"
                                                    )}
                                                </button>
                                            </form>

                                            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                                                <div className="flex items-center gap-2 text-[#0088FF]">
                                                    <Info className="h-4 w-4 shrink-0" />
                                                    <h4 className="text-xs font-bold">Our Commitments</h4>
                                                </div>
                                                <ul className="mt-2.5 flex flex-col gap-1.5 pl-4 text-[11px] font-medium text-slate-500 list-disc leading-relaxed">
                                                    <li>We will not solicit you for the estimate you request.</li>
                                                    <li>
                                                        We will not share, sell nor utilize your information for marketing or any further communication unless you contact us.
                                                    </li>
                                                    <li className="text-slate-400">*For Texas properties only.</li>
                                                </ul>
                                            </div>

                                            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
                                                <Mail className="h-3.5 w-3.5" />
                                                <span>A mail will be sent to your inbox.</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* --- STEP 2: 6-BOX OTP VERIFICATION --- */}
                                    {step === "otp" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                        >
                                            <button
                                                onClick={() => setStep("form")}
                                                className="mb-3 flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-700"
                                            >
                                                <ArrowLeft className="h-3.5 w-3.5" /> Back
                                            </button>

                                            <h2 className="text-2xl font-extrabold text-[#0088FF]">
                                                Verify Your Email
                                            </h2>
                                            <p className="mt-1 text-xs font-medium text-slate-500 leading-relaxed">
                                                We have sent a verification code to{" "}
                                                <span className="font-bold text-slate-700">{formData.email}</span>
                                            </p>

                                            <form onSubmit={handleVerifyOTP} className="mt-6 flex flex-col gap-6">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-2.5">
                                                        Enter 6-Digit OTP Code
                                                    </label>
                                                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                                                        {otpValues.map((digit, index) => (
                                                            <input
                                                                key={index}
                                                                ref={(el) => {
                                                                    inputRefs.current[index] = el;
                                                                }}
                                                                type="text"
                                                                maxLength={1}
                                                                value={digit}
                                                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                                className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border border-slate-200 bg-slate-50/50 text-center text-xl font-extrabold text-slate-800 outline-none transition-all focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[#0088FF]/20"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || otpValues.some((val) => val === "")}
                                                    className="flex w-full items-center justify-center rounded-full bg-[#0088FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0088FF]/25 transition-all hover:bg-blue-600 active:scale-[0.99] disabled:opacity-50"
                                                >
                                                    {isSubmitting ? (
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        "Confirm & Request Estimate"
                                                    )}
                                                </button>
                                            </form>

                                            <p className="mt-5 text-center text-xs text-slate-400">
                                                Didn't receive the code?{" "}
                                                <button
                                                    type="button"
                                                    onClick={() => alert("OTP Resent!")}
                                                    className="font-bold text-[#0088FF] hover:underline"
                                                >
                                                    Resend
                                                </button>
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* --- STEP 3: SUCCESS STATE --- */}
                                    {step === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center py-6 text-center"
                                        >
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-500 mb-4">
                                                <CheckCircle2 className="h-10 w-10" />
                                            </div>
                                            <h3 className="text-2xl font-extrabold text-slate-800">
                                                Estimate Requested!
                                            </h3>
                                            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs">
                                                Thank you, <span className="font-bold text-slate-700">{formData.name}</span>. We have received your request and sent a confirmation email to <span className="font-bold text-slate-700">{formData.email}</span>.
                                            </p>

                                            <button
                                                onClick={handleCloseModal}
                                                className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-xs font-bold text-white transition-all hover:bg-slate-800"
                                            >
                                                Done
                                            </button>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* BOOK AN APPOINTMENT MODAL WITH CALENDAR + CONTACT FORM */}
            <AnimatePresence>
                {isBookingOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseBookingModal}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-slate-800 shadow-2xl z-10 my-auto"
                        >
                            <button
                                onClick={handleCloseBookingModal}
                                className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {isBookingLoading ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                                    <p className="text-sm font-semibold text-slate-600">
                                        Loading available dates...
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* --- STEP 1: CALENDAR --- */}
                                    {bookingStep === "calendar" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                        >
                                            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                                                Book an Appointment
                                            </h2>
                                            <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                                                Pick any date that works for you — browse forward or back through any month.
                                            </p>

                                            {/* Month navigation */}
                                            <div className="mt-6 flex items-center justify-between gap-2">
                                                <button
                                                    type="button"
                                                    onClick={goToPrevMonth}
                                                    disabled={!canGoPrevMonth}
                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                </button>

                                                <div className="flex items-center gap-1.5">
                                                    <select
                                                        value={viewMonth.getMonth()}
                                                        onChange={(e) => handleJumpToMonth(Number(e.target.value))}
                                                        className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-extrabold text-slate-800 outline-none transition-all hover:border-slate-300 focus:border-blue-600"
                                                    >
                                                        {MONTH_LABELS.map((label, idx) => (
                                                            <option key={label} value={idx}>
                                                                {label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        value={viewMonth.getFullYear()}
                                                        onChange={(e) => handleJumpToYear(Number(e.target.value))}
                                                        className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-extrabold text-slate-800 outline-none transition-all hover:border-slate-300 focus:border-blue-600"
                                                    >
                                                        {yearOptions.map((y) => (
                                                            <option key={y} value={y}>
                                                                {y}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={goToNextMonth}
                                                    disabled={!canGoNextMonth}
                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <ChevronRight className="h-4 w-4" />
                                                </button>
                                            </div>

                                            {/* Weekday header */}
                                            <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
                                                {WEEKDAY_LABELS.map((d) => (
                                                    <span key={d} className="text-[10px] font-bold uppercase text-slate-400">
                                                        {d}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Calendar grid */}
                                            <div className="mt-1.5 grid grid-cols-7 gap-1.5">
                                                {calendarCells.map((cell, idx) => {
                                                    if (!cell.date) {
                                                        return <div key={`blank-${idx}`} />;
                                                    }
                                                    const date = cell.date;
                                                    const selectable = isDateSelectable(date);
                                                    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                                                    const isToday = isSameDay(date, today);

                                                    return (
                                                        <button
                                                            key={date.toISOString()}
                                                            type="button"
                                                            disabled={!selectable}
                                                            onClick={() => handleSelectDate(date)}
                                                            className={[
                                                                "flex h-10 items-center justify-center rounded-xl text-xs font-bold transition-all",
                                                                !selectable
                                                                    ? "cursor-not-allowed text-slate-300"
                                                                    : isSelected
                                                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                                                                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600 active:scale-95",
                                                                isToday && !isSelected ? "ring-1 ring-inset ring-blue-200" : "",
                                                            ].join(" ")}
                                                        >
                                                            {date.getDate()}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                                                <CalendarCheck2 className="h-4 w-4 shrink-0 text-blue-600" />
                                                <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                                                    Appointments can be scheduled for any date starting tomorrow, up to {BOOKING_WINDOW_YEARS} years out. Select a date to continue.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* --- STEP 2: CONTACT FORM WITH SELECTED DATE --- */}
                                    {bookingStep === "form" && selectedDate && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                        >
                                            <button
                                                onClick={handleBackToCalendar}
                                                className="mb-3 flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-700"
                                            >
                                                <ArrowLeft className="h-3.5 w-3.5" /> Change Date
                                            </button>

                                            <h2 className="text-2xl font-extrabold text-blue-600">
                                                Confirm Your Appointment
                                            </h2>

                                            <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-blue-50 px-4 py-3">
                                                <Calendar className="h-4 w-4 shrink-0 text-blue-600" />
                                                <span className="text-sm font-bold text-blue-700">
                                                    {formattedSelectedDate}
                                                </span>
                                            </div>

                                            <form onSubmit={handleBookingSubmit} className="mt-5 flex flex-col gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        placeholder="Alexander Vance"
                                                        value={bookingFormData.name}
                                                        onChange={handleBookingChange}
                                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Phone
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        placeholder="(267) 000-0000"
                                                        value={bookingFormData.phone}
                                                        onChange={handleBookingChange}
                                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        placeholder="example@global-corp.com"
                                                        value={bookingFormData.email}
                                                        onChange={handleBookingChange}
                                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        required
                                                        placeholder="1023 Architect Blvd, TX"
                                                        value={bookingFormData.address}
                                                        onChange={handleBookingChange}
                                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                                        Notes <span className="text-slate-400 font-normal">(Optional)</span>
                                                    </label>
                                                    <textarea
                                                        name="notes"
                                                        rows={3}
                                                        placeholder="Tell us a bit about the job..."
                                                        value={bookingFormData.notes}
                                                        onChange={handleBookingChange}
                                                        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isBookingSubmitting}
                                                    className="mt-2 flex w-full items-center justify-center rounded-full bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 active:scale-[0.99] disabled:opacity-70"
                                                >
                                                    {isBookingSubmitting ? (
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        "Confirm Appointment"
                                                    )}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* --- STEP 3: SUCCESS STATE --- */}
                                    {bookingStep === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center py-6 text-center"
                                        >
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-500 mb-4">
                                                <CheckCircle2 className="h-10 w-10" />
                                            </div>
                                            <h3 className="text-2xl font-extrabold text-slate-800">
                                                Appointment Booked!
                                            </h3>
                                            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs">
                                                Thank you, <span className="font-bold text-slate-700">{bookingFormData.name}</span>. We've scheduled your appointment for{" "}
                                                <span className="font-bold text-slate-700">{formattedSelectedDate}</span> and sent a confirmation to{" "}
                                                <span className="font-bold text-slate-700">{bookingFormData.email}</span>.
                                            </p>

                                            <button
                                                onClick={handleCloseBookingModal}
                                                className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-xs font-bold text-white transition-all hover:bg-slate-800"
                                            >
                                                Done
                                            </button>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}