const getLastItemFromSplit = function (value: string, splitString: string): string {
  var result = value.split(splitString);
  return result[result.length - 1];
};

export default getLastItemFromSplit;
