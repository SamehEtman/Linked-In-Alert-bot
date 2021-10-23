const request = require('request-promise');
const _ = require('lodash');

const options = require('./jobRequestOptions')(
  process.argv[2] || 'node js',
  process.argv[3] || 'Egypt'
);
const jobsUrl = options.headers.Referer;
const extractJobs = (included, jobs = []) => {
  jobs = included.filter((item) => item.dashEntityUrn);
  jobs.sort((a, b) => b.listedAt - a.listedAt);
  return jobs;
};

module.exports = async (oldJobs) => {
  const { included } = JSON.parse(await request(options));
  const allJobs = extractJobs(included);
  let size;
  for (size = 0; size < allJobs.length; size++) {
    if (_.isEqual(allJobs[size], oldJobs[0])) {
      break;
    }
  }
  let newJobs = [];
  for (let i = 0; i < size; i++) {
    newJobs.push(allJobs[i]);
  }
  return { allJobs, newJobs, size, jobsUrl };
};
