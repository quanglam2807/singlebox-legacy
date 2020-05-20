const { app } = require('electron');
const path = require('path');

const REACT_PATH = !app.isPackaged ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '..', '..', 'build', 'index.html')}`;

module.exports = {
  REACT_PATH,
};
