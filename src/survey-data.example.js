const surveyData = {
  title: 'The Title of Your Survey',
  description: `Whatever you want to say to your survey takers at the start of the survey.

Whitespace and line breaks will be preserved. If you want to have a single line\
but break it up in this file for readability, append a backslash to the end of a line.

You can have as many survey items as you want in the items array.\
If you want an item to be required, add isRequired: true\
(it is false by default).`,
  items: [
    {
      type: 'text',
      isRequired: false,
      question: 'A text question.',
      placeholder: 'Optional placeholder.',
    },
    {
      type: 'textarea',
      isRequired: false,
      question: 'A textarea question.',
      placeholder: 'Optional placeholder.',
    },
    {
      type: 'radio',
      isRequired: true,
      question: 'A radio question.',
      options: [
        'Radio 1',
        'Radio 2',
        'Radio 3',
      ],
    },
    {
      type: 'number',
      isRequired: true,
      question: 'A numerical answer, with optional minimum & maximum values and optional placeholder.',
      min: 0,
      max: 9,
      placeholder: '🍕',
    },
    {
      type: 'checklist',
      isRequired: false,
      question: 'A checklist answer, with an optional minimum number of selections.',
      options: [
        'Checkbox 1',
        'Checkbox 2',
        'Checkbox 3',
        'Checkbox 4',
      ],
      min: 2,
    },
  ],
};

export default surveyData;
