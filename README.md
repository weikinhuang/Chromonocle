[Chromonocle](https://chrome.google.com/webstore/detail/chromonocle/mfmekffkgoeakflgdpihmamhbajmpdfl)
==================================================

Chromonocle is an easy-to-use XHR (ajax) request inspector designed specifically for Chrome. 
It seamlessly brings the convenient XHR request inspecting functionality found in Firebug to the Chrome console. 
Chromonocle allows developers to see all the important info about ajax requests without ever leaving the console tab.

![Chromonocle](https://github.com/weikinhuang/Chromonocle/raw/master/img/967x439_screenshot.png)

Building the Source
--------------------------------------

Chromonocle uses the [grunt](https://github.com/cowboy/grunt) build system.

```bash
# Install grunt.
$ npm install -g grunt-cli bower

# Clone the git repo.

# Install node modules.
$ npm install
$ bower update

# Run grunt.
$ grunt
```

To test on Chrome during development:
```
# Navigate to chrome://extensions
# Check "Developer Mode" in upper right corner
# Click "Load unpacked extension..."
# Navigate to the src directory

# When changes are made, Click "Reload (Ctrl+R)" on this extension
# (Or use the "Extensions Reloader" extension)
# Then close and repoen the Developer Tools
```

Changelog
--------------------------------------

#### v0.0.1
	Initial working version

References
--------------------------------------
 - [Extending Devtools](http://developer.chrome.com/extensions/devtools.html)
 - [chrome.devtools.network](http://developer.chrome.com/extensions/devtools_network.html)
 - [Sample Extensions](http://developer.chrome.com/extensions/samples.html#devtools.network)
 - [Hosting](http://developer.chrome.com/extensions/hosting.html)
 - [Packaging](http://developer.chrome.com/extensions/packaging.html)
 - [AutoUpdate](http://developer.chrome.com/extensions/autoupdate.html)

About
--------------------------------------

Chromonocle copyright 2014 by [Wei Kin Huang](http://www.closedinterval.com/).

Logo design by Tim Rogus.

Build Tools: 
[Grunt](https://github.com/cowboy/grunt),
[JsHint](https://github.com/jshint/jshint),

All code released under the [MIT License](http://mit-license.org/).

Fork me to show support and help fix bugs!
