var exec  = require('child_process').exec,
    util = require('util'),
    npm = require('npm'),
    queue = [];
    

util.log('Installing module!');

npm.load({outfd: 0}, function(err) {
  if (err) {
    util.log('Failed to load npm');
    return;
  }
  
  npm.commands.list(['installed'], function(err, modules) {
   if (err) {
      util.puts('Some error!');
      util.puts(stderr);
      return;
    }
    for (var name in modules) {
      var module = modules[name];
      
      // Skip npm itself
      if (name == 'npm' || name == 'uninstall') continue;
      
      for (var version in module.versions) {
        if (module.versions[version].installed) {
          queue.push(name);
          break;
        }
      }
    }
    
    processQueue();
  });

  function processQueue() {
    var i = 0;
    function next() {
      if (i >= queue.length) {
        util.puts('Work is done!');    
        util.puts('So long, and thanks for all the fish!');
        
        return;
      }
      var module = queue[i++];
      
      npm.commands.uninstall(module, function(err) {
        if (err) {
          util.puts('Failed processing: ' + module);
  //      queue.push(module);
          return next();
        }
        util.puts('Processed: ' + module);
        next();
      });
    }
    
    next();
  }
});
