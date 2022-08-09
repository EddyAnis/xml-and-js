const products = require("../data/products.json");

const getAll = ({ name, description, price }) =>
  new Promise((resolve) => {
    let result = Array.from(products);

    if (name) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (description) {
      result = result.filter((item) =>
        item.description.toLowerCase().includes(description.toLowerCase())
      );
    }

    if (price) {
      result = result.filter((item) => price === `${item.price}`);
    }

    resolve({ code: 200, data: JSON.stringify(result) });
  });

const getById = (id) =>
  new Promise((resolve) => {
    const product = products.find((item) => item.id === id);

    if (product) {
      resolve({ code: 200, data: JSON.stringify(product) });
    } else {
      resolve({
        code: 404,
        data: JSON.stringify({ message: `No product found for id ${id}` }),
      });
    }
  });

module.exports = {
  getAll,
  getById,
};
