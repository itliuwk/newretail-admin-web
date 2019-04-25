export function deleteTheSameOneArray(needA, longA, key) {
  var _key = key || "id"
  var finshArray = [];
  needA.map(need_item => {
    var isTrue = true;
    longA.reverse().map(long_item => {
      if (long_item[_key] == need_item[_key]) {
        isTrue = false
      }
    })

    if (isTrue) {
      finshArray.push(need_item)
    }
  })

  return finshArray
}
var index = 1;
export function setSort4Array(array) {
  return array.map(item => {
    if (!item._sort) {
      item._sort = index;
      index++;
    }
    return item
  })
}

function compare(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}
export function mergeArray(a1, a2, key) {
  var a1 = setSort4Array(a1)
  var _key = key || "id"
  var finshArray = a1;
  a2.map(item2 => {
    var isExit = false;
    a1.map(item1 => {
      if (item1[_key] == item2[_key]) {
        isExit = true
      }
    })
    if (!isExit) {
      finshArray.push(item2)
    }
  })

  var newList = finshArray.sort(compare("_sort"))
  return newList
}

export function MyMap(_array, call) {
  return _array.map((item, index) => {
    return call(item, index)
  })
}

export const groupBy = (list, fn) => {
  const groups = {};
  list.forEach(function (o) {
    const group = JSON.stringify(fn(o));
    var _key = JSON.parse(group)
    groups[_key] = groups[_key] || [];
    groups[_key].push(o);
  });
  /*   return Object.keys(groups).map(function (group) {
      return groups[group];
    }); */
  return groups;
}

export function MyMapObject(_obj, call) {
  var keys = Object.keys(_obj)
  return keys.map((key) => {
    return call(_obj[key], key)
  })
}

export function isJson(item) {
  item = typeof item !== "string"
    ? JSON.stringify(item)
    : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}


import _clone from 'lodash.clone'
export const clone = _clone