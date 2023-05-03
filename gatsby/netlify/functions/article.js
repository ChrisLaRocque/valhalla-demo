exports.handler = async function (event, context) {
  // console.log("event", event);
  const {
    queryStringParameters: { slug },
  } = event;
  const entry = await fetch(
    "https://dev-netlify-connect.pantheonsite.io/jsonapi/node/article"
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const { data } = json;
      const matchedArticles = data.filter(
        ({ attributes: { field_related_companies } }) => {
          return field_related_companies.includes(slug);
        }
      );
      return matchedArticles;
    });
  return {
    statusCode: 200,
    body: JSON.stringify(entry),
  };
};
