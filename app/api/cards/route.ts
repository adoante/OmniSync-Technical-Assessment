import { NextResponse } from "next/server";
import { createCard, deleteCards, getCards } from "@/lib/db";
import type { Card, CardsResponse, CardResponse } from "@/types/card";

export async function POST() {
	const card: Card = await createCard()
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
