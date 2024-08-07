# Bulk Email Sender

This project allows you to send emails in bulk by uploading an Excel sheet containing a column with email addresses. The system will automatically detect the emails and you can mail to all recipients.

## Installation

```bash
npm install
```
```
npm run ready
```

## Start

- First you need to start Docker or Docker Desktop whatever you're using
- Then start the project by running the given command in project directory 
```bash
npm start
```

## Architecture

This project utilizes a microservice architecture to handle email sending. The primary components are:

1. **Next.js**: 
    - Handles user authentication.
    - Allows users to upload an Excel sheet with email addresses.
    - Provides a user interface for sending emails.

2. **Node.js server**:
    - Manages the email sending process.
    - Uses BullMQ for job queueing and processing.
    - Uses Nodemailer for sending emails.

3. **BullMQ**:
    - A job queueing system based on Redis, used to manage the concurrent processing of email sending jobs.

4. **Nodemailer**:
    - A module for Node.js applications to send emails.

5. **Concurrently**:
    - A package used to run multiple commands concurrently, specifically using this to start the Redis server, Next.js client, Nodejs server and the BullMQ worker.

## BullMQ Usage

In the Node.js server, BullMQ is used to manage the email sending process efficiently. Here’s how it works:

1. **Queue Creation**:
    - A queue is created to manage the email sending jobs.

    ```javascript
    const Queue = require('bullmq').Queue;
    const emailQueue = new Queue('emailQueue');
    ```

2. **Job Addition**:
    - When an Excel sheet is uploaded, the emails are extracted and jobs are added to the queue.

    ```javascript
    emails.forEach(email => {
        emailQueue.add('sendEmail', { email });
    });
    ```

3. **Job Processing**:
    - A worker is created to process the jobs in the queue using BullMQ.

    ```javascript
    const Worker = require('bullmq').Worker;
    const nodemailer = require('nodemailer');

    const worker = new Worker('emailQueue', async job => {
        const { email } = job.data;
        const transporter = nodemailer.createTransport({
            // SMTP configuration
        });

        await transporter.sendMail({
            from: 'your-email@example.com',
            to: email,
            subject: 'Subject Here',
            text: 'Email Body Here',
        });
    });
    ```

4. **Running Concurrently**:
    - The `concurrently` package is used to run both the Next.js server and the BullMQ worker.

    ```json
    "scripts": {
        "start": "concurrently \"command 1\" \"command 2\"",
    }
    ```


By using BullMQ, we can efficiently handle a large number of email sending tasks, ensuring that the system remains responsive and scalable.

## Login

To use the bulk email sender, you need to log in with your credentials. The login method is detailed on the docs page of the website.

## Contribution

Feel free to contribute to this project by opening issues or submitting pull requests.

## License

This project is licensed under the MIT License.
