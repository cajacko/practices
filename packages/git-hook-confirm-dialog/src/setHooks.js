const { join } = require("path");
const { copy, ensureDir } = require("fs-extra");
const runCommand = require("./runCommand");

const postCommit = join(__dirname, "./post-commit");

const setHook = dir => {
  const hooksDir = join(dir, ".git/hooks");

  return ensureDir(hooksDir).then(() => {
    const dest = join(hooksDir, "post-commit");

    return copy(postCommit, dest);
  });
};

const setHooks = () => {
  const dir = join(__dirname, "../../../../");

  setHook(join(dir, "practices"));
};

module.exports = setHooks;
