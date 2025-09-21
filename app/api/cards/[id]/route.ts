import { NextResponse, NextRequest } from "next/server";
import { updateCard, getCard } from "@/lib/db";
import type { Card, CardResponse, UpdateCardRequest } from "@/types/card";

// Updates card by ID with either clicks or clicks+first click time
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const body = await request.json()

		if (!id || isNaN(Number(id))) {
			const card: Card = { id: 0, clicks: 0, time: null }
			const response: CardResponse = { card: card, error: "Invalid ID" }
			return NextResponse.json(response, { status: 400 })
		}

		const updateCardRequest: UpdateCardRequest = { id: Number(id), ...body }
		const card: Card = await updateCard(updateCardRequest)

		if (!card) {
			const card: Card = { id: 0, clicks: 0, time: null }
			const response: CardResponse = { card: card, error: "Card not found" }
			return NextResponse.json(response, { status: 404 })
		}

		const response: CardResponse = { card: card }
		return NextResponse.json(response, { status: 200 })
	} catch (err) {
		console.error("Error updating card:", err)
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}

// Gets card by ID
export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params

		if (!id || isNaN(Number(id))) {
			const card: Card = { id: 0, clicks: 0, time: null }
			const response: CardResponse = { card: card, error: "Invalid ID" }
			return NextResponse.json(response, { status: 400 })
		}

		const card: Card = await getCard(Number(id))

		if (!card) {
			const card: Card = { id: 0, clicks: 0, time: null }
			const response: CardResponse = { card: card, error: "Card not found" }
			return NextResponse.json(response, { status: 404 })
		}

		const response: CardResponse = { card: card }
		return NextResponse.json(response, { status: 200 })
	} catch (err) {
		console.error("Error fetching card:", err)
		return NextResponse.json({ error: "Internal server error" }, { status: 500 })
	}
}
