const spawn = require("cross-spawn");

const runCommand = (cmd, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args || [], { stdio: "inherit" });

    child.on("close", code => {
      if (code) {
        reject(new Error(`child process exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
};

module.exports = runCommand;
