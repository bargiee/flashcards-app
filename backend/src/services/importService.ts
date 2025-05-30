import amqp from 'amqplib';

export const queueImport = async (csv: string, deckId: number) => {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue('flashcard-import', { durable: true });

    channel.sendToQueue('flashcard-import', Buffer.from(JSON.stringify({ csv, deckId })), {
        persistent: true,
    });

    await channel.close();
    await conn.close();
};
