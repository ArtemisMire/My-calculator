This was a challenging exercise, but it was absolutely worth it. 
It was exciting to finally apply my knowledge in practice.
The calculator follows the rules of mathematics: 
multiplication and division are performed first, followed by addition and subtraction.

Here’s how it works: whenever a button on the calculator (or a key on the keyboard) 
is pressed, the input symbol is validated according to specific rules. 
When the expression is complete and the “=” button is pressed, it is parsed into tokens (numbers and operators).
The array of tokens is then analyzed: if multiplication or division operators are found, the operation 
is performed on the numbers to the left and right of the operator. These three tokens are replaced by the result. 
After that, the remaining operations are executed.