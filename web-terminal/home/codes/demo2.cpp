#include <iostream>
using namespace std;

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;

    // Control Flow Block 1: Conditional
    if (num % 2 == 0) {
        cout << num << " is even." << endl;
    } else {
        cout << num << " is odd." << endl;
    }

    // Control Flow Block 2: Loop
    cout << "Counting down from " << num << ":" << endl;
    for (int i = num; i > 0; --i) {
        cout << i << " ";
    }
    cout << endl;

    return 0;
}
