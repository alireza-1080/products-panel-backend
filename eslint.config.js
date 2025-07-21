import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettier,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.js',
      '*.mjs',
      '*.cjs',
      '*.json',
      '*.md',
      '*.txt',
      '*.log',
      '*.lock',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '.git/**',
      '.vscode/**',
      '.idea/**',
      '*.min.js',
      '*.bundle.js',
      'prisma/migrations/**',
      'src/generated/**',
      '.env*',
      '.sample.env',
    ],
  },
];
