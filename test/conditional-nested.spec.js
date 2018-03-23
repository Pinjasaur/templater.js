var templater = require("../src/templater"),
    chai = require("chai"),
    assert = chai.assert;

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
