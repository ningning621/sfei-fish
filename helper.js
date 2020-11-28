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
    let avg = tempList.reduce((total, j) => total + Number(j.result*multiple), 0) / tempList.length;
    if (isNaN(avg)) avg = 0;
    finalMap.set(item, avg);
  }
  return sortMap(finalMap);
}

function findTotalByYear(data, multiple = 1) {
  let finalMap = [];
  let minYear = "1980";
  let maxYear = "2018";

  let tempMap = {};
  let tempList = data.filter(i => i.result);

  for (var record of tempList) {
    let date = record.sampledate;
    let year = date.split("/")[2];

    if (year in tempMap) {
      tempMap[year] = [tempMap[year][0] + Number(record.result*multiple), tempMap[year][1]+1];
    } else {
      tempMap[year] = [Number(record.result*multiple), 1];
    }
  }

  if (!(minYear in tempMap)) finalMap.push({"x": minYear, "y": 0});
  for (var year of Object.keys(tempMap)) {
    finalMap.push({"x": year, "y": tempMap[year][0] / tempMap[year][1]});
  }
  if (!(maxYear in tempMap)) finalMap.push({"x": maxYear, "y": 0});

  return finalMap;
}

function findTotalByYearAndSet(data, set, key, multiple = 1) {
  let finalMap = {};
  let minYear = "1980";
  let maxYear = "2018";

  for (var item of set) {
    let tempMap = {};

    let tempList = data.filter(i => (i[key] == item && i.result));

    for (var record of tempList) {
      let date = record.sampledate;
      let year = date.split("/")[2];

      if (year in tempMap) {
        tempMap[year] = [tempMap[year][0] + Number(record.result*multiple), tempMap[year][1]+1];
      } else {
        tempMap[year] = [Number(record.result*multiple), 1];
      }
    }

    finalMap[item] = [];
    if (!(minYear in tempMap)) finalMap[item].push({"x": minYear, "y": 0});
    for (var year of Object.keys(tempMap)) {
      finalMap[item].push({"x": year, "y": tempMap[year][0] / tempMap[year][1]});
    }
    if (!(maxYear in tempMap)) finalMap[item].push({"x": maxYear, "y": 0});
  }
  return finalMap;
}

function sortMap(map) {
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
}
