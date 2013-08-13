# CleverStack Angular Seed
## An angular seed 

### Features:
1. Live Reload in development
2. Builds ANY preprocessor (less, sass, stylus, jade, ejs ...)
3. Unit testing and Functional testing are easy to do with karma including running your tests in browserstack
4. Easy integration with your CI/Deployment Solution

### Prerequisites:
1. sudo npm -g uninstall karma (There has been an issue with karma, if you see EPEERINVALID then this is the problem)
2. sudo npm -g i karma
3. sudo npm -g i grunt-cli

### Setup:
1. Install node and npm
2. Clone the repo, cd into it
3. Run `$ npm run-script setup` (You may need to use sudo on linux)
4. If 3. doesn't work, a normal `npm i; bower i;` works if you have `grunt-cli`, `bower`, `phantomjs`(optional) and `karma` installed.

### Usage:
A shortcut `npm start` is provided to start a development server on `localhost:9000`.

What a normal start looks like:
```
richard@richard-ubuntu:~/Projects/cleverstack-angular-seed$ grunt server
Running "clean:server" (clean) task

Running "livereload-start" task
... Starting Livereload server on 35729 ...

Running "connect:livereload" (connect) task
Started connect web server on localhost:9000.

Running "watch" task
Watching app/{,*/}*.html,{.tmp,app}/styles/{,*/}*.css,{.tmp,app}/views/{,*/}*.html,{.tmp,app}/scripts/{,*/}*.js,app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}
```

#### Documentation with [Docular](https://github.com/gitsome/docular):
1. To build the documentation run `grunt docular`.
2. To open the documentation you can use `grunt docular-server`

#### Task Automation with [Grunt](http://http://gruntjs.com/):
1. To start a local server do: `$ grunt server`
4. To make a local build do: `$ grunt build`

#### Test Running with [Karma](http://karma-runner.github.io):
1. To run the Unit tests server do: `$ karma start`
2. Do `$ karma run` for blazing fast test running

#### Test Running on [BrowserStack](http://browserstack.com):
1. Put `BrowserStackTunnel.jar` inside the `scripts` folder
2. Configure `scripts/bs-tunnel.sh` and `.browserstack.json` with your BrowserStack credentials
3. Open a new terminal an run `grunt test:e2e` with your desired config
4. Create the tunnel by running `npm run-script bs-tunnel`
5. Run `karma run karma.e2e.config.js` every time you need to run your tests

#### Client-side Package Management (using [Bower](http://bower.io)):
1. Search a package doing: `$ bower search key words`
2. Install a package doing: `$ bower install packageName[@version]`
3. Remove a package doing: `$ bower uninstall packageName`

#### Known Issues
1. Sometimes the components folder doesn't get populated after setup raising weird erros in the browser. Calling `$ bower i` solves this issue.
