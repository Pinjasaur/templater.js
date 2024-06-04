var templater = require("../src/templater"),
    chai = require("chai"),
    assert = chai.assert;

/**
* Basic tests.
*/
describe("Basic Tests", function() {
  it("should return a function when called with a template", function() {
    var template = templater("A string.");

    assert.equal(typeof template, "function");
  });

  it("should replace values in template with respective values in context (non-function)", function() {
    var template = templater("{{name}}"),
        context = {
          name: "Paul"
        };

    assert.equal(template(context), "Paul");
  });

  it("should replace values in template with respective values in context (function)", function() {
    var template = templater("{{number}}"),
        context = {
          number: function() {
            return 2 + 2;
          }
        };

    assert.equal(template(context), 4);
  });

  it("should not replace values in template that don't exist in the context (undefined)", function() {
    var template = templater("Hi, I'm {{name}}. I'm {{age}} years old."),
        context = {
          age: 21
        };

    assert.equal(template(context), "Hi, I'm {{name}}. I'm 21 years old.");
  });

  it("should not replace values in template that don't exist in the context (case-sensitive)", function() {
    var template = templater("Hi, I'm {{Name}}. I'm {{age}} years old."),
        context = {
          name: "Paul",
          age: 21
        };

    assert.equal(template(context), "Hi, I'm {{Name}}. I'm 21 years old.");
  });

  it("should escape certain characters when replacing template expressions", function() {
    var template = templater("{{foo}}"),
        context = {
          foo: "<html> tag with 'single' & \"double\" quotes"
        };

    assert.equal(template(context), "&lt;html&gt; tag with &#39;single&#39; &amp; &quot;double&quot; quotes");
  });
	
  it("should not escape certain characters escape has been disabled", function() {
    var template = templater("{{foo}}"),
        context = {
          foo: "<html> tag with 'single' & \"double\" quotes",
        };

    assert.equal(template(context, { autoescape: false }), "<html> tag with 'single' & \"double\" quotes");
  });

});
