// // import EmailProcessor from "./EmailProcessor.js";
// // import MessageQueue from "./MessageQueue.js";
// // import Producer from "./Producer.js";


// // // Create a message processor (EmailProcessor)
// // const emailProcessor = new EmailProcessor();

// // // Function to create a chain of DLQs
// // function createDLQChain(processor, concurrency, numberOfDLQs) {
//     //     let prevDLQ = null;
//     //     for (let i = 0; i < numberOfDLQs; i++) {
//         //     const retryDelay = (3**(numberOfDLQs-i))*1000;
//         //     console.log(i, retryDelay)
//         //     const curDLQ = new MessageQueue(processor, concurrency, prevDLQ, retryDelay);
//         //     prevDLQ = curDLQ;
//         //     }
//         //     return prevDLQ;
//         // }
        
//         // // Create a chain of 2 DLQs
//         // const numberOfDLQs = 3; // Change this value for n DLQs
//         // const dlqChain = createDLQChain(emailProcessor, 5, numberOfDLQs);
        
//         // // Create the main message queue with the last DLQ in the chain
//         // const messageQueue = new MessageQueue(emailProcessor, 5, dlqChain);
        
//         // // Create a producer to add messages to the queue
//         // const producer = new Producer(messageQueue);
        
//         // // Add messages to the queue
//         // for(let i = 1; i <= 50; i++){
// //     producer.produce(`Email ${i}`);
// // }

import QueueSystemInstance from "./queueSystem.js";

const producer = QueueSystemInstance.getProducer();

const id = setInterval(()=>{    
    for(let i = 1; i <= 5; i++){
        producer.produce(`Email ${i}`);
    }
},5000);

setTimeout(()=>clearInterval(id), 31000)