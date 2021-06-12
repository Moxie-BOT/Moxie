require("dotenv").config();

const cluster = new (require("./src/cluster/ClusterManager"))();
cluster.start();