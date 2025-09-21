import { Pool } from "pg";
import { Card, UpdateCardRequest } from "@/types/card";

// PostgreSQL connection pool using environment variables
// env variables come from .env
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT)
})

// Get all cards from database 
const getCards = async (): Promise<Card[]> => {
	const result = await pool.query<Card>("SELECT * FROM cards")
	const cards: Card[] = result.rows
	return cards
}

// Card should never have values set for clicks or time
// at creation instead set at first click
const createCard = async (): Promise<Card> => {
	const result = await pool.query<Card>(
		`
		INSERT INTO cards DEFAULT VALUES
		RETURNING *
		`,
	)
	return result.rows[0]
}

// Deletes all cards and because ID is auto incrementing reset table
const deleteCards = async () => {
	const result = await pool.query<Card>("DELETE FROM cards *")
	await pool.query<Card>("TRUNCATE TABLE cards RESTART IDENTITY")
	return result.rowCount
}

// gets card by ID
const getCard = async (id: number) => {
	const result = await pool.query<Card>("SELECT * FROM cards WHERE id = $1", [id])
	return result.rows[0]
}

// Updates card clicks or clicks+first time clicked based on the params given
const updateCard = async (card: UpdateCardRequest): Promise<Card> => {
	let query = "UPDATE cards SET clicks = $1"

	const params: (number | Date)[] = [card.clicks];

	if (card.time) {
		query += ", time = $2 WHERE id = $3 RETURNING *";
		params.push(card.time, card.id);
	} else {
		query += " WHERE id = $2 RETURNING *";
		params.push(card.id);
	}

	const result = await pool.query<Card>(query, params);
	return result.rows[0]
}

export { createCard, getCards, deleteCards, updateCard, getCard }
