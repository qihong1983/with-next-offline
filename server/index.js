const express = require('express');
const next = require('next');
const { join } = require('path');
const cors = require('cors');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');

// const render = require('./render');
// const schema = require('./graphql');

const port = parseInt(process.env.PORT, 10) || 8082;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
// const RenderCache = render(app);

// const graphql = query => query.join('');

// const defaultQuery = graphql`
//   query WeeklyTopJS {
//     repos(language: "javascript", time: 8) {
//       name
//       full_name
//       stargazers_count
//     }
//   }
// `;

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  if (!dev) {
    server.get('*', (_, res, next) => {
      res.setHeader('Cache-Control', 'max-age=43200, immutable');
      next();
    });
  }

  // server.use(
  //   '/graphql',
  //   bodyParser.json(),
  //   graphqlExpress({
  //     schema,
  //     tracing: true,
  //     cacheControl: true,
  //   })
  // );

  // server.use(
  //   '/graphiql',
  //   graphiqlExpress({
  //     endpointURL: '/graphql',
  //     query: defaultQuery,
  //   })
  // );

  server.get('/service-worker.js', ServiceWorker(app));
  // server.get('/', (req, res) => RenderCache(req, res, '/'));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

const ServiceWorker = app => (req, res) => {
  const filePath = join(__dirname, '../', '.next', 'service-worker.js');

  app.serveStatic(req, res, filePath);
};
