# rotation animation block lesson

Learn how to create images with a global variable and while loop. #LED #screen  #plot #docs

## Topic

While Loop

## Quick links

* [activity](/microbit/lessons/rotation-animation/activity)
* [challenges](/microbit/lessons/rotation-animation/challenges)

## Class

Year 7

## Prior learning/place of lesson in scheme of work

Learn how to create images that look like a rotating animation by using a while loop. We will be learning how to create a rotating animation using a global variable, while loop as well as simple commands, such as on button pressed and show animation.

## Documentation

```docs
let x = 0
input.onButtonPressed(Button.A, () => {

})
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
basic.pause(100)
while (true) {

    basic.pause(20)
}



```

## Objectives

* learn how to create a global variable for a place where you can store data, accessible across functions, and in nested code blocks
* learn how to set or change the value of a global variable
* learn how to repeat code while a condition is true
* learn how to declare a global boolean variable to determine which code will execute next
* learn how to run code when an input button is pressed
* learn how to show a series of image frames on the LED screen
* learn how to pause your code for the specified number of milliseconds
