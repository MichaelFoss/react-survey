import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SurveyItem from '../SurveyItem';
import Spinner from '../Spinner';
import './Survey.css';
import { homepage } from '../../package.json';

const serverEndpoint = `${homepage}${homepage.substr(-1) !== '/' ? '/' : ''}submit.php`;

const STATES = {
  NOT_SUBMITTED: 'NOT_SUBMITTED',
  SUBMITTING: 'SUBMITTING',
  SUBMITTED: 'SUBMITTED',
  SERVER_ERROR: 'SERVER_ERROR',
};

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyState: STATES.NOT_SUBMITTED,
      answers: props.items.map(item => {
        switch (item.type) {
          case 'text':
            return '';
          case 'textarea':
            return '';
          case 'radio':
            return '';
          case 'checklist':
            return [];
          case 'number':
            return '';
          default:
            throw Error(`Unknown item type ${item.type}`);
        }
      }),
      errors: {},
    };
  }

  onChange = (itemNumber, item, answer) => {
    const newAnswers = this.state.answers;
    switch (item.type) {
      case 'text':
        newAnswers[itemNumber] = answer;
        break;
      case 'textarea':
        newAnswers[itemNumber] = answer;
        break;
      case 'number':
        const positiveIntegerTest = new RegExp(/^[0-9]*$/);
        const isPositiveInteger = x => positiveIntegerTest.test(x);
        if (!isPositiveInteger(answer)) {
          return;
        }
        if (
          String(answer).length > 0 && (
            (Number.isInteger(item.min) && answer < item.min) ||
            (Number.isInteger(item.max) && answer > item.max)
          )
        ) {
          this.setState({
            answers: [
              ...this.state.answers,
            ],
          });
          return;
        }
        newAnswers[itemNumber] = answer;
        break;
      case 'radio':
        newAnswers[itemNumber] = answer;
        break;
      case 'checklist':
        const wasChecked = newAnswers[itemNumber].includes(answer);
        const checkedAnswers = wasChecked ? [ ...newAnswers[itemNumber] ].filter(x => x !== answer) : [ ...newAnswers[itemNumber], answer, ];
        newAnswers[itemNumber] = checkedAnswers;
        break;
      default:
        throw Error(`Unknown type ${item.type}`);
    }
    this.setState({
      answers: newAnswers,
    });
  };

  validate() {
    const {
      items,
    } = this.props;
    const newErrors = {};
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const answer = this.state.answers[i];
      if (item.isRequired && (
        (Array.isArray(answer) && answer.length === 0) ||
        (!Array.isArray(answer) && !answer)
      )) {
        newErrors[item.question] = 'a selection is required';
      }
      else if (item.type === 'number') {
        if (Number.isInteger(item.min) && answer < item.min) {
          newErrors[item.question] = `number must be no less than ${item.min}`;
        }
        else if (Number.isInteger(item.max) && answer > item.max) {
          newErrors[item.question] = `number must be no more than ${item.max}`;
        }
      }
      else if (item.type === 'checklist') {
        if (Number.isInteger(item.min) && answer.length < item.min) {
          newErrors[item.question] = `make at least ${item.min} selection${item.min === 1 ? '' : 's'}`;
        }
      }
    }
    this.setState({
      errors: newErrors,
    });
    return Object.keys(newErrors).length;
  }

  trySubmit = e => {
    const {
      items,
    } = this.props;
    e.preventDefault();
    const numErrors = this.validate();
    if (numErrors === 0) {
      this.setState({
        surveyState: STATES.SUBMITTING,
      }, () => {
        fetch(serverEndpoint, {
          method: 'POST',
          body: JSON.stringify({
            answers: this.state.answers.map((answer, answerNumber) => ({
              question: items[answerNumber].question,
              answer: Array.isArray(answer) ? answer.join(', ') : answer,
            })),
          }),
        })
          .then(async response => {
            try {
              if (response.status >= 400) {
                this.setState({
                  surveyState: STATES.SERVER_ERROR,
                });
                return;
              }

              const responseText = await response.text();
              console.log(responseText);
              this.setState({
                surveyState: STATES.SUBMITTED,
              });
            }
            catch (err) {
              console.error(err);
            }
          })
          .catch(() => this.setState({
            surveyState: STATES.NOT_SUBMITTED,
          }));
      });
    }
  };

  render() {
    const {
      title,
      description,
      items,
    } = this.props;
    if (this.state.surveyState === STATES.SUBMITTED) {
      return (
        <p>Thank you!</p>
      );
    }
    else if (this.state.surveyState === STATES.SERVER_ERROR) {
      return (
        <>
          <h2>Whoops!</h2>
          <p>Something went wrong on the server. This is not your fault, it's ours.</p>
          <p>It looks like we're not going to be able to save your survey. Please try again later!</p>
        </>
      );
    }
    return (
      <div className="survey">
        <form onSubmit={this.trySubmit}>
          <h1 className="survey-title">{title}</h1>
          <p className="survey-description">{description}</p>
          <ol className="survey-items">
            {items.map((item, itemNumber) => {
              const answer = this.state.answers[itemNumber];
              return (
                <li className={`surveyItem-${itemNumber}`} key={item.question}>
                  <SurveyItem
                    item={item}
                    value={answer}
                    onChange={(item, answer) => this.onChange(itemNumber, item, answer)}
                    error={this.state.errors[item.question]}
                  />
                </li>
              );
            })}
          </ol>
          <button type="submit" disabled={this.state.surveyState === STATES.SUBMITTING}>Submit</button>
        </form>
        {(this.state.surveyState === STATES.SUBMITTING) && <Spinner />}
      </div>
    );
  }
}

Survey.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([
      'text',
      'textarea',
      'radio',
      'number',
      'checklist',
    ]).isRequired,
    isRequired: PropTypes.bool,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    min: PropTypes.number,
    max: PropTypes.number,
    placeholder: PropTypes.string,
  })).isRequired,
};

export default Survey;
