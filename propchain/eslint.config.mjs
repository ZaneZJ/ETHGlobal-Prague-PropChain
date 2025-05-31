import eslint from '@eslint/eslintrc';
const { FlatCompat } = eslint;

const compat = new FlatCompat();

export default [
  {
    ignores: ['src/foundry/**/*'],
  },
  ...compat.extends('next/core-web-vitals'),
];
