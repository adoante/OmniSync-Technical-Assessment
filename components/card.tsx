
import { useState } from "react"

interface CardProps {
	id: number
}

const CardComponent = ({ id }: CardProps) => {
	const [clicks, setClicks] = useState(0)
	const [createdAt, setCreatedAt] = useState<Date>()

	const updateClicks = () => {
		if (clicks == 0) {
			setCreatedAt(new Date())
		}

		setClicks(clicks + 1)
	}

	return (
		<button
			onClick={updateClicks}
			className="border w-40 px-4 py-6 space-y-6"
		>
			<p>{clicks}</p>
			<p>{id}</p>
			<p className="text-center"> {createdAt?.toLocaleTimeString() ?? "00:00:00 PM"}</p>
		</button>
	)
}

export { CardComponent }
