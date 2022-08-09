const http = require(`http`);

const products = require("./controller/products");
const lotr = require("./controller/lotr");

const parseURLParams = (value) => {
  const params = new URLSearchParams(value);

  return Array.from(params.entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );
};

const server = http.createServer(async (req, res) => {
  const [basePath, paramsString] = req.url.split("?");

  if (basePath === `/api/products` && req.method === `GET`) {
    const params = parseURLParams(paramsString);

    const { code, data } = await products.getAll(params);
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(data);
  } else if (req.method === `GET` && basePath.match(/\/api\/products\/\w+/)) {
    const id = basePath.split("/")[3];

    const { code, data } = await products.getById(id);
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(data);
  } else if (basePath === `/api/lotr/books`) {
    const { code, data } = await lotr.getAllBooks();
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(data);
  } else if (basePath === `/api/lotr/movies`) {
    const { code, data } = await lotr.getAllMovies();
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Route not found` }));
  }
});

const PORT = 8888;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
