# Three Simple Codes

We'll begin our exploration of error-correcting codes by examining three simple codes presented in Oliver Pretzel's _Error-Correcting Codes and Finite Fields_.

## The ASCII Parity Check
Most modern computers store information in chunks of memory called _bytes_. Each byte contains eight _bits_. Most computers also use a code called ASCII (American Standard Code for Information Interchange) to represent characters using bytes.

For example, the letter  

{% latexx %}
$\hspace{0.1cm}a\hspace{0.1cm}$ 
{% /latexx %} 

 can be represented by the bit sequence

{% latexx %}
$\hspace{0.1cm} \texttt{1100001}$
{% /latexx %}

.

You can represent any integer between 0 and 255 using eight bits, but since English only requires about 80 characters, seven bits should be enough.

{% latexx %}
$\texttt{1100001} \rightarrow a \\\ \texttt{1011010} \rightarrow Z \\\ \texttt{0100101} \rightarrow \\%$
{% /latexx %}

This means we can use the first bit as a _parity check_. The term _parity_ is the mathematical term for evenness or oddness. If the number of 1s in the byte is even, we set the parity bit to 0. If the number of 1s in the byte is odd, we set the parity bit to 1.

{% latexx %}
$\texttt{\underline{1}1100001} \rightarrow a \\\ \texttt{\underline{0}1011010} \rightarrow Z \\\ \texttt{\underline{1}0100101} \rightarrow \\%$
{% /latexx %}

"Now if a byte is transferred and one of the bits goes wrong, then the number of ls becomes odd. So the receiver can ask for a retransmission. There is no way the receiver can tell which bit went wrong, and if two bits are incorrect the receiver will let the byte through."

## The Triple Repitition Code
Another simple code is the _triple repitition code_, in which we repeat our message three times. Our decoder will read all three copies of the message, and if one differs from the other two it assumes the other two are correct.

If all three differ, then it knows there's an error but cannot determine where the error is and/or which message is correct.

{% interaction %}
2
{% /interaction %}

## Comparison
Now that we've briefly explored three simple codes, how can we compare them and see which is best? It's necessary to now introduce several definitons.

{% latexx %}
$\textrm{If A is an alphabet an A-word or A-block of length n is a sequence of n symbols from A. The set of A-words of length n is denoted by An.}$
{% /latexx %}

And now that we've defined a block, let's formally define a block code:

{% latexx %}
$\textrm{An (n, m)-block code C over the alphabet A of size qconsists of a set of precisely qm code words in An.}$
{% /latexx %}