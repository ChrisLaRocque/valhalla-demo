import React, { useEffect, useState } from "react";
import { Client } from "@urql/core";
const Search: React.FC = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const QUERY = `
    query SearchResults ($reg: String) {
        bodyMatch: allNodeArticle(filter: {body: {processed: {regex: $reg}}}) {
            nodes {
                drupal_id
                title
                field_slug
              }
        }
      }
      
    `;
  const client = new Client({
    url: process.env.GATSBY_VALHALLA_ENDPOINT,
  });
  async function getResults(text) {
    const result = await client
      .query(QUERY, { text: text })
      .toPromise()
      .then(({ data }) => {
        console.log("data", data);
        // const {
        //   allNodeArticle: { nodes },
        // } = data;
        // console.log("Found articles", nodes);
        return setResults(["from getResults"]);
      })
      .catch((e) => console.error(e));
  }
  useEffect(() => {
    console.log("text", text);
    const reg = `/${text}/i`;
    getResults(text);
  }, [text]);
  return (
    <div id="search" className="border-2 border-red-500">
      <div id="search-input">
        <input
          type="text"
          id="text"
          name="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <div id="search-results">
        {results &&
          results.map((result) => {
            return null;
          })}
      </div>
    </div>
  );
};
export default Search;
