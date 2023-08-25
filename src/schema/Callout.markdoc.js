// ./schema/Callout.markdoc.js

export const latexx = {
    render: 'Latexx',
    children: ['paragraph', 'tag', 'list'],
    attributes: {
      type: {
        type: String,
        default: 'note',
        matches: ['caution', 'check', 'note', 'warning'],
        errorLevel: 'critical'
      },
      title: {
        type: String
      }
    }
  };