// Each syndrome corresponds to a specific error location except for [0, 0, 0]
const syndromes = {
    "000": -1,
    "100": 5,
    "010": 6,
    "001": 7,
    "110": 1,
    "101": 4,
    "011": 2,
    "111": 3
};

const hamThreeCheckMatrix = [
    [1, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 0, 1]
];

var input = [
    [1],
    [1],
    [0],
    [0],
    [1],
    [0],
    [1]
];

function multiplyMatrices(a, b) {
    let m_a = a.length;
    let n_a = a[0].length;
    
    // We assume the input matrix 'b' is a column matrix of length m
    let m_b = b[0].length;
    
    let result = [];

    for (let r = 0; r < m_a; r++) {
        running_sum = 0;

		for (let c = 0; c < n_a; c++) {
			running_sum = (running_sum + (a[r][c] * b[c][0])) % 2;
		}

		result.append(running_sum);
    }
}