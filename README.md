# grHourInput
An angular directive with a filter to parse hours formats

##What it does?
So, this 'parse' the user input to a readable format, from floats(, or .), integers (with some rules) and something like 10:52.
It also valid max value for hours, the end string should be like 12h 20m, always.
I also wrote a separated filter,(i know the 'module' concept in angular, but you will need anyway the filter)
So something like `{{ 1,5 | floatToHourFormat }}` will give you *1h 30m*

##Demo
Well, its in the demo folder now, i'm not good or don't know were to write one aside from github.
i'm still referencing the build folder, need to change this latter..

##Notes
Since angular itself has <a href='https://docs.angularjs.org/api/ng/input/input%5Bnumber%5D'>problems</a> with HTML5 validation
there are some precautions to not change the model if its invalid(undefined)
