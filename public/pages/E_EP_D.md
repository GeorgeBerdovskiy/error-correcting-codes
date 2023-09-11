# Encoders, Error Processors, and Decoders

Now that we have simple definitions for **messages**, **channels**, **senders**, and **receivers**, let's introduce definitions for errors, encoding, error processing, and decoding.

## Errors
### Random Error Channel
Instead of defining an error immediately, let's begin with the definition of a **random error channel.**

{% latexx type="fullwidth" %}
$\textrm{A channel is a random error channel if for every pair of $a, b \in A$, there is a fixed probability} \\\ \textrm{that $b$ is received when $a$ was sent.}$
{% /latexx %}

Thus, an error has occured if

{% latexx %}
$a$
{% /latexx %}

was sent but 

{% latexx %}
$b$
{% /latexx %}

was received.

### Symmetric Random Error Channel
{% latexx type="fullwidth" %}
$\textrm{A random error channel is "symmetric" if $p_{a,b}$ is the same for all possible choices of pairs $a, b\in A$} \\\ \textrm{with $a \neq b$ where $p$ is the probability that a bit was changed from $a$ to $b$.}$
{% /latexx %}

Note that 

{% latexx %}
$p < \frac 12$
{% /latexx %}

because if

{% latexx %}
$p > \frac 12$
{% /latexx %}

,then the probability of receiving the _right_ bit is 

{% latexx %}
$1 - p < \frac 12$
{% /latexx %}

.

By reversing the probability of each bit being right, we once again have 

{% latexx %}
$p < \frac 12$
{% /latexx %}

. Otherwise, if we have

{% latexx %}
$p = \frac 12$
{% /latexx %}

then

the bits we receive are completely independent of the original message and our decoding efforts will be pointless.

# Encoder
For now, we'll use casual definitions of an encoder, error proccessor, and decoder.

An **encoder** is a function that