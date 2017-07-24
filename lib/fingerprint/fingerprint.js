'use strict'

const scrypt = require('../scrypt')
const password = require('../password')

const config = {
  masterPassword: '#29$93MJ+PzQ?wdT',
  cost: 16,
  blockSize: 4,
  parallelization: 1,
  keyLength: 6
}

const create = exports.create = async function (masterPassword) {
  const bytes = await scrypt.generate(masterPassword, config)
  const { readable } = password.from(bytes)
  return readable
}

exports.compare = async function (masterPassword, fingerprint) {
  return create(masterPassword)
  .then(actual => {
    if (fingerprint !== actual) {
      throw new Error('Password does not match fingerprint')
    }
    return true
  })
}