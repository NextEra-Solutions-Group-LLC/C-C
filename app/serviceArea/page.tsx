"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Building2,
    Home,
    Phone,
    ShieldCheck,
    Award,
    HeartHandshake,
    Star,
} from "lucide-react";

type ServiceArea = {
    icon: React.ReactNode;
    title: string;
    cities: string;
};

const serviceAreas: ServiceArea[] = [
    {
        icon: <Building2 className="h-5 w-5" />,
        title: "Greater DFW Metroplex",
        cities: "Dallas · Fort Worth · Arlington · Plano · Frisco · McKinney, and beyond",
    },
    {
        icon: <Home className="h-5 w-5" />,
        title: "Greater Houston Metroplex",
        cities: "Houston · Katy · Sugar Land · The Woodlands · Pasadena, and beyond",
    },
];

const comingSoonCities = [
    "Austin",
    "San Antonio",
    "Corpus Christi",
    "Amarillo",
    "Laredo",
    "El Paso",
    "Texarkana",
];

export default function ServiceAreas() {
    return (
        <section className="relative overflow-hidden bg-white pt-32 pb-16 sm:pt-40 sm:pb-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-12 items-center">
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
                            We&apos;re based in Texas and proudly serve homeowners and businesses across Texas.
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
                        </div>

                        {/* Coming Soon Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
                        >
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Coming Soon / Expanding To:
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {comingSoonCities.map((city) => (
                                    <span
                                        key={city}
                                        className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200 shadow-2xs"
                                    >
                                        {city}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side Image / Texas Map Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative flex items-center justify-center pt-4 lg:pt-0"
                    >
                        <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(37,99,235,0.12)] flex flex-col items-center justify-center">


                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src="/map.png"
                                    alt="Texas Service Map"
                                    width={400}
                                    height={400}
                                    className="object-contain"
                                />
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
                            Give us a call. We&apos;re always expanding to serve more communities.
                        </p>
                    </div>
                    <a
                        href="tel:12149006362"
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