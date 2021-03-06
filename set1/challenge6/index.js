const fs = require('fs');
const { stringToIntArray } = require('../challenge5');

const B64_TABLE = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
  'w', 'x', 'y', 'z', '0', '1', '2', '3',
  '4', '5', '6', '7', '8', '9', '+', '/',
];

function getHammingDistance(input1, input2) {
  if (input1.length !== input2.length) {
    throw Error('unequal length inputs');
  }

  const ints1 = stringToIntArray(input1);
  const ints2 = stringToIntArray(input2);

  return ints1.reduce((distance, int, index) => {
    const diff = (int ^ ints2[index]).toString(2).replace(/0/g, '');

    return distance + diff.length;
  }, 0);
}

function getHammingDistanceBetweenInts(input1, input2) {
  if (input1.length !== input2.length) {
    throw Error('unequal length inputs');
  }

  return input1.reduce((distance, int, index) => {
    const diff = (int ^ input2[index]).toString(2).replace(/0/g, '');

    return distance + diff.length;
  }, 0);
}

function findKeySize(input) {
  let topKey = 2;
  let minDistance = Infinity;

  for (let i = 3; i <= 40; i++) {
    const block1 = input.slice(0, i);
    const block2 = input.slice(i, i + i);

    const distance = getHammingDistanceBetweenInts(block1, block2)/i;

    if (distance < minDistance) {
      minDistance = distance;
      topKey = i;
    }
  }

  return topKey;
}

function getIntsFromB64(input) {
  //const sixBitInts = input.split('').filter(char => char !== '=').map(char => B64_TABLE.indexOf(char));

  const array = input.split('').reduce((agg, char, index) => {
    if (char === '=') { return agg; }
    
    const six = B64_TABLE.indexOf(char);

    const position = index % 4;

    if (position === 0) {
      agg.push(six << 2);
    }

    if (position === 1) {
      agg.splice(agg.length - 1, 1, ( agg[agg.length - 1] | six >>> 4 ));
      agg.push(six << (24 + 4) >>> 24);
    }

    if (position === 2) {
      agg.splice(agg.length - 1, 1, ( agg[agg.length - 1] | six >>> 2 ));
      agg.push(six << (24 + 6) >>> 24);
    }

    if (position === 3) {
      agg.splice(agg.length - 1, 1, ( agg[agg.length - 1] | six ));
    }

    return agg;
  }, []);

  if (array[array.length - 1] === 0) {
    array.splice(-1);
  }

  return array;
}

function readB64StringIntoInts(inputPath) {
  const b64String = fs.readFileSync(inputPath, 'utf8').replace(/\n/g, '');

  return getIntsFromB64(b64String);
}
//MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMQ==

module.exports = {
  getHammingDistance,
  getIntsFromB64,
};