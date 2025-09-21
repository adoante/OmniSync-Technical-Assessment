import { NextResponse } from "next/server";
import { createCard, deleteCards, getCards } from "@/lib/db";
import type { Card, CardsResponse, CardResponse } from "@/types/card";

// Creates a new card and returns it
export async function POST() {
	try {
		const card: Card = await createCard()

		if (!card) {
			const card: Card = { id: 0, clicks: 0, time: null }
			const response: CardResponse = { card: card, error: "Failed to create card" }
			return NextResponse.json(response, { status: 500 })
		}

		const response: CardResponse = { card: card }
		return NextResponse.json(response, { status: 200 })
	} catch (err) {
		console.error("Error creating card:", err)
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}

// Gets all cards from database
export async function GET() {
	try {
		const cards: Card[] = await getCards()

		if (!cards) {
			const cards: Card[] = []
			const response: CardsResponse = { deck: cards, error: "Failed to get cards" }
			return NextResponse.json(response, { status: 500 })
		}

		const response: CardsResponse = { deck: cards }
		return NextResponse.json(response, { status: 200 })
	} catch (err) {
		console.error("Error fetching cards:", err)
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}

// Deletes all cards from database
// Returns number of rows deleted to confirm
export async function DELETE() {
	try {
		const rowsDeleted = await deleteCards()

		if (rowsDeleted === null || rowsDeleted === undefined) {
			return NextResponse.json({ error: "Failed to delete cards" }, { status: 500 })
		}

		return NextResponse.json({ rowsDeleted }, { status: 200 })
	} catch (err) {
		console.error("Error deleting cards:", err)
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
