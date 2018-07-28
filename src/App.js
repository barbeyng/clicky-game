import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Wrapper from "./components/Wrapper/Wrapper";
import Footer from './components/Footer/Footer'
import CorgiCard from './components/CorgiCard/CorgiCard'
import corgis from './corgis.json';

class App extends Component {
  // Set default state
  state = {
    corgis,
    score: 0,
    totalScore: 0,
    topScore: 0,
    pickedCorgi: [],
    gameMessage: 'Click on an adorable corgi to begin, but click the same one more than once and your score will reset!'
  };

  handleImageChange = id => {
    this.setState({ gameMessage: 'Nice job! Select the next image!' });
    let pickedCorgi = this.state.pickedCorgi;
    // If never selected, push to picked array
    if (!pickedCorgi.includes(id)) {
      pickedCorgi.push(id)
      // If user picked all 12, set score to 12
      if (pickedCorgi.length === 12) {
        this.setState({ score: 12, totalScore: 12, topScore: 12, pickedCorgi: [] , gameMessage: 'Congrats, you win!'});
        return;
      }
      // If never selected before, increment score
      if (this.state.score >= this.state.totalScore) {
        this.state.topScore = this.state.score + 1;
      }
      this.setState({ corgis, pickedCorgi, score: pickedCorgi.length, totalScore: this.state.topScore });
      // Shuffle images
      for (let i = corgis.length - 1; i > 0; i--) {
        let j = Math.floor((Math.random() * (i)) + 0);
        [corgis[j], corgis[i]] = [corgis[i], corgis[j]];
      }

    } else {
      // If image has been previously selected, set following state
      this.setState({ gameMessage: 'Too bad, you already selected that one! Try again.' })
      if (this.state.score < this.state.totalScore) {
        this.state.topScore = this.state.totalScore;
      }
      this.setState({ pickedCorgi: [], score: 0, totalScore: this.state.topScore });
      return;
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar 
        score = {this.state.score}
        topScore = {this.state.topScore}
        gameMessage = {this.state.gameMessage}
        />

        <Wrapper>
          {this.state.corgis.map(img => (
            <CorgiCard
              id={img.id}
              url={img.url}
              name={img.name}
              handleImageChange={this.handleImageChange}
            />
          ))}
        </Wrapper>
        <Footer />
      </div>
    );
  }
}

export default App;
