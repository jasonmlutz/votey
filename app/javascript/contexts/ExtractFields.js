export default function ExtractFields(data, keys) {
  // data is an array of objects
  // keys the fields to be extracted
  const filteredData = data.map((object) => {
    var filteredEntry = {};
    keys.forEach((key) => {
      filteredEntry[key] = object[key];
    });
    return filteredEntry;
  })
  return filteredData;
}
