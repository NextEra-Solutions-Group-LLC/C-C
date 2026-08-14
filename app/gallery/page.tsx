"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Hind_Siliguri } from "next/font/google";

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

export default function Gallery() {
    return (
        <section className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] w-full bg-slate-50 pt-36 pb-24 text-slate-900 overflow-hidden`}>
            <div className="mx-auto max-w-6xl px-6">
                <div>
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}