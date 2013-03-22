/**
 * Get PIDs of all running fleet processes
 */
var inspect = require('eyespect').inspector()
var exec = require('child_process').exec;
module.exports = function (cb) {

  // get the output of fleet-ps
  var cmd = 'fleet-ps'
  var child = exec(cmd, function(err, stdout, stderr) {
    if (err) {
      return cb({
        message: 'failed to get list of fleet pids',
        error: err,
        stack: new Error().stack
      })
    }
    if (stderr) {
      return cb({
        message: 'failed to get list of fleet pids',
        error: stderr,
        stack: new Error().stack
      })
    }
    var drones = splitByDrone(stdout)
    cb(null, pids)
  });
}


function splitByDrone(text) {
  var pattern = /^(drone#[\s\S]*?)^(?:drone|$)/mg
  var drones = text.match(pattern)
  return drones
}
