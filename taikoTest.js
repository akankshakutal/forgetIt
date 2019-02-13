const {
  openBrowser,
  goto,
  into,
  textField,
  click,
  write,
  inputField,
  button,
  closeBrowser
} = require("taiko");
(async () => {
  try {
    await openBrowser();
    await goto("localhost:8080");
    await click(textField({ name: "uname" }));
    await write("akanksha", into("uname:"));
    await click(inputField({ name: "pwd" }));
    await write("123", into("pwd:"));
    await click(button("sign in"));
    await click(button("edit"));
    await click(textField({ name: "todoItemText" }));
  } catch (e) {
    console.error(hello);
  } finally {
    await closeBrowser();
  }
})();
