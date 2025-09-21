import { NextResponse, NextRequest } from "next/server";
import { updateCard, getCard } from "@/lib/db";
import type { Card, CardResponse, UpdateCardRequest } from "@/types/card";

// Updates card by ID with either clicks or clicks+first click time
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	const body = await request.json()

	const updateCardRequest: UpdateCardRequest = { id: Number(id), ...body }
	const card: Card = await updateCard(updateCardRequest)
	const response: CardResponse = { card: card }
	return NextResponse.json(response, { status: 200 })
}

// Gets card by ID
export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	const card: Card = await getCard(Number(id))
	const response: CardResponse = { card: card }
	return NextResponse.json(response, { status: 200 })
}
