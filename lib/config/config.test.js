'use strict'

// key isn't power of two or logN
// missing values

import test from 'ava'
import { parse } from '.'
const { assign } = Object

const validConfig = {
  masterPassword: '6464test',
  cost: 16,
  blockSize: 8,
  parallelization: 4,
  keyLength: 32
}

test('load valid config', async t => {
  t.deepEqual(await parse(validConfig), validConfig)
})

test('null master password', testInvalidConfig, assign({}, validConfig, { masterPassword: null }), '"masterPassword" must be a string')
test('non-string master password', testInvalidConfig, assign({}, validConfig, { masterPassword: 123 }), '"masterPassword" must be a string')
test('missing master password', testInvalidConfig, omit(validConfig, 'masterPassword'), '"masterPassword" is required')

test('null cost', testInvalidConfig, assign({}, validConfig, { cost: null }), '"cost" must be a number')
test('none-numeric cost', testInvalidConfig, assign({}, validConfig, { cost: 'hello' }), '"cost" must be a number')
test('missing cost', testInvalidConfig, omit(validConfig, 'cost'), '"cost" is required')
test('missing cost', testInvalidConfig, assign({}, validConfig, { cost: 0 }), '"cost" must be larger than or equal to 1')
test('missing cost', testInvalidConfig, assign({}, validConfig, { cost: 32 }), '"cost" must be less than or equal to 31')

test('null blockSize', testInvalidConfig, assign({}, validConfig, { blockSize: null }), '"blockSize" must be a number')
test('none-numeric blockSize', testInvalidConfig, assign({}, validConfig, { blockSize: 'hello' }), '"blockSize" must be a number')
test('missing blockSize', testInvalidConfig, omit(validConfig, 'blockSize'), '"blockSize" is required')

test('null parallelization', testInvalidConfig, assign({}, validConfig, { parallelization: null }), '"parallelization" must be a number')
test('none-numeric parallelization', testInvalidConfig, assign({}, validConfig, { parallelization: 'hello' }), '"parallelization" must be a number')
test('missing parallelization', testInvalidConfig, omit(validConfig, 'parallelization'), '"parallelization" is required')

test('null keyLength', testInvalidConfig, assign({}, validConfig, { keyLength: null }), '"keyLength" must be a number')
test('none-numeric keyLength', testInvalidConfig, assign({}, validConfig, { keyLength: 'hello' }), '"keyLength" must be a number')
test('missing keyLength', testInvalidConfig, omit(validConfig, 'keyLength'), '"keyLength" is required')

async function testInvalidConfig(t, config, errorMessage) {
	const error = await t.throws(parse(config), Error)
  t.is(error.message, errorMessage)
}
testInvalidConfig.title = providedTitle => `Invalid configuration :: ${providedTitle}`

function omit (obj, omitted) {
  return Object.keys(obj)
  .filter(key => key !== omitted)
  .reduce((curr, key) => assign(curr, { [key]: obj[key] }), {})
}