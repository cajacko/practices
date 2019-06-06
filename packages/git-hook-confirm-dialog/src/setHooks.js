const runCommand = require("./runCommand");
const { join } = require("path");

const setHooks = () => {
  const gitTemplateDir = join(__dirname, "./git-templates");

  return runCommand("git", [
    "config",
    "--global",
    "init.templatedir",
    gitTemplateDir
  ]);
};

module.exports = setHooks;
