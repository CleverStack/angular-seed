# CleverStack ngSeed
##### A proper AngularJS seed featuring:
1. A Highly Configurable Environment
2. Support for any `grunt`-enabled preprocessor
3. Lightning Fast Unit Testing Support with `karma` *Now with BrowserStack Support*.
4. Beautiful Functional Testing Support ([check it out](http://screencast.com/t/OBxfgoM26T))

## 1. Features ##

#### Documentation with [Docular](https://github.com/gitsome/docular):
1. To build the documentation run `$ grunt docular`.
2. To open the documentation you can use `$ grunt docular-server`

#### Task Automation with [Grunt](http://gruntjs.com/):
1. To start a local server do: `$ grunt server`
2. To make a local build do: `$ grunt build`

**NOTE**: `this build will automatically be available at localhost:9009 if you are also running $ grunt server`

#### Unit Test Running with [Karma](http://karma-runner.github.io):
1. To run the Unit tests server do: `$ karma start`
2. Do `$ karma run` for blazing fast test running
3. To run the Unit tests just once do: `$ karma start --single-run`.

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

## 2. Setup ##
Run `$ npm run-script setup`

#### 2.1. Prerequisites ####
1. `grunt-cli`, `karma`.
2. Optionally are `bower` and `phantomjs`.

#### 2.2 Known Issues ####
1. Sometimes the components folder doesn't get populated after setup raising weird errors in the browser. Calling `$ bower i` solves this issue.
2. EPEERINVALID after `npm i` or `npm run-script setup`. A recent update in Karma brought dependency management problems. We recommend to wipe `karma` out completely (and all globally installed plugins) and re install by running `npm run-script setup`. [Read more here](https://github.com/karma-runner/karma/issues/483)
3. `npm run-script setup` gives EACCESS error. Try running it with `sudo`.

## 3. Usage ##
A shortcut `npm start` is provided to start:

* a development server on `localhost:9000`
* a functional testing server on `localhost:9090/test/e2e/runner.html`
* a production server on `localhost:9009`

What a normal start looks like:
```
$ grunt server
Running "clean:server" (clean) task

Running "livereload-start" task
... Starting Livereload server on 35729 ...

Running "connect:livereload" (connect) task
Started connect web server on localhost:9000.

Running "connect:test" (connect) task
Started connect web server on localhost:9090.

Running "connect:dist" (connect) task
Started connect web server on localhost:9009.

Running "watch" task
Watching app/{,*/}*.html,{.tmp,app}/styles/{,*/}*.css,{.tmp,app}/views/{,*/}*.html,{.tmp,app}/scripts/{,*/}*.js,app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}
```

## 4. Deployment ##
Take the `dist` folder generated after `$ grunt build` and put it wherever you want:

1. Serve it off `nginx`, `express`.
2. Thou we use and recommend `S3` and `CloudFront`.


## 5. Contributing ##
We welcome all help, but please follow this guidelines (Work In Progress):

### 5.1 Git commit message style ###
We follow these [Git Commit Message Conventions](https://docs.google.com/document/d/12niRA9r8j8C4W0_0y_fRrKDjKIq2DBknbkrWQQl1taI/). Thou it's not entirely mandatory, we generate Changelogs with this so please keep in mind.

### 5.2 Some words about coding style ###
- semi-colons.
- Curly braces for single line if blocks. Same for loops and other places.
- Spacing. Indentation = 4 spaces.
- Spacing in functions. `function( like, this ) {}`
- Variable declarations. If multiple variables are defined, use a leading comma for separation.
- Camelcased variable names. No underscores.
- Make sure that key is in objects when iterating over it. See below.

#### 5.3 Spaces ####

Use spaces when defining functions.

```js
function( arg1, arg2, arg3 ) {
    return 1;
}
```

Use spaces for if statements.

```js
if ( condition ) {
    // do something
} else {
    // something else
}
```

#### 5.4 Variable declarations ####

```js
var num  = 1
  , user = new User()
  , date = new Date();
```

#### 5.5 For-In-loops ####

```js
for ( var key in obj ) {
    if ( obj.hasOwnProperty( key ) ) {
        console.log( obj[ key ] );
    }
}
```

#### 5.6 JSHint options ####

```js
fill me in
```
