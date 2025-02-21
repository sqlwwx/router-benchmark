'use strict'

const { fork } = require('child_process')
const { resolve } = require('path')
const { Queue } = require('./utils')

const benchmarks = [
  'find-my-way.js',
  'call.js',
  'express.js',
  'koa-router.js',
  'koa-tree-router.js',
  'router.js',
  'routr.js',
  'server-router.js',
  'trek-router.js'
]

const queue = new Queue()

process.stdout.write(`module,short static,static with same radix,dynamic route,mixed static dynamic,long static,wildcard,all together`)

benchmarks.forEach(file => {
  queue.add(runner.bind({ file: resolve('benchmarks', file) }))
})

function runner (done) {
  const process = fork(this.file)
  process.on('close', done)
}
