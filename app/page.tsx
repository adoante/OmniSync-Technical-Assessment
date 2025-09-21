"use client"

import { motion } from "framer-motion"
import { CardComponent } from "@/components/card"
import DarkModeToggle from "@/components/darkmode"
import type { Card, UpdateCardRequest } from "@/types/card"
import { useState, useEffect } from "react"

export default function Home() {
	const [cards, setCards] = useState<Card[]>([])
	const [flipCards, setFlipCard] = useState(false)

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
				if (deck && card.clicks != deck[index].clicks) {
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
		setFlipCard(prev => !prev)
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

		setFlipCard(prev => !prev)
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
		<motion.div
			className="flex flex-col justify-center items-center min-h-screen space-y-8 px-4">
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1, rotate: 360 }}
				transition={{ duration: 1, ease: "easeIn" }}

				className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-4">
				<span className="flex flex-col md:flex-row justify-between items-center w-full md:space-y-0 space-y-4 col-span-3 md:col-span-4">
					<DarkModeToggle />
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						className="px-4 py-1 cursor-pointer hover:text-[var(--highlight)] bg-[var(--item-bg)]"
						onClick={clearCards}
					>
						Clear
					</motion.button>
				</span>

				{cards.map((card, index) => (

					<motion.button
						key={index}
						className="cursor-pointer hover:text-[var(--highlight)]"
						whileHover={{
							scale: 1.1,
							transition: { duration: 0.1 }
						}}
						whileTap={{
							scale: 0.95,
							transition: { duration: 0.1 }
						}}
						initial={{ rotateY: 0 }}
						animate={flipCards ? "active" : "inactive"}
						variants={{
							inactive: { rotateY: 0 },
							active: { rotateY: 360 },
						}}
						transition={{ duration: 0.6, ease: "easeInOut" }}
						style={{ transformStyle: "preserve-3d" }}
						onClick={() => incrementClick(index)}
					>
						<CardComponent id={card.id} clicks={card.clicks} time={card.time} />
					</motion.button>
				))}
				<motion.select
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					className="focus:outline-none px-2 py-1 cursor-pointer mx-auto hover:text-[var(--highlight)] bg-[var(--item-bg)] col-span-3 md:col-span-4 text-center w-min"
					onChange={(e) => sortCards(e.target.value)}
				>
					<option>Most Clicks</option>
					<option>Fewest Clicks</option>
					<option>First Clicked</option>
					<option>Last Clicked</option>
				</motion.select>
			</motion.div>
		</motion.div >

	)
}
