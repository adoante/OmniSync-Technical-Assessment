import { Pool } from "pg";
import { Card } from "@/types/card";

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT)
})

const getCards = async () => {
	const result = await pool.query<Card>("SELECT id FROM cards")
	const cards: Card[] = result.rows
	console.log(cards)
}

const createCard = async (card: Card) => {
	const result = await pool.query<Card>(
		`
		INSERT INTO cards (clicks, created_at)
		VALUES ($1, $2, $3)
		RETURNING *
		`
	)
	return result.rows[0]
}

export { getCards, createCard }
