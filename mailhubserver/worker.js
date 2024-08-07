import { Worker } from 'bullmq';
import { sendEmail } from './utils/sendMail.js';

// export const addDelay = async (time) => {
//     return new Promise((resolve, reject) => setTimeout(() => resolve(), 1000 * time))
// }

// export const sendMail = async (job) => {
//     await addDelay(2);
// }

const concurrency = 5;
const worker = new Worker('email-queue', sendEmail, {
    connection: {
        host: 'localhost',
        port: 6379
    },
    concurrency: concurrency
});

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});