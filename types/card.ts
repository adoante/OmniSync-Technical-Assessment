export type Card = {
	id: number
	clicks: number
	time?: Date | null
}

export type UpdateCardRequest = {
	id: number
	clicks: number
	time?: Date | null
}

export type CardResponse = {
	card: Card
	error?: string
}

export type CardsResponse = {
	deck: Card[]
	error?: string
}
