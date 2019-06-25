const { join } = require("path");
const { writeFile, ensureDir } = require("fs-extra");
const runCommand = require("./runCommand");

const hookFilePath = join(__dirname, "./hook.js");

const hookContents = `#!/bin/sh
node ${hookFilePath}

exit 1
`;

const setHook = dir => {
  const hooksDir = join(dir, ".git/hooks");

  return ensureDir(hooksDir).then(() => {
    const dest = join(hooksDir, "post-commit");

    return writeFile(dest, hookContents);
  });
};

const setHooks = () => {
  const dir = join(__dirname, "../../../../");

  setHook(join(dir, "practices"));
};

module.exports = setHooks;
