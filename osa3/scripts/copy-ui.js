const { cpSync, rmSync } = require('node:fs')
const { resolve } = require('node:path')

const frontendDist = resolve(__dirname, '../../osa2/phonebook/dist')
const backendDist = resolve(__dirname, '../dist')

rmSync(backendDist, { recursive: true, force: true })
cpSync(frontendDist, backendDist, { recursive: true })

console.log('frontend build copied to osa3/dist')
