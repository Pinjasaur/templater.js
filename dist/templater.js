/*!
 * templater.js v3.0.1 - Minimal JavaScript templating.
 * On the web at https://pinjasaur.github.io/templater.js/
 * Written by Paul Esch-Laurent
 * Licensed under MIT
 */
(function() {

  "use strict";

  function templater(template) {

    /**
     * Resolves values for an object given a property in dot-notation form.
     * @param  {Object} haystack The object to search
     * @param  {String} needle   The property to search for
     * @return {*}               The value found
     */
    function resolve(haystack, needle) {

      if (haystack[needle]) {

        return haystack[needle];

      } else {

        var needles = needle.split("."),
            prop    = needles.shift();

        if (haystack[prop]) {
          return resolve(haystack[prop], needles.join("."));
        }

        return null;

      }
    }

    /**
     * Traverses an object and returns all properties in dot-notation form.
     * @param  {Object} obj Object to traverse
     * @param  {Array}  arr Array to push properties to
     * @param  {String} ctx Current object context (used in recursive calls)
     * @return None
     */
    function traverse(obj, arr, ctx) {

      for (var prop in obj) {

        if (typeof obj[prop] !== "object") {
          arr.push((ctx !== undefined) ? ctx + "." + prop : prop);
        } else {
          traverse(obj[prop], arr, (ctx !== undefined) ? ctx + "." + prop : prop);
        }

      }
    }

    // return a function to use the replacement values
    return function(data) {

      // regex for the #if, body, /if
      var start = "{{\\s?#if\\s+(!)?\\((.+)\\)\\s?}}",
          end = "{{\\s?/if\\s?}}",
          regex = start + "[\\s\\S]+?" + end,
          // save a reference to the template so it can be restored at the end
          tmpl = template,
          props = [],
          match;

      // get all properties with values
      traverse(data, props);

      // keep matching conditions until there are none
      while (match = new RegExp(regex, "g").exec(template)) {

        // assume it meets all conditions
        var meetsConditions = true;

        // if a match for /(!)?/ was found, it's `notted`
        var notted = !!match[1];

        // remove all whitespace between conditions, split on commas
        var conditions = match[2].replace(/\s+/g, "").split(",");

        // check each condition to see if it's truthy
        for (var i = 0; i < conditions.length; i++) {
          // if it isn't, break out
          if (!resolve(data, conditions[i])) {
            meetsConditions = false;
            break;
          }
        }

        // perform an XOR operation based on if the #if was notted (!) and
        // whether all the arguments were `truthy`
        meetsConditions = notted ^ meetsConditions;

        // check if it doesn't meet the conditions
        if (!meetsConditions) {
          // wipe the #if, /if, and body if it doesn't
          template = template.split(match[0]).join("");
        } else {
          // otherwise just get rid of the #if and /if statements
          var open = new RegExp(start, "g"),
              close = new RegExp(end, "g");

          // beginning of the template
          template = template.substring(0, match["index"])
              // body of the condition
            + match[0].replace(open, "").replace(close, "")
              // end of the template
            + template.substring(match["index"] + match[0].length, template.length);
        }
      }

      // loop through each property of the data
      props.forEach(function(prop) {
        // create the regex to match the '{{ prop }}' format
        regex = "{{\\s?" + prop + "\\s?}}";

        // get the value depending on type, casted to string
        var value = resolve(data, prop);
        value = String((typeof value === "function") ? value() : value);

        // replace the instances in the template with the property value
        // (escaping characters if necessary)
        template = template.replace(new RegExp(regex, "g"), value.replace(/[&<>"']/g, function(tag) {
          // characters mapped to their entities
          var replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          };

          return replacements[tag] || tag;
        }));
      });

      // set the template back to its original state (so it can be used again)
      var ret = template;
      template = tmpl;
      return ret;
    }
  }

  // expose templater globally (to `window` or `module.exports`)
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = templater;
  } else {
    window.templater = templater;
  }

})();
