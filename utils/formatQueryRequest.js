module.exports = formatQueryFromRequest = (query) => {
  const { from, to } = query;
  const formattedQuery = {};
  if (from) {
    formattedQuery["createdAt"] = {
      $gt: new Date(from),
    };
  }
  if (from && to) {
    formattedQuery["createdAt"] = {
      $gt: new Date(from),
      $lt: new Date(to),
    };
  }
  return formattedQuery;
};
