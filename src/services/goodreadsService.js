const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('server:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

const goodreadsService = () => {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=UyVZTEfBE2N0TH23E7l0Q`)
        .then((res) => {
          parser.parseString(res.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return { getBookById };
};

module.exports = goodreadsService();
