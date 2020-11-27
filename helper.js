function findMaxValueInMap(map) {
  let max = 0;
  for (var key of Array.from(map.keys())) {
    if (map.get(key) > max) max = map.get(key);
  }
  return max;
}

function getFrequencyByKey(data, str, splitter=" ", index = 0) {
    let map = new Map();
    for (var i = 0; i < data.length; i++) {
        let key = data[i][str];
        if (!map.has(key)) {
            map.set(key, 1);
        } else {
            map.set(key, map.get(key) + 1);
        }
    }

    let sortedMap = sortMap(map);
    return sortedMap;
}

function getFishNames(data) {
  let set = new Set();
  for (var i = 0; i < data.length; i++) {
    let key = data[i]["commonname"];
    set.add(key);
  }
  return set;
}

function findAvgBySet(data, set, key, multiple = 1) {
  let finalMap = new Map();
  for (var item of set) {
    let tempList = data.filter(i => (i[key] == item && i.result));
    let avg = tempList.reduce((total, j) => total + Number(j.result), 0) / tempList.length;
    if (isNaN(avg)) avg = 0;
    finalMap.set(item, avg*multiple);
  }
  return sortMap(finalMap);
}

function sortMap(map) {
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
}
