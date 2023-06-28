const { version } = require("../package.json");
const pkg = require("./electron/package.json");
const fs = require("fs");
const path = require("path");
pkg.version = version;
const output = path.resolve("./build/electron/package.json");
console.info("git pre-commmit set version to electron", output);

fs.writeFileSync(output, JSON.stringify(pkg));
