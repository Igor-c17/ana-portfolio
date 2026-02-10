"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Testimonial = {
	quote: string;
	name: string;
	designation: string;
	src: string;
	companyLogo?: string;
};

// Carrega o componente animado só no client e sem SSR
const AnimatedTestimonials = dynamic(
	() =>
		import("@/components/ui/animated-testimonials").then(
			(m) => m.AnimatedTestimonials,
		),
	{ ssr: false },
);

export default function TestimonialsClient({
	testimonials,
}: {
	testimonials: Testimonial[];
}) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Placeholder estável durante a hidratação
	if (!mounted) {
		return (
			<div className="mx-auto max-w-sm px-4 py-20 md:max-w-4xl md:px-8 lg:px-12">
				<div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
					<div className="relative h-80 w-full rounded-3xl bg-neutral-200/60 dark:bg-neutral-800/60" />
					<div className="space-y-4 py-4">
						<div className="h-8 w-2/3 rounded bg-neutral-200/60 dark:bg-neutral-800/60" />
						<div className="h-4 w-1/2 rounded bg-neutral-200/60 dark:bg-neutral-800/60" />
						<div className="mt-8 space-y-2">
							<div className="h-4 w-full rounded bg-neutral-200/60 dark:bg-neutral-800/60" />
							<div className="h-4 w-11/12 rounded bg-neutral-200/60 dark:bg-neutral-800/60" />
							<div className="h-4 w-10/12 rounded bg-neutral-200/60 dark:bg-neutral-800/60" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}
