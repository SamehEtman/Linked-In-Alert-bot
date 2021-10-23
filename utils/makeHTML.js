module.exports = (num, jobs, referer) => {
  if (!jobs.length) return '';

  let HTML = jobs.map((element, idx) => {
    return `<div class="container" style = "background-color : #eaeaea; font-family: 'Roboto', 'RobotoDraft', Helvetica, Arial, sans-serif; margin: 5px; padding: 5px;"> <div style="padding: 2px 4px"> <a style="color: #0a66c2; font-weight: 700; text-decoration: none; display: inline-block; font-size: 16px;" href="https://www.linkedin.com/jobs/view/${
      element.jobPostingId
    }" >${
      element.title
    }</a > <p style="color: #adadad; font-weight: 400; font-size: 14px; line-height: 0.2;">${new Date(
      element.listedAt
    ).toLocaleString()}</p> </div> </div>`;
  });
  HTML.unshift(
    `<a style =" font-weight: 400; font-size: 24px; line-height: 2.2; color: #0a66c2; display: inline-block; text-decoration: none;" href = '${referer}'>${num} new Jobs go apply now</a>`
  );
  

  return HTML.join(' ');
};
