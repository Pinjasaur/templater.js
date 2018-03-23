var templater = require("../src/templater"),
    chai = require("chai"),
    assert = chai.assert;

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
