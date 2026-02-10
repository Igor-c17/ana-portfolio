"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProfileImageProps {
	imageUrl: string;
	firstName: string;
	lastName: string;
}

export function ProfileImage({
	imageUrl,
	firstName,
	lastName,
}: ProfileImageProps) {
	const { isSignedIn } = useUser();
	const { openSignIn } = useClerk();

	const [isHovered, setIsHovered] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	function handleClick() {
		if (!isSignedIn) {
			openSignIn();
			return;
		}

		setIsOpen((prev) => !prev);
		// aqui depois você pode plugar o toggle real do chat / sidebar
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			aria-label="Toggle AI Chat Sidebar"
			className="relative aspect-square w-full overflow-hidden rounded-2xl group cursor-pointer"
		>
			<Image
				src={imageUrl}
				alt={`${firstName} ${lastName}`}
				fill
				priority
				className="object-cover transition-transform duration-300 group-hover:scale-105"
			/>

			{/* Online Badge */}
			<div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5">
				<div className="relative">
					<div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
					<div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
				</div>
				<span className="text-xs font-medium text-white">Online</span>
			</div>

			{/* Hover Overlay */}
			<div
				className={`absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="text-center space-y-3">
					{isOpen ? (
						<X className="mx-auto h-12 w-12 text-white" />
					) : (
						<MessageCircle className="mx-auto h-12 w-12 text-white" />
					)}

					<div className="text-xl font-semibold text-white">
						{isOpen ? "Close Chat" : "Chat através do WhatsApp"}
					</div>

					<div className="text-sm text-white/80">
						{isOpen ? "Click to close chat" : "Clique para abrir o Chat"}
					</div>
				</div>
			</div>
		</button>
	);
}
