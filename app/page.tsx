"use client"

import { CardComponent } from "@/components/card"
import type { Card } from "@/types/card"
import { useState, useEffect } from "react"

export default function Home() {
	const [cards, setCards] = useState<Card[]>([])

	useEffect(() => {
		// Dummy data for now
		const data: Card[] = [
			{ "id": 1, "clicks": 0 },
			{ "id": 2, "clicks": 0 },
			{ "id": 3, "clicks": 0 },
			{ "id": 4, "clicks": 0 },
			{ "id": 5, "clicks": 0 },
			{ "id": 6, "clicks": 0 },
			{ "id": 7, "clicks": 0 },
			{ "id": 8, "clicks": 0 },
		]

		setCards(data)
	}, [])

	const incrementClick = (index: number) => {
		const updatedCards = [...cards]
		const card = updatedCards[index]

		if (card.clicks == 0) {
			card.createdAt = new Date()
		}

		card.clicks = card.clicks += 1

		setCards(updatedCards)
	}

	const clearCards = () => {
		const updatedCards = [...cards]
		updatedCards.forEach((card) => {
			card.clicks = 0
			card.createdAt = undefined
		})
		setCards(updatedCards)
	}

	return (
		<>
			<button onClick={clearCards}>Clear</button>
			<div className="border grid grid-cols-3 grid-rows-x gap-y-4 gap-x-4 md:grid-cols-4 md:grid-rows-2 max-w-fit mx-auto md:gap-y-4 md:gap-x-4">
				{cards.map((card, index) =>
					<button onClick={() => incrementClick(index)} key={index}>
						<CardComponent id={card.id} clicks={card.clicks} createdAt={card.createdAt} />
					</button>
				)}
			</div>
		</>
	)
}
