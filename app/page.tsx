"use client"

import { CardComponent } from "@/components/card"

import { useState, useEffect } from "react"

export default function Home() {
	const [cards, setCards] = useState<React.ReactNode[]>([])

	useEffect(() => {

		const cardComponents: React.ReactNode[] = []
		for (let i = 1; i < 9; i++) {
			cardComponents.push(<CardComponent key={i} id={i} />)
		}

		setCards(cardComponents)
	}, [])

	return (
		<div className="border grid grid-cols-3 grid-rows-x gap-y-4 gap-x-4 md:grid-cols-4 md:grid-rows-2 max-w-fit mx-auto md:gap-y-4 md:gap-x-4">
			{cards.map((card) => (
				card
			))}

		</div>
	)
}
