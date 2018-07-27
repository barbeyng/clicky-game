import React, { Component } from 'react';
import CorgiCard from './components/CorgiCard.js';
import Wrapper from './components/Wrapper.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import corgis from './corgis.json';
// import './App.css';

class App extends Component {
  state = {
    corgi: corgis,
    score: 0,
    topScore: 0,
    pickedCorgi: [],
    gameMessage: 'Click on an adorable corgi to begin!'
  };

  removeCorgi = id => {
    const corgis = this.state.corgis.filter(corgi => corgi.id !== id);
    this.setState({ corgis });
  };

  imageClick = (id) => {
    this.setState({ gameMessage: 'Select the next image!' });
    // If corg never been selected, +1 to score
    if (this.state.pickedCorgi.indexOf(id) === -1) {
      let newScore = (this.state.score + 1) % 12;
      this.state.pickedCorgi.push(id);
      // If user has top score, push score to top score field in nav
      if (this.state.score >= this.state.topScore && this.state.topScore !== 12) {
        this.setState({ score: newScore }, { topScore: newScore });
      } else if (this.state.score >= this.state.topScore && this.state.topScore === 12) {
        this.setScore({ score: newScore });
      } else {
        this.setState({ score: newScore })
      };
      this.shuffleDog();
      // If selected before, user loses
    } else {
      this.setState({ gameMessage: 'Too bad, you lose! Try again.' })
      this.setState({ score: 0 }, { pickedCorgi: [] })
    }
    // If corg picked has never been selected AND the score is 11, user wins
    if (this.state.pickedCorgi.indexOf(id) === -1 && this.state.pickedCorgi.length === 11) {
      this.setState({ score: 12, topScore: 12, gameMessage: 'Congrats, you win!', pickedCorgi: [] });
      return;
    }
  };

  // Logic to shuffle all the corgi cards
  shuffleCards = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    console.log (arr);
};

  shuffleDog = () => {
    let shuffledDog = this.shuffleCards(corgis);
    this.setState({ corgi: shuffledDog })
  };

  render() {
    return (
      <div>
        <NavBar
          score={this.state.score}
          topScore={this.state.topScore}
          gameMessage={this.state.gameMessage}
        />
        <Wrapper>
          {this.state.corgi.map(dog => {
            return (
              <CorgiCard
                key={dog.id}
                id={dog.id}
                image={dog.image}
                imageClick={this.imageClick}
                name={dog.name}
              />
            )
          })}
        </Wrapper>
        <Footer />
      </div>
    )
  }

}


export default App;
