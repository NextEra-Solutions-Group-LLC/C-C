"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Hind_Siliguri } from "next/font/google";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

const GALLERY_IMAGES = [
    { id: 1, src: "https://i.ibb.co/MkPdx8GR/image.png", title: "Modern Interior" },
    { id: 2, src: "https://i.ibb.co/vCGb1M3F/image.png", title: "Luxury Kitchen" },
    { id: 3, src: "https://i.ibb.co/k2RTTMzK/image.png", title: "Elegant Living" },
    { id: 4, src: "https://i.ibb.co/3ykNL0kw/image.png", title: "Spacious Hall" },
    { id: 5, src: "https://i.ibb.co/wZXw66xx/image.png", title: "Stylish Bedroom" },
    { id: 6, src: "https://i.ibb.co/fG2vFnS9/image.png", title: "Modern Architecture" },
];

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
    initials: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        quote: "The level of technical detail C&C brought to our commercial project was unprecedented. Their roofers are true craftsmen.",
        name: "Jonathan Devlin",
        role: "LEAD ARCHITECT • VERTEX GROUP",
        initials: "JD",
    },
    {
        id: 2,
        quote: "Absolute reliability. From the initial estimate to the final inspection, the transparency and professionalism were world-class.",
        name: "Marcus Whitmore",
        role: "DIRECTOR, ESTATE • DEVELOPERS INC.",
        initials: "MW",
    },
    {
        id: 3,
        quote: "Rarely do you find a contractor that understands high-end design as much as structural engineering. C&C is in a class of its own.",
        name: "Sarah Chambers",
        role: "RESIDENTIAL CLIENT",
        initials: "SC",
    },
    {
        id: 4,
        quote: "On time, on budget, and beyond expectations. The team's communication made a complex project feel effortless.",
        name: "David Chen",
        role: "PROJECT MANAGER • URBAN ESTATES LLC",
        initials: "DC",
    },
    {
        id: 5,
        quote: "We've hired many contractors over the years. C&C's attention to detail and safety standards are unmatched.",
        name: "Elena Vasquez",
        role: "FACILITIES DIRECTOR • MERIDIAN PROPERTIES",
        initials: "EV",
    },
    {
        id: 6,
        quote: "The team at C&C transformed our outdated roof into a modern masterpiece. Professional, clean, and efficient.",
        name: "Michael Torres",
        role: "HOMEOWNER",
        initials: "MT",
    },
];

export default function GalleryAndTestimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 2 : prev - 2));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= TESTIMONIALS.length - 2 ? 0 : prev + 2));
    };


    const currentTestimonials = [
        TESTIMONIALS[currentIndex],
        TESTIMONIALS[(currentIndex + 1) % TESTIMONIALS.length],
    ];

    return (
        <section className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] w-full bg-slate-50 pt-36 pb-24 text-slate-900 overflow-hidden`}>
            <div className="mx-auto max-w-6xl px-6">


                <div className="mb-24">
                    <div className="mb-12 text-center">
                        <p className="text-sm font-bold uppercase tracking-[3px] text-blue-600">
                            Our Work
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                            Photo Gallery
                        </h2>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {GALLERY_IMAGES.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900 shadow-lg border border-slate-100"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


                <div>
                    {/* Section Header */}
                    <div className="mb-16 text-center">
                        <p className="text-sm font-bold uppercase tracking-[3px] text-blue-600">
                            Testimonials
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                            Trusted by Industry Leaders
                        </h2>
                    </div>

                    {/* Testimonial Cards Container */}
                    <div className="relative mx-auto max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <AnimatePresence mode="wait">
                                {currentTestimonials.map((item, idx) => (
                                    <motion.div
                                        key={`${item.id}-${currentIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-xl border border-slate-100"
                                    >
                                        <div>
                                            {/* Blue Top Line Accent */}
                                            <div className="mb-6 h-1 w-12 rounded-full bg-blue-600" />

                                            {/* Stars */}
                                            <div className="flex gap-1 text-blue-600 mb-6">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-5 w-5 fill-current" />
                                                ))}
                                            </div>

                                            {/* Quote */}
                                            <p className="text-slate-700 text-base md:text-lg leading-relaxed italic">
                                                &ldquo;{item.quote}&rdquo;
                                            </p>
                                        </div>

                                        {/* Author Info */}
                                        <div className="mt-8 flex items-center gap-4 pt-6 border-t border-slate-100">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg shadow-inner">
                                                {item.initials}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                                                <p className="text-[11px] font-semibold tracking-wider text-slate-400 mt-0.5">{item.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-10 flex justify-center gap-4">
                            <button
                                onClick={handlePrev}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-md transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                aria-label="Previous Testimonials"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-md transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                aria-label="Next Testimonials"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}