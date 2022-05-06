module.exports = {
    port: 8000,
    files: ["./src/**/*.{html,htm,scss,js,ts"],
    server: {
      baseDir: "./dist\\sopra.fromacion-angular.challenge",
      middleware: {
        3 : require('compression')()
      },
    },
  };