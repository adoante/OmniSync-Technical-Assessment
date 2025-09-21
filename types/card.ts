// matches database card table
export type Card = {
	id: number
	clicks: number
	time?: Date | null
}

// Used in db.ts and [id].ts
export type UpdateCardRequest = {
	id: number
	clicks: number
	time?: Date | null
}

// Used in cards/route.ts and [id]/route.ts
export type CardResponse = {
	card: Card
	error?: string
}

export type CardsResponse = {
	deck: Card[]
	error?: string
}
