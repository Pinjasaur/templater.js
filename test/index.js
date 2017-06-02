var templater = require("./../src/templater.js"),
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

  it("should not replace values in template that don't exist in the context", function() {
    var template = templater("Hi, I'm {{name}}. I'm {{age}} years old."),
    context = {
      age: 21
    };

    assert.equal(template(context), "Hi, I'm {{name}}. I'm 21 years old.");
  });

  it("should escape certain characters when replacing template expressions", function() {
    var template = templater("{{foo}}"),
    context = {
      foo: "<html> tag with 'single' & \"double\" quotes"
    };

    assert.equal(template(context), "&lt;html&gt; tag with &#39;single&#39; &amp; &quot;double&quot; quotes");
  });
});

/**
* Conditional tests.
*/
describe("Conditional Tests", function() {
  it("renders conditional body if the arguments are truthy", function() {
    var template = templater([
      "{{#if (name, age)}}",
      "Hi, I'm {{name}}, I'm {{age}} years old.",
      "{{/if}}"
    ].join("")),
    context = {
      name: "Paul",
      age: 21
    };

    assert.equal(template(context), "Hi, I'm Paul, I'm 21 years old.");
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

  it("inverts (nots) the evaluation of truthy arguments", function() {
    var template = templater([
      "{{#if !(name, age)}}",
      "Hi, I'm {{name}}, I'm {{age}} years old.",
      "{{/if}}"
    ].join("")),
    context = {
      name: "Paul",
      age: 21
    };

    assert.equal(template(context), "");
  });

  it("inverts (nots) the evaluation of falsy arguments", function() {
    var template = templater([
      "{{#if !(name, age)}}",
      "Hi, I'm {{name}}, I'm {{age}} years old.",
      "{{/if}}"
    ].join("")),
    context = {
      name: "Paul"
    };

    assert.equal(template(context), "Hi, I'm Paul, I'm {{age}} years old.");
  });
});

/**
* Nested properties.
*/
describe("Nested Properties", function() {
  it("should replace values in template with respective values in context", function() {
    var template = templater("{{person.name}}, {{person.age}}"),
    context = {
      person: {
        name: "Paul",
        age: 21
      }
    };

    assert.equal(template(context), "Paul, 21");
  });

  it("should replace values in template with respective values in context (array)", function() {
    var template = templater("{{people.0.name}}, {{people.0.age}}"),
    context = {
      people: [
        {
          name: "Paul",
          age: 21
        }
      ]
    };

    assert.equal(template(context), "Paul, 21");
  });

  it("should not replace values in template that don't exist in the context", function() {
    var template = templater("Hi, I'm {{person.name}}. I'm {{person.age}} years old."),
    context = {
      person: {
        age: 21
      }
    };

    assert.equal(template(context), "Hi, I'm {{person.name}}. I'm 21 years old.");
  });

  it("should replace values in template with respective values in context (function)", function() {
    var template = templater("{{exp.x}} + {{exp.y}} = {{exp.z}}"),
    context = {
      exp: {
        x: 2,
        y: 2,
        z: function() {
          return 2 + 2;
        }
      }
    };

    assert.equal(template(context), "2 + 2 = 4");
  });
});

/**
* Conditional (nested property) tests.
*/
describe("Conditional (Nested Property) Tests", function() {
  it("renders conditional body if the arguments are truthy", function() {
    var template = templater([
      "{{#if (person.name, person.age)}}",
      "Hi, I'm {{person.name}}, I'm {{person.age}} years old.",
      "{{/if}}"
    ].join("")),
    context = {
      person: {
        name: "Paul",
        age: 21
      }
    };

    assert.equal(template(context), "Hi, I'm Paul, I'm 21 years old.");
  });

  it("doesn't render conditional body if one or more of the args are falsy", function() {
    var template = templater([
      "{{#if (person.name, person.age)}}",
      "Hi, I'm {{person.name}}, I'm {{person.age}} years old.",
      "{{/if}}"
    ].join("")),
    context = {
      person: {
        name: "Paul",
        age: 0
      }
    };

    assert.equal(template(context), "");
  });

  it("inverts (nots) the evaluation of truthy arguments", function() {
    var template = templater([
      "{{#if !(person.name, person.age)}}",
      "Hi, I'm {{person.name}}, I'm {{person.age}} years old.",
      "{{/if}}"
    ].join("")),
    context = {
      person: {
        name: "Paul",
        age: 21
      }
    };

    assert.equal(template(context), "");
  });

  it("inverts (nots) the evaluation of falsy arguments", function() {
    var template = templater([
      "{{#if !(person.name, person.age)}}",
      "Hi, I'm {{person.name}}, I'm {{person.age}} years old.",
      "{{/if}}"
    ].join("")),
    context = {
      person: {
        name: "Paul"
      }
    };

    assert.equal(template(context), "Hi, I'm Paul, I'm {{person.age}} years old.");
  });
});
