[![Version](https://badgen.net/npm/v/@sadbox/walledator)](https://www.npmjs.com/package/@sadbox/walledator)
[![License](https://badgen.net/npm/license/@sadbox/walledator)](https://www.npmjs.com/package/@sadbox/walledator)
[![Dependencies](https://badgen.net/david/dep/strayiker/walledator)](https://www.npmjs.com/package/@sadbox/walledator)
[![Bundle Size](https://badgen.net/badgesize/gzip/https://unpkg.com/@sadbox/walledator/dist/walledator.cjs.js)](https://www.npmjs.com/package/@sadbox/walledator)
[![Build Status](https://travis-ci.org/strayiker/walledator.svg?branch=master)](https://travis-ci.org/strayiker/walledator)
[![Codecov](https://codecov.io/gh/strayiker/walledator/branch/master/graph/badge.svg)](https://codecov.io/gh/strayiker/walledator)

# Walledator

An environment agnostic nano-robot to perform schema validations.

## Install

`yarn add @sadbox/walledator`

or

`npm install -S @sadbox/walledator`

## Usage

```javascript
import Q from '@sadbox/walledator';

const isFree = email => request('/email-is-free', email);

const schema = Q.shape({
  email: Q.email.custom({ key: 'taken', isFree }).required,
  password: Q.string.match(regex).size({ min: 8 }).required,
});

// server
schema.validate(request.body);

// client
schema.defineMessages({
  'shape.email.email': 'is not an email',
  'shape.email.taken': 'is already taken',
  'shape.password.match': 'contains invalid symbols',
  'shape.password.size': 'does not match the size limitations',
  'shape.required': 'is required',
});
schema.validate(form.values, { humanize: true });
```
