# templater.js
Dead-simple JavaScript templating with a tiny<sup>1</sup> footprint. View the [website][homepage] for details & examples.

Inspired by http://jsforallof.us/2014/12/01/the-anatomy-of-a-simple-templating-engine/ and http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line.

<sup>1</sup> < 1KB after minification.

## TODO

- [ ] more testing
- [x] set up gulp for minification, etc
- [x] beef up readme with usage, limitations, etc
- [ ] create demo?
- [ ] ~~0/1 spaces~~, not #if, ~~use [] not hOP~~, ~~add `g` to regex~~

## Quick Start

1. Load in the script

    ```html
    <script src="path/to/templater.min.js"></script>
    ```

2. Create the template

    ```html
    <!-- by giving it a non-standard `type` the browser will ignore it -->
    <script id="template" type="text/template">
      <h1>Hi, I'm {{ name }}.</h1>
      {{ #if (age) }}
        <p>I am {{ age }} years old.</p>
      {{ /if }}
      <p><b>About me: </b> {{ bio }}</p>
    </script>
    ```

3. Use template and render to the DOM

    ```javascript
    var template = templater(document.getElementById("template").innerHTML);

    document.body.insertAdjacentHTML("beforeend", template({
      name: "John Smith",
      age: 20,
      bio: "<insert biography here>"
    }));
    ```

## Syntax

### Expressions

Syntax mimics the [Handlebars][handlebars] templating expression: `{{ contents }}` where `contents` represents what you'd like to replace when the template is rendered. Note that the amount whitespace between `contents` and the two braces doesn't matter. For example, the following are all valid expressions:
- <code>{{contents}}</code>
- <code>{{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contents}}</code>
- <code>{{contents&nbsp;&nbsp;&nbsp;}}</code>
- <code>{{&nbsp;&nbsp;&nbsp;contents&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</code>

However, for the sake of readability I would recommend using no spaces (`{{contents`) _or_ 1 space on either side (`{{ contents }}`).

### Conditionals

You can conditionally show template contents by using a `if` condition with the following syntax:

```html
{{ #if (condition) }}
  <!-- this only renders if `condition` exists in the object the template is rendered with -->
  <p>My conditional contents: {{ contents }}</p>
{{ /if }}
```

The arguments in the `#if` expression are expression contents that **must** exist for the body of the condition to be rendered. You can have multiple conditions separated by commas: `{{ #if (foo, bar, baz) }}`.

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

however, rendered against data where `name` and/or `age` is not present
```javascript
{
  name: "Paul"
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
