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

	const sortCards = (sort: string) => {
		let sorted = [...cards]
		switch (sort) {
			case "Most Clicks":
				sorted = sorted.sort((a, b) => b.clicks - a.clicks)
				break;
			case "Fewest Clicks":
				sorted = sorted.sort((a, b) => a.clicks - b.clicks)
				break;
			case "First Clicked":
				sorted = sorted.sort((a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0))
				break;
			case "Last Clicked":
				sorted = sorted.sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
				break;
		}
		setCards(sorted)
	}

	return (
		<div className="space-y-15">
			<span className="flex flex-row justify-between max-w-2xl mx-auto">
				<button className="border px-4" onClick={clearCards}>Clear</button>

				<select className="border bg-[var(--background)] focus:outline-none" onChange={(e) => sortCards(e.target.value)}>
					<option>Most Clicks</option>
					<option>Fewest Clicks</option>
					<option>First Clicked</option>
					<option>Last Clicked</option>
				</select>
			</span>
			<div className="grid grid-cols-3 grid-rows-x gap-y-4 gap-x-4 md:grid-cols-4 md:grid-rows-2 max-w-fit mx-auto md:gap-y-4 md:gap-x-4">
				{cards.map((card, index) =>
					<button onClick={() => incrementClick(index)} key={index}>
						<CardComponent id={card.id} clicks={card.clicks} createdAt={card.createdAt} />
					</button>
				)}
			</div>
		</div>
	)
}
