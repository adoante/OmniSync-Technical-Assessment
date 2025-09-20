export type Card = {
	id: number
	clicks: number
	createdAt?: Date
}

export type UpdateCardRequest = {
	clicks: number
}

export type CreateCardRequest = {
	createdAt: Date
}

export type CardResponse = {
	card: Card
	error?: string
}

export type CardsResponse = {
	deck: Card[]
	error?: string
}
