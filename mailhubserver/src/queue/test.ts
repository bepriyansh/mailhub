import QueueSystemInstance from "./QueueSystem";

const producer = QueueSystemInstance.getProducer();

const id = setInterval(()=>{    
    for(let i = 1; i <= 5; i++){
        producer.produce(`Email ${i}`);
    }
},5000);

setTimeout(()=>clearInterval(id), 31000)