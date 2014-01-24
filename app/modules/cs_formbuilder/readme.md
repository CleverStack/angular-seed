# Cleverstack Formbuilder module
This module provides directives for making forms and form fields.
 
## Setup
Date fields depend on angular-bootstrap, so that will need to be installed before you can create date fields.
 
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
 
### Setting up Cleverstack formbuilder
1. Add 'cs_formbuilder' to your app/modules/main.js file.
It belongs in the `package` array at the top.
 
2. Add `cs_formbuilder` to your app/modules/application/main.js file.
It belongs in the array of required modules.
 
3. Add cs_formbuilder to your app/modules/application/module.js file.
`'cs_formbuilder'` belongs in your `app` module's array of required modules.

## Usage
1. You'll first need to create an array of field objects in your controller. The available properties for these field objects is below.

2. Next you'll need to define your functions for form submission and cancellation.

3. Add the directive to your template.
`<form-builder fields="fields" ok="save" cancel="cancel" button="true"></form-builder>`

4. Fill in the `fields`, `ok` and `cancel` attributes with the field object array and functions for form submission and cancellation.

### Directive attributes
 - fields: an array of field objects to be displayed.
 - ok: the function to call if the cancel button is clicked.
 - cancel: the function to call if the cancel button is clicked.
 - button: a boolean for whether the save and cancel buttons should be displayed.

### Field object properties
 - id: The id to set on the field element.
 - type: The type of the form field. Can be `text`, `date` or `select`.
 - name: The name to set on the field element.
 - required: A boolean for whether or not this is a required field.
 - value: The value to set on the field element.
 - options: for a select list, an array of strings to display in the select list.
 