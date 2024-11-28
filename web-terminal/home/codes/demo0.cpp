#include <iostream>
using namespace std;

// Function to compute the sum of positive numbers in an array
int computePositiveSum(int arr[], int size) {
    int sum = 0; // Data flow starts here
    for (int i = 0; i < size; ++i) { // Loop
        if (arr[i] > 0) { // Conditional creates a branch
            sum += arr[i]; // Data dependency: sum depends on arr[i]
        } else {
            cout << "Skipping non-positive number: " << arr[i] << endl;
        }
    }
    return sum; // Return value creates a basic block exit
}

// Function to find the maximum value in an array
int findMax(int arr[], int size) {
    if (size == 0) return -1; // Basic block with early return
    int maxVal = arr[0];
    for (int i = 1; i < size; ++i) {
        if (arr[i] > maxVal) { // Conditional branch
            maxVal = arr[i]; // Data dependency
        }
    }
    return maxVal; // Another basic block exit
}

int main() {
    int data[] = {1, -2, 3, 4, -5, 6};
    int size = sizeof(data) / sizeof(data[0]);

    // Multiple calls, creating different flows
    int positiveSum = computePositiveSum(data, size);
    cout << "Sum of positive numbers: " << positiveSum << endl;

    int maxVal = findMax(data, size);
    cout << "Maximum value: " << maxVal << endl;

    // Additional control flow: checking values
    if (positiveSum > maxVal) {
        cout << "Positive sum is greater than the maximum value." << endl;
    } else {
        cout << "Maximum value is greater than or equal to the positive sum." << endl;
    }

    return 0; // Program exit
}
