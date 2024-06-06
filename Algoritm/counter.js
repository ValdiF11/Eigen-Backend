function count(input, query) {
  let output = [];

  for (let i = 0; i < query.length; i++) {
    let count = 0;

    for (let j = 0; j < input.length; j++) {
      if (query[i] === input[j]) {
        count++;
      }
    }

    output.push(count);
  }

  return output;
}

let input = ["xc", "dz", "bbb", "dz"];
let query = ["bbb", "ac", "dz"];
let output = count(input, query);

console.log(output);
