var request = require('request');
const fs = require('fs');
const _ = require('lodash');
const sendNotification = require('./utils/sendNotification');

const options = require('./utils/requestOptions')(
  process.argv[2] || 'node js',
  process.argv[3] || 'Egypt'
);

const oldJobs = JSON.parse(fs.readFileSync('./assets/jobs.json'));

const extractJobs = (included, jobs = []) => {
  jobs = included.filter((item) => item.dashEntityUrn);
  jobs.sort((a, b) => b.listedAt - a.listedAt);
  return jobs;
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  const { included } = JSON.parse(response.body);
  const jobs = extractJobs(included);
  let num;
  for (num = 0; num < jobs.length; num++) {
    if (_.isEqual(jobs[num], oldJobs[0])) {
      break;
    }
  }
  let newJobs = [];
  for (let i = 0; i < num; i++) {
    newJobs.push(jobs[i]);
  }

  if (num !== 0) {
    console.log(`found ${num} new job${num > 1 ? 's' : ''}`);
    sendNotification(num, newJobs, options.headers.Referer);
    fs.writeFileSync('./assets/jobs.json', JSON.stringify(jobs));
  } else {
    console.log(`There's no new jobs`);
  }
});
