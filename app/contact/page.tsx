"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hind_Siliguri } from "next/font/google";
import { ChevronDown, MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        id: "01",
        question: "Does C&C Roofing & Contractors handle all types of roofs?",
        answer: "Yes, we specialize in both Residential and Commercial roofing. Whether it's Asphalt Shingles, Metal Roofing, or Flat Roof systems, our team provides expert construction and repair services for any scope.",
    },
    {
        id: "02",
        question: "Is your 'Free Estimate' really free with no hidden costs?",
        answer: "Absolutely. In line with our 'Transparent Pricing' policy, we provide a 100% free, no-obligation digital estimate. Our experts visit your site and provide a detailed budget breakdown with zero hidden fees.",
    },
    {
        id: "03",
        question: "Can you help me with my insurance claim after storm damage?",
        answer: "Yes, we have extensive experience working with insurance companies. We help you navigate the claims process, providing the necessary documentation to ensure you receive a fair settlement for your roof repairs.",
    },
    {
        id: "04",
        question: "How do you ensure my property stays clean during construction?",
        answer: "We prioritize cleanliness and safety. Our team uses specialized equipment to catch debris and nails, and we perform a thorough 'magnetic sweep' of your yard every day after work to protect your family and pets.",
    },
    {
        id: "05",
        question: "What kind of warranty does C&C offer on new installations?",
        answer: "We stand by our craftsmanship. In addition to the manufacturer’s material warranty, we provide our own C&C Workmanship Warranty to give you long-term peace of mind regarding the quality of our labor.",
    },
];

export default function FAQAndContact() {
    const [openId, setOpenId] = useState<string | null>("01");
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toggleFAQ = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1200);
    };

    return (
        <section
            className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] relative w-full bg-slate-950 pt-36 pb-24 text-slate-900 overflow-hidden bg-cover bg-center bg-no-repeat`}
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.96)), url('https://i.ibb.co/9kLdYrcD/image.png')`
            }}
        >
            <div className="mx-auto max-w-6xl px-6 relative z-10">

                {/* --- CONTACT SECTION WITH INFO & FORM --- */}
                <div className="mb-28 rounded-3xl bg-white/95 backdrop-blur-md p-8 md:p-14 shadow-2xl border border-white/20 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">


                        <div className="lg:col-span-5 flex flex-col justify-between h-full">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-[3px] text-blue-600">
                                    Get in Touch
                                </span>
                                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 leading-tight">
                                    Let’s Discuss Your <span className="text-blue-600">Roofing Project</span>
                                </h2>
                                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                                    Have questions or need a dependable roof installation? Reach out to our team directly or fill out the form.
                                </p>
                            </div>

                            <div className="mt-8 space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</h4>
                                        <p className="mt-0.5 text-sm font-bold text-slate-800">Allen, TX, USA</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</h4>
                                        <a href="tel:12149006362" className="mt-0.5 text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors">
                                            260-ROOF-NOW (266-3242)
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</h4>
                                        <a href="mailto:info@ccgcconstruction.com" className="mt-0.5 text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors">
                                            info@CandCGC.us
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Working Hours</h4>
                                        <p className="mt-0.5 text-sm font-bold text-slate-800">Mon - Sat: 8:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Professional Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="rounded-2xl bg-slate-50 p-6 sm:p-8 shadow-sm border border-slate-200/80">
                                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                                    Send Us a Message
                                </h3>
                                <p className="text-xs text-slate-500 mb-6">
                                    Fill out the form below and our experts will get back to you shortly.
                                </p>

                                {isSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-2xl border border-slate-200">
                                        <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3" />
                                        <h4 className="text-lg font-bold text-slate-800">Message Sent Successfully!</h4>
                                        <p className="text-xs text-slate-500 mt-1 max-w-xs">
                                            Thank you for reaching out. We will contact you soon.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    placeholder="Alexander Vance"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    placeholder="347-766-3669"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="example@domain.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">Your Message</label>
                                            <textarea
                                                name="message"
                                                rows={4}
                                                required
                                                placeholder="Tell us about your roofing needs..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" /> Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- FAQ SECTION --- */}
                <div>
                    {/* Section Header */}
                    <div className="mb-16 text-center">
                        <p className="text-xs font-bold uppercase tracking-[3px] text-blue-400">
                            Ask Question
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                            Top-Quality Roofing FAQ
                        </h2>
                        <p className="mt-3 text-slate-300 max-w-2xl mx-auto text-base">
                            Roof Service involves repairing, replacing, or maintaining roofs for residential and commercial buildings. Trust our experienced team.
                        </p>
                    </div>

                    {/* FAQ Accordion List */}
                    <div className="mx-auto max-w-4xl space-y-4">
                        {FAQS.map((faq) => {
                            const isOpen = openId === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className="overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-200 hover:border-blue-400"
                                >
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold text-blue-600 tracking-wider">
                                                {faq.id}.
                                            </span>
                                            <span className="text-base md:text-lg font-bold text-slate-900">
                                                {faq.question}
                                            </span>
                                        </div>
                                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-transform duration-300 ${isOpen ? "rotate-180 bg-blue-100 text-blue-600" : ""}`}>
                                            <ChevronDown className="h-5 w-5" />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-6 pt-0 text-slate-600 text-base leading-relaxed border-t border-slate-100 mt-2 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}