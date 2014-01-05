var kue = require('kue')
  , jobs = kue.createQueue()
  ;

function newJob (jobName){
  var job = jobs.create('hello');
  job.save();
}

jobs.process('hello', function (job, done){
  console.log('Job', job.id, 'is done');
  done && done();
})


setInterval(newJob, 3000);