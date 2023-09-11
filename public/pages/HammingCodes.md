# Hamming Codes
Now that we've developed a strong theoretical foundation, let's see its practical application by examining Hamming codes.

## The Magic Behind It
Created by Richard W. Hamming in 1950 at Bell Labs, Hamming codes are a simple yet elegant way to reliably send data through a noisy communication channel (i.e. a scratched disk). 

A Hamming code is a _block code_ of size

{% latexx %}
$2^n$
{% /latexx %}

that uses redundant bits called _parity bits_ to check for errors and correct them, if possible.

We will create a block where each bit position that represents a power of two in a row and column

{% latexx %}
$(2, 4, 8, ...)$
{% /latexx %}

will be one of our parity bits.

Then, our decoder will play a game of _yes_ or _no_ with the parity bits that represent their respective rows and columns. Each bit will count the number of columns or rows equal to 

{% latexx type="fullwidth" %}
$n/2$
{% /latexx %}

For example, a parity bit in the 8th column/row would count four columns/rows backwards from that number. We repeat this for every multiple of _n_ that is a power of two (i.e. 8). In the columns, we would count every 8 columns/rows and check four columns/rows. The parity checks count the total number of 1's in the respective row(s) or column(s) of a parity bit, add them up, and see if the total is an odd or even number. 

We can also view this as the _exclusive or_ of two bits.

{% latexx type="fullwidth" %}
$0 \oplus 0 = 0 \textit{ even} \\\ 0 \oplus 1 = 1 \textit{ odd} \\\ 1 \oplus 0 = 1 \textit{ odd} \\\ 1 \oplus 1 = 0 \textit{ even}$
{% /latexx %}

For example, here is a 4x4 Hamming Block

{% latexx type="fullwidth" %} 
$\begin{array}{cccc} 1 & 1 & 1 & 0 \\\ 0 & 1 & 0 & 0 \\\ 0 & 1 & 1 & 1 \\\ 0 & 0 & 1 & 0 \\\ \end{array}$ 
{% /latexx %}


Our block is 16 bits large and we know that the square root of 16 is 4. Thus, we will have **4** parity bits here of powers of 2. Therefore, our parity bits will be at columns and rows **2** and **4**. 

We will now check the parity of each respective column and row to determine if it's odd or even. Something to keep in mind is that we ignore the 0th bit for now, so we work with 15 bits instead of 16. Since we have four parity checks in a block of 16, this means that we will have 11 bits of data. This is known as a _(15,11) Hamming Block._ The first parity check in column 2 will count the ones in the second and fourth row, the second will count all the ones on the righthand side, the third will count the second and fourth row, and the fourth will count the bottom rows.

If we take a look at the parity checks in our example, we can see that the total of each parity check 

{% latexx %}
$\textrm{mod } 2$
{% /latexx %}

equals zero, meaning there are no errors.

Now, the 0th bit becomes important. It serves as a parity check for **all** of the 1's in the entire block. If there are no errors in the original parity checks, it means that either there's no error or there's an error in the 0th bit. Since all of our parity checks detect no error, and there is even parity overall, we can determine that there is no error in this block of code.

Now let's introduce an error in the block at position 13.

{% latexx type="fullwidth" %} 
$\begin{array}{cccc} 1 & 1 & 1 & 0 \\\ 0 & 1 & 0 & 0 \\\ 0 & 1 & 1 & 1 \\\ 0 & \color{red} 1 & 1 & 0 \\\ \end{array}$ 
{% /latexx %}  

If we redo the parity checks, we can see that there are errors in the first, third, and last check but none in the second. If we say that the number 1 represents an error and the number 0 represents no error, and then appending the numbers together, we can see that it gives us the binary number 1011. By inverting this binary number, we get 1101, and that number translated to decimal is where our error is. We can simply just flip the bit at that position and then we have fixed the error.

There is one more possible outcome though, if the parity of the block is even overall, but there is some error in the parity checks, then that tells us that there are at least two errors in the block. Although we can't fix these with hamming codes, we are able to at least detect them. This is what's known as an _Extended Hamming Code._


## Guessing Game

{% interaction %}
4
{% /interaction %}