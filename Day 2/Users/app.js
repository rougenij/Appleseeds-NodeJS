const yargs = require("yargs");
const userFunctions = require("./users");

yargs.command({
  command: "create",
  describe: "Creates a new user",
  builder: {
    name: {
      describe: "user's name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "user's email",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    userFunctions.createUser(argv.name, argv.email);
  },
});

yargs.command({
  command: "delete",
  describe: "deltes a new user",
  builder: {
    id: {
      describe: "user's id",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    userFunctions.deleteUser(argv.id);
  },
});

yargs.command({
  command: "get",
  describe: "Gets a new user",
  builder: {
    id: {
      describe: "user's id",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    userFunctions.getUser(argv.id);
  },
});

yargs.command({
  command: "update",
  describe: "update a new user",
  builder: {
    id: {
      describe: "user's id",
      demandOption: true,
      type: "string",
    },
    name: {
      describe: "user's name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "user's email",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    userFunctions.updateUser(argv.id, argv.name, argv.email);
  },
});

yargs.parse();
