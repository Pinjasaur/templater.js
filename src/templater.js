(function() {

  "use strict";

  function templater(template) {
    
    // return a function to use the replacement values
    return function(data) {
      
      // regex for the #if, body, /if
      var start = "{{\\s?#if\\s+\\((.+)\\)\\s?}}",
          end = "{{\\s?/if\\s?}}",
          regex = start + "[\\s\\S]+?" + end,
          // save a reference to the template so it can be restored at the end
          tmpl = template,
          match, conditions, meetsConditions;
      
      // keep matching conditions until there are none
      while (match = new RegExp(regex, "ig").exec(template)) {
        
        // assume it meets all conditions
        meetsConditions = true;
        // remove all whitespace between conditions, split on commas
        conditions = match[1].replace(/\s+/g, "").split(",");
        
        // check each condition to see if it exists in the data
        for (var i = 0; i < conditions.length; i++) {
          // if it doesn't, break out
          if (!data[conditions[i]]) {
            meetsConditions = false;
            break;
          }
        }
        
        // check if it meets the conditions
        if (!meetsConditions) {
          // wipe the #if, /if, and body if it doesn't
          template = template.split(match[0]).join("");
        } else {
          // otherwise just get rid of the #if and /if statements
          var open = new RegExp(start, "ig"), close = new RegExp(end, "ig");
          // beginning of the template
          template = template.substring(0, match["index"])
              // body of the condition
            + match[0].replace(open, "").replace(close, "")
              // end of the template
            + template.substring(match["index"] + match[0].length, template.length);
        }
      }
      
      // loop through each property of the data
      for (var prop in data) {
        // create the regex to match the '{{ prop }}' format
        regex = "{{\\s?" + prop + "\\s?}}";
        // replace the instances in the template with the property value (escaping &, <, and > if necessary)
        template = template.replace(new RegExp(regex, "ig"), ("" + data[prop]).replace(/[&<>]/g, function(tag) {
          // replace &, <, or > if necessary
          var replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;"
          };

          return replacements[tag] || tag;
        }));
      }
      
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