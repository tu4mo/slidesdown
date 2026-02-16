import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'

export default defineConfig(
  {
    ignores: ['build/**', 'coverage/**', 'functions/lib/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.tsx'],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat['jsx-runtime'],
  },
  eslintPluginPrettierRecommended,
)
