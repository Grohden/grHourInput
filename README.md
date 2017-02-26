# grHourInput
An angular directive with a filter to parse hours formats

##What it does?
So, this 'parse' the user input to a readable format, from floats(, or .), integers (with some rules) and something like 10:52.
It also valid max value for hours, the end string should be like 12h 20m, always.
I also wrote a separated filter,(i know the 'module' concept in angular, but you will need anyway the filter)
So something like `{{ 1,5 | floatToHourFormat }}` will give you *1h 30m*

##Demo
You can find a demo at https://grohden.github.io/grHourInput/
Also the project has the same demo in the demo folder

##Usage
## Options

Filter floatToHourFormat options: `{{ 1,5 | floatToHourFormat:options }}`

Property                | Type      | Default               | Description
---                     |:---:      |:---:                  |---
maxHours                | Number    | `Infinity`            | A number to specify the maximun hour that the user can put on input.
minString               | String    | undefined             | A custom string for when user inputs 0 hours/minutes
convertToMinutesPoint   | Number    | 23                    | if you specify 10 as convert point, and give 10 as value the function will return 10m, if you give 9 it will return 9h


```javascript
var options = {
  maxHours: 23,
  minString : "",
};
var value = floatToHourFormatFilter(1,5,options);

console.log(value); //1h 30m
```

##Notes
Since angular itself has <a href='https://docs.angularjs.org/api/ng/input/input%5Bnumber%5D'>problems</a> with HTML5 validation
there are some precautions to not change the model if its invalid(undefined)
