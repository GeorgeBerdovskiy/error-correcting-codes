#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <algorithm>

// program for implementing a hamming block of size 4x4 that uses parity checks to correct mistakes 

using namespace std;

int binaryToDecimal(const vector<int>& binaryVector) 
{
    int decimalValue = 0;
    int size = binaryVector.size();

    for (int i = 0; i < size; ++i) {
        decimalValue += binaryVector[i] * (1 << (size - 1 - i));
    }

    return decimalValue;
}

vector<int> fixedHammingCode(vector<int> hammingBlock, int positionOfError)
{
    hammingBlock[positionOfError] = !hammingBlock[positionOfError]; // Flip the bit at the specified position
    return hammingBlock;
}

void printMatrix(const vector<int>& array) 
{
    for (int i = 0; i < array.size(); ++i) 
    {
        if (i % 4 == 0 && i > 0) 
        {
            cout << endl;
        }

        if (i < 3 || i == 4 || i == 8) 
        {
            cout << "[" << array[i] << "] ";
        } 
        else 
        {
            cout << " " << array[i] << "  ";
        }
    }
    cout << endl;
}

vector<int> zeroCheck(vector<int> &hammingBlock)
{
    // Calculate the total number of ones in the Hamming block (excluding the parity bit at position 0)
    int totalOnes = 0;
    for (int i = 1; i < 16; ++i) 
    {
        totalOnes += hammingBlock[i];
    }

    int expectedParityBit = totalOnes % 2 == 0 ? 0 : 1;

    // Check if the calculated parity bit matches the expected parity bit
    if (hammingBlock[0] != expectedParityBit)
    {
        cout << "Error detected in the parity bit at position 0!" << endl;
        hammingBlock[0] = expectedParityBit;
    }
    return hammingBlock;
}

vector<int> parityCheck(vector<int> &hammingBlock)
{
    vector<int> answersToParityChecks; // Invert the vector at the end and then convert to decimal to find the position of the error, 1's are yes and 0's are no

    // check to see if there's an odd parity (error) in the odd columns
    int totalOddColumnOddOnes = 0;
    bool errorOddColumns; 
    for (int i = 0; i < 8; ++i)
    {
        totalOddColumnOddOnes += hammingBlock[2 * i + 1]; // Add the value at odd column positions (1, 5, 9, 13, 3, 7, 11, 15)
    }

    // If the total number of ones in odd columns is odd, there's an error
    errorOddColumns = (totalOddColumnOddOnes % 2 == 1);

    if (errorOddColumns)
    {
        cout << "Error detected in odd columns!" << endl;
        answersToParityChecks.push_back(1); // Add error status
    }
    else
    {
        cout << "No error detected in odd columns." << endl;
        answersToParityChecks.push_back(0); // Add no error status
    }

    // check to see if there's an odd parity (error) on the right-hand side
    int totalRHSOddOnes = 0;
    bool errorRHS;
    for (int i = 0; i < 4; ++i)
    {
        totalRHSOddOnes += hammingBlock[i * 4 + 2]; // Add the value at positions (2, 6, 10, 14) on the right-hand side
    }
    for (int i = 0; i < 4; ++i)
    {
        totalRHSOddOnes += hammingBlock[i * 4 + 3]; // Add the value at positions (3, 7, 11, 15) on the right-hand side
    }

    // If the total number of ones in right-hand side odd positions is odd, there's an error
    errorRHS = (totalRHSOddOnes % 2 == 1);

    if (errorRHS)
    {
        cout << "Error detected in right-hand side odd positions!" << endl;
        answersToParityChecks.push_back(1);
    }
    else
    {
        cout << "No error detected in right-hand side odd positions." << endl;
        answersToParityChecks.push_back(0);
    }

    // check to see if there's an odd parity (error) on the odd rows
    int totalOddRowOnes = 0;
    bool evenRows;
    for (int i = 4; i < 8; ++i)
    {
        totalOddRowOnes += hammingBlock[i]; // Add the value at positions (4, 5, 6, 7) in the first even row
        totalOddRowOnes += hammingBlock[i + 8]; // Add the value at positions (12, 13, 14, 15) in the second even row
    }

    // If the total number of ones in even rows is odd, there's an error
    evenRows = (totalOddRowOnes % 2 == 1);

    if (evenRows)
    {
        cout << "Error detected in odd rows!" << endl;
        answersToParityChecks.push_back(1);
    }
    else
    {
        cout << "No error detected in odd rows." << endl;
        answersToParityChecks.push_back(0);
    }

    int totalBottomRowOnes = 0;
    bool bottomRows;
    for (int i = 8; i < 16; ++i)
    {
        totalBottomRowOnes += hammingBlock[i]; // Add the value at positions (8, 9, 10, 11, 12, 13, 14, 15) in the bottom row 
    }
    bottomRows = (totalBottomRowOnes % 2 == 1);

    if (bottomRows)
    {
        cout << "Error detected in bottom rows!" << endl;
        answersToParityChecks.push_back(1);
    }
    else
    {
        cout << "No error detected in bottom rows." << endl;
        answersToParityChecks.push_back(0);
    }

    int size = answersToParityChecks.size();
    vector<int> invertedAnswers(answersToParityChecks.rbegin(), answersToParityChecks.rend());

    bool noErrors = true;
    for (int bit : answersToParityChecks)
    {
        if (bit != 0)
        {
            noErrors = false;
            break;
        }
    }
    cout << "Original parity check answers: " << endl;
    for (int bit : answersToParityChecks)
    {
        cout << bit << " ";
    }
    cout << endl;

    if (noErrors)
    {
        cout << "No error detected OR there is an error at position 0" << endl;
    }
    else 
    {
        cout << "Inverted answer, AKA, where the error is: ";
        for (int bit : invertedAnswers)
        {
            cout << bit << " ";
        }
        cout << endl;
        int positionOfError = binaryToDecimal(invertedAnswers);
        cout << "Position of the error is at: " << positionOfError << endl;
        // Correct the error in the Hamming block
        hammingBlock[positionOfError] = !hammingBlock[positionOfError];
    }

    return hammingBlock;
}

vector<int> parityCheckForOriginalBlock(vector<int> &hammingBlock)
{
    vector<int> answersToParityChecks; // Invert the vector at the end and then convert to decimal to find position of error, 1's are yes and 0's are no
    int totalOnes = 0;
    for (int i = 0; i < 16; ++i) 
    {
        totalOnes += hammingBlock[i];
    }
    
    // Set parity bit at position 0 to ensure even total number of 1's
    if (totalOnes % 2 != 0)
    {
        hammingBlock[0] = 1;
    }

    else if (totalOnes % 2 == 0)
    {
        hammingBlock[0] = 0;
    }

    // check to see if there's an odd parity (error) in the odd columns
    int totalOddColumnOddOnes = 0;
    bool errorOddColumns; 
    for (int i = 0; i < 8; ++i)
    {
        totalOddColumnOddOnes += hammingBlock[2 * i + 1]; // Add the value at odd column positions (1, 5, 9, 13, 3, 7, 11, 15)
    }

    // If total number of ones in odd columns is odd, there's an error
    errorOddColumns = (totalOddColumnOddOnes % 2 == 1);

    if (errorOddColumns)
    {
        answersToParityChecks.push_back(1); // Add error status
    }
    else
    {
        answersToParityChecks.push_back(0); // Add no error status
    }


    // check to see if there's an odd parity (error) on the right hand side
    int totalRHSOddOnes = 0;
    bool errorRHS;
    for (int i = 0; i < 4; ++i)
    {
        totalRHSOddOnes += hammingBlock[i * 4 + 2]; // Add the value at positions (2, 6, 10, 14) on the right-hand side
    }
    for (int i = 0; i < 4; ++i)
    {
        totalRHSOddOnes += hammingBlock[i * 4 + 3]; // Add the value at positions (3, 7, 11, 15) on the right-hand side
    }

    // If total number of ones in right-hand side odd positions is odd, there's an error
    errorRHS = (totalRHSOddOnes % 2 == 1);

    if (errorRHS)
    {
        answersToParityChecks.push_back(1);
    }
    else
    {
        answersToParityChecks.push_back(0);
    }

    // check to see if there's an odd parity (error) on the odd rows
    int totalOddRowOnes = 0;
    bool evenRows;
    for (int i = 4; i < 8; ++i)
    {
        totalOddRowOnes += hammingBlock[i]; // Add the value at positions (4, 5, 6, 7) in the first even row
        totalOddRowOnes += hammingBlock[i + 8]; // Add the value at positions (12, 13, 14, 15) in the second even row
    }

    // If total number of ones in even rows is odd, there's an error
    evenRows = (totalOddRowOnes % 2 == 1);

    if (evenRows)
    {
        answersToParityChecks.push_back(1);
    }
    else
    {
        answersToParityChecks.push_back(0);
    }

    int totalBottomRowOnes = 0;
    bool bottomRows;
    for (int i = 8; i < 16; ++i)
    {
        totalBottomRowOnes += hammingBlock[i]; // Add the value at positions (8, 9, 10, 11, 12, 13, 14, 15) in the bottom row 
    }
    bottomRows = (totalBottomRowOnes % 2 == 1);

    if (bottomRows)
    {
        answersToParityChecks.push_back(1);
    }
    else
    {
        answersToParityChecks.push_back(0);
    }

    int size = answersToParityChecks.size();
    vector<int> invertedAnswers(answersToParityChecks.rbegin(), answersToParityChecks.rend());

    bool noErrors = true;
    for (int bit : answersToParityChecks)
    {
        if (bit != 0)
        {
            noErrors = false;
            break;
        }
    }
    cout << endl;
  
    if (noErrors == false)
    {
        int positionOfError = binaryToDecimal(invertedAnswers);
        hammingBlock = fixedHammingCode(hammingBlock, positionOfError);
    }
    return hammingBlock;
}

vector<int> generateRandomHammingBlock() 
{
    vector<int> hammingBlock(16);  // 4x4 matrix, Hamming(15,11) code

    // Generate random data bits
    srand(time(nullptr));
    for (int i = 3; i < 16; ++i) 
    {
        hammingBlock[i] = rand() % 2;
    }

    // Calculate parity bits
    hammingBlock[1] = hammingBlock[3] ^ hammingBlock[5] ^ hammingBlock[7] ^ hammingBlock[9] ^ hammingBlock[11] ^ hammingBlock[13] ^ hammingBlock[15];
    hammingBlock[2] = hammingBlock[3] ^ hammingBlock[6] ^ hammingBlock[7] ^ hammingBlock[10] ^ hammingBlock[11] ^ hammingBlock[14] ^ hammingBlock[15];
    hammingBlock[4] = hammingBlock[5] ^ hammingBlock[6] ^ hammingBlock[7] ^ hammingBlock[12] ^ hammingBlock[13] ^ hammingBlock[14] ^ hammingBlock[15];

    hammingBlock = parityCheckForOriginalBlock(hammingBlock);
    hammingBlock = zeroCheck(hammingBlock);

    return hammingBlock;
}

vector<int> introduceRandomError(const vector<int>& originalBlock)
{
    vector<int> modifiedBlock = originalBlock;
    srand(time(nullptr));

    int randomPosition = rand() % originalBlock.size();
    modifiedBlock[randomPosition] = !modifiedBlock[randomPosition]; // Flip the bit

    return modifiedBlock;
}

int main() {
    int size = 16;  // 4x4 matrix
    cout << "Generating a 4x4 matrix..." << endl;

    vector<int> hammingBlock = generateRandomHammingBlock();
    cout << "Your block is equal to:" << endl;
    printMatrix(hammingBlock);
    cout << endl;

    vector<int> errorCode = introduceRandomError(hammingBlock);
    cout << "Your block of code was unfortunately interrupted by noise. Here is your new block of code:" << endl;
    printMatrix(errorCode);
    cout << endl;

    errorCode = parityCheck(errorCode); // Pass the same errorCode vector
    errorCode = zeroCheck(errorCode);   // Pass the same errorCode vector
    printMatrix(errorCode);
    cout << endl;
    
    return 0;
}

