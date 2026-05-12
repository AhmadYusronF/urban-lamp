import 'dotenv/config';
import server from './server/index.js';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    port: process.env.PGPORT,
  });
  console.log(`Server is running on port ${port}`);
});
