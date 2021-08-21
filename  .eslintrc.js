module.exports = {
    root: true,
    globals: {
        process: true,
        module: true,
    },
    env: {
        browser: true,
        jest: false,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react-hooks'],
    extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'react-app'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react-hooks/exhaustive-deps': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'no-use-before-define': 0,
        'one-var-declaration-per-line': 'error',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-var-requires': 'off',
        'explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 0,
        "no-debugger": 2,
    },
};
