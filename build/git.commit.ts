import { version } from "../package.json";
import pkg from "./electron/package.json";
import fs from "fs";
pkg.version = version;
console.info("git pre-commmit set version to electron "); 

fs.writeFileSync("./electron/package.json", JSON.stringify(pkg));
