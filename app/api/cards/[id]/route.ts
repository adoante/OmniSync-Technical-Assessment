import { NextResponse, NextRequest } from "next/server";
import { updateCard, getCard } from "@/lib/db";
import type { Card, CardResponse, UpdateCardRequest } from "@/types/card";

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const body = await request.json()

	const updateCardRequest: UpdateCardRequest = { id: Number(params.id), ...body }
	const card: Card = await updateCard(updateCardRequest)
	const response: CardResponse = { card: card }
	return NextResponse.json(response, { status: 200 })
}

export async function GET(
	_request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const card: Card = await getCard(Number(params.id))
	const response: CardResponse = { card: card }
	return NextResponse.json(response, { status: 200 })
}
