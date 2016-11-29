var gulp = require('gulp');
var exec = require('gulp-exec');

var compileAsciiDoc = function(docPath){
  console.log("Compiling asciidoc file " + docPath + ".\n");
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false // default = false, true means stdout is written to file.contents
  };
  var reportOptions = {
   err: true, // default = true, false means don't write err
   stderr: true, // default = true, false means don't write stderr
   stdout: true // default = true, false means don't write stdout
 };
  gulp.src(docPath)
    .pipe(exec('asciidoctor <%= file.path %>', options))
    .pipe(exec.reporter(reportOptions));
 };

gulp.task('default', function() {
    console.log("Welcome to UMAAS. Watching source files");
    var watcher = gulp.watch(['index.adoc', 'reference/*.adoc', 'getting_started/*.adoc', 'tutorials/*.adoc']);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      compileAsciiDoc(event.path);
    });
});
