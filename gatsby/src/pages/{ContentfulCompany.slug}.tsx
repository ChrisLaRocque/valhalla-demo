import React from "react";
import { gql, createClient } from "@urql/core";

export default function CompanyPage({ serverData }) {
  return <main id="main"></main>;
}
export function getServerData({ params }) {
  const { slug } = params;
  const client = createClient({
    url: process.env.VALHALLA_ENDPOINT,
  });
  const QUERY = `
    query CompanyPage($slug: StringQueryOperatorInput!){
      contentfulCompany(slug: $slug) {
        ...CompanyInfo
      }
    }
  `;

  client
    .query(QUERY, { slug })
    .toPromise()
    .then((result) => {
      console.log(result);
    });
  return {
    status: 200,
  };
}
