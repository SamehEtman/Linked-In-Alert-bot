const secret = require('../utils/secret');
module.exports = (keyword, location) => {
  return {
    method: 'GET',
    url: `https://www.linkedin.com/voyager/api/search/hits?decorationId=com.linkedin.voyager.deco.jserp.WebJobSearchHitWithSalary-24&count=25&filters=List(locationFallback-%3E${location},sortBy-%3EDD,resultType-%3EJOBS)&keywords=${keyword}&origin=JOB_SEARCH_PAGE_OTHER_ENTRY&q=jserpFilters&queryContext=List(primaryHitType-%3EJOBS,spellCorrectionEnabled-%3Etrue)&topNRequestedFlavors=List(HIDDEN_GEM,IN_NETWORK,SCHOOL_RECRUIT,COMPANY_RECRUIT,SALARY,JOB_SEEKER_QUALIFIED,PREFERRED_COMMUTE,PRE_SCREENING_QUESTIONS,SKILL_ASSESSMENTS,ACTIVELY_HIRING_COMPANY,TOP_APPLICANT)`,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0',
      Accept: 'application/vnd.linkedin.normalized+json+2.1',
      'Accept-Language': 'en-US,en;q=0.5',
      'x-li-deco-include-micro-schema': 'true',
      'x-li-lang': 'en_US',
      'x-li-track':
        '{"clientVersion":"1.9.5536","mpVersion":"1.9.5536","osName":"web","timezoneOffset":2,"timezone":"Africa/Cairo","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":1680,"displayHeight":1050}',
      'x-li-page-instance':
        'urn:li:page:d_flagship3_search_srp_jobs;FPXts15OT8SG7HO1ggVy2w==',
      'csrf-token': secret.csrf, 
      'x-restli-protocol-version': '2.0.0',
      Connection: 'keep-alive',
      Referer: `https://www.linkedin.com/jobs/search/?keywords=${keyword}&location=${location}&sortBy=DD`,
      Cookie: secret.cookie,
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      TE: 'trailers',
    },
  };
};
