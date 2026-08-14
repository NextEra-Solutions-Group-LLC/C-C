"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Hind_Siliguri } from "next/font/google";
import { MoveHorizontal } from "lucide-react";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

const TRANSFORM_ITEMS = [
    {
        id: 1,
        title: "Granite",
        beforeImg: "https://i.ibb.co/Xf1SkrR0/image.png",
        afterImg: "https://i.ibb.co/p6bQ01kC/image.png",
    },
    {
        id: 2,
        title: "Quartzite",
        beforeImg: "https://i.ibb.co/Lzgfyd8F/image.png",
        afterImg: "https://i.ibb.co/Y44B8r8Q/image.png",
    },
    {
        id: 3,
        title: "Exotic Stones",
        beforeImg: "https://i.ibb.co/2YnJ00xy/image.png",
        afterImg: "https://i.ibb.co/9BL5HQ8/image.png",
    },
    {
        id: 4,
        title: "Marble",
        beforeImg: "https://i.ibb.co/q3vDGww6/image.png",
        afterImg: "https://i.ibb.co/7Nd30yNQ/image.png",
    },
    {
        id: 5,
        title: " Quartz",
        beforeImg: "https://i.ibb.co/4nHwySDc/image.png",
        afterImg: "https://i.ibb.co/848sh5kb/image.png",
    },
    {
        id: 6,
        title: "Other Natural",
        beforeImg: "https://i.ibb.co/Z6G8k6gy/image.png",
        afterImg: "https://i.ibb.co/9kLdYrcD/image.png",
    },
];

export default function TransformSpace() {
    return (
        <section className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] w-full bg-slate-50/80 pt-36 pb-24 text-slate-900 overflow-hidden relative`}>


            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="mx-auto max-w-7xl px-4 md:px-6">

                {/* Header Section */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-[3px] text-blue-600">
                        Counter Top Materials
                    </p>
                    <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        Transform Your Space
                    </h2>

                    {/* Badge */}
                    <div className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 border border-sky-100 shadow-sm backdrop-blur-md">
                        <p className="text-xs md:text-sm font-medium text-slate-600">
                            Competitive, Honest & Transparent Pricing & Replacing in <span className="text-blue-600 font-bold">1 Day.</span>
                        </p>
                    </div>
                </div>

                {/* 6 Cards Grid (Centered) */}
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {TRANSFORM_ITEMS.map((item, index) => (
                        <TransformCard key={item.id} item={item} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}


function TransformCard({ item, index }: { item: typeof TRANSFORM_ITEMS[0]; index: number }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;

        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        setSliderPosition(percentage);
    }, [isDragging]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="w-full max-w-md rounded-3xl bg-white p-5 border border-sky-100 shadow-xl shadow-sky-900/5 flex flex-col items-center"
        >
            {/* Title */}
            <div className="mb-4 text-center">
                <h3 className="text-xl font-bold text-slate-900 tracking-wide">{item.title}</h3>
                <div className="mx-auto mt-1.5 h-1 w-10 bg-blue-600 rounded-full" />
            </div>

            {/* Before / After Image Container */}
            <div
                ref={containerRef}
                className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl cursor-ew-resize"
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onTouchEnd={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
            >
                {/* After Image */}
                <Image
                    src={item.afterImg}
                    alt={`${item.title} After`}
                    fill
                    className="object-cover pointer-events-none"
                />
                <div className="absolute bottom-3 right-3 rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-sky-400 backdrop-blur-sm">
                    AFTER
                </div>

                {/* Before Image */}
                <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                    <Image
                        src={item.beforeImg}
                        alt={`${item.title} Before`}
                        fill
                        className="object-cover pointer-events-none brightness-75 filter"
                    />
                    <div className="absolute bottom-3 left-3 rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-slate-200 backdrop-blur-sm">
                        BEFORE
                    </div>
                </div>

                {/* Divider Line & Handle Button */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-110"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onTouchStart={() => setIsDragging(true)}
                    >
                        <MoveHorizontal className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}