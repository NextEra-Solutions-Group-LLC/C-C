import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, CheckCircle2 } from "lucide-react";
import { BLOG_POSTS } from "@/app/data/blogPosts";
import CommentForm from "./CommentForm";

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        id: post.id,
    }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const post = BLOG_POSTS.find((p) => p.id === id);

    if (!post) {
        return (
            <div className="py-36 text-center bg-white">
                <h1 className="text-2xl font-bold text-slate-900">Blog post not found!</h1>
                <Link href="/" className="text-blue-600 underline mt-4 inline-block font-medium">Go back home</Link>
            </div>
        );
    }

    return (
        <article className="w-full bg-white text-slate-900 pb-24">

            <div className="relative w-full h-[50vh] md:h-[60vh] bg-slate-950 flex items-center justify-center text-center px-4">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover brightness-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

                <div className="relative z-10 max-w-4xl mx-auto mt-12">
                    <span className="inline-block rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white mb-4 shadow-md tracking-wider uppercase">
                        {post.category}
                    </span>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        {post.title}
                    </h1>
                    <div className="mt-6 flex items-center justify-center gap-4 text-xs md:text-sm font-medium text-slate-300">
                        <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-blue-400" /> {post.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-blue-400" /> {post.date}</span>
                    </div>
                </div>
            </div>





            <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">

                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-10">
                    {post.introText}
                </p>

                {/* Key Takeaways */}
                {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            Key Takeaways
                        </h3>
                        <ul className="space-y-3">
                            {post.keyTakeaways.map((takeaway, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                    <span>{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Sections */}
                {post.sections && (
                    <div className="space-y-12">
                        {post.sections.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                    {section.heading}
                                </h2>
                                <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                                    {section.body}
                                </p>

                                {section.expertNote && (
                                    <div className="border-l-4 border-blue-600 bg-blue-50/50 p-5 rounded-r-xl my-6">
                                        <h4 className="font-bold text-blue-900 text-sm uppercase tracking-wider mb-1">C&CGC Expert Note</h4>
                                        <p className="text-slate-800 italic text-sm md:text-base leading-relaxed">
                                            &ldquo;{section.expertNote}&rdquo;
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                    <div className="mt-20 border-t border-slate-200 pt-16">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                            Frequently Asked Questions
                        </h3>
                        <div className="space-y-6">
                            {post.faqs.map((faq, i) => (
                                <div key={i} className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-sm">
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                {post.callToAction && (
                    <div className="mt-16 bg-slate-950 text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
                        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                            {post.callToAction.title}
                        </h3>
                        <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                            {post.callToAction.description}
                        </p>
                        <div className="pt-4">
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all duration-200"
                            >
                                Visit Website & Schedule Inspection
                            </a>
                        </div>
                    </div>
                )}

                {/* Related Posts */}
                <div className="mt-20 border-t border-slate-200 pt-16">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 uppercase tracking-wider">
                        Related Posts
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3).map((relPost) => (
                            <Link
                                href={`/blog/${relPost.id}`}
                                key={relPost.id}
                                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                            >
                                <div className="relative w-full h-48 bg-slate-100">
                                    <Image
                                        src={relPost.image}
                                        alt={relPost.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 text-base">
                                        {relPost.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                                        <span>{relPost.author}</span>
                                        <span>{relPost.date}</span>
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Comment Form Component */}
                <CommentForm />

            </div>
        </article>
    );
}