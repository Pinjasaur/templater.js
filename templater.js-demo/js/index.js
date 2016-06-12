var profiles = [
  {
    name: "John Smith",
    location: "'Murica",
    quote: "Don't drink and derive.",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam ligula, iaculis sed laoreet id, eleifend sed dolor. Integer laoreet vehicula magna, et pulvinar urna. Curabitur hendrerit mi sit amet libero molestie, ut ultrices nunc tincidunt. Phasellus vitae facilisis dolor. Integer ipsum magna, convallis et nisl in, suscipit aliquam metus. Morbi libero magna, luctus dictum imperdiet non, varius at sapien. Duis id erat ut elit porta facilisis luctus et mi. Praesent feugiat vestibulum augue, eget tincidunt dui lobortis eget. Cras consectetur fringilla velit, ac accumsan ligula mollis vulputate.",
    img: "https://source.unsplash.com/category/people/250x250"
  },
  {
    name: "Jane Smith",
    age: 42,
    location: "Canada",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam ligula, iaculis sed laoreet id, eleifend sed dolor. Integer laoreet vehicula magna, et pulvinar urna. Curabitur hendrerit mi sit amet libero molestie, ut ultrices nunc tincidunt. Phasellus vitae facilisis dolor. Integer ipsum magna, convallis et nisl in, suscipit aliquam metus. Morbi libero magna, luctus dictum imperdiet non, varius at sapien. Duis id erat ut elit porta facilisis luctus et mi. Praesent feugiat vestibulum augue, eget tincidunt dui lobortis eget. Cras consectetur fringilla velit, ac accumsan ligula mollis vulputate.",
    img: "https://source.unsplash.com/category/people/200x200"
  },
  {
    name: "Jim Bob",
    age: 9001,
    location: "The 3rd Planet from the Sun",
    quote: "<super inspirational quote>",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam ligula, iaculis sed laoreet id, eleifend sed dolor. Integer laoreet vehicula magna, et pulvinar urna. Curabitur hendrerit mi sit amet libero molestie, ut ultrices nunc tincidunt. Phasellus vitae facilisis dolor. Integer ipsum magna, convallis et nisl in, suscipit aliquam metus. Morbi libero magna, luctus dictum imperdiet non, varius at sapien. Duis id erat ut elit porta facilisis luctus et mi. Praesent feugiat vestibulum augue, eget tincidunt dui lobortis eget. Cras consectetur fringilla velit, ac accumsan ligula mollis vulputate.",
    img: "https://source.unsplash.com/category/people/150x150"
  },
];

var template = templater(document.getElementById("template").innerHTML);

profiles.forEach(function(item) {
  document.querySelector(".profiles").insertAdjacentHTML("beforeend", template(item));
});

function templater(template) {
  "use strict";
  
  // return a function to use the replacement values
  return function(data) {
    
    // regex for the #if, body, /if
    var start = "{{\\s*#if\\s+\\((.+)\\)\\s*}}",
        end = "{{\\s*/if\\s*}}",
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
        if (!data.hasOwnProperty(conditions[i])) {
          meetsConditions = false;
          break;
        }
      }
      
      // DEBUG
      console.log(match);
      
      // check if it meets the conditions
      if (!meetsConditions) {
        // wipe the #if, /if, and body if it doesn't
        template = template.split(match[0]).join("");
      } else {
        // otherwise just get rid of the #if and /if statements
        var open = new RegExp(start, "i"), close = new RegExp(end, "i");
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
      regex = "{{\\s*" + prop + "\\s*}}";
      // replace the instances in the template with the property value (escaping &, <, and > if necessary)
      template = template.replace(new RegExp(regex, "ig"), ("" + data[prop]).replace(/[&<>]/g, function(tag) {
        // replace &, <, or > if necessary
        var replaceTags = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;"
        };

        return replaceTags[tag] || tag;
      }));
    }
    
    // set the template back to its original state (so it can be used again)
    var ret = template;
    template = tmpl;
    return ret;
  }
}