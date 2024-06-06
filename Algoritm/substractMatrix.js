function substract(matrix) {
  let diagonalA = 0;
  let diagonalB = 0;
  let n = matrix.length;

  for (let i = 0; i < n; i++) {
    diagonalA += matrix[i][i];
    diagonalB += matrix[i][n - 1 - i];
  }

  return Math.abs(diagonalA - diagonalB);
}

let matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

let diagonalDiff = substract(matrix);

console.log(diagonalDiff); // Output: 3
