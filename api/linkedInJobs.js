const request = require('request-promise');
const {isEqual} = require('lodash');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

try {
  if (!argv.title) throw 'Please add Title';
  if (!argv.location) throw 'Please add Location';
} catch (error) {
  console.log(error);
  process.exit();
}

const options = require('./jobRequestOptions')(argv.title, argv.location);

const extractJobs = (included, jobs = []) => {
  jobs = included.filter((item) => item.dashEntityUrn);
  jobs.sort((a, b) => b.listedAt - a.listedAt);
  return jobs;
};

module.exports = async (oldJobs) => {
  try {
    const { included } = JSON.parse(await request(options));
    const allJobs = extractJobs(included);
    let size;
    for (size = 0; size < allJobs.length; size++) {
      if (isEqual(allJobs[size], oldJobs[0])) {
        break;
      }
    }
    let newJobs = [];
    for (let i = 0; i < size; i++) {
      newJobs.push(allJobs[i]);
    }
    const jobsUrl = options.headers.Referer;

    return { allJobs, newJobs, size, jobsUrl };
  } catch (error) {
    throw new Error(error);
  }
};
