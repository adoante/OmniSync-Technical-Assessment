// component does not handle its own state for id, clicks or time
interface CardProps {
	id: number
	clicks: number
	time?: Date | null
}

const CardComponent = ({ id, clicks, time }: CardProps) => {
	return (
		<div className="text-center md:w-40 md:px-4 md:py-6 md:space-y-6 space-y-4 w-30 py-3 hover:border-[var(--highlight)] shadow-xl bg-[var(--item-bg)]">
			<p>{clicks}</p>
			<p className="font-extrabold text-2xl">{id}</p>
			<p> {time?.toLocaleTimeString() ?? "00:00:00 PM"}</p>
		</div>
	)
}

export { CardComponent }
