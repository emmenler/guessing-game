'use strict';
// This array stores min and max values, if new values are set i simply add them to the end of array and use the new ones
const arrMinMax = [1, 20];

// These are default min and max values
let minRange = arrMinMax[arrMinMax.length - 2];
let maxRange = arrMinMax[arrMinMax.length - 1];

// This variable stores the random number that user needs to guess and is reset when you restart the game
let hiddenNumber = Math.trunc(Math.random() * maxRange) + 1;
