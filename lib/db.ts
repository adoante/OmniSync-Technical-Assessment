import { Pool } from "pg";
import { Card, UpdateCardRequest } from "@/types/card";

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

const createCard = async (): Promise<Card> => {
	const result = await pool.query<Card>(
		`
		INSERT INTO cards DEFAULT VALUES
		RETURNING *
		`,
	)
	return result.rows[0]
}

const deleteCards = async () => {
	const result = await pool.query<Card>("DELETE FROM cards *")
	await pool.query<Card>("TRUNCATE TABLE cards RESTART IDENTITY")
	return result.rowCount
}

const getCard = async (id: number) => {
	const result = await pool.query<Card>("SELECT * FROM cards WHERE id = $1", [id])
	return result.rows[0]
}

const updateCard = async (card: UpdateCardRequest): Promise<Card> => {
	let query = "UPDATE cards SET clicks = $1"

	const params: any[] = [card.clicks];

	if (card.createdAt) {
		query += ", created_at = $2 WHERE id = $3 RETURNING *";
		params.push(card.createdAt, card.id);
	} else {
		query += " WHERE id = $2 RETURNING *";
		params.push(card.id);
	}

	const result = await pool.query<Card>(query, params);
	return result.rows[0];
};

export { createCard, getCards, deleteCards, updateCard, getCard }
