import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        plugins: {
            js: eslint,
            '@stylistic': stylistic,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        rules: {
            'no-useless-escape': 'off',
            '@stylistic/semi': 'error',
            '@stylistic/indent': ['error', 4],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/no-multi-spaces': 'error',
            '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
            '@stylistic/member-delimiter-style': ['error'],

            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/prefer-promise-reject-errors': 'off',
            '@typescript-eslint/prefer-string-starts-ends-with': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',

            '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
            '@typescript-eslint/prefer-regexp-exec': 'off',

            '@typescript-eslint/no-deprecated': 'error',
            '@typescript-eslint/no-this-alias': 'error',
            '@typescript-eslint/no-base-to-string': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-empty-object-type': 'error',
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/no-unsafe-function-type': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-unnecessary-type-conversion': 'error',
            '@typescript-eslint/no-wrapper-object-types': 'error',
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/consistent-type-assertions': 'error',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',


            // <--
            // TODO: эта ошибка только в тестах, она уйдёт после обновления Jest и переписывания тестов на TS
            'no-undef': 'off',
        },
    },
    globalIgnores(['dist/']),
);
