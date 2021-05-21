const affirmations = require('./affirmations')

const getAllAffirmations = (page = 1, perPage = 3) => {
    startIdx = (page-1) * perPage;
    endIdx = page * perPage;
    if(endIdx > affirmations.length)
        endIdx = affirmations.length;
    const response = {
        affirmations: affirmations.slice(startIdx, endIdx),
        page: page,
        total: affirmations.length
    }
    return response};
module.exports = getAllAffirmations;
