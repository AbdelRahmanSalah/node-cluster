const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	Object.keys(cluster.workers).forEach((id) => {
	    cluster.workers[id].on('message', (msg) => {
				// master process will receive workers messages here
				console.log(msg);
			});
	  });

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});

} else {
	console.log(cluster.worker.id)
	require('./server')
}
