function getIntsFromHex(input) {
  const array = [];

  for (let i = 1; i < input.length; i += 2) {
    array.push(parseInt(input.substring(i - 1, i + 1), 16));
  }

  return array;
}

function convertToSixBits(input) {
  const inputLength = input.length;
  const pad = inputLength % 3;
  const fullThrees = inputLength - pad;

  const result = [];

  for (let i = 2; i < fullThrees; i += 3) {
    const b1 = input[i - 2];
    const b2 = input[i - 1];
    const b3 = input[i];


    const s1 = b1 >>> 2;
    const s2 = (b1 << (6 + 24) >>> (2 + 24)) | (b2 >>> 4);
    const s3 = (b2 << (4 + 24) >>> (2 + 24)) | (b3 >>> 6);
    const s4 = b3 << (2 + 24) >>> (2 + 24);

    result.push(s1);
    result.push(s2);
    result.push(s3);
    result.push(s4);
  }

  if (pad === 2) {
    const b1 = input[inputLength - 2];
    const b2 = input[inputLength - 1];

    const s1 = b1 >>> 2;
    const s2 = (b1 << (6 + 24) >>> (2 + 24)) | (b2 >>> 4);
    const s3 = (b2 << (4 + 24) >>> (2 + 24));

    result.push(s1);
    result.push(s2);
    result.push(s3);
  }

  if (pad === 1) {
    const b1 = input[inputLength - 1];

    const s1 = b1 >>> 2;
    const s2 = (b1 << (6 + 24) >>> (2 + 24));

    result.push(s1);
    result.push(s2);
  }

  return result;
}

module.exports = {
  getIntsFromHex,
  convertToSixBits,
}