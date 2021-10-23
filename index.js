const CronJob = require('cron').CronJob;
const fetchJobsAndSendMail = require('./utils/fetchJobsAndMail');

async function startTracking() {
  let job = new CronJob(
    '* * * * *',
    function () {
      //runs every minute in this config
      fetchJobsAndSendMail();
    },
    null,
    true,
    null,
    null,
    true
  );
  job.start();
}

startTracking();
