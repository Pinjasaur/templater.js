# templater.js

Dead-simple JavaScript templating with a tiny<sup>1</sup> footprint. View the [website][homepage] for extended details & documentation.

Inspired by http://jsforallof.us/2014/12/01/the-anatomy-of-a-simple-templating-engine/ and http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line.

<sup>1</sup> < 1KB after minification.

## Quick Start

1. Install the script

    The script can be installed with [bower][bower], [npm][npm], or by grabbing the [latest release][latest] from GitHub.

    ```sh
    bower install templater.js # For Bower
    npm install templater.js # For npm
    ```

2. Load in the script

    If in a browser environment, with a `<script>` tag
    ```html
    <script src="path/to/templater.min.js"></script>
    ```
    
    Or, if in a Node.js environment with a `require()`
    ```js
    var templater = require("templater");
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

## Syntax

### Expressions

Syntax mimics the [Handlebars][handlebars] templating expression: `{{ contents }}` where `contents` represents what you'd like to replace when the template is rendered. Note that the amount whitespace between `contents` and the two braces is limited to exactly 0 (zero) or 1 (one). For example, the following are all valid expressions:

- `{{contents}}`
- `{{ contents}}`
- `{{contents }}`
- `{{ contents }}`

However, for the sake of readability and consistency I would recommend sticking to using no spaces (`{{contents}}`) _or_ 1 space on either side (`{{ contents }}`).

### Conditionals

You can conditionally show template contents by using an `#if` directive with the following syntax:

```html
{{ #if (condition) }}
  <!-- this only renders if `condition` is truthy -->
  <p>My conditional contents: {{ contents }}</p>
{{ /if }}
```

The arguments in the `#if` expression are expression contents that **must** be truthy for the body of the condition to be rendered. You can have multiple conditions separated by commas: `{{ #if (foo, bar, baz) }}`.

For example, given the following template snippet

```html
{{ #if (name, age) }}
  <p>Hi my name is {{ name }} and I am {{ age }} years old.</p>
{{ /if }}
```

rendered against the following data
```javascript
{
  name: "Paul",
  age: 20
}
```

will produce
```html
<p>Hi my name is Paul and I am 20 years old.</p>
```

however, rendered against data where `name` and/or `age` is falsy
```javascript
{
  name: "Paul",
  age: 0
}
```

the body of the `if` condition will not be rendered.

## Limitations & Restrictions

Given the simple nature of the templating, there are 3 main limitations to consider:

1. Nested `#if`s will not work. Example:

    ```html
    {{ #if (some_condition) }}
      {{ #if (another_condition) }}
        <p> {{ contents }} </p>
      {{ /if }}
    {{ /if }}
    ```

    However, keep in mind you can have multiple conditions in the `#if`.

2. Nested properties will not work. Example:

    ```html
    {{ property.with.nested.contents }}
    ```

3. HTML (specifically &, <, and >) is escaped when it is inserted into the template. Example:

    The expression `<p> {{ contents }} </p>` when rendered against
    ```javascript
    {
      contents: "<my contents & stuff>"
    }
    ```
    will produce `<p> &lt;contents &amp; stuff&gt; </p>`.

## Contributing

If you'd like to fork the repo and submit pull request, please feel free.

Check out [CONTRIBUTING.md][CONTRIBUTING] for specifics.

[CONTRIBUTING]: https://github.com/Pinjasaur/templater.js/blob/master/CONTRIBUTING.md
[handlebars]: http://handlebarsjs.com/
[homepage]: http://pinjasaur.github.io/templater.js/
[bower]: https://bower.io/
[npm]: https://www.npmjs.com/
[latest]: https://github.com/Pinjasaur/templater.js/releases/latest
