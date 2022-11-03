// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rows = this.rows();
      var count = 0;
      for (var i = 0; i < rows[rowIndex].length; i++) {
        count += rows[rowIndex][i];
      }

      return (count >= 2);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      return rows.some((value, index) => {
        return this.hasRowConflictAt(index);
      });
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      var rows = this.rows();
      for (let i = 0; i < rows.length; i++) {
        count += rows[i][colIndex];
      }

      return (count >= 2);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var rows = this.rows();
      return rows[0].some((value, index) => {
        return this.hasColConflictAt(index);
      });
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      //set row index to 0

      //
      var count = 0;

      //iterate from col index to length of columns
      //if the value given is 0 or greater
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        var rowIndex = 0;
        for (var colIndex = majorDiagonalColumnIndexAtFirstRow; colIndex < rows[0].length; colIndex++) {
          //if (isInBounds(rowIndex, colIndex))
          if (this._isInBounds(rowIndex, colIndex)) {
            count += rows[rowIndex][colIndex];
            // stopping a 4,4 row[0].length is only 4;
            //increment row index
            rowIndex += 1;
          }
        }
      } else if (majorDiagonalColumnIndexAtFirstRow < 0) {
        var colIndex = 0;
        for (let rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow); rowIndex < rows.length; rowIndex++) {
          if (this._isInBounds(rowIndex, colIndex)) {
            count += rows[rowIndex][colIndex];
            colIndex++;
          }
        }
      }
      //else if lower than 0
      //take absolute value
      //set col index to 0
      //iterate row index starting with the absolute value calculated to length of rows
      //same as above
      return (count >= 2);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var allIndexes = [];
      //iterate over length of rows, push the negative and positive value
      rows.forEach((value, index) => {
        allIndexes.push(index);
        allIndexes.push(-index);
      });
      //return .some on that array
      return allIndexes.some((value) => {
        return this.hasMajorDiagonalConflictAt(value);
      });
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var count = 0;
      //if value given is less than length
      if (minorDiagonalColumnIndexAtFirstRow < rows.length) {
        //set row index to 0
        var rowIndex = 0;
        //iterate from column index = val given to 0
        for (let colIndex = minorDiagonalColumnIndexAtFirstRow; colIndex > -1; colIndex--) {
          //add to count
          count += rows[rowIndex][colIndex];
          //increment row
          rowIndex++;
        }
      }
      //if value given is the length or greater

      if (minorDiagonalColumnIndexAtFirstRow >= rows.length) {
        var colIndex = rows.length - 1;
        for (let rowIndex = minorDiagonalColumnIndexAtFirstRow - (rows.length - 1); rowIndex < rows.length; rowIndex++) {
          count += rows[rowIndex][colIndex];
          colIndex--;
        }
      }
      //set column index to length minus 1
      //iterate from row index = value given minus (length - 1)
      //subtract from column index


      return (count >= 2); // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var allIndexes = [];
      rows.forEach((value, index) => {
        allIndexes.push(index);
        allIndexes.push(index + (rows.length - 1));
      });
      return allIndexes.some((value, index) => {
        return this.hasMinorDiagonalConflictAt(value);
      });
    }

    /*
    rows length = 4;
    i++ // <= 2 * rows.length - 2
    var matrix = [
       0  1  2  3
      [0, 0, 1, 0], 3
      [0, 0, 0, 0], 4
      [1, 0, 0, 0], 5
      [0, 0, 0, 0]  6
    ];


    */

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
