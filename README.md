# CleverStack Angular Seed
## An angular seed 

### Setup:
1. Install node and npm
2. Clone the repo, cd into it
3. Run `$ npm run-script setup`

### Usage:
A shortcut `npm start` is provided to start a development server on `localhost:9000`.

#### Documentation with [Dox](https://github.com/visionmedia/dox):
1. To build the documentation run `grunt dox`.
2. To open the documentation you can use `grunt dox:server`

#### Task Automation with [Grunt](http://http://gruntjs.com/):
1. To start a local server do: `$ grunt server`
4. To make a local build do: `$ grunt build`

#### Test Running with [Karma](http://karma-runner.github.io):
1. To run the Unit tests server do: `$ grunt test`
2. Do `$ karma run` for blazing fast test running, or
3. Do `$ grunt server` and just code, save and see the tests get triggered (a wee bit slower).

Note: End 2 End tests are not working yet. Running `$ grunt test:ci:unit` spits a coverage and xml results for CI.

#### Client-side Package Management (using [Bower](http://bower.io)):
1. Search a package doing: `$ bower search key words`
2. Install a package doing: `$ bower install packageName[@version]`
3. Remove a package doing: `$ bower uninstall packageName`

#### Guidelines:
1. Use yeoman generators whenever you can.
2. Work with jade templates within the views folder. `$ grunt clean` will wipe all html files within the views folder.

#### Known Issues
1. Sometimes the components folder doesn't get populated after setup raising weird erros in the browser. Calling `$ bower i` solves this issue.