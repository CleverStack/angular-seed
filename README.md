# CleverStack Angular Seed
## An angular seed 

### Prerequisites:
1. sudo npm -g uninstall karma (There has been an issue with karma, if you see EPEERINVALID then this is the problem)
2. sudo npm -g i karma
3. sudo npm -g i grunt-cli

### Setup:
1. Install node and npm
2. Clone the repo, cd into it
3. Run `$ npm run-script setup` (You need to use sudo on linux)

### Usage:
A shortcut `npm start` is provided to start a development server on `localhost:9000`.

#### Documentation with [Docular](https://github.com/gitsome/docular):
1. To build the documentation run `grunt docular`.
2. To open the documentation you can use `grunt docular-server`

#### Task Automation with [Grunt](http://http://gruntjs.com/):
1. To start a local server do: `$ grunt server`
4. To make a local build do: `$ grunt build`

#### Test Running with [Karma](http://karma-runner.github.io):
1. To run the Unit tests server do: `$ karma start`
2. Do `$ karma run` for blazing fast test running

#### Client-side Package Management (using [Bower](http://bower.io)):
1. Search a package doing: `$ bower search key words`
2. Install a package doing: `$ bower install packageName[@version]`
3. Remove a package doing: `$ bower uninstall packageName`

#### Known Issues
1. Sometimes the components folder doesn't get populated after setup raising weird erros in the browser. Calling `$ bower i` solves this issue.
