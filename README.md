# templater.js
Dead-simple JavaScript templating with a tiny<sup>1</sup> footprint. View the [website][homepage] for examples.

Inspired by http://jsforallof.us/2014/12/01/the-anatomy-of-a-simple-templating-engine/ and http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line.

<sup>1</sup> < 1K after minification.

## TODO

- [ ] more testing
- [x] set up gulp for minification, etc
- [ ] beef up readme with usage, limitations, etc
- [ ] create demo?

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
- `{{contents}}`
- `{{     contents}}`
- `{{contents   }}`
- `{{   contents     }}`

However, for the sake of readability I would recommend using no spaces on 1 space on either side.

### Conditionals

If you'd like to 

## Limitations & Restrictions

Given the simple nature of the templating, there are 3 main limitations to consider:

1. Nested `#if`s will not work. 

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

3. HTML is escaped when it is inserted into the template.

## Contributing

If you'd like to fork the repo and submit pull request, please feel free.

Please be considerate of the following guidelines:
- Use 2 spaces for a tab.
- Double quotes, not single.
- Run `gulp build` to rebuild the files in `dist/`. 
- Document what you did with comments in the source and an explanation in the pull request.

[handlebars]: http://handlebarsjs.com/
[homepage]: http://pinjasaur.github.io/templater.js/