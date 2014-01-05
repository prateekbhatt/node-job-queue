var kue = require('kue')
  , jobs = kue.createQueue()
  ;

function newJob (name){
  name = name || 'Default_Name';
  var job = jobs.create('new job', {
    name: name
  });
  job.save();
}

jobs.process('new job', function (job, done){
  console.log('Job', job.id, 'with name', job.data.name, 'is done');

  /* carry out all the job function here */

  done && done();
})


setInterval(function (){
  newJob('send Email');
}, 3000);