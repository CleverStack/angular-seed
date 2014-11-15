# Cleverstack Modal module

This module will provides a factory for making modals.

## Setup
Modals are created via the modal directive provided by the angular-bootstrap package, so this will need to be installed before you can start making modals.

### Setting up angular-bootstrap
1. Add angular-bootstrap to your bower.json.

2. run `bower install`

3. Add bootstrap to your app/modules/main.js file.
 - The path to the ui-bootstrap.js needs to be added to the paths object.
 - A shim needs to be added to the shim object for `ui-bootstrap` with a dependency on angular.
 - Lastly, ui-bootstrap needs to be added to the required array at the bottom.

4. Add `ui-bootstrap` to your app/modules/application/main.js file.
It belongs in the array of required modules.

5. Add ui-bootstrap to your app/modules/application/module.js file.
 `'ui.bootstrap'` belongs in your `app` module's array of required modules.

### Setting up Cleverstack modal
1. Add 'cs_modal' to your app/modules/main.js file.
It belongs in the `package` array at the top.

2. Add `cs_modal` to your app/modules/application/main.js file.
It belongs in the array of required modules.

3. Add cs_modal to your app/modules/application/module.js file.
`'cs_modal'` belongs in your `app` module's array of required modules.
