import { Component } from 'react';
import surveyData from '../survey-data.js';
import './App.css';
import Survey from '../Survey';

class App extends Component {
  componentWillMount() {
    const {
      title,
    } = surveyData;
    document.title = title;
  }

  render() {
    const {
      title,
      description,
      items,
    } = surveyData;

    return (
      <main className="App">
        <Survey title={title} description={description} items={items} />
      </main>
    );
  }
}

export default App;
