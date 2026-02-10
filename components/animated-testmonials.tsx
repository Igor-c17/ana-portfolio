"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type Testimonial = {
	quote: string;
	name: string;
	designation: string;
	src: string;
	companyLogo?: string;
};

type Props = {
	testimonials: Testimonial[];
	autoplay?: boolean;
	intervalMs?: number;
};

const ROTATIONS = [-10, -5, 0, 5, 10, -8, 8, -3, 3, -7] as const;

function getRotation(index: number) {
	return ROTATIONS[index % ROTATIONS.length];
}

export function AnimatedTestimonials({
	testimonials,
	autoplay = false,
	intervalMs = 5000,
}: Props) {
	const [active, setActive] = useState(0);

	const total = testimonials.length;

	const handleNext = useCallback(() => {
		if (!total) return;
		setActive((prev) => (prev + 1) % total);
	}, [total]);

	const handlePrev = useCallback(() => {
		if (!total) return;
		setActive((prev) => (prev - 1 + total) % total);
	}, [total]);

	useEffect(() => {
		if (!autoplay || total <= 1) return;

		const id = window.setInterval(handleNext, intervalMs);
		return () => window.clearInterval(id);
	}, [autoplay, total, intervalMs, handleNext]);

	const activeTestimonial = useMemo(() => {
		return testimonials[active];
	}, [testimonials, active]);

	if (!total) return null;

	return (
		<div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
			<div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
				{/* IMAGEM */}
				<div>
					<div className="relative h-80 w-full">
						<AnimatePresence mode="popLayout" initial={false}>
							{testimonials.map((t, index) => {
								const activeNow = index === active;

								// Transform 100% determinístico (evita divergência SSR/CSR)
								const baseZ = activeNow ? 0 : -100;
								const baseScale = activeNow ? 1 : 0.95;
								const baseOpacity = activeNow ? 1 : 0.7;
								const baseRotate = activeNow ? 0 : getRotation(index);

								const transform = `translateZ(${baseZ}px) scale(${baseScale}) rotate(${baseRotate}deg)`;

								return (
									<motion.div
										key={`${t.name}-${t.src}-${index}`}
										initial={{
											opacity: 0,
											transform: `translateZ(-100px) scale(0.9) rotate(${getRotation(
												index,
											)}deg)`,
										}}
										animate={{
											opacity: baseOpacity,
											transform,
											zIndex: activeNow ? 40 : total + 2 - index,
											y: activeNow ? [0, -80, 0] : 0,
										}}
										exit={{
											opacity: 0,
											transform: `translateZ(100px) scale(0.9) rotate(${getRotation(
												index + 1,
											)}deg)`,
										}}
										transition={{
											duration: 0.4,
											ease: "easeInOut",
										}}
										className="absolute inset-0 origin-bottom will-change-transform"
									>
										<Image
											src={t.src}
											alt={t.name}
											width={500}
											height={500}
											draggable={false}
											className="h-full w-full rounded-3xl object-cover object-center"
											priority={activeNow}
										/>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
				</div>

				{/* TEXTO */}
				<div className="flex flex-col justify-between py-4">
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={`${active}-${activeTestimonial.name}`}
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -20, opacity: 0 }}
							transition={{ duration: 0.2, ease: "easeInOut" }}
						>
							<div className="mb-2 flex items-center gap-3">
								<h3 className="text-2xl font-bold text-black dark:text-white">
									{activeTestimonial.name}
								</h3>

								{activeTestimonial.companyLogo ? (
									<Image
										src={activeTestimonial.companyLogo}
										alt="Company logo"
										width={32}
										height={32}
										className="rounded object-contain"
									/>
								) : null}
							</div>

							<p className="text-sm text-gray-500 dark:text-neutral-500">
								{activeTestimonial.designation}
							</p>

							<motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
								{activeTestimonial.quote.split(" ").map((word, i) => (
									<motion.span
										key={`${active}-word-${i}-${word}`}
										initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
										animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
										transition={{
											duration: 0.2,
											ease: "easeInOut",
											delay: 0.02 * i,
										}}
										className="inline-block"
									>
										{word}&nbsp;
									</motion.span>
								))}
							</motion.p>
						</motion.div>
					</AnimatePresence>

					{/* CONTROLES */}
					<div className="flex gap-4 pt-12 md:pt-0">
						<button
							type="button"
							onClick={handlePrev}
							className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
							aria-label="Previous testimonial"
						>
							<IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
						</button>

						<button
							type="button"
							onClick={handleNext}
							className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
							aria-label="Next testimonial"
						>
							<IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
