/**
 * Statically rendered individual article page
 */
import React from "react";
import { graphql, HeadFC } from "gatsby";
import { Image } from "@unpic/react";
import Layout from "../../components/Layout";

export default function BlogPost({ data }) {
  const {
    nodeArticle: {
      title,
      body,
      relationships: {
        field_image: {
          localFile: { url },
        },
      },
    },
  } = data;
  return (
    <Layout>
      <section>
        <h1>{title}</h1>
        <Image
          src={url}
          layout="fullWidth"
          height={600}
          alt="A lovely bath"
          className="my-7"
        />
        <div dangerouslySetInnerHTML={{ __html: body.processed }}></div>
      </section>
    </Layout>
  );
}
export const Head: HeadFC = ({ data }) => {
  const {
    nodeArticle: { title },
  } = data;
  return <title>{`${title} | Money &amp; Money Capital`}</title>;
};
export const query = graphql`
  query BlogPost($field_slug: String!) {
    nodeArticle(field_slug: { eq: $field_slug }) {
      title
      body {
        processed
      }
      relationships {
        field_image {
          localFile {
            url
          }
        }
      }
    }
  }
`;
