const fetchnewJobs = require('../api/linkedInJobs');
const sendNotification = require('../utils/sendNotification');
const fs = require('fs');

module.exports = async () => {
  try {
    const oldJobs = JSON.parse(fs.readFileSync('./assets/jobs.json'));
    const { allJobs, newJobs, size, jobsUrl } = await fetchnewJobs(oldJobs);

    if (size !== 0) {
      console.log(`found ${size} new job${size > 1 ? 's' : ''}`);
      sendNotification(size, newJobs, jobsUrl);
      fs.writeFileSync('./assets/jobs.json', JSON.stringify(allJobs));
    } else {
      console.log(`There's no new jobs`);
    }
  } catch (error) {
    throw new Error(error);
  }
};
