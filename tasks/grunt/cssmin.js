module.exports = {
  options: {
    root:           './app',
    relativeTo:     '/'
  },
  dist: {
    files: {
      '<%= appConfig.dist.path %>/styles/screen.css': [
        '<%= appConfig.dev.path %>/styles/preloader.css',
        '<%= appConfig.dev.path %>/styles/bootstrap.css',
        '<%= appConfig.dev.path %>/components/fontawesome-actions/dist/css/font-awesome.min.css',
        '<%= appConfig.dev.path %>/components/angular-ui/build/angular-ui.min.css',
        '<%= appConfig.dev.path %>/components/ng-table/ng-table.min.css',
        '<%= appConfig.dev.path %>/components/jquery-minicolors/jquery.minicolors.css',
        '<%= appConfig.dev.path %>/components/select2/select2.css',
        '<%= appConfig.dev.path %>/components/select2/select2-bootstrap.css',
        '<%= appConfig.dev.path %>/styles/application.css'
      ]
    }
  },
};
