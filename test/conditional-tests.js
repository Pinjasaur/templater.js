var templater = require("./../src/templater.js"),
    chai = require("chai"),
    assert = chai.assert;

describe("Conditional Tests", function() {
  it("renders conditional body if the arguments are truthy", function() {
    var template = templater([
      "{{#if (name, age)}}",
      "Hi, I'm {{name}}, I'm {{age}} years old.",
      "{{/if}}"
      ].join("")),
        context = {
          name: "Paul",
          age: 20
        };

    assert.equal(template(context), "Hi, I'm Paul, I'm 20 years old.");
  });

  it("doesn't render conditional body if one or more of the args are falsy", function() {
    var template = templater([
      "{{#if (name, age)}}",
      "Hi, I'm {{name}}, I'm {{age}} years old.",
      "{{/if}}"
      ].join("")),
        context = {
          name: "Paul",
          age: 0
        };

    assert.equal(template(context), "");
  });
});