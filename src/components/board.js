import React from 'react';
import Square from './square';

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: null,
      };
    }
  
    handleClick(i) {
      const squares = [...this.state.squares];

      if(squares[i]){
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
  
      this.setState({
        squares,
        xIsNext: !this.state.xIsNext,
      });

      const winner = calculateWinner(squares, i);
      if(winner){
        this.setState({winner})
        return;
      }  
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // const winner = calculateWinner(this.state.squares);
      let status;
      if(this.state.winner) {
        status = "Winner: " + this.state.winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares, n) {
    const newArr = [];
    const squaresCopy = [...squares];
    while(squaresCopy.length){
      newArr.push(squaresCopy.splice(0,3));
    } 
    let winner = null;
    
    // check rows
    let currentRow = Math.floor(n / 3);
    winner = checkWinner(checkRows(newArr, currentRow));
    if(winner) return winner;

    // check columns
    let currentCol = n % 3;
    winner = checkWinner(checkColumns(newArr, currentCol));
    if(winner) return winner;


    // check diag1 if square is on diag1
    if(currentRow === currentCol){
      winner = checkWinner(checkDiag1(newArr));
      if(winner) return winner;
    }

    // check diag2 if square is on diag2
    if(currentRow + currentCol === 2){
      winner = checkWinner(checkDiag2(newArr));
      if(winner) return winner;
    }

    return null;
  }

  function checkWinner(count){
    if(count === 3) return 'X';
    if(count === -3) return 'O';
    return null;
  }

  function checkRows(newArr, currentRow){
    let count = 0;
    for(let i = 0; i < 3; i++){
      if(newArr[currentRow][i] == null) break;

      if(newArr[currentRow][i] === 'X') count++;
      else count--;
    }
    return count;
  }

  function checkColumns(newArr, currentCol){
    let count = 0;
    for(let i = 0; i < 3; i++) {
      if(newArr[i][currentCol] == null) break;

      if(newArr[i][currentCol] === 'X') count++;
      else count--;
    }
    return count;
  }

  function checkDiag1(newArr){
    let count = 0;
    for(let i = 0; i < 3; i++){
      if(newArr[i][i] == null) break;

      if(newArr[i][i] === 'X') count++;
      else count--;
    }
    return count;
  }

  function checkDiag2(newArr){
    let count = 0;
    for(let i = 0; i < 3; i++){
      if(newArr[i][2 - i] == null) break;

      if(newArr[i][2 - i] === 'X') count++;
      else count--;
    }
    return count;
  }


  export default Board;