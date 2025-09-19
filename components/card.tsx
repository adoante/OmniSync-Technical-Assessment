import React from "react"

interface CardProps {
	id: number
	clicks?: number
	createdAt?: Date
}

const Card = ({ id, clicks, createdAt }: CardProps) => {
	return (
		<div>
			<p>{id}</p>
			<p>{clicks ?? 0}</p>
			<p>{createdAt?.toDateString() ?? "Click me!"}</p>
		</div>
	)
}

export { Card }
