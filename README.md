# node-red-contrib-redplc-systime

Node-Red node for System-Time<br>

## Install

For using with Ladder-Logic install
[redPlc](https://www.npmjs.com/package/node-red-contrib-redplc) nodes

For using with other nodes, install
[module](https://www.npmjs.com/package/node-red-contrib-redplc-module) nodes

Install with Node-Red Palette Manager or npm command:
```
npm install node-red-contrib-redplc-systime
```

## Usage
This node writes to Node-Red global variables<br>
Update is triggered by redPlc cpu node or module-update node<br>

### Time/Date Elements (Variable IA):
|Element|Value|Array-Index|
|---|---|---|
|Seconds|0 .. 59|0|
|Minutes|0 .. 59|1|
|Hours|0 .. 12/23|2|
|AM/PM|0=AM, 1=PM|3|
|Weekday|0 .. 7, 0=Sunday|4|
|Day|1 .. 31|5|
|Month|1 .. 12|6|
|Year|YYYY|7|

## Donate
If you like my work please support it with donate:

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZDRCZBQFWV3A6)
