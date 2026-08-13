"use client";

import React, { useState } from "react";

export default function CommentForm() {
    const [formData, setFormData] = useState({
        comment: "",
        name: "",
        email: "",
        saveInfo: false,
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // এখানে আপনার সাবমিট লজিক বা API কল করতে পারেন
        console.log("Form Data Submitted:", formData);
        setSubmitted(true);
    };

    return (
        <div className="mt-20 border-t border-slate-200 pt-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                LEAVE A REPLY
            </h3>
            <p className="text-sm text-slate-500 mb-8">
                Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
            </p>

            {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl font-medium">
                    Thank you for your comment! It has been successfully submitted.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Comment <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="comment"
                            rows={6}
                            required
                            value={formData.comment}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="save-info"
                            name="saveInfo"
                            checked={formData.saveInfo}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="save-info" className="text-sm text-slate-600 select-none">
                            Save my name and email in this browser for the next time I comment.
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-[#0066cc] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-lg shadow-md transition-all duration-200"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}