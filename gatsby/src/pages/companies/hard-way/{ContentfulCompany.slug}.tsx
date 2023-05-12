/**
 * Fully SSR'd page with data coming from both Drupal and Contentful with
 * 1 API call to Netlify Connect
 */
import React from "react";
import { Link, HeadFC } from "gatsby";
import Layout from "../../../components/Layout";
import { Image } from "@unpic/react";

export default function CompanyPage({ serverData }) {
  //   console.log("serverData", serverData);
  const { data, renderedAt } = serverData;
  const [contentfulCompany, relatedArticles] = data;
  let {
    name,
    description,
    logo: {
      fields: {
        description: logoDescription,
        file: {
          url,
          details: {
            image: { width, height },
          },
        },
      },
    },
  } = contentfulCompany;
  url = `https://${url}`;
  const imageWidth = 300;
  const imageHeight = imageWidth / (width / height);
  return (
    <Layout>
      <section>
        <div className="text-wrapper my-12">
          <div className="header-wrapper flex justify-between">
            <h1>{name}</h1>
          </div>

          <Image
            src={url}
            layout="constrained"
            width={imageWidth}
            height={imageHeight}
            alt={logoDescription}
            className="mb-1 mt-3 bg-slate-900"
          />
          <p>{description}</p>
        </div>
        <div id="related-articles">
          <div className="header-two-wrapper flex justify-between">
            <h2>{`Articles related to ${name}`}</h2>
          </div>
          <ul>
            {relatedArticles.map(
              ({ id, attributes: { title, field_slug } }) => {
                return (
                  <li key={id}>
                    <Link to={`/blog/${field_slug}/`}>{title}</Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>
        <small className="block text-right">{`SSR data fetched at: ${renderedAt}`}</small>
      </section>
    </Layout>
  );
}
export const Head: HeadFC = ({ serverData }) => {
  const {
    data: [contentfulCompany],
  } = serverData;
  const { name } = contentfulCompany;
  return <title>{`${name} | Money &amp; Money Capital`}</title>;
};
export async function getServerData(props) {
  // console.log("props", props);
  const { params } = props;
  const { slug } = params;
  const date = new Date();
  const renderedAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const contentfulData = await fetch(
    `https://netlify-connect-demo.netlify.app/.netlify/functions/company?slug=${slug}`
  ).then((res) => res.json());
  const articleData = await fetch(
    `https://netlify-connect-demo.netlify.app/.netlify/functions/article?slug=${slug}`
  ).then((res) => res.json());

  const data = await Promise.all([contentfulData, articleData]);

  return {
    status: 200,
    props: { data, renderedAt },
  };
}
