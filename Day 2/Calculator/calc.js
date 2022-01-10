// const command = process.argv;
// console.log(command[3], command[4]);

// if (command[2] === "add") {
//   console.log(parseInt(command[3]) + parseInt(command[4]));
// } else if(command[2] === 'sub'){

// }

const yargs = require("yargs");
yargs.command({
  command: "add",
  describe: "Sum of 2 values",
  builder: {
    a: {
      describe: "a is first param",
      demandOption: true,
      type: "number",
    },
    b: {
      describe: "b is second param",
      demandOption: true,
      type: "number",
    },
  },
  handler: function (argv) {
    console.log(argv.a + argv.b);
  },
});
yargs.command({
  command: "sub",
  describe: "Sub",
  builder: {
    a: {
      describe: "a is first param",
      demandOption: true,
      type: "number",
    },
    b: {
      describe: "b is second param",
      demandOption: true,
      type: "number",
    },
  },
  handler: function (argv) {
    console.log(argv.a - argv.b);
  },
});
yargs.command({
  command: "mult",
  describe: "mult",
  builder: {
    a: {
      describe: "a is first param",
      demandOption: true,
      type: "number",
    },
    b: {
      describe: "b is second param",
      demandOption: true,
      type: "number",
    },
  },
  handler: function (argv) {
    console.log(argv.a * argv.b);
  },
});
yargs.command({
  command: "pow",
  describe: "pow",
  builder: {
    a: {
      describe: "a is first param",
      demandOption: true,
      type: "number",
    },
  },
  handler: function (argv) {
    console.log(argv.a * argv.a);
  },
});

yargs.parse();
