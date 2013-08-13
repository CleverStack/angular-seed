# CleverStack Angular Seed
## An angular seed 

### Setup:
1. Run `$ npm run-script setup`

### Usage:
A shortcut `npm start` is provided to start a development server on `localhost:9000` and a functional testing server on `localhost:9090`.

#### Documentation with [Docular](https://github.com/gitsome/docular):
1. To build the documentation run `$ grunt docular`.
2. To open the documentation you can use `$ grunt docular-server`

#### Task Automation with [Grunt](http://gruntjs.com/):
1. To start a local server do: `$ grunt server`
4. To make a local build do: `$ grunt build`

#### Unit Test Running with [Karma](http://karma-runner.github.io):
1. To run the Unit tests server do: `$ karma start`
2. Do `$ karma run` for blazing fast test running

#### Functional Test Running with [FuncUnit](http://funcunit.com):
1. Run `npm start` or `grunt server`.
2. The tests will run automatically as `localhost:9090` gets opened.
3. Refresh the page to rerun all the tests or click on `rerun` to rerun a specific one.

#### Test Running on [BrowserStack](http://browserstack.com):
1. Put `BrowserStackTunnel.jar` inside the `scripts` folder
2. Configure `scripts/bs-tunnel.sh` and `.browserstack.json` with your BrowserStack credentials
3. Change the default browser inside `karma.conf.js` to one that uses BrowserStack
4. Open a new terminal an run `$ karma start`
5. Create the tunnel by running `$ npm run-script bs-tunnel`
6. Run `$ karma run` every time you need to run your tests

#### Client-side Package Management (using [Bower](http://bower.io)):
1. Search a package doing: `$ bower search key words`
2. Install a package doing: `$ bower install packageName[@version]`
3. Remove a package doing: `$ bower uninstall packageName`

#### Known Issues
1. Sometimes the components folder doesn't get populated after setup raising weird erros in the browser. Calling `$ bower i` solves this issue.

2. EPEERINVALID after `npm i` or `npm run-script setup`. A recent update in Karma brought dependency management problems. We recommend to swipe karma out completely (and all globally installed plugins) and re install by running `npm run-script setup`.

3. `npm run-script setup` gives EACCESS error. Try running it with `sudo`.
