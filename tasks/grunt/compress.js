module.exports = {
  main: {
    options: {
      mode: 'gzip'
    },
    files: [
      // Each of the files in the src/ folder will be output to
      // the dist/ folder each with the extension .gz.js
      { expand: true, src: [ 'scripts/*.js', ], dest: 'dist/', ext: '.js', cwd: '.tmp/' }
    ]
  }
};
