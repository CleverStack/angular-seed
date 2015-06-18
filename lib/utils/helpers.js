var fs    = require('fs')
  , path  = require('path')
  , debug = require('debug')('cleverstack:utils:helpers');

module.exports = {
  getFilesForFolder: function(folderName) {
    var files = [];

    if (fs.existsSync(folderName)) {
      fs.readdirSync(folderName).forEach(function(fileName) {
        if (fs.statSync(path.join(folderName, fileName)).isFile() && /\.js$/.test(fileName)) {
          files.push(fileName);
        }
      });
    }

    return files;
  },

  fallbackToIndex: function(connect, index, file) {
    return connect().use(function(req, res, next) {
      if(req.url === file) {
        return next();
      }

      if(/\/(.*.(html|js|css))$/.test(req.url)) {
        return res.end(fs.readFileSync(path.resolve(path.join(index.replace(file, ''), RegExp.$1))));
      }

      res.end(fs.readFileSync(index));
    });
  },

  mountFolder: function(connect, dir) {
    return connect.static(path.resolve(dir));
  }
};
