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
    // const lines = [
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   [0, 4, 8],
    //   [2, 4, 6],
    // ];
  
    // for (let i = 0; i < lines.length; i++) {
    //   const [a, b, c] = lines[i];
      
    //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //     return squares[a];
    //   }
    // }
    // return null;

    const newArr = [];
    const squaresCopy = [...squares];
    while(squaresCopy.length){
      newArr.push(squaresCopy.splice(0,3));
    } 
    
    let count = 0;
    // check rows
    let currentRow = Math.floor(n / 3);
    for(let i = 0; i < 3; i++){
      if(newArr[currentRow][i] == null) break;

      if(newArr[currentRow][i] === 'X') count++;
      else count--;
    }

    if(count === 3){
      return 'X';
    }

    if(count === -3){
      return 'O';
    }

    // check columns
    count = 0;
    let currentCol = n % 3;
    for(let i = 0; i < 3; i++) {
      if(newArr[i][currentCol] == null) break;

      if(newArr[i][currentCol] === 'X') count++;
      else count--;

      console.log(count);
    }

    if(count === 3){
      return 'X';
    }

    if(count === -3){
      return 'O';
    }

    // check diag1 if square is on diag1
    count = 0;
    if(currentRow === currentCol){
      for(let i = 0; i < 3; i++){
        if(newArr[i][i] == null) break;

        if(newArr[i][i] === 'X') count++;
        else count--;
      }
    }

    if(count === 3){
      return 'X';
    }

    if(count === -3){
      return 'O';
    }

    // check diag2 if square is on diag2
    count = 0;
    if(currentRow + currentCol === 2){
      for(let i = 0; i < 3; i++){
        if(newArr[i][2 - i] == null) break;

        if(newArr[i][2 - i] === 'X') count++;
        else count--;
      }
    }

    if(count === 3){
      return 'X';
    }

    if(count === -3){
      return 'O';
    }

    return null;
  }


  export default Board;