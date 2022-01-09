const fs = require("fs");

fs.writeFileSync(
  "text.txt",
  "This is my first Text made using nodeJS in this bootcamp"
);
fs.copyFileSync("text.txt", "copy.txt");
fs.renameSync("text.txt", "PiniAndMordy.txt");
const list = fs.readdirSync("./");
fs.appendFileSync("copy.txt", `\n${list}`);
