# grHourInput

An angular *module* for use a more human readable hour format at inputs.

## What it do

It 'parse' the user input to a more human readable format, from floats(, or .), integers (with some rules) and something like 10:52.

It also validate values for hours, the final string should be like *XX*h *YY*m.

## Demo

You can find a demo at [here](https://grohden.github.io/grHourInput/)

## Available filters and directive

### Directive

The directive is using the `floatToHourFormat` filter, so the same options are supported here

```HTML
<gr-hour-input class="form-control" ng-model="demo.hourString" options="{'customHours':{'12h 00m':'Ma men!'}}" /> 
```

### Filter `floatToHourFormat`

You can use this filter to show the format to the user.

In HTML

```HTML
<div ng-init="options = {'1h 30m':'Hello There'}">
  {{:: '1,5' | floatToHourFormat:options }}
  <!-- Should show "Hello There"-->
</div>
```

On JS:

```javascript
var options = {
  customHours: {
    "10h 30m": "Ginurul Kinub"
  },
};

var filter = floatToHourFormatFilter;

console.log(filter(1.5, options)); //1h 30m
console.log(filter(10.51 ,options)); //Ginurul Kinub

```

### Filter `formatToMillisFilter`

This filter is used to convert the readable format to milliseconds.

```Javascript
var filter = formatToMillisFilter;

console.log(filter("1h 00m")); // 3600000
```


## Notes

Since angular itself has [problems](https://docs.angularjs.org/api/ng/input/input%5Bnumber%5D) with HTML5 validation
there are some precautions to not change the model if its invalid (undefined), and conversion on inputs should only occur on input blur.
