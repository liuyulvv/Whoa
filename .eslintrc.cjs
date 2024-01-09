module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'eslint-config-prettier'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'memberLike',
                modifiers: ['private', 'protected'],
                format: ['snake_case'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'require'
            },
            {
                selector: 'variable',
                format: ['snake_case'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid'
            },
            {
                selector: 'function',
                format: ['PascalCase']
            }
        ]
    }
};
