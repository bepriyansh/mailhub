# Bulk Email Sender

This project allows you to send emails in bulk by uploading an Excel sheet containing a column with email addresses. The system will automatically detect the emails, and you can mail all recipients.

## Installation

```bash
npm install
```
```
npm run ready
```

## Start

- Then start the project by running the given command in the project directory:

```bash
npm start
```

## Architecture

This project utilizes a custom message queue system built with SOLID principles to handle email sending. The primary components are:

1. **Next.js**: 
    - Handles user authentication.
    - Allows users to upload an Excel sheet with email addresses.
    - Provides a user interface for sending emails.

2. **Node.js server**:
    - Manages the email sending process.
    - Uses a custom message queue system for job queueing and processing.
    - Uses Nodemailer for sending emails.

3. **Custom Message Queue System**:
    - A message queue system built from scratch following SOLID principles for managing the concurrent processing of email sending jobs.

4. **Nodemailer**:
    - A module for Node.js applications to send emails.

## Custom Message Queue Implementation

In this project, a custom message queue system replaces BullMQ. The system follows SOLID principles and provides flexibility, scalability, and error handling through the use of Dead-Letter Queues (DLQs). Here’s how it works:

### Queue System

1. **MessageQueue Class**:
    - Manages the queue and processes messages using a configurable concurrency limit. 
    - Utilizes DLQs for failed message retries, adhering to the **Single Responsibility** and **Dependency Inversion** principles.

2. **MessageProcessor Interface**:
    - Defines the `process` method that each processor (e.g., EmailProcessor) must implement. This ensures that processors follow the **Open/Closed Principle**, allowing new processors without modifying the base class.
      

    ```typescript
    export interface Message {
        id: number;
        data: any;
        delay?: number;
    }

    export default abstract class MessageProcessor {
        abstract process(message: Message): Promise<void>;
    }
    ```

3. **EmailProcessor Class**:
    - A specific implementation of `MessageProcessor` that handles email sending using Nodemailer.
  

    ```typescript
    import { sendEmail } from "../utils/sendMail";
    import MessageProcessor, { Message } from "./MessageProcessor";

    export default class EmailProcessor extends MessageProcessor {
        async process(message: Message): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    sendEmail(message).then(resolve).catch(reject);
                }, message.delay || 0);
            });
        }
    }
    ```

4. **Dead-Letter Queues (DLQs)**:
    - When a message fails to process, it is retried through multiple DLQs, with increasing delay intervals. This ensures robust handling of failures.


    ```typescript
    private createDLQChain(processor: EmailProcessor, concurrency: number, numberOfDLQs: number): MessageQueue | null {
        let prevDLQ: MessageQueue | null = null;
        for (let i = 0; i < numberOfDLQs; i++) {
            const retryDelay = Math.pow(3, numberOfDLQs - i) * 1000;
            const curDLQ: MessageQueue = new MessageQueue(processor, concurrency, prevDLQ, retryDelay);
            prevDLQ = curDLQ;
        }
        return prevDLQ;
    }
    ```

### Producer

The `Producer` class is responsible for adding messages to the queue.


```typescript
export default class Producer {
    private queue: MessageQueue;

    constructor(queue: MessageQueue) {
        this.queue = queue;
    }

    produce(data: any): void {
        const message: Message = {
            id: Date.now(),
            data: data,
            delay: 0,
        };
        this.queue.addMessage(message);
    }
}
```


## Login

To use the bulk email sender, you need to log in with your credentials. The login method is detailed on the docs page of the website.
