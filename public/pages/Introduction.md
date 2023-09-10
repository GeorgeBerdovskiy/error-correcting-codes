# Error Correcting Codes
## Introduction

If your friend has ever sent you a text message with a typo, you can usually figure out the intended word. That's because we subconsciously consider context and language rules as we read.

Digital communications are also prone to errors. Satellite radio waves may experience interference as they beam Family Guy to your television. Hardware components inside your computer can malfunction and degrade over time, causing data corruption. These processes are inevitable, so we must design communication systems that account for their effects. This is called _fault tolerance_.

However, we can't just tell our computer to guess what the message was supposed to be. It's not human and is incapable of thought. Therefore, we want to develop an algorithm that systematically detects and corrects errors in received messages. That's where the **coding theory** saves the day!

## Coding Theory