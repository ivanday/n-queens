/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix.push([]);
    for (var j = 0; j < n; j++) {
      matrix[i].push(0);
    }
  }
  var board = new Board(matrix);
  // console.log(board.rows());
  //var
  // variable found = false;
  var recursiveHelper = function (colIndex) {
    if (colIndex === n) {
      return;
    } else {
      for (var i = 0; i < n; i++) {
        //setPiece
        board.togglePiece(i, colIndex);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(i, colIndex);
          //recursiveHelper(colIndex + 1);
        } else {
          recursiveHelper(colIndex + 1);
        }

      }
    }
  };
  // colIndex = 0; loop over rows; colIndex++
    // set piece
    // check to see if conflicts === false
    // if false recurse rowIndex increased ++
    // set piece;
  recursiveHelper(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({'n': n});

  var recursiveHelper = function (colIndex) {
    if (colIndex === n) {
      solutionCount++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, colIndex);
        if (!board.hasAnyRooksConflicts()) {
          // board.togglePiece(i, colIndex);
          recursiveHelper(colIndex + 1);
        }
        board.togglePiece(i, colIndex);

        //add a piece
        //run recursively
        //remove the piece

      }
    }
  };
  recursiveHelper(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  console.log(n);

  if (n === 0) {
    return [];
  }

  var board = new Board({'n': n});

  var solutionStore;
  var found = false;

  var recursiveHelper = function (colIndex) {
    if (colIndex === n) {
      solutionStore = board.rows();
      found = true;
    } else {
      for (var i = 0; i < n; i++) {

        board.togglePiece(i, colIndex);

        if (!board.hasAnyQueensConflicts()) {
          recursiveHelper(colIndex + 1);
          if (found) {
            return solutionStore;
          } else {
            solutionStore = board.rows();
          }
        }
        board.togglePiece(i, colIndex);
      }

    }
  };
  recursiveHelper(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return solutionStore;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({'n': n});

  var recursiveHelper = function (colIndex) {
    if (colIndex === n) {
      solutionCount++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, colIndex);
        if (!board.hasAnyQueensConflicts()) {
          // board.togglePiece(i, colIndex);
          recursiveHelper(colIndex + 1);
        }
        board.togglePiece(i, colIndex);

        //add a piece
        //run recursively
        //remove the piece

      }
    }
  };
  recursiveHelper(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
