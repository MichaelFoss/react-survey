import {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './SurveyItem.css'

class SurveyItem extends Component {
  id = uuid();

  render() {
    const {
      item,
      value,
      onChange,
      error,
    } = this.props;
    const {
      question,
      type,
    } = item;

    let answer = null;
    if (type === 'text') {
      const {
        placeholder = '',
      } = item;
      answer = <p>
        <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(item, e.target.value)} />
      </p>;
    }
    else if (type === 'textarea') {
      const {
        placeholder = '',
      } = item;
      answer = <p>
        <textarea className="surveyItem-textarea" value={value} placeholder={placeholder} onChange={e => onChange(item, e.target.value)} />
      </p>;
    }
    else if (type === 'number') {
      const {
        min = null,
        max = null,
        placeholder = '',
      } = item;
      const maxLength = max ? Math.ceil(Math.log(max)) : null;
      answer = <p>
        <input type="number" min={min} max={max} maxLength={maxLength} placeholder={placeholder} value={value} onChange={e => onChange(item, e.target.value)} />
      </p>;
    }
    else if (type === 'radio') {
      const {
        options,
      } = item;
      answer = <ul>
        {options.map((option, optionNumber) => {
          const id = uuid();
          return (
            <li className="surveyItem-listItem" key={id}>
              <input type="radio" name={`question-${this.id}`} id={id} value={`${optionNumber}: ${option}`} onChange={() => onChange(item, option)} checked={option === value} />
              <label htmlFor={id}>{option}</label>
            </li>
          );
        })}
      </ul>;
    }
    else if (type === 'checklist') {
      const {
        options,
      } = item;
      answer = <ul>
        {options.map((option, optionNumber) => {
          const id = uuid();
          return (
            <li className="surveyItem-listItem" key={id}>
              <input type="checkbox" id={id} value={`${optionNumber}: ${option}`} onChange={() => onChange(item, option)} checked={value.includes(option)} />
              <label htmlFor={id}>{option}</label>
            </li>
          );
        })}
      </ul>;
    }
    else {
      throw Error(`Unknown type ${type}`);
    }

    return (
      <>
        <p>
          {question}
          {error && <span className="surveyItem-error"> - {error}</span>}
        </p>
        {answer}
      </>
    )
  }
}

SurveyItem.propTypes = {
  item: PropTypes.shape({
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
  }).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default SurveyItem;
