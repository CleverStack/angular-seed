# Cleverstack Messenger module

This module provides a service for creating alert messages.

## Setup
1. Add 'cs_messenger' to your app/modules/main.js file.
It belongs in the `package` array at the top.

2. Add `cs_messenger` to your app/modules/application/main.js file.
It belongs in the array of required modules.

3. Add `cs_messenger` to your app/modules/application/module.js file.
`cs_messenger` belongs in your `app` module's array of required modules.

## Usage
1. In your controller, add `Messenger` to the controller's requires array.

2. In the template where you want to display the alerts (usually at the top of your app/index.html file) add a div with the messenger attribute `<div messenger></div>`

3. In your controller, alerts can be displayed with the following code:
`Messenger.error('An error has occured!');`


## Alert type
In the example above, `error` is alert type and determines the alert's color.

The valid types are: 
 - error
 - warning
 - warn (alias of warning)
 - success
 - info
 - loading
 - loader (alias of loading)

## Dismissing an alert
Aside from the loading alerts, alerts will disappear after 6 seconds by default. They can also be closed manually:
`Messenger.close();`

## Messenger Options
An options object can be passed as the 2nd argument of the Messenger alert functions to set the time to display the alert and whether there should be a close button.
`Messenger.error('Error', { timeout: 3000, close: false })`
 - `timeout`: milliseconds until the alert should be hidden. 0 to not automatically hide the alert.
 - `close`: boolean for whether the alert should display a close button or not.
