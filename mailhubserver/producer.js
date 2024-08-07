import { Queue } from 'bullmq';


const emailQueue = new Queue('email-queue', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

export const addEmailToQueue = async (mailData) => {
    const res = await emailQueue.add('email data', mailData,
        {
            // delay: 1000,
            attempts: 2
        })
    console.log("Task added to queue. Job Id : ",res.id);
}
