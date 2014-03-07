Chrome XHR Inspector
==================================================

Chrome XHR Inspector adds expandable areas for XHR requests much like that in Firebug's console view.
Skips a panel change where XHR request details can be seen inline in the Chrome console

![Chrome XHR Inspector](https://github.com/weikinhuang/chrome-xhr-inspector/raw/master/img/screenshot.png)

Building the Source
--------------------------------------

Chrome XHR Inspector uses the [grunt](https://github.com/cowboy/grunt) build system.

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

Chrome XHR Inspector copyright 2014 by [Wei Kin Huang](http://closedinterval.com/).

Build Tools: 
[Grunt](https://github.com/cowboy/grunt),
[JsHint](https://github.com/jshint/jshint),

All code released under the [MIT License](http://mit-license.org/).

Fork me to show support and help fix bugs!
