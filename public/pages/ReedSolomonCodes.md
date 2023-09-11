# Reed-Solomon Codes

Reed-Solomon codes are a type of non-binary error-correcting code that use polynomials to track input data. They were invented by Irving S. Reed and Gustave Solomon as an alternative to binary encoders. This means that RS Codes operate on multiple bits rather than individual bits to track data. In this lesson, we'll recap modular arithmetic and put together LaGrange Interpolations to see an overarching look at RS codes. 

# Modular Arithmetic

By now, modular arithmetic should be a quick review, but just in case, we'll go over it in this section! Galois studied mod arithmetic and soon we'll see how it all comes together to create an RS code.

If you'll recall:

    a ≡ b mod p

where "≡" means "congruent", and a and b have the same remainder when divided by p. In "mod space", we can perform the same operations we're used to (addition, subtraction, multiplication, division), with some small changes in the way we calculate. For example:

ADDITION:

    1 + 2 = 3
    3 mod 5 ≡ 3
    ∴ 1 + 2 ≡ 3

MULTIPLICATION:

    2 * 3 = 6
    6 mod 5 ≡ 1
    ∴ 2 * 3 ≡ 1

Note: For SUBTRACTION and DIVISION, use the Additive or Multiplicative inverse to calculate.


# Lagrange Interpolations

Now let's shift focus for a second and go over Lagrange Interpolations, another puzzle piece used in RS Codes. A Lagrange Interpolation will take n coordinates and give us a polynomial of degree n-1, which goes through and is completely unique to the coordinates it is created from.

For the purpose of this example, let's use 3 coordinates:

    (1,2)
    (3, 2)
    (4, -1)

To find the aforementioned polynomial, we'll break the process down into steps. First, create 3 polynomials, 1 for each coordinate. These are called Lagrange polynomials. Each polynomial (one per coordinate) goes through (x-value, 1) and has 2 x-intercepts/roots/etc. (x-value, 0) at the other coordinates. Here's what our first Lagrange polynomial would be:

(1,2)

    p(x) = L1(x) = a(x-3)(x-4)
    1 = a(1-3)(1-4)
    1 = -2 * -3 * a
    a = 1/6
    p(x) = L1(x) = (1/6)(x-2)(x-4)


Continue with the rest. 


Now that we have our three equations, we have to combine them into 1 equation that goes through all the points by multiplying each Lagrange polynomial by their y-coordinate and adding them together to get -x^2 + 4x -1. 

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
? 
{% /interaction %}

Sources: vcubingx (Youtube), GeeksforGeeks.org
    
    
    

    


    







