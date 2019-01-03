# Walledator

A nano-robot to perform schema validation.

## Install

`yarn add @sadbox/walledator`

or

`npm install -S @sadbox/walledator`

## Usage

```javascript
import Q from '@sadbox/walledator';

const isFree = email => askServer('/email-is-free', email);

const schema = Q.shape({
  email: Q.email.custom(isFree).required,
  password: Q.string.required.match(regex).size({ min: 8 }),
});

schema.validate(request.body); // server
schema.validate(form.values); // client
```
