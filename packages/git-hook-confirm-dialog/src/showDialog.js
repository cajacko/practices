const dialog = require("dialog");

const showDialog = (message, title) => {
  dialog.warn(message, title || "Git Hook");
};

module.exports = showDialog;
