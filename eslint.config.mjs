// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';

// Minimal ESLint flat config to avoid CI crashes where some flat-config helper
// packages aren't available. This keeps lint runnable; if you want stricter
// TypeScript linting, reintroduce a more advanced config or configure plugin
// based rules in a way compatible with your CI environment.
export default [
  eslint.configs.recommended,
  {
    ignores: ['eslint.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
];