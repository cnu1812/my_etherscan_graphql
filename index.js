const { ApolloServer } = require("apollo-server");
// Import schema from graphql file
const { importSchema } = require("graphql-import");  
// Custom data source for Ethereum data
const EtherDataSource = require("./datasource/ethDatasource");
// Import schema from graphql file
const typeDefs = importSchema("./schema.graphql"); 

require("dotenv").config();

// Resolvers map query fields to data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }), 
});

// Set no timeout 
server.timeout = 0;
// Start Apollo Server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
