# @nobushi/polyfill

This is a polyfill for NobushiJS.

## Installation

```bash
npm i @nobushi/polyfill
```

## Usage

### [`timers/promises`](https://nodejs.org/docs/latest-v16.x/api/timers.html#timers-promises-api)

```js
import {
  setTimeout,
  setImmediate,
  setInterval,
} from '@nobushi/polyfill/lib/timers/promises';
```
