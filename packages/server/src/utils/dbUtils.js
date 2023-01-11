const { ObjectId } = require('mongodb');

function formatIds(data) {
  if (data?._id) {
    return { ...data, id: data._id };
  }
  return data;
}

function formatFilter(data) {
  const filters = { ...data };
  if (data?.id) {
    filters._id = ObjectId(data.id);
    delete filters.id;
  }
  if (data?.user) {
    filters.user = ObjectId(data.user);
  }
  return filters;
}

exports.formatIds = formatIds;
exports.formatFilter = formatFilter;
