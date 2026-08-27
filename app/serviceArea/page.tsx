"use client";

import { motion } from "framer-motion";
import {
    Building2,
    Home,
    Waves,
    Plus,
    Phone,
    MapPin,
    ShieldCheck,
    Award,
    HeartHandshake,
    Star,
} from "lucide-react";

type ServiceArea = {
    icon: React.ReactNode;
    title: string;
    cities: string;
    top: string;
    left: string;
};

// Adjusted coordinates for mobile/desktop spacing so they don't overlap
const serviceAreas: ServiceArea[] = [
    {
        icon: <Building2 className="h-5 w-5" />,
        title: "DFW Metroplex",
        cities: "Dallas · Fort Worth · Arlington · Plano · Frisco · McKinney",
        top: "28%",
        left: "42%",
    },
    {
        icon: <Home className="h-5 w-5" />,
        title: "Houston Metroplex",
        cities: "Houston · Katy · Sugar Land · The Woodlands · Pasadena",
        top: "62%",
        left: "38%",
    },
    {
        icon: <Waves className="h-5 w-5" />,
        title: "Beaumont",
        cities: "Beaumont · Port Arthur · Nederland · Orange",
        top: "74%",
        left: "75%",
    },
];

// Simplified Texas outline
const TEXAS_PATH =
    "M120,40 L340,40 L340,110 L400,110 L400,170 L440,190 L470,240 L455,290 L480,330 L465,380 L420,420 L370,460 L330,470 L300,510 L260,505 L235,460 L190,450 L150,420 L120,430 L95,390 L60,380 L40,340 L60,300 L45,250 L70,220 L60,180 L90,150 L80,110 L120,110 Z";

export default function ServiceAreas() {
    return (
        <section className="relative overflow-hidden bg-white pt-32 pb-16 sm:pt-40 sm:pb-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 ring-1 ring-inset ring-blue-100">
                            Service Areas
                        </span>

                        <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
                            Proudly Serving
                            <br />
                            Across{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                                Texas
                            </span>
                        </h2>

                        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
                            We're based in Texas and proudly serve homeowners and
                            businesses across major cities and surrounding areas.
                        </p>

                        {/* Area list */}
                        <div className="mt-8 space-y-3">
                            {serviceAreas.map((area, i) => (
                                <motion.div
                                    key={area.title}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
                                        {area.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-900">
                                            {area.title}
                                        </p>
                                        <p className="truncate text-sm text-slate-500">
                                            {area.cities}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.5, delay: serviceAreas.length * 0.08 }}
                                className="flex items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 ring-1 ring-slate-200">
                                    <Plus className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">
                                        More Locations Coming Soon
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        We're expanding to serve you better
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative flex items-center justify-center pt-4 lg:pt-0"
                    >
                        <div className="relative aspect-square w-full max-w-lg">
                            <svg
                                viewBox="0 0 520 560"
                                className="h-full w-full drop-shadow-[0_10px_30px_rgba(37,99,235,0.12)]"
                            >
                                <path
                                    d={TEXAS_PATH}
                                    fill="#EFF6FF"
                                    stroke="#2563EB"
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d={TEXAS_PATH}
                                    fill="none"
                                    stroke="#93C5FD"
                                    strokeWidth="0.75"
                                    strokeDasharray="4 5"
                                    opacity="0.6"
                                />
                            </svg>

                            {/* Pins */}
                            {serviceAreas.map((area) => (
                                <div
                                    key={area.title}
                                    className="absolute -translate-x-1/2 -translate-y-full"
                                    style={{ top: area.top, left: area.left }}
                                >
                                    <div className="flex flex-col items-center">
                                        <span className="whitespace-nowrap rounded-lg bg-blue-600 px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-white shadow-md shadow-blue-300">
                                            {area.title}
                                        </span>
                                        <span className="mt-1 h-2.5 w-2.5 sm:h-3 sm:w-3 animate-pulse rounded-full bg-blue-600 ring-4 ring-blue-200" />
                                    </div>
                                </div>
                            ))}

                            {/* Coming soon marker placed precisely in the middle center */}
                            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center text-blue-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm">
                                <MapPin className="h-4 w-4 mb-0.5" />
                                <span className="text-[10px] sm:text-xs font-semibold italic text-slate-600 leading-tight">
                                    More Locations Coming Soon
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CTA bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 sm:mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:flex-row sm:p-10"
                >
                    <div>
                        <p className="text-base sm:text-lg font-semibold text-slate-900">
                            Not Sure If We Serve Your Area?
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Give us a call. We're always expanding to serve more communities.
                        </p>
                    </div>
                    <a
                        href="tel:12605551797"
                        className="inline-flex shrink-0 items-center gap-3 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-300 transition-transform hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                        <Phone className="h-4 w-4" />
                        (260) CANDC GC
                    </a>
                </motion.div>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs sm:text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                        Licensed &amp; Insured
                    </span>
                    <span className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-blue-600" />
                        Quality Workmanship
                    </span>
                    <span className="flex items-center gap-2">
                        <HeartHandshake className="h-4 w-4 text-blue-600" />
                        Honest &amp; Transparent
                    </span>
                    <span className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-blue-600" />
                        100% Satisfaction
                    </span>
                </div>
            </div>
        </section>
    );
}