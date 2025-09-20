interface CardProps {
	id: number
	clicks: number
	createdAt: Date
}

const CardComponent = ({ id, clicks, createdAt }: CardProps) => {
	return (
		<button
			onClick={() => console.log(`Card: ${id} clicked!`)}
			className="border md:w-40 md:px-4 md:py-6 md:space-y-6 space-y-4 w-30 py-3"
		>
			<p>{clicks}</p>
			<p>{id}</p>
			<p className="text-center"> {createdAt?.toLocaleTimeString() ?? "00:00:00 PM"}</p>
		</button>
	)
}

export { CardComponent }
