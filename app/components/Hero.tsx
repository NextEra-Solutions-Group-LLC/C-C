"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Hind_Siliguri } from "next/font/google";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

export default function Hero() {
    return (
        <section
            id="home"
            className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden pt-36 pb-16`}
        >
            {/* Background image with high clarity and minimal overlay */}
            <Image
                src="/hero.jpeg"
                alt="C&C GC metal roof replacement project"
                fill
                priority
                className="object-cover object-center"
            />
            {/* Subtle overlay to keep image bright and clear */}
            <div className="absolute inset-0 bg-black/25" />

            {/* Content Container */}
            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center px-4 sm:px-8">
                {/* Headline matched to reference image size & style with increased mobile size */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase"
                >
                    <span className="leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Honest
                    </span>
                    <span className="leading-tight my-1 sm:my-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Clear
                    </span>
                    {/* Outline-only style for "Transparent" */}
                    <span
                        className="leading-tight text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                        style={{
                            WebkitTextStroke: "1.5px white",
                        }}
                    >
                        Transparent
                    </span>
                    <span className="leading-tight mt-1 sm:mt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        Roof Pricing
                    </span>
                </motion.h1>
            </div>
        </section>
    );
}