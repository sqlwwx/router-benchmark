'use strict'

const chalk = require('chalk')

const operations = 1000000

function now () {
  var ts = process.hrtime()
  return (ts[0] * 1e3) + (ts[1] / 1e6)
}

function getOpsSec (ms) {
  return Number(((operations * 1000) / ms).toFixed())
}

function print (name, time) {
  process.stdout.write(`${getOpsSec(now() - time)},`);
}

function title (name) {
  process.stdout.write(`
${name},`);
}

function Queue () {
  this.q = []
  this.running = false
}

Queue.prototype.add = function add (job) {
  this.q.push(job)
  if (!this.running) this.run()
}

Queue.prototype.run = function run () {
  this.running = true
  const job = this.q.shift()
  job(() => {
    if (this.q.length) {
      this.run()
    } else {
      this.running = false
    }
  })
}

module.exports = { now, getOpsSec, print, title, Queue, operations }
