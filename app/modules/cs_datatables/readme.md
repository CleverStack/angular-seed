# Cleverstack Datatables module

This module provides a directive to create jQuery dataTables.

## Setup

### Setting up the jQuery Datatables and moment.js plugins
1. Add `datatables` and `moment` to your bower.json.

2. run `bower install`

3. Add datatables and moment to your app/modules/main.js file.
 - Add the paths to the datatables and moment plugins to the paths object.
 - A shim needs to be added to the shim object for datatables with a dependency on jquery.
 - A shim needs to be added to the shim object for moment.
 - Lastly, datatables and moment need to be added to the required array at the bottom.

4. Add `moment` and `datatables` to your app/modules/application/main.js file. It belongs in the array of required modules.

### Setting up Cleverstack Datatables
1. Add 'cs_datatables' to your app/modules/main.js file.
It belongs in the `package` array at the top.

2. Add `cs_datatables` to your app/modules/application/main.js file.
It belongs in the array of required modules.

3. Add `cs_datatables` to your app/modules/application/module.js file.
`cs_datatables` belongs in your `app` module's array of required modules.

## Usage
1. Add the `DataTableHelpers` angular module to your controller.

2. Add the `dataTableOptions` attribute to the table you want to make a datatable and pass it a $scope variable that defines the datatable configuration for this table.
