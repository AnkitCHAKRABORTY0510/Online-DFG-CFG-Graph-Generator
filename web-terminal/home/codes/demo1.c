#include <stdio.h>

int main()
{
    int age;

    printf("Enter age : ");
    scanf("%d", &age);

    if (age >= 18)
        printf("You can Vote!\n");
    else
        printf("You cant Vote!\n");

    return 0;
}
