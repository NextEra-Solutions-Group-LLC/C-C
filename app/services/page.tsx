"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Hind_Siliguri } from "next/font/google";
import { ArrowRight } from "lucide-react";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

interface ServiceItem {
    id: string;
    title: string;
    subtitle: string;
    desc: string;
    img: string;
    href: string;
}


const SERVICES: ServiceItem[] = [
    {
        id: "roofing",
        title: "Roofing",
        subtitle: "Residential, Multi-Family, Commercial, Industrial, Government",
        desc: "Complete roofing solutions tailored for every structure type. From routine inspections to heavy-duty installations.",
        img: "https://i.ibb.co.com/6CDKjV2/image.png",
        href: "#roofing",
    },
    {
        id: "commercial-roofing",
        title: "Commercial Roofing",
        subtitle: "Inspection, Maintenance, Repair & Replacement",
        desc: "Protect your commercial investment with professional roof inspections, proactive maintenance, heavy repairs, and full system replacements.",
        img: "https://i.ibb.co/TqFyQ4sQ/image.png",
        href: "#commercial-roofing",
    },
    {
        id: "commercial-gc",
        title: "Commercial General Contracting",
        subtitle: "Specialized Business & Commercial Construction",
        desc: "Comprehensive general contracting services built specifically for commercial spaces, retail centers, and industrial facilities.",
        img: "https://i.ibb.co/k2RTTMzK/image.png",
        href: "#commercial-gc",
    },
    {
        id: "commercial-hvac",
        title: "Commercial HVAC",
        subtitle: "Installation, Upgrades & Maintenance",
        desc: "Keep your commercial premises climate-controlled and energy efficient with robust commercial HVAC solutions.",
        img: "https://i.ibb.co/DBppJyB/image.png",
        href: "#commercial-hvac",
    },
    {
        id: "solar-system",
        title: "Solar System",
        subtitle: "Residential & Commercial Solutions",
        desc: "Harness clean, renewable energy with state-of-the-art solar installations designed for homes and commercial buildings.",
        img: "https://i.ibb.co/jkkmNWzh/image.png",
        href: "#solar-system",
    },
    {
        id: "countertops",
        title: "Countertops",
        subtitle: "Custom Kitchen & Bath Surfacing Solutions",
        desc: "High-quality stone, quartz, and marble countertop fabrication and installation for stunning interior spaces.",
        img: "https://i.ibb.co/p6bQ01kC/image.png",
        href: "#countertops",
    },
];

export default function Services() {
    const [activeTab, setActiveTab] = useState<string>(SERVICES[0].id);

    const currentService = SERVICES.find((s) => s.id === activeTab) || SERVICES[0];

    return (
        <section
            id="services"
            className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] relative w-full pt-36 pb-24 overflow-hidden`}
        >
            {/* Background Image for Section */}
            <Image
                src="https://i.ibb.co.com/nMbdtqKM/image.png"
                alt="Services Background"
                fill
                className="object-cover object-center"
            />

            {/* Light Overlay for readability */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="mb-12 text-center">
                    <p className="text-sm font-bold uppercase tracking-[3px] text-[#1479D9]">
                        What We Do
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                        Our Services
                    </h2>
                </div>

                {/* Service Category Buttons (Updated Sequence based on user markings) */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {SERVICES.map((service) => {
                        const isActive = activeTab === service.id;
                        return (
                            <button
                                key={service.id}
                                onClick={() => setActiveTab(service.id)}
                                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 shadow-sm ${isActive
                                    ? "bg-[#1479D9] text-white shadow-md shadow-[#1479D9]/30 scale-105"
                                    : "bg-white/80 text-slate-700 hover:bg-slate-100 border border-slate-200"
                                    }`}
                            >
                                {service.title}
                            </button>
                        );
                    })}
                </div>

                {/* Display Area for Active Service */}
                <div className="mx-auto max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentService.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl"
                        >
                            {/* Blob Image */}
                            <div className="relative w-full max-w-[300px] md:max-w-[340px] shrink-0">
                                <div className="relative aspect-square w-full">
                                    <div className="absolute inset-4 rounded-[45%_55%_65%_35%/45%_35%_65%_55%] bg-gradient-to-br from-[#1479D9]/10 to-[#6D5BD0]/10" />
                                    <div
                                        className="relative h-full w-full overflow-hidden shadow-xl shadow-slate-200"
                                        style={{ borderRadius: "45% 55% 65% 35% / 45% 35% 65% 55%" }}
                                    >
                                        <Image
                                            src={currentService.img}
                                            alt={currentService.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Text Details */}
                            <div className="flex flex-1 flex-col items-start text-left">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#1479D9]">
                                    Featured Service
                                </span>
                                <h3 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">
                                    {currentService.title}
                                </h3>
                                <p className="mt-1 text-sm font-semibold text-[#1479D9]">
                                    {currentService.subtitle}
                                </p>
                                <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
                                    {currentService.desc}
                                </p>
                                <Link
                                    href={currentService.href}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1479D9] px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0f66b8]"
                                >
                                    Learn More
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

