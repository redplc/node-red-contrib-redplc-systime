# node-red-contrib-redplc-systime

[![platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
![NPM version](https://badge.fury.io/js/node-red-contrib-redplc-systime.svg)
![NPM](https://img.shields.io/npm/l/node-red-contrib-redplc-systime)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZDRCZBQFWV3A6)

## Node Features

- Reads System-Time and store in Node-Red global variable as array<br>
- Update on cycle time interval<br>

## Install

Install with Node-Red Palette Manager or npm command:
```
npm install node-red-contrib-redplc-systime
```

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

