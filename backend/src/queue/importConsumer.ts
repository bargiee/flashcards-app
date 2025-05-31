import amqp from 'amqplib';
import prisma from '../config/prismaClient';
import { parse } from 'csv-parse/sync';

export async function startImportConsumer() {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue('flashcard-import', { durable: true });

    channel.consume('flashcard-import', async (msg) => {
        if (!msg) return;
        const content = JSON.parse(msg.content.toString());

        try {
            const { csv, deckId } = content;
            const records = parse(csv, { columns: false, trim: true });

            for (const row of records) {
                const [term, definition] = row;
                if (term && definition) {
                    await prisma.flashcard.create({
                        data: { term, definition, deckId: Number(deckId) },
                    });
                }
            }

            channel.ack(msg);
        } catch (err) {
            console.error('Failed to process import:', err);
            channel.nack(msg, false, false);
        }
    });

    console.log('Import consumer is running');
}
