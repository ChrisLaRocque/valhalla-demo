import React from "react";
import { gql, createClient } from "@urql/core";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import { Image } from "@unpic/react";

export default function CompanyPage({ serverData }) {
  const { contentfulCompany, relatedArticles, renderedAt } = serverData;
  const {
    name,
    description,
    logo: { url, width, height, description: logoDescription },
  } = contentfulCompany;
  const imageWidth = 300;
  const imageHeight = imageWidth / (width / height);
  return (
    <Layout>
      <section>
        <div className="text-wrapper my-12">
          <h1>{name}</h1>
          <Image
            src={url}
            layout="constrained"
            width={imageWidth}
            height={imageHeight}
            alt={logoDescription}
            className="mt-3 mb-1 bg-slate-900"
          />
          <p>{description.description}</p>
        </div>
        <div id="related-articles">
          <h2>{`Articles related to ${name}`}</h2>
          <ul>
            {relatedArticles.map(({ id, title, field_slug }) => {
              return (
                <li key={id}>
                  <Link to={`/blog/${field_slug}/`}>{title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <small className="block text-right">{`SSR data fetched at: ${renderedAt}`}</small>
      </section>
    </Layout>
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
        logo {
          url
          width
          height
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
      allNodeArticle {
        nodes {
          id
          title
          field_related_companies
          field_slug
        }
      }
    }
  `;
  const data = await client
    .query(QUERY, { slug: { eq: slug } })
    .toPromise()
    .then(({ data }) => {
      // console.log("data", data);
      const date = new Date();
      const renderedAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      const { allNodeArticle } = data;
      const relatedArticles = allNodeArticle.nodes.filter(
        ({ field_related_companies }) => {
          return field_related_companies.includes(slug);
        }
      );
      return { renderedAt, relatedArticles, ...data };
    })
    .catch((e) => console.error(e));

  return {
    status: 200,
    props: data,
  };
}
