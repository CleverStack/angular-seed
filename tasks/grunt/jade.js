module.exports = {
  options: {
    pretty: true,
    debug: true
  },
  compile: {
    expand: true,
    src: [
      './app/modules/**/views/**/*.jade'
    ],
    dest: './',
    ext: '.html'
  }
};