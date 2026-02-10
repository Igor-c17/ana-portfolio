"use client";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
	rows = 8,
	cols = 27,
	cellSize = 56,
	autoPulse = true,
	pulseInterval = 3600,
	popHeight = 28,
}: {
	rows?: number;
	cols?: number;
	cellSize?: number;
	autoPulse?: boolean;
	pulseInterval?: number;
	popHeight?: number;
}) => {
	const [clickedCell, setClickedCell] = useState<{
		row: number;
		col: number;
	} | null>(null);
	const [rippleKey, setRippleKey] = useState(0);

	// ✅ timers controlados (reseta quando clicar)
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const firstRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const centerCell = useMemo(() => {
		const row = Math.floor((rows - 1) / 2);
		const col = Math.floor((cols - 1) / 2);
		return { row, col };
	}, [rows, cols]);

	// ✅ limpa qualquer timer ativo
	const clearTimers = useCallback(() => {
		if (firstRef.current) {
			clearTimeout(firstRef.current);
			firstRef.current = null;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	// ✅ agenda o próximo pulso (sempre “zera”)
	const scheduleNextPulse = useCallback(
		(delay: number = pulseInterval) => {
			if (!autoPulse) return;
			clearTimers();

			timeoutRef.current = setTimeout(() => {
				// pop do centro
				setRippleKey((k) => k + 1);
				// agenda o próximo
				scheduleNextPulse(pulseInterval);
			}, delay);
		},
		[autoPulse, pulseInterval, clearTimers],
	);

	// Dispara ripple no centro (usado pelo pop-end)
	const triggerCenterRipple = useCallback(() => {
		setClickedCell(centerCell);
		setRippleKey((k) => k + 1);

		// ✅ qualquer trigger manual reseta o countdown do autoPulse
		if (autoPulse) scheduleNextPulse(pulseInterval);
	}, [centerCell, autoPulse, scheduleNextPulse, pulseInterval]);

	useEffect(() => {
		if (!autoPulse) {
			clearTimers();
			return;
		}

		// primeira animação logo de cara (delay bonito)
		firstRef.current = setTimeout(() => {
			setRippleKey((k) => k + 1);
			scheduleNextPulse(pulseInterval);
		}, 300);

		return () => clearTimers();
	}, [autoPulse, pulseInterval, scheduleNextPulse, clearTimers]);

	return (
		<div
			className={cn(
				"absolute inset-0 h-full w-full",
				"[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
				"dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]",
			)}
		>
			<div className="relative h-auto w-auto overflow-hidden">
				<div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />

				<DivGrid
					key={`base-${rippleKey}`}
					className="mask-radial-from-20% mask-radial-at-top opacity-600"
					rows={rows}
					cols={cols}
					cellSize={cellSize}
					borderColor="var(--cell-border-color)"
					fillColor="var(--cell-fill-color)"
					clickedCell={clickedCell}
					centerCell={centerCell}
					popHeight={popHeight}
					onCenterPopEnd={() => triggerCenterRipple()}
					onCellClick={(row, col) => {
						setClickedCell({ row, col });
						setRippleKey((k) => k + 1);

						// ✅ clique reseta o timer do autoPulse (zera contagem)
						if (autoPulse) scheduleNextPulse(pulseInterval);
					}}
					interactive
				/>
			</div>
		</div>
	);
};

type DivGridProps = {
	className?: string;
	rows: number;
	cols: number;
	cellSize: number;
	borderColor: string;
	fillColor: string;
	clickedCell: { row: number; col: number } | null;
	onCellClick?: (row: number, col: number) => void;
	interactive?: boolean;
	centerCell: { row: number; col: number };
	onCenterPopEnd?: () => void;
	popHeight?: number;
};

type CellStyle = React.CSSProperties & {
	"--delay"?: string;
	"--duration"?: string;
	"--pop"?: string;
};

const DivGrid = ({
	className,
	rows = 7,
	cols = 30,
	cellSize = 56,
	borderColor = "#3f3f46",
	fillColor = "rgba(14,165,233,0.3)",
	clickedCell = null,
	onCellClick = () => {},
	interactive = true,
	centerCell,
	onCenterPopEnd,
	popHeight = 14,
}: DivGridProps) => {
	const cells = useMemo(
		() => Array.from({ length: rows * cols }, (_, idx) => idx),
		[rows, cols],
	);

	const gridStyle: React.CSSProperties = {
		display: "grid",
		gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
		gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
		width: cols * cellSize,
		height: rows * cellSize,
		marginInline: "auto",
	};

	return (
		<div className={cn("relative z-[3]", className)} style={gridStyle}>
			{cells.map((idx) => {
				const rowIdx = Math.floor(idx / cols);
				const colIdx = idx % cols;

				const isCenter = rowIdx === centerCell.row && colIdx === centerCell.col;

				const distance = clickedCell
					? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
					: 0;
				const delay = clickedCell ? Math.max(0, distance * 55) : 0;
				const duration = 200 + distance * 80;

				const style: CellStyle = {
					backgroundColor: fillColor,
					borderColor,
				};

				if (clickedCell) {
					style["--delay"] = `${delay}ms`;
					style["--duration"] = `${duration}ms`;
				}

				if (isCenter) {
					style["--pop"] = `-${popHeight}px`;
				}

				return (
					<div
						key={idx}
						className={cn(
							"cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80",
							"dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
							clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
							isCenter && "animate-center-pop",
							!interactive && "pointer-events-none",
						)}
						style={style}
						onAnimationEnd={(e) => {
							if (isCenter && e.animationName === "center-pop") {
								onCenterPopEnd?.();
							}
						}}
						onClick={
							interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
						}
					/>
				);
			})}
		</div>
	);
};
