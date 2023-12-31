# Reed-Solomon Codes

Reed-Solomon codes are a type of non-binary error-correcting code that use polynomials to track input data. They were invented by Irving S. Reed and Gustave Solomon as an alternative to binary encoders. This means that RS Codes operate on multiple bits rather than individual bits to track data. In this lesson, we'll recap modular arithmetic and put together LaGrange Interpolations for an overarching look at RS codes. 

## Modular Arithmetic

By now, modular arithmetic should be a quick review, but just in case, we'll go over it in this section! Galois studied mod arithmetic and soon we'll see how it all comes together to create an RS code.

If you'll recall:

{% latexx type="fullwidth" %}
$a \equiv b \mod p$
{% /latexx %}

where "≡" means "congruent", and a and b have the same remainder when divided by p. In "mod space", we can perform the same operations we're used to (addition, subtraction, multiplication, division), with some small changes in the way we calculate. For example:


### Addition

{% latexx type="fullwidth" %}
$1 + 2 = 3 \quad \quad 3 \mod 5 \equiv 3 \quad \quad \therefore 1 + 2 \equiv 3$
{% /latexx %}

### Multiplication

{% latexx type="fullwidth" %}
$2 \cdot 3 = 6 \quad \quad 6 \mod 5 \equiv 1 \quad \quad \therefore 2 \cdot 3 \equiv 1$
{% /latexx %}

> For _subtraction_ and _division_, use the additive or multiplicative inverse to calculate.

## Galois Fields

A Galois Field is a field that contains a finite set of elements. By definition, it is a set for which the basic operations of addition, subtraction, multiplication, and division are defined. Sound familiar? One incredibily common example of a Galois field is the modular operation. For example, a mod 5 outputs only the numbers 0 through 4, a finite field! 

Galois fields are used in RS coding because the data is represented using a finite number of bits. By using modular arithmetic, we ensure that our arithmetic "wraps around" within a set range, which is crucial when doing error correction calculations. This is important because when working with data, overflow and underflow errors (where output can exceed an expected range) are common and can lead to incorrect or even undefined outputs. This also ensures the integrity of the data through noise, because the finite field limits the possibilites of manipulating the data incorrectly. Another benefit is that it makes it easier to locate errors as you map the error coefficients in the polynomial back into the finite field. Finally, mod arithmetic makes for a much more computationally efficient program, limiting space and time needed to error correct in real-time. 

## Lagrange Interpolations

Now let's shift focus for a second and go over Lagrange Interpolations, another puzzle piece used in RS Codes. A Lagrange Interpolation will take n coordinates and give us a polynomial of degree n-1, which goes through and is completely unique to the coordinates it is created from.

For the purpose of this example, let's use 3 coordinates:

{% latexx type="fullwidth" %}
$(1,2) \\\ (3, 2) \\\ (4, -1)$
{% /latexx %}

To find the aforementioned polynomial, we'll break the process down into steps. First, create 3 polynomials, 1 for each coordinate. These are called Lagrange polynomials. Each polynomial (one per coordinate) goes through (x-value, 1) and has 2 x-intercepts/roots/etc. (x-value, 0) at the other coordinates. Here's what our Lagrange polynomials would be:


(1,2)

    p(x) = L1(x) = a(x-3)(x-4)
    1 = a(1-3)(1-4)
    1 = -2 * -3 * a
    a = 1/6
    p(x) = L1(x) = (1/6)(x-2)(x-4)

(3,2)

    p(x) = L2(x) = a(x-1)(x-4)
    1 = a(3-1)(3-4)
    1 = 2 * -1 * a
    a = -1/2

(4, -1)

    p(x) = L3(X) = a(x-1)(x-3)
    1 = a(4-1)(4-3)
    1 = 3 * 1 * a
    a = 1/3

Continue with the rest. 


Now that we have our three equations, we have to combine them into 1 equation that goes through all the points by multiplying each Lagrange polynomial by their y-coordinate and adding them together. 

    L(x) = 2L1(x) * 2L2(x) * -L3(x)
    .
    .
    .
    L(x) = -x^2 + 4x -1

This equation goes through all 3 points. We can now apply this to modular arithmetic in our RS codes!

# RS Code Encoding

Let us set n number of data packets. This is the data that we want to be transferred. Label each packet m1 to mn. Set aside k packets, which will be our parity bits. We now pick a number p. P is a prime number that is greater than all numbers inside the packets; we will use this as our mod number. Now, use Lagrange interpolations on the number mod p, like we did with the function above. Then, set the parity bits (mn ... m(n-k+1)) in this function too. This will be set up as such:

    f(0) = m1
    f(1) = m2
    .
    .
    .
    f(n-k-1) = m(n-k)
    f(n-k) = m(n-k+1)
    .
    .
    .

Once you have found the interpolation that goes through all the points, you have successfully encoded your data. Now, to decode.

# RS Code Decoding

This is a much simpler process, now that we have encoded our message properly. What we do is "plot" or evaluate our unique polynomial. Since there is only one combination of coordinate that are able to create this, we can work backwards and fill in our missing data by going through each point of the polynomial and filling in missing coordinates (data inside each packet).

Take this (very) simplified example from vcubingx (on Youtube):

We start with packets:
    
    {2},{4},{3},{1}

We use 5 as our mod number, as it is the biggest prime number that is greater than all the numbers in the packets. Find the Lagrange Interpolation using the steps shown in encoding. We get:

    f(x) = 2x^3 + 2  mod 5

Now, plug in each data packet:

    f(0) = 2  mod 5
    f(1) = 4  mod 5
    f(2) = 3  mod 5
    f(3) = 1  mod 5

Now plug in x = 4, x = 5 into the polynomial:
    
    f(4) = 0  mod 5
    f(5) = 2  mod 5

Our Encoding has finished and we send it over. Assume we lost packets m1 and m6 ({2} and {f(5)}), and then perform Lagrange interpolations to get the same equation:

    f(x) = 2x^3 + 2  mod 5

Then plug in x = 0, 1, 2, 3 to find our original values and fill in any holes. 

    f(0) = 2  mod 5
    f(1) = 4  mod 5
    f(2) = 3  mod 5
    f(3) = 1  mod 5

We have now encoded and retrieved successfully all of our data! 

{% interaction %}
5
{% /interaction %}

Sources: vcubingx (Youtube), GeeksforGeeks.org
    
    
    

    


    







