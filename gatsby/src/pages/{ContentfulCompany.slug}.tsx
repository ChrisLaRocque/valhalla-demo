import React from "react";
import { gql, createClient } from "@urql/core";

export default function CompanyPage({ serverData }) {
  console.log(serverData);
  const { contentfulCompany } = serverData;
  const { name } = contentfulCompany;
  return (
    <main id="main">
      <section className="mx-auto max-w-7xl">
        <div className="text-wrapper my-12">
          <h1>{name}</h1>
        </div>
      </section>
    </main>
  );
}
export async function getServerData({ params }) {
  const { slug } = params;
  const client = createClient({
    url: process.env.VALHALLA_ENDPOINT,
  });

  const QUERY = `
    query CompanyPage($slug: StringQueryOperatorInput!){
      contentfulCompany(slug: $slug) {
        name
        slug
        description {
          description
        }
        person {
          id
          firstName
          lastName
          role
          headshot {
            title

          }
        }
      }
    }
  `;
  const data = await client
    .query(QUERY, { slug: { eq: slug } })
    .toPromise()
    .then(({ data }) => {
      // console.log("data", data);
      return data;
    })
    .catch((e) => console.error(e));

  return {
    status: 200,
    props: data,
  };
}
