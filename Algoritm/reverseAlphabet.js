function reverseAlpha(string) {
  let alphaPart = "";
  let numPart = "";

  // Pisahkan huruf dan angka
  for (let i = 0; i < string.length; i++) {
    if (isNaN(string[i])) {
      alphaPart += string[i];
    } else {
      numPart += string[i];
    }
  }

  // Balikkan hurufnya
  let reversedAlphaPart = "";
  for (let i = alphaPart.length - 1; i >= 0; i--) {
    reversedAlphaPart += alphaPart[i];
  }

  // Gabungkan huruf yang dibalik dengan angka
  return reversedAlphaPart + numPart;
}

let result = reverseAlpha("NEGIE1");

console.log(result); // Output: "EIGEN1"
