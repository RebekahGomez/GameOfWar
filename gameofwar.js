// to submit this when finished, post an issue on the GameOfWar repository
// with a link to your repository on GitHub(not GitHub Enterprise)

// Tasks: 
// - Your game should run without errors
// - The game starts immediately when the JavaScript is executed. 
// - Create your two players and start the rounds!
// - There is no user input. The program simply loops through rounds until the game is finished.
// - Print a message for each round showing the cards played by each user,
//   who won the round, and how many cards each player has.
// - Include a README written in well-formatted Markdown (hint: look up README templates)
// - Show a good commit history with frequent commits (We're looking for lots of small commits!)

// Hints
// - Adding a property for the "value" of a rank could make it easier to compare face cards
//   (ie: Jack < Queen).For example, 2 - 10 will represent each number 
//   and then 11, 12, 13, 14 for J Q K A, respectively.
// - It could be helpful to have a class to represent the overall Game,
//   particularly when handling ties and other complicated game states.
// - Write Pseudocode! Break the project down into different components. 
//   What are the pieces to this problem ? Solve them each individually and build 
//   towards a solution for the overall problem.Teach each piece individually before moving on!
// - Make it work, make it good, make it fast.This is a common developer axiom. 
//   It means: focus first on making something work
//   (even if it isn't well written or it's buggy).
//   Then, turn to making it work well.Then, and only then, start to worry about 
//   other things like performance.
// ***********************************
// ***********************************

// PseudoCode
// Task 1: define a Player class that can hold cards & play a card
// Task 2: define a Deck class that can create a deck, shuffle it, and distribute the cards 
// Task 3: create 2 players
// Task 4: create a deck
// Task 5: shuffle the deck
// Task 6: split the deck into 2 even piles and assign each half to one of the players
// Task 7: game loop begins - while both players still have cards:
//   - each player plays a card
//   - compare the cards
//      - if one card is higher, that player wins the round and takes both cards
//      - if the cards are equal, it's war: each player puts down 3 cards face down and a fourth card
//        face up. The higher face up card wins all the cards on the table.
//  Print
//   - the cards played by each user 
//   - who won the round 
//   - how many cards each user has now 
// Task 8: The game ends when one player has all the cards and the other player has zero.
// Task 9: Declare the winner


class Card {
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

class Deck {
  constructor() {
    this.cards = []
    this.createDeck()
  }

  createDeck() {
    const suits = ["heart", "spade", "club", "diamond"]
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        let card = new Card(suits[i], ranks[j], j + 2)
        this.cards.push(card)
      }
    }

    this.shuffle()
  }

  shuffle() {
    const cards = this.cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // [cards[i], cards[j]] = [cards[j], cards[i]]; // this swaps the values of i & j (array destructuring method)
      let temp = cards[i] // these next 3 lines of code do the same
      cards[i] = cards[j] // thing as the previous line
      cards[j] = temp // ... it shuffles the deck using the Fisher-Yates method
    }
  }

}

class gameOfWar {
  constructor() {
    this.p1 = []
    this.p2 = []
    this.pile = []
    this.gameSetup()
  }

  gameSetup() {
    const { cards } = new Deck()
    this.p1.push(...cards.splice(0, 26)) // this cuts the deck in half using .splice and pushes it to player 1 using the spread operator so the array will be spread out, not an array in an array
    this.p2.push(...cards)
  }

  playGame() {
    while (this.p1.length > 0 && this.p2.length > 0) {
      let p1Card = this.p1.pop()
      let p2Card = this.p2.pop()

      if (p1Card.score === p2Card.score) {
        this.pile.push(p1Card, p2Card)
        this.war()
      } else if (p1Card.score > p2Card.score) {
        this.p1.unshift(p2Card, p1Card, ...this.pile) // .unshift adds the cards back to p1 pile -- not sure why, but we need to add the other player's card to the pile first, otherwise no one will win
        this.pile.length = 0 // this mutates the original pile back to 0
        console.log("Player 1 wins the round.");
      } else {
        this.p2.unshift(p1Card, p2Card, ...this.pile.splice(0)) // i think this also mutates the oringal pile back to 0, just a different way
        console.log("Player 2 wins the round.");
      }
    }
    if (this.p1.length > 0) {
      console.log(`Player 1 is the winner! Player 1 has ${this.p1.length} cards.`)
    } else {
      if (this.p2.length > 0) {
        console.log(`Player 2 is the winner! Player 2 has ${this.p2.length} cards.`)
      }
    }
  }

  war() {
    console.log("War!!!")
    if (this.p1.length < 4 || this.p2.length < 4) {
      if (this.p1.length < 4) {
        this.p2.push(...this.p1.splice(0), ...this.pile.splice(0))
      } else {
        this.p1.push(...this.p2.splice(0), ...this.pile.splice(0))
      }
    } else {
      let p1WarPile = this.p1.splice(-3, 3)
      let p2WarPile = this.p2.splice(-3, 3)
      this.pile.push(...p1WarPile, ...p2WarPile)
    }
  }
}

const game = new gameOfWar()
game.playGame();

