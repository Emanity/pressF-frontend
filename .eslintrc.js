module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:jest/recommended'
	],
	'plugins': [
		'jest'
	],
	'parserOptions': {
		'ecmaVersion': 12
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'jest/expect-expect': [
			'off'
		],
		'padded-blocks': [
			'error', {
				'classes': 'always',
				'blocks': 'never',
				'switches': 'always'
			}
		],
		'no-multiple-empty-lines': [
			'error', {
				'max': 1,
				'maxEOF': 0
			}
		],
		'lines-around-comment': [
			'error', {
				'beforeBlockComment': true,
				'beforeLineComment': false
			}
		],
		'padding-line-between-statements': [
			'error', 
			{blankLine: 'always', prev: 'cjs-import', next: 'expression'},
			{blankLine: 'never', prev: 'cjs-import', next: 'cjs-import'},
			{blankLine: 'always',    prev: '*', next: 'block-like'},
			{blankLine: 'always',    prev: '*', next: 'multiline-block-like'}
		],
		'spaced-comment': [
			'error',
			'always', {
			'line': {
				'markers': ['/'],
				'exceptions': ['-', '+']
			},
			'block': {
				'markers': ['!'],
				'exceptions': ['*'],
				'balanced': true
			}
		}]
	}
};
