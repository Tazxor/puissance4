import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const ROWS = 6;
const COLS = 7;

const Puissance4 = ({ navigation }) => {
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [player, setPlayer] = useState('red');
  const [winner, setWinner] = useState(null);



  const dropPiece = (col) => {
    if (winner) return;
    const row = getNextAvailableRow(col);
    if (row === null) return;
    const newBoard = board.map((rowArr, rowIndex) =>
      row === rowIndex ? [...rowArr.slice(0, col), player, ...rowArr.slice(col + 1)] : rowArr
    );
    setBoard(newBoard);
    if (checkWinner(newBoard, row, col)) {
      setWinner(player);
    } else {
      setPlayer(player === 'red' ? 'yellow' : 'red');
    }
  };

  const getNextAvailableRow = (col) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) return row;
    }
    return null;
  };

  const checkWinner = (board, row, col) => {
    // Check vertically
    let count = 1;
    for (let i = row - 1; i >= 0 && board[i][col] === player; i--) count++;
    for (let i = row + 1; i < ROWS && board[i][col] === player; i++) count++;
    if (count >= 4) return true;

    // Check horizontally
    count = 1;
    for (let i = col - 1; i >= 0 && board[row][i] === player; i--) count++;
    for (let i = col + 1; i < COLS && board[row][i] === player; i++) count++;
    if (count >= 4) return true;

    // Check diagonally
    count = 1;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && board[i][j] === player; i--, j--) count++;
    for (let i = row + 1, j = col + 1; i < ROWS && j < COLS && board[i][j] === player; i++, j++) count++;
    if (count >= 4) return true;

    count = 1;
    for (let i = row - 1, j = col + 1; i >= 0 && j < COLS && board[i][j] === player; i--, j++) count++;
    for (let i = row + 1, j = col - 1; i < ROWS && j >= 0 && board[i][j] === player; i++, j--) count++;
    if (count >= 4) return true;

    return false;
  };

  const renderBoard = () => {
    return board.map((rowArr, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {rowArr.map((cell, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={[styles.cell, { backgroundColor: cell || 'white' }]}
            onPress={() => dropPiece(colIndex)}
            disabled={cell !== null || winner !== null}
          />
        ))}
      </View>
    ));
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <View style={styles.board}>{renderBoard()}</View>
      {winner && <Text style={styles.winnerText}>{winner} gagne !</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    borderWidth: 2,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Puissance4;