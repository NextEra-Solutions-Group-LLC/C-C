"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hind_Siliguri } from "next/font/google";
import { ArrowRight } from "lucide-react";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

interface ServiceItem {
    title: string;
    desc: string;
    img: string;
    href: string;
}

const SERVICES: ServiceItem[] = [
    {
        title: "Roofing",
        desc: "Residential, Multi-Family, Commercial, Industrial, Government",
        img: "https://i.ibb.co/fG2vFnS9/image.png",
        href: "#roofing",
    },
    {
        title: "Countertops",
        desc: "Quartz, Granite, Marble, Quartzite to Exotic.",
        img: "https://i.ibb.co/3ykNL0kw/image.png",
        href: "#countertops",
    },
    {
        title: "General Contracting",
        desc: "Insurance Claim Restoration to Complex Projects.",
        img: "https://i.ibb.co/k2RTTMzK/image.png",
        href: "#general-contracting",
    },
];

export default function Services() {
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

            {/* Dark/Light Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="mb-16 text-center">
                    <p className="text-sm font-bold uppercase tracking-[3px] text-[#1479D9]">
                        What We Do
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                        Our Services
                    </h2>
                </div>

                <div className="flex flex-col gap-20 md:gap-28">
                    {SERVICES.map((service, i) => (
                        <ServiceRow
                            key={service.title}
                            service={service}
                            index={i}
                            reversed={i % 2 === 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ServiceRowProps {
    service: ServiceItem;
    index: number;
    reversed: boolean;
}

function ServiceRow({ service, index, reversed }: ServiceRowProps) {
    return (
        <div
            className={`flex flex-col items-center gap-10 md:gap-16 ${reversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
        >
            {/* Blob image */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative w-full max-w-[340px] shrink-0"
            >
                <div className="relative aspect-square w-full">
                    <div className="absolute inset-4 rounded-[45%_55%_65%_35%/45%_35%_65%_55%] bg-gradient-to-br from-[#1479D9]/10 to-[#6D5BD0]/10" />
                    <div
                        className="relative h-full w-full overflow-hidden shadow-xl shadow-slate-200"
                        style={{ borderRadius: "45% 55% 65% 35% / 45% 35% 65% 55%" }}
                    >
                        <Image
                            src={service.img}
                            alt={service.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Text */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                className="flex flex-1 flex-col items-start text-left"
            >
                <span className="text-xs font-bold uppercase tracking-widest text-[#1479D9]">
                    0{index + 1}
                </span>
                <span className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">
                    {service.title}
                </span>
                <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-slate-600">
                    {service.desc}
                </p>
                <Link
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1479D9] px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0f66b8]"
                >
                    Learn More
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
            </motion.div>
        </div>
    );
}