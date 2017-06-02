# templater.js

[![Travis Build](https://img.shields.io/travis/Pinjasaur/templater.js.svg)](https://travis-ci.org/Pinjasaur/templater.js)
[![GitHub License](https://img.shields.io/github/license/Pinjasaur/templater.js.svg)](https://github.com/Pinjasaur/templater.js)


Dead-simple JavaScript templating with a tiny<sup>1</sup> footprint. View the [website][homepage] for extended details & documentation.

Inspired by http://jsforallof.us/2014/12/01/the-anatomy-of-a-simple-templating-engine/ and http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line.

<sup>1</sup> < 1KB minified + gzipped.

## Quick Start

1. Install the script

    The script can be installed with [Bower][bower], [npm][npm], or by grabbing the [latest release][latest] from GitHub.

    ```sh
    bower install templaterjs # For Bower
    npm install templater.js # For npm
    ```

2. Load in the script

    If in a browser environment, with a `<script>` tag
    ```html
    <script src="path/to/templater.min.js"></script>
    ```
    
    Or, if in a Node.js environment with a `require()`
    ```js
    var templater = require("templater.js");
    ```

3. Create the template

    ```html
    <!-- by giving it a non-standard `type` the browser will ignore it -->
    <script id="template" type="text/template">
    <h1>Hi, I'm {{name}}.</h1>
    </script>
    ```

4. Use template and render it against some data

    ```javascript
    var template = templater(document.getElementById("template").innerHTML),
        context = {
          name: "Paul"
        };

    console.log(template(context)); // <h1>Hi, I'm Paul.</h1>
    ```

## Documentation

For further documentation and resources, visit the [templater.js website][homepage].

## Contributing

If you'd like to fork the repo and submit pull request, please feel free.

Check out [CONTRIBUTING.md][CONTRIBUTING] for specifics.

[CONTRIBUTING]: https://github.com/Pinjasaur/templater.js/blob/master/CONTRIBUTING.md
[homepage]: http://pinjasaur.github.io/templater.js/
[bower]: https://bower.io/
[npm]: https://www.npmjs.com/
[latest]: https://github.com/Pinjasaur/templater.js/releases/latest
