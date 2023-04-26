import React from "react";
import Layout from "../../components/Layout";
import { Link, graphql } from "gatsby";
import { Image } from "@unpic/react";

export default function BlogListPage({ data }) {
  const {
    allNodeArticle: { nodes },
  } = data;
  return (
    <Layout>
      <section>
        <h1>Blog</h1>
        <p>All our industry knowledge in one convenient place.</p>
      </section>
      <section>
        <h2>Latest article</h2>
        <div className="justify-between gap-3 lg:flex">
          {nodes.map(
            ({
              id,
              title,
              field_slug,
              relationships: {
                field_image: {
                  localFile: { url },
                },
              },
            }) => {
              return (
                <Link to={`/blog/${field_slug}/`} key={id}>
                  <Image
                    src={url}
                    layout="constrained"
                    width={400}
                    height={225}
                    alt="A lovely bath"
                    className="mt-3 mb-1"
                  />
                  <h3>{title}</h3>
                </Link>
              );
            }
          )}
        </div>
      </section>
    </Layout>
  );
}
export const query = graphql`
  query BlogList {
    allNodeArticle(sort: { revision_timestamp: DESC }) {
      nodes {
        id
        title
        field_slug
        relationships {
          field_image {
            localFile {
              url
            }
          }
        }
      }
    }
  }
`;
