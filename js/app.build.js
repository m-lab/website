/**
* @fileoverview - Require Optimizer build script that can be run from the root
* of the project by running the following command:
* (@code node js/libs/r.js -o js/app.build.js)
*/

({
/**
*	The baseURL for where js files are located to optimize.  The path is relative
* to this file.
*/
  baseUrl: "../js/src/",
/**
*	The path/filename for where the single optimized file will be generated.
*/
  out: 'app.js',
/**
*	The path/filename for source files to include.
*/
  include: ['boot', 'main'],
/**
*	The path/filename for where the paths for depedencies are .
*/
  mainConfigFile: 'src/boot.js'
})