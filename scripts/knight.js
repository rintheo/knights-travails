export default class Knight {
  constructor(x, y) {
    this.position = { x, y };
    this.previousMove = null;
    this.possibleNextMoves = [];
  }
}
