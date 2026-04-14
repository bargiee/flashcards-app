import dotenv from 'dotenv';
import { startImportConsumer } from './queue/importConsumer';

dotenv.config();

async function main() {
    await startImportConsumer();
}

main().catch((err) => {
    console.error('Import worker failed to start:', err);
    process.exit(1);
});
