#!/usr/bin/env node

const os = require('os')
const pkg = require('../package.json')
const server = require('..')

process.title = pkg.name

/* eslint-disable no-unused-expressions */
// this actually makes the whole parsing magic of yargs run
const argv = require('yargs')
  .usage('$0 <command> [options]')
  .help()
  .version(pkg.version)
  .option('connections', {
    alias: 'c',
    default: os.cpus().length > 1 ? 100 : 30,
    number: true,
    describe: 'Max connected peers per torrent'
  })
  .option('hostname', {
    alias: 'h',
    default: 'localhost',
    string: true,
    describe: 'Host name or IP to bind the server to'
  })
  .option('port', { alias: 'p', default: 8080, number: true, describe: 'Change the http port' })
  .option('verbose', { alias: 'v', default: false })
  .argv
/* eslint-enable no-unused-expressions */

const srv = server(argv)
srv.on('listening', function () {
  console.log(`Started listening at http://${argv.hostname || 'localhost'}:${srv.address().port}`)
})
