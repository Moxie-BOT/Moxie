const Logger = require('../utils/Logger')
const path = require('path')
const { Worker } = require('worker_threads')

module.exports = class ClusterManager {
  constructor () {
    this.clusterAmount = parseInt(process.env.CLUSTER_AMOUNT)
    this.aliveClusters = 0
  }

  start () {
    Logger.info(`Spawning ${this.clusterAmount} clusters`)
    this.spawnClusters()
  }

  /**
     *
     * @param {Number} id Cluster ID
     * @returns {Worker} "Configured" worker class
     */
  createCluster (id, env) {
    const worker = new Worker(
      path.join(__dirname, 'Cluster.js'),
      {
        env: env
          ? { ...process.env, ...env }
          : {
              ...process.env
            }
      }
    )
    worker.on('exit', () => this.onExit(id))
    worker.on('error', (err) => this.onError(id, err))
    worker.on('message', (m) => {
      console.log(m)
    })
    this.aliveClusters++
    return worker
  }

  spawnClusters () {
    this.clusters = new Array(this.clusterAmount)
      .fill(0)
      .map((_, i) => this.createCluster(i))
  }

  /**
     *
     * @param {Worker} worker Referring to the worker class instantiated earlier
     */
  onExit (worker) {
    this.aliveClusters--
    Logger.error(`Mayday! Cluster ${worker} died! Starting another cluster now.`)

    this.clusters[worker] = this.createCluster(worker)
  }

  /**
     *
     * @param {Number} id Cluster ID
     * @param {Error} error Error message
     */
  onError (id, error) {
    Logger.error(`Cluster ${id} returned an error: ${error.stack}`)
  }
}
