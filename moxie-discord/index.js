const ClusterManager = require("./src/cluster/ClusterManager");
require("dotenv").config();

const cluster = new ClusterManager();
cluster.start();