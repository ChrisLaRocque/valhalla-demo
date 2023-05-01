const contentful = require("contentful");
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
exports.handler = async function (event, context) {
  const entry = await client
    .getEntry("CQcaFUi85d8nTgosNnWvx")
    .then((entry) => {
      return entry;
    })
    .catch((err) => console.log(err));
  return {
    statusCode: 200,
    body: JSON.stringify(entry),
  };
};
