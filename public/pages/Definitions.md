# Definition

Now that we have simple definitions for **messages**, **channels**, **senders**, and **receivers**, let's introduce some formal definitions to guide our work.

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

## Encoder and Decoder
First, we must define the _block code_.

{% latexx type="fullwidth" %}
$\textrm{An ($n ,m$)-block code $C$ over the alphabet $A$ of size $q$ \\\ consists of a set of precisely $q^{m}$ \textit{code words} in $A^{n}$}$
{% /latexx %}

Now, we can define the _encoder_ and _decoder_.

{% latexx type="fullwidth" %}
$\textrm{An encoder $E$ for $C$ is a map from $A^{m}$ to $C$. It translates any $A$-word $x$ of length $m$ into a code word} \\\ \textrm{$u = E(x)$. The encoder is a} \textit{ bijective } \textrm{function.}$
{% /latexx %}

{% latexx type="fullwidth" %}
$\textrm{A decoder $D$ is the inverse map of $E$, mapping every $u = E(x)$ back to $x$.}$
{% /latexx %}

## Weight and Distance
It's also helpful to define two more terms, _weight_, _Hamming distance_, and _minimum distance_. That's because we can use them to describe the effectiveness of a code.

{% latexx type="fullwidth" %}
$\textrm{If $u = (0, 1, 0, 1, 0, 0)$ is sent and $v = \(\color{red} 1 \color{black}, \color{red} 0 \color{black}, 0, 1, 0, 0)$ is received, an error of weight 2 has happened.}$
{% /latexx %}

{% latexx type="fullwidth" %}
$\textrm{The Hamming distance $d(u, v)$ between two words $u$ and $v$ is the number of entries in which they} \\\ \textrm{differ. The Hamming weight wt($u$) of $u$ is the number of non-null entries in $u$.}$
{% /latexx %}

> Note that the Hamming distance satisfies the distance axioms!

Clearly, it's impossible for a linear code to reliably detect _and_ fix every single error that occurs. There's a limit, as we've already seen from the three simple examples on the last page. And as it turns out, we can mathematically define this limit.

{% latexx type="fullwidth" %}
$\textrm{The } \textbf{minimum distance } \textrm{$d(C)$ of $C$ (an $(n, m)$ code) is the smallest Hamming} \\\ \textrm{distance between distinct code words of $C$.}$
{% /latexx %}

In other words, the minimum distance is the smallest number of errors that can occur before one valid codeword transforms into _another_ valid codeword. Let's check the minimum distances of our three simple codes.

- The parity check code has a minimum distance of **2**
- The triple repitition code has a minimum distance of **3**
- The triple check code also has a minimum distance of **3**

> This idea is very similar to the Pigeonhole Principle! If the "pigeons" are errors and the number of baskets (errors that can occur _before_ hitting another valid codeword) is one, what's the smallest number of pigeons required to hit another codeword? Clearly it's two.

## Error Processor
Now we define an _error processor_.

{% latexx type="fullwidth" %}
$\textrm{An } \textbf{error processor } \textrm{$P$ for $C$ is a map that produces a pair $(x, u)$ when given a codeword $v$ of length $n$.} \\\ \textrm{The value of $x$ represents whether the codeword was correct (either before or after correction),} \\\ \textrm{and $u$ is the decoded codeword} \textit{ if} \textrm{ the processor was able to correct the error(s).}$
{% /latexx %}

An error processor can correct errors of weight up to _t_ and detect errors of weight up to _s + t_ if and only if

{% latexx type="fullwidth" %}
$d(C) \ge 2t + s + 1$
{% /latexx %}

## References
- Pretzel, Oliver. _Error-Correcting Codes and Finite Fields._ Oxford University Press, 1992. 