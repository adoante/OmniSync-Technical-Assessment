import { Pool } from "pg";
import { Card } from "@/types/card";
import { CreateCardRequest } from "@/types/card";

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT)
})

const getCards = async (): Promise<Card[]> => {
	const result = await pool.query<Card>("SELECT * FROM cards")
	const cards: Card[] = result.rows
	return cards
}

const createCard = async (create: CreateCardRequest): Promise<Card> => {
	const result = await pool.query<Card>(
		`
		INSERT INTO cards (created_at)
		VALUES ($1)
		RETURNING *
		`,
		[create.createdAt]
	)
	return result.rows[0]
}

export { createCard, getCards }
