import { NextResponse } from "next/server";
import { createCard, deleteCards, getCards } from "@/lib/db";
import type { Card, CreateCardRequest, CardsResponse, CardResponse } from "@/types/card";

export async function POST() {
	const request: CreateCardRequest = { createdAt: new Date() }
	const card: Card = await createCard(request)
	const response: CardResponse = { card: card }
	return NextResponse.json(response, { status: 200 })
}

export async function GET() {
	const cards: Card[] = await getCards()
	const response: CardsResponse = { deck: cards }
	return NextResponse.json(response, { status: 200 })
}

export async function DELETE() {
	const rowsDeleted = await deleteCards()
	return NextResponse.json(rowsDeleted, { status: 200 })
}
