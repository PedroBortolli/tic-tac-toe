const checkWinner = (grid, size) => {
    let winner = grid[0]
    for (let i = 1; i < size; i++) {
        if (grid[i * size + i] !== winner) winner = undefined
    }
    if (winner) return winner
    winner = grid[size - 1]
    for (let i = 1; i < size; i++) {
        if (grid[(size - 1) * (i + 1)] !== winner) winner = undefined
    }
    if (winner) return winner
    for (let i = 0; i < size; i++) {
        winner = grid[i * size]
        for (let j = 1; j < size; j++) {
            if (grid[i * size + j] !== winner) winner = undefined
        }
        if (winner) return winner
    }
    for (let i = 0; i < size; i++) {
        winner = grid[i]
        for (let j = 1; j < size; j++) {
            if (grid[j * size + i] !== winner) winner = undefined
        }
        if (winner) return winner
    }
    let draw = true
    for (let i = 0; i < size * size; i++) {
        if (!grid[i]) draw = false
    }
    if (draw) return '='
}

export default checkWinner
