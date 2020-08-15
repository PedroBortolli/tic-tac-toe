import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import checkWinner from './checkWinner'

function App() {
    const [game, changeGame] = useState({ grid: {}, turn: 'X' })
    const [gridSize, setGridSize] = useState(3)
    const [winner, setWinner] = useState(null)

    const resetGame = () => {
        changeGame({
            grid: Array(gridSize * gridSize).fill().reduce((prev, _, id) => {
                    prev[id] = undefined;
                    return prev;
                  }, {}),
            turn: 'X'
        })
        setWinner(null)
    }

    useEffect(resetGame, [gridSize])

    useEffect(() => {
        const gameWinner = checkWinner(game.grid)
        if (gameWinner) setWinner(gameWinner)
    }, [game])

    const handleClick = cellId => {
        if (game.grid[cellId]) return
        changeGame(prevState => {
            return {
                grid: {...prevState.grid, [cellId]: prevState.turn},
                turn: prevState.turn === 'X' ? 'O' : 'X'
            }
        })
    }
    
    const changeGridSize = e => {
        setGridSize(e.target.value)
        resetGame()
    }

    const getCellColor = cell => {
        if (cell === 'X') return { color: 'red' }
        else return { color: 'blue' }
    }

    console.log(winner)
    return <Container>
        <Options>
            <span>Set the grid size: </span>
            <input value={gridSize} type="number" min="3" max="7" onChange={changeGridSize} />
        </Options>
        {winner ?
            winner !== '=' ?
                <Text><span style={getCellColor(winner)}>{winner}</span> won the game!</Text>
                :
                <Text>Game ended in a tie</Text>
            :
            <Text>Turn: <span style={getCellColor(game.turn)}>{game.turn}</span></Text>
        }
        <Grid gridSize={gridSize} gameEnded={!!winner}>
            {Object.keys(game.grid).map(cell => {
                return (
                    <Cell onClick={() => handleClick(cell)} style={getCellColor(game.grid[cell])}>
                        {game.grid[cell]}
                    </Cell>
                )
            })}
        </Grid>
        {winner && <Button onClick={resetGame}>Start a new game</Button>}
    </Container>
}

export default App

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    font-family: 'Noto Sans JP', sans-serif;
`
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.gridSize}, 1fr);
    width: min-content;
    pointer-events: ${props => props.gameEnded ? 'none' : 'auto'};
`;
const Cell = styled.div`
    width: 100px;
    height: 100px;
    font-size: 48px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    border: 1px solid black;
    border-radius: 4px;
`
const Text = styled.span`
    margin: 16px 0;
    font-size: 36px;
`
const Button = styled.button`
    margin-top: 24px;
    font-size: 24px;
    padding: 8px 12px;
`
const Options = styled.div`
    position: fixed;
    top: 24px;
    font-size: 18px;
    > input {
        margin-left: 8px;
        font-size: 20px;
        width: 36px;
    }
`
