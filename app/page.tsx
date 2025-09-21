"use client"

import { CardComponent } from "@/components/card"
import type { Card, UpdateCardRequest } from "@/types/card"
import { useState, useEffect } from "react"

export default function Home() {
	const [cards, setCards] = useState<Card[]>([])

	// Creates 8 new cards, converts time from string to Date, sorts by id and updates cards state
	const createCards = async () => {
		try {
			const cards: Card[] = await Promise.all(
				Array.from({ length: 8 }, async () => {
					const response = await fetch("/api/cards", { method: "POST" })
					const data = await response.json()

					return {
						...data.card,
						time: data.card.time ? new Date(data.card.time) : null
					}
				})
			)

			cards.sort((a, b) => a.id - b.id)
			setCards(cards)
		} catch (err) {
			console.error("Error creating cards: ", err)
		}
	}

	// Fetches all cards from the API, converts time from string to Date and returns the cards
	const getCards = async () => {
		try {
			const response = await fetch("/api/cards", { method: "GET" })
			const data = await response.json()

			return data.deck.map((card: Card) => ({
				...card,
				time: card.time ? new Date(card.time) : null
			}))
		} catch (err) {
			console.error("Error getting cards: ", err)
			return []
		}
	}

	// Updates a card by ID, converts its time from string to Date and returns the card
	const updateCard = async (request: UpdateCardRequest) => {
		try {
			const response = await fetch(`/api/cards/${request.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(request)
			})

			const data = await response.json()

			return {
				...data.card,
				time: data.card.time ? new Date(data.card.time) : null
			}
		} catch (err) {
			console.error("Error updatinging cards: ", err)
		}
	}

	// Updates the server every 2 sec with the clients cards click counts
	useEffect(() => {
		// Avoid double fetching when getting database card data
		let fetching = false

		const interval = setInterval(async () => {
			if (fetching) {
				return
			}

			fetching = true

			let deck: Card[] = await getCards()
			deck = deck.sort((a, b) => a.id - b.id)

			const sortedCards = cards.sort((a, b) => a.id - b.id)

			const changed: Card[] = []

			// only update cards with new data
			sortedCards.forEach((card, index) => {
				if (card.clicks != deck[index].clicks) {
					changed.push(card)
				}
			})

			for (const card of changed) {
				const request: UpdateCardRequest = { id: card.id, clicks: card.clicks, time: card.time }
				await updateCard(request)
			}

			fetching = false
		}, 2000)

		return () => clearInterval(interval)
	}, [cards])

	// Deletes all cards from the database
	const deleteCards = async () => {
		try {
			await fetch("/api/cards", { method: "DELETE" })
				.then(response => response.json())
				.then(data => {
					console.log(data)
				})

		} catch (err) {
			console.error("Error deleting cards: ", err)
		}
	}

	// Increments the click count for client side cards and sets timestamp on first click
	const incrementClick = async (index: number) => {
		const updatedCards = [...cards]
		const card = updatedCards[index]

		if (card.clicks == 0) {
			card.time = new Date()
		}

		card.clicks += 1

		setCards(updatedCards)
	}

	// Delete's all database data and creates cards
	const clearCards = async () => {
		await deleteCards()
		await createCards()
	}

	// Sorts cards on <select> value change
	const sortCards = (sort: string) => {
		let sorted = [...cards]
		switch (sort) {
			case "Most Clicks":
				// similar to python's sorted(list, key=lamda reverse)
				sorted = sorted.sort((a, b) => b.clicks - a.clicks)
				break
			case "Fewest Clicks":
				sorted = sorted.sort((a, b) => a.clicks - b.clicks)
				break
			case "First Clicked":
				sorted = sorted.sort((a, b) => (a.time?.getTime() ?? 0) - (b.time?.getTime() ?? 0))
				break
			case "Last Clicked":
				sorted = sorted.sort((a, b) => (b.time?.getTime() ?? 0) - (a.time?.getTime() ?? 0))
				break
		}
		setCards(sorted)
	}

	// On page load get cards from database and sort by earliest click
	// If no data create cards sorted by ID
	useEffect(() => {
		const checkEmpty = async () => {
			const deck: Card[] = await getCards()

			if (!deck.length) {
				await createCards()
			} else {
				const sortedDeck = deck.sort((a, b) => (a.time?.getTime() ?? 0) - (b.time?.getTime() ?? 0))
				setCards(sortedDeck)
			}
		}

		checkEmpty()
	}, [])

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
						<CardComponent id={card.id} clicks={card.clicks} time={card.time} />
					</button>
				)}
			</div>
		</div>
	)
}
