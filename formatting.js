function Format(text) {
  this.text = text;
}

function formatting(text) {
  return new Format(text);
}

module.exports = {
  "val":formatting
}
