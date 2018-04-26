#!/usr/bin/env node

const pkg = require('../package.json')
const server = require('..')

process.title = pkg.name

/* eslint-disable no-unused-expressions */
// this actually makes the whole parsing magic of yargs run
const argv = require('yargs')
  .usage('$0 <command> [options]')
  .help()
  .version(pkg.version)
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .options('port', {
    alias: 'p',
    default: 8080,
    number: true
  })
  .options('hostname', {
    alias: 'h',
    default: 'localhost',
    string: true
  })
  .argv
/* eslint-enable no-unused-expressions */

const srv = server(argv)
srv.on('listening', function () {
  console.log(`Started listening at http://${argv.hostname||'localhost'}:${srv.address().port}`)
})
