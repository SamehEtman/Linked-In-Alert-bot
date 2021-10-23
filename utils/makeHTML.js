module.exports = (num, jobs) => {
  if (!jobs.length) return '';

  let HTML = jobs.map((element, idx) => {
    return `<div style = '  font-family: "Lucida Console", "Courier New", monospace; border-left: 6px solid lightgreen;background-color: #d4d4d4;margin : 5px ; padding : 5px;'><div style = 'padding-left : 4px'><a style="text-decoration: none; color: black" href="https://www.linkedin.com/jobs/view/${
      element.jobPostingId
    }" >${
      element.title
    }</a > <p style=" margin : 0 ;color: grey ; font-size : 10px">${new Date(
      element.listedAt
    ).toLocaleString()}</p> </div></div>`;
  });
  HTML.unshift(`<h1>${num} new Jobs go apply now</h1>`);
  return HTML.join(' ');
};
