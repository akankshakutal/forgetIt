const sinon = require("sinon");
const { loadUserLoginData, getUserTodos } = require("../src/fileHandler");

describe("loadUserLoginData", function() {
  it("should check if called once", function() {
    let fs = {};
    fs.writeFileSync = sinon.spy();
    loadUserLoginData(fs);
    sinon.assert.calledOnce(fs.writeFileSync);
  });
});

describe("getUserTodos", function() {
  it("should check if called once", function() {
    let fs = {};
    fs.writeFileSync = sinon.spy();
    getUserTodos(fs);
    sinon.assert.notCalled(fs.writeFileSync);
  });
});
