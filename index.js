var request = require('request');
const fs = require('fs');
const _ = require('lodash');

const options = require('./utils/requestOptions')(
  process.argv[2],
  process.argv[3]
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
  console.log(jobs);
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
  console.log(num);
  if (num !== 0) {
    fs.writeFileSync('./assets/jobs.json', JSON.stringify(jobs));
  }
});
