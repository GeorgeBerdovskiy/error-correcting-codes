# Error Correcting Codes
## Introduction

If your friend has ever sent you a text message with a typo, you can usually figure out the intended word. That's because we subconsciously consider context and language rules as we read.

Digital communications are also prone to errors. Satellite radio waves may experience interference as they beam Family Guy to your television. Hardware components inside your computer can malfunction and degrade over time, causing data corruption. These processes are inevitable, so we must design communication systems that account for their effects. This is called _fault tolerance_.

However, we can't just tell our computer to guess what the message was supposed to be. It's not human and is incapable of thought. Therefore, we want to develop an algorithm that systematically detects and corrects errors in received messages. We will use **coding theory** to accomplish this!

## Coding Theory
Coding theory is the study of error-correcting codes for reliable data transmission across noisy channels. Before we dive into the details, it's helpful to establish several definitions.

### Channel, Senders, and Receivers
A **channel** is any medium for the transfer of information. Common examples include
- Sound
- Radio Communications
- Bluetooth
- Computer Storage

When data is sent through a channel, it always has a **sender** and a **receiver**. Sometimes they are obvious. When shouting to your friend at a loud concert, you're the sender, your friend is the receiver, and the air at the concert is the channel. Sometimes the two are less clear. When data is stored on your computer, your _present_ self is the sender and your _future_ self is the receiver.

### Discrete and Continuous Channels
In a **discrete** channel, data is delivered in "chunks." In a **continuous** channel, data is delivered as a constant stream. Assume that throughout the rest of this blog, all channels will be **discrete**.

### Symbols and Alphabets
Messages will be composed of **symbols** or **characters** from a finite set called an **alphabet**. The simplest one is the **binary alphabet**

{% latexx %}
$B = \\{ 0, 1\\}$
{% /latexx %}

where each element is called a **bit**.
