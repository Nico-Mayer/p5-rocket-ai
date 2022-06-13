# About

This is a small Javascript Project which uses the p5 library.
The Idea is that a set of rockets try to reach a Target which the user can set.

The Rockets are using a genetic Algorithm to get smarter witch each generation and find the shortest way to their target.

Explanation:
The Best Rockets from the previous generation Survive and pass their "Genes" to their child rockets in the next generation.
These "Genes" are the Vector Direction in which the rocket moved and are Visualized by the Head of the rocket and the Tail of the rocket.

Head Color = Parent 1
Tail Color = Parent 2

So you can track which rockets pass their "Genes" the most.

If the Rocket is blinking this Means that it is Mutated and differs a lot from its Parents.
