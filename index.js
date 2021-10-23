var request = require('request-promise');
const fs = require('fs');
const CronJob = require('cron').CronJob;
const fetchnewJobs = require('./api/fetchnewJobs');
const sendNotification = require('./utils/sendNotification');

const getNewJobs = async () => {
  
  const oldJobs = JSON.parse(fs.readFileSync('./assets/jobs.json'));
  const { allJobs, newJobs, size, jobsUrl } = await fetchnewJobs(oldJobs);

  if (size !== 0) {
    console.log(`found ${size} new job${size > 1 ? 's' : ''}`);
    sendNotification(size, newJobs, jobsUrl);
    fs.writeFileSync('./assets/jobs.json', JSON.stringify(allJobs));
  } else {
    console.log(`There's no new jobs`);
  }
};

async function startTracking() {
  let job = new CronJob(
    '* * * * *',
    function () {
      //runs every 30 minutes in this config
      getNewJobs();
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
