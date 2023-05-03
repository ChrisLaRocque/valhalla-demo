const contentful = require("contentful");
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
exports.handler = async function (event, context) {
  // console.log("event", event);
  const {
    queryStringParameters: { slug },
  } = event;
  const entry = await client
    .getEntries({
      content_type: "company",
      "fields.slug": slug,
    })
    .then(({ items }) => {
      const { fields } = items[0];
      return fields;
    })
    .catch((err) => console.log(err));
  return {
    statusCode: 200,
    body: JSON.stringify(entry),
  };
};
