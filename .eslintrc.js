// const fs = require('fs');

// const folders = fs
//   .readdirSync('src', { withFileTypes: true })
//   .filter(dirent => dirent.isDirectory())
//   .map(dirent => dirent.name);

module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  // plugins: ['simple-import-sort'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'react-hooks/exhaustive-deps': 'off',
    'no-extend-native': 'off'
    // 'simple-import-sort/sort': 'error',
    // 'sort-imports': 'off',
    // 'import/first': 'error',
    // 'import/newline-after-import': 'error',
    // 'import/no-duplicates': 'error'
  }
  // overrides: [
  //   {
  //     files: ['*.tsx', '*.ts'],
  //     rules: {
  //       'simple-import-sort/sort': [
  //         'error',
  //         {
  //           groups: [
  //             // Packages. `react` related packages come first.
  //             // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
  //             ['^react', '^@?\\w'],
  //             // Absolute imports and Relative imports.
  //             [`^(${folders.join('|')})(/.*|$)`, '^\\.'],
  //             // for scss imports.
  //             ['^[^.]']
  //           ]
  //         }
  //       ]
  //     }
  //   }
  // ]
};
