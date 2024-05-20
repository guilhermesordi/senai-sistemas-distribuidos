module.exports = {
  extends: ['plugin:react-hooks/recommended', 'plugin:react/recommended', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
    },
  },
  ignorePatterns: ['tsconfig.tsbuildinfo', 'node_modules'],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        singleQuote: true,
      },
    ],
    'react/prop-types': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    camelcase: 'error',
    'react/react-in-jsx-scope': 'off',
    'import/no-named-as-default': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
