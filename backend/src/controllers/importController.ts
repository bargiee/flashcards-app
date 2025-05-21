import { Request, Response } from 'express';
import amqp from 'amqplib';

export const importFlashcards = async (req: Request, res: Response) => {
    const { csv, deckId } = req.body;

    if (!csv || !deckId) {
        return res.status(400).json({ message: 'csv and deckId are required' });
    }

    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const channel = await conn.createChannel();
        await channel.assertQueue('flashcard-import', { durable: true });

        channel.sendToQueue('flashcard-import', Buffer.from(JSON.stringify({ csv, deckId })), {
            persistent: true,
        });

        await channel.close();
        await conn.close();

        res.status(200).json({ message: 'Import queued successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to queue import' });
    }
};
