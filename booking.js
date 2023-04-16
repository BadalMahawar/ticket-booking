// initialize the seat matrix
const seats = Array.from({ length: 11 }, () => Array.from({ length: 7 }, () => 0));
seats[10].splice(0, 3, 1, 1, 1);

// function to book seats
function bookSeats(numSeats) {
  const bookedSeats = [];
  for (let i = 0; i < 11; i++) {
    const row = seats[i];
    let consecutiveSeats = 0;
    for (let j = 0; j < 7; j++) {
      if (row[j] === 0) {
        consecutiveSeats++;
        if (consecutiveSeats === numSeats) {
          // book the seats
          for (let k = j - numSeats + 1; k <= j; k++) {
            row[k] = 1;
            bookedSeats.push([i, k]);
          }
          return bookedSeats;
        }
      } else {
        consecutiveSeats = 0;
      }
    }
  }
  // if we reach here, the required number of seats are not available in one row
  // so we book the nearby seats
  for (let i = 0; i < 11; i++) {
    const row = seats[i];
    for (let j = 0; j < 7; j++) {
      if (row[j] === 0) {
        row[j] = 1;
        bookedSeats.push([i, j]);
        numSeats--;
        if (numSeats === 0) {
          return bookedSeats;
        }
      }
    }
  }
  // if we reach here, all seats are booked
  return null;
}

// example usage
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter number of seats to book: ', numSeats => {
  numSeats = parseInt(numSeats);
  const bookedSeats = bookSeats(numSeats);
  if (bookedSeats) {
    console.log('Booked seats:', bookedSeats);
  } else {
    console.log('Sorry, all seats are booked.');
  }
  
  // print the seat matrix
  for (let row of seats) {
    for (let seat of row) {
      if (seat === 0) {
        process.stdout.write('. ');
      } else {
        process.stdout.write('X ');
      }
    }
    console.log();
  }
  
  rl.close();
});
