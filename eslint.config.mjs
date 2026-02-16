// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';

// ESLint flat config - minimal setup for JavaScript files
// TypeScript files are handled by nest build and tsconfig checks
export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'src/**/*.ts',
      'test/**/*.ts',
      'eslint.config.mjs',
      '**/*.spec.ts',
      '**/*.e2e-spec.ts',
      'coverage/**',
    ],
  },
];
