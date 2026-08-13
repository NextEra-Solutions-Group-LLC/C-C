"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hind_Siliguri } from "next/font/google";
import { Calendar } from "lucide-react";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

export const BLOG_POSTS = [
    {
        id: "luxury-roof-insurance-claim",
        title: "Luxury Roof Insurance Claim Negotiation: Engineering 2026 Appraisal Success",
        category: "Roofing",
        date: "Aug 10, 2026",
        image: "https://i.ibb.co/m5Y3qQWn/cover-luxury-home-roofing-architectural-copper-slate-1536x1024.jpg",
        content: "Detailed insights into handling high-end residential insurance claims, structural engineering documentation, and ensuring full appraisal value for luxury roofing systems in 2026.",
        author: "Engineering Team",
    },
    {
        id: "asphalt-shingle-granule-loss",
        title: "Asphalt Shingle Granule Loss Engineering 2026: Advanced Surface Integrity Standards",
        category: "Roofing",
        date: "Aug 8, 2026",
        image: "https://i.ibb.co/chWsMptX/image.png",
        content: "An in-depth analysis of granule loss metrics, weather impact testing, and modern protective coating standards designed to extend shingle longevity.",
        author: "Tech Analyst",
    },
    {
        id: "residential-roofing-flashing-engineering",
        title: "Residential Roofing Flashing Engineering 2026: Precision Integration for Masonry and Structural Joints",
        category: "Roofing",
        date: "Aug 5, 2026",
        image: "https://i.ibb.co/kVZXZkNp/image.png",
        content: "Mastering water-tight seals around masonry chimneys and complex roof junctions using advanced copper and aluminum flashing integrations.",
        author: "Structural Specialist",
    },
    {
        id: "roof-underlayment-engineering",
        title: "Roof Underlayment Engineering 2026: Advanced Moisture Management Standards",
        category: "Roofing",
        date: "Aug 3, 2026",
        image: "https://i.ibb.co/5XJQsqY5/image.png",
        content: "Evaluating high-performance synthetic underlayments and vapor permeability barriers to protect home frameworks from extreme condensation and leaks.",
        author: "Safety & Quality Team",
    },
    // নিচের কার্ডগুলোর জন্য ডাটা (প্রতিটিতে মাত্র ১ লাইন কন্টেন্ট)
    {
        id: "roof-decking-structural-integrity",
        title: "Roof Decking Structural Integrity: Engineering 2026 Substrate Standards",
        category: "Roofing",
        date: "Jul 29, 2026",
        image: "https://i.ibb.co/m5Y3qQWn/cover-luxury-home-roofing-architectural-copper-slate-1536x1024.jpg",
        content: "Roofing performance begins long before the first shingle is nailed into place.",
        author: "Engineering Team",
    },
    {
        id: "storm-damage-roof-restoration",
        title: "2026 Storm Damage Roof Restoration: Engineering Resilience Against High-Velocity Hail",
        category: "Roofing",
        date: "Jul 25, 2026",
        image: "https://i.ibb.co/chWsMptX/image.png",
        content: "Restoration requires a shift from simple aesthetic repairs to rigorous structural engineering.",
        author: "Restoration Expert",
    },
    {
        id: "commercial-roof-ventilation-standards",
        title: "Commercial Roof Ventilation Standards 2026: Thermal Efficiency & Airflow Engineering",
        category: "Roofing",
        date: "Jul 20, 2026",
        image: "https://i.ibb.co/kVZXZkNp/image.png",
        content: "Optimizing airflow dynamics across large commercial roofing surfaces to minimize energy loss.",
        author: "HVAC & Roofing Team",
    },
    {
        id: "metal-roof-coating-innovations",
        title: "Metal Roof Coating Innovations 2026: Advanced Thermal Emittance and Corrosion Shielding",
        category: "Roofing",
        date: "Jul 15, 2026",
        image: "https://i.ibb.co/5XJQsqY5/image.png",
        content: "Discovering next-gen elastomeric coatings designed to drastically reduce cooling costs.",
        author: "Materials Specialist",
    },
    {
        id: "solar-integration-roofing-systems",
        title: "Solar Integration Roofing Systems 2026: Structural Load & Waterproofing Protocols",
        category: "Roofing",
        date: "Jul 10, 2026",
        image: "https://i.ibb.co/v6bfc952/image.png",
        content: "Safely mounting solar panels while maintaining long-term structural and waterproofing integrity.",
        author: "Solar Engineering Team",
    },
    {
        id: "eco-friendly-green-roof-standards",
        title: "Eco-Friendly Green Roof Standards 2026: Sustainable Vegetation & Drainage Solutions",
        category: "Roofing",
        date: "Jul 5, 2026",
        image: "https://i.ibb.co/qLk3BKZw/image.png",
        content: "Implementing advanced drainage layers and lightweight soil systems for modern green roofs.",
        author: "Sustainability Team",
    },
];

export default function BlogSection() {
    const mainPost = BLOG_POSTS[0];
    const sidePosts = BLOG_POSTS.slice(1, 4);
    // নিচে মোট ৬টি কার্ড দেখানোর জন্য slice(4, 10) ব্যবহার করা হলো
    const bottomPosts = BLOG_POSTS.slice(4, 10);

    return (
        <section className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] w-full bg-slate-50/80 pt-36 pb-24 text-slate-900 relative overflow-hidden`}>

            {/* হালকা নীল আভা ব্যাকগ্রাউন্ড */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="mx-auto max-w-7xl px-4 md:px-6">

                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-[3px] text-blue-600">
                        Expertise & Insights
                    </p>
                    <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        Latest Engineering Articles
                    </h2>
                </div>

                {/* ১. উপরে প্রিমিয়াম লেআউট */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-20">

                    {/* Left Big Card */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                href={`/blog/${mainPost.id}`}
                                className="group relative flex flex-col justify-end aspect-[4/3] lg:aspect-[4/3.8] overflow-hidden rounded-3xl bg-slate-950 p-6 md:p-8 shadow-xl border border-sky-100 block"
                            >
                                <Image
                                    src={mainPost.image}
                                    alt={mainPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.7]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                                <div className="relative z-10">
                                    <span className="inline-block rounded-full bg-blue-600 px-3.5 py-1 text-xs font-bold text-white shadow-md mb-4">
                                        {mainPost.category}
                                    </span>
                                    <h3 className="text-xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors leading-snug">
                                        {mainPost.title}
                                    </h3>
                                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-300">
                                        <Calendar className="h-4 w-4 text-blue-400" />
                                        {mainPost.date}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Side 3 Stacked Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {sidePosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                            >
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="group relative flex flex-col justify-end h-40 md:h-44 overflow-hidden rounded-2xl bg-slate-950 p-5 shadow-lg border border-sky-100 block"
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.65]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                                    <div className="relative z-10">
                                        <span className="inline-block rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold text-white mb-2">
                                            {post.category}
                                        </span>
                                        <h4 className="text-sm md:text-base font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
                                            {post.title}
                                        </h4>
                                        <div className="mt-2.5 flex items-center gap-2 text-[11px] font-medium text-slate-300">
                                            <Calendar className="h-3 w-3 text-blue-400" />
                                            {post.date}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* ২. নিচে মোট ৬টি কার্ডের গ্রিড সেকশন (প্রতিটিতে ১ লাইন করে কন্টেন্ট) */}
                {bottomPosts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {bottomPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="group flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all hover:shadow-xl block h-full"
                                >
                                    <div className="relative md:w-5/12 aspect-[16/10] md:aspect-auto overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 md:w-7/12 flex flex-col justify-between">
                                        <div>
                                            <span className="inline-block rounded bg-[#00a8cc] px-2.5 py-1 text-[11px] font-bold text-white mb-2">
                                                {post.category}
                                            </span>
                                            <h4 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                                {post.title}
                                            </h4>
                                            {/* এখানে লাইন সংখ্যা ঠিক রাখার জন্য line-clamp-1 ব্যবহার করা হয়েছে */}
                                            <p className="mt-2 text-xs text-slate-600 line-clamp-1 leading-relaxed">
                                                {post.content}
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                                            <Calendar className="h-3 w-3 text-slate-400" />
                                            {post.date}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}