import Knight from './knight.js';

const isPositionValid = (x, y) => {
  if (x >= 0 && x <= 7 && y >= 0 && y <= 7) return true; // temporary tiny board
  // if (x >= 0 && x <= 7 && y >= 0 && y <= 7) return true;
  return false;
};

const isPositionTraversed = (newX, newY, knight) => {
  const position = { x: newX, y: newY };
  let currentMove = knight;
  while (currentMove !== null) {
    if (
      currentMove.position.x === position.x
      && currentMove.position.y === position.y
    ) return true;
    currentMove = currentMove.previousMove;
  }
  return false;
};

const isPositionOverTheMoveLimit = (knight) => {
  let counter = 0;
  let currentMove = knight;
  while (currentMove !== null) {
    if (counter > 5) return true;
    currentMove = currentMove.previousMove;
    counter += 1;
  }
  return false;
};

const generatePathToSolution = (knight) => {
  const path = [];
  let currentMove = knight;
  while (currentMove !== null) {
    path.push(currentMove.position);
    currentMove = currentMove.previousMove;
  }
  return path;
};

const generateSolutions = (start, end) => {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const knight = new Knight(startX, startY);
  const solutions = [];
  const possibleMoves = [
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: 2 },
    { x: -1, y: -2 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
  ];
  const queue = [];
  queue.push(knight);
  while (queue.length > 0) {
    const knightInQueue = queue.pop();
    possibleMoves.forEach((possibleMove) => {
      if (
        isPositionValid(
          knightInQueue.position.x + possibleMove.x,
          knightInQueue.position.y + possibleMove.y,
        )
        && !isPositionTraversed(
          knightInQueue.position.x + possibleMove.x,
          knightInQueue.position.y + possibleMove.y,
          knightInQueue,
        )
        && !isPositionOverTheMoveLimit(
          knightInQueue,
        )
      ) {
        const newKnight = new Knight(
          knightInQueue.position.x + possibleMove.x,
          knightInQueue.position.y + possibleMove.y,
        );
        newKnight.previousMove = knightInQueue;
        knightInQueue.possibleNextMoves.push(newKnight);
        if (
          newKnight.position.x === endX
          && newKnight.position.y === endY
        ) {
          solutions.push(generatePathToSolution(newKnight));
        } else queue.push(newKnight);
      }
    });
  }
  return solutions;
};

const findShortestSolution = (solutions) => {
  let shortestSolution = solutions[0];
  solutions.forEach((solution) => {
    if (shortestSolution.length > solution.length) shortestSolution = solution;
  });
  return shortestSolution;
};

const knightMoves = (start, end) => {
  if (!Array.isArray(start) || !Array.isArray(end)) return;
  const solutions = generateSolutions(start, end);
  const shortestSolution = findShortestSolution(solutions);

  console.log(`=> You made it in ${shortestSolution.length - 1} moves! Here's your path:`);
  for (let i = 0; i < shortestSolution.length; i += 1) {
    console.log(`[${shortestSolution[shortestSolution.length - 1 - i].x}, ${shortestSolution[shortestSolution.length - 1 - i].y}]`);
  }
};

knightMoves([2, 1], [1, 3]);
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [7, 7]);
