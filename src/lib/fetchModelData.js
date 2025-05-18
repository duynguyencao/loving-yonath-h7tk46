/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  return fetch("https://zs97xx-8081.csb.app" + url).then((response) =>
    response.json()
  );
}

export default fetchModel;
