# grHourInput
An angular directive with a filter to parse hours formats

## What it does?
So, this 'parse' the user input to a readable format, from floats(, or .), integers (with some rules) and something like 10:52.
It also valid max value for hours, the end string should be like 12h 20m, always.
I also wrote a separated filter,(i know the 'module' concept in angular, but you will need anyway the filter)
So something like `{{ 1,5 | floatToHourFormat }}` will give you *1h 30m*

## Demo
You can find a demo at https://grohden.github.io/grHourInput/
Also the project has the same demo in the demo folder

## Usage
## Options

Filter `floatToHourFormat` options:


On view you can use something like: `{{ 1,5 | floatToHourFormat:options }}`


On JS:
```javascript
var options = {
  customHours: {
    "10h 30m":"Hello there",
    "10h 31m": "Ginurul Kinub"
  },
};

var filter = floatToHourFormatFilter; 

console.log(filter(1.5,options)); //1h 30m
console.log(filter(10.5,options)); //Hello there
console.log(filter(10.51,options)); //Ginurul Kinub
```

## Notes
Since angular itself has <a href='https://docs.angularjs.org/api/ng/input/input%5Bnumber%5D'>problems</a> with HTML5 validation
there are some precautions to not change the model if its invalid(undefined)
