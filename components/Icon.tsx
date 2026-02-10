import Image from "next/image";

type IconProps = {
	src: string;
	alt: string;
	className?: string;
	priority?: boolean;
};

export function Icon({ src, alt, className, priority }: IconProps) {
	return (
		<Image
			src={src}
			alt={alt}
			width={32}
			height={32}
			className={className}
			priority={priority}
		/>
	);
}
