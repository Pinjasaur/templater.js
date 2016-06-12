# templater.js
Tiny & simple JavaScript templating.

Inspired by http://jsforallof.us/2014/12/01/the-anatomy-of-a-simple-templating-engine/ and http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line.

## TODO

- [ ] more testing
- [x] set up gulp for minification, etc
- [ ] beef up readme with usage, limitations, etc
- [ ] create demo?

## Usage

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

TODO go over syntax

## Limitations

TODO go over limitations
