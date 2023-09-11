export const latexx = {
    render: 'LatexFunction',
    children: ['paragraph', 'tag', 'list'],
    attributes: {
      type: {
        type: String,
        default: 'inline',
        matches: ['inline', 'fullwidth'],
        errorLevel: 'critical'
      },
      title: {
        type: String
      }
    }
  };