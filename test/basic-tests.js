var templater = require("./../src/templater.js"),
    chai = require("chai"),
    assert = chai.assert;

describe("Basic Tests", function() {
  it("should return a function when called with a template", function() {
    var template = templater("A string.");

    assert.equal(typeof template, "function");
  });

  it("should replace values in template with respective values in context", function() {
    var template = templater("{{name}}"),
        context = {
          name: "Paul"
        };

    assert.equal(template(context), "Paul");
  });

  it("should not replace values in template that don't exist in the context", function() {
    var template = templater("Hi, I'm {{name}}. I'm {{age}} years old."),
        context = {
          age: 20
        };

    assert.equal(template(context), "Hi, I'm {{name}}. I'm 20 years old.");
  });

  it("should escape certain characters when replacing template expressions", function() {
    var template = templater("{{foo}}"),
        context = {
          foo: "<html> tag with 'single' & \"double\" quotes"
        };

    assert.equal(template(context), "&lt;html&gt; tag with &#39;single&#39; &amp; &quot;double&quot; quotes");
  });
});
