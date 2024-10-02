# Message Queue System

This project implements a message queue system designed to efficiently handle and process messages while adhering to SOLID principles. Below is a detailed explanation of how each principle is applied in the code.

## SOLID Principles in Action

### 1. Single Responsibility Principle (SRP)
Each class in this system has a specific responsibility:
- **QueueSystem**: Initializes and manages the overall queue system.
- **MessageQueue**: Handles the message queue logic, including adding messages and processing them.
- **MessageProcessor**: Defines the interface for message processing, ensuring any processor implementation focuses solely on processing logic.
- **EmailProcessor**: Implements the `process` method to handle email-specific processing.
- **Producer**: Responsible for creating and adding messages to the queue.

### 2. Open/Closed Principle (OCP)
The system is designed to be open for extension but closed for modification:
- The **MessageProcessor** class is abstract, allowing new message processors to be added (e.g., SMSProcessor) without modifying existing code.
- New processors can be created by extending the `MessageProcessor` class, thus supporting different message types while keeping the core system intact.

### 3. Liskov Substitution Principle (LSP)
The system adheres to LSP by ensuring that any subclass of `MessageProcessor` can replace it without affecting the correctness of the program:
- The `EmailProcessor` class extends `MessageProcessor` and provides a concrete implementation of the `process` method, ensuring it can be used wherever `MessageProcessor` is expected.

### 4. Interface Segregation Principle (ISP)
The design encourages the creation of smaller, more specific interfaces:
- The **MessageProcessor** class serves as a clear interface for processing messages, ensuring that any subclass implements only what is necessary for its functionality. There are no unnecessary methods that subclasses need to implement.

### 5. Dependency Inversion Principle (DIP)
High-level modules do not depend on low-level modules; both depend on abstractions:
- The **MessageQueue** class depends on the `MessageProcessor` abstraction rather than a concrete implementation, allowing for flexibility and easier testing.
- The `Producer` class relies on the `MessageQueue`, allowing it to be decoupled from the details of how messages are processed.

## Conclusion

This message queue system is a practical demonstration of SOLID principles in software design, ensuring the code is maintainable, scalable, and easy to extend. Each component is designed to have a clear purpose, making the overall system robust and flexible for future enhancements.