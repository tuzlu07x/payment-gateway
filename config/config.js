export const config = {
  development: {
    username: "root",
    password: "Fatih1234",
    database: "transaction",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export const rabbitMqConfig = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  vhost: "/",
};

// module.exports = {
//   development: {
//     username: "root",
//     password: "Fatih1234",
//     database: "transaction",
//     host: "127.0.0.1",
//     dialect: "mysql",
//   },
// };
