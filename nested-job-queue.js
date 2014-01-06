var kue = require('kue')
  , jobs = kue.createQueue()
  ;

function parentJob (done){
  var job = jobs.create('parent', {
    type: 'PARENT'
  });
  job
    .on('complete', function (){
      console.log('Job', job.id, 'of type', job.data.type, 'is done');
      done();
    })
    .on('failed', function (){
      console.log('Job', job.id, 'of type', job.data.type, 'has failed');
      done();
    })
  job.save();
}

function childJob (done){
  var job = jobs.create('child', {
    type: 'CHILD'
  });
  job
    .on('complete', function (){
      console.log('Job', job.id, 'of type', job.data.type, 'is done');
      done();
    })
    .on('failed', function (){
      console.log('Job', job.id, 'of type', job.data.type, 'has failed');
      done();
    })
  job.save();
}

jobs.process('parent', function (job, done){
  /* carry out all the parent job functions here */
  childJob(done);
})

jobs.process('child', function (job, done){
  /* carry out all the child job functions here */
  done();
})

parentJob(function(){ });