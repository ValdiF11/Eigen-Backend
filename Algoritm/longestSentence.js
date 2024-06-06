function longest(sentence) {
  let words = sentence.split(" ");
  let longestWord = words[0];

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }

  return `${longestWord}: ${longestWord.length} characters`;
}

let sentence = "Saya sangat senang mengerjakan soal algoritma";
let longestWordResult = longest(sentence);

console.log(longestWordResult);
