# Cleverstack Timezone module

This module provides a directive to create a select list of timezone that pulls in timezones from the cleverstack backend.

## Dependencies
This module requires the cleverstack backend timezone module to be installed.

## Setup
1. Add 'cs_timezone' to your app/modules/main.js file.
It belongs in the `package` array at the top.

2. Add `cs_timezone` to your app/modules/application/main.js file.
It belongs in the array of required modules.

3. Add `cs_timezone` to your app/modules/application/module.js file.
`cs_timezone` belongs in your `app` module's array of required modules.

## Usage
Just add the timezone element to your form and you'll get a select list with a list of currently circulating currencies.
`<timezone ng-model="user.timezone" name="timezone"></timezone>`
