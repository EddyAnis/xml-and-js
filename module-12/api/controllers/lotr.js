const { default: axios } = require("axios");

const token = process.env.LOTR_TOKEN;
const endpoint = `https://the-one-api.dev/v2`;

const getAllBooks = async () => {
  try {
    const { data } = await axios.get(`${endpoint}/book`);

    return { code: 200, data: JSON.stringify(data) };
  } catch (error) {
    return {
      code: 500,
      data: { message: error.message },
    };
  }
};

const getAllMovies = async () => {
  try {
    const { data } = await axios.get(`${endpoint}/movie`, {
      headers: { Authorization: "Bearer " + token },
    });

    return { code: 200, data: JSON.stringify(data) };
  } catch (error) {
    return {
      code: 500,
      data: { message: error.message },
    };
  }
};

module.exports = {
  getAllBooks,
  getAllMovies,
};
