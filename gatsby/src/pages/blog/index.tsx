import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, graphql, HeadFC } from "gatsby";
import { useCookies } from "react-cookie";
import { Image } from "@unpic/react";
import { Client } from "@urql/core";

export default function BlogListPage({ data }) {
  const {
    allNodeArticle: { nodes },
  } = data;
  const [cookies, setCookie, removeCookie] = useCookies(["savedArticles"]);
  const [savedArticles, setSavedArticles] = useState([]);
  // Remove the cookie when user leaves page
  useEffect(() => {
    return removeCookie("savedArticles");
  }, []);

  const QUERY = `
  query SavedArticles ($ids: [String]) {
    allNodeArticle(filter: {drupal_id: {in: $ids}}) {
        nodes {
          drupal_id
          title
        }
      }
    }
  `;
  const client = new Client({
    url: process.env.GATSBY_VALHALLA_ENDPOINT,
  });
  async function getSaved(ids) {
    const result = await client
      .query(QUERY, { ids: ids })
      .toPromise()
      .then(({ data }) => {
        const {
          allNodeArticle: { nodes },
        } = data;
        console.log("Found articles", nodes);
        return setSavedArticles(nodes);
      })
      .catch((e) => console.error(e));
  }
  useEffect(() => {
    console.log("Articles saved in cookie", cookies.savedArticles);
    if (typeof cookies.savedArticles === "undefined") return;
    console.log("Getting articles from Valhalla");
    getSaved(cookies.savedArticles);
  }, [cookies]);

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
              drupal_id,
              relationships: {
                field_image: {
                  localFile: { url },
                },
              },
            }) => {
              return (
                <div key={id}>
                  <Image
                    src={url}
                    layout="constrained"
                    width={400}
                    height={225}
                    alt="A lovely bath"
                    className="mt-3 mb-1"
                  />
                  <div>
                    <Link to={`/blog/${field_slug}/`}>
                      <h3>{title}</h3>
                    </Link>
                    {cookies.savedArticles &&
                    cookies.savedArticles.indexOf(drupal_id) !== -1 ? (
                      <button
                        onClick={(e) => {
                          const index =
                            cookies.savedArticles.indexOf(drupal_id);
                          const temp = [...cookies.savedArticles];
                          temp.splice(index, 1);

                          return setCookie("savedArticles", temp);
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          const cookieArray =
                            cookies.savedArticles &&
                            cookies.savedArticles.length
                              ? [drupal_id, ...cookies.savedArticles]
                              : [drupal_id];
                          return setCookie("savedArticles", cookieArray);
                        }}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>
      <section>
        <h3>Your saved articles</h3>
        <div className="justify-between gap-3 lg:flex">
          <ul>
            {savedArticles.map((article) => {
              return <li key={article.drupal_id}>{article.title}</li>;
            })}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
export const Head: HeadFC = () => {
  return <title>{`Blog | Money &amp; Money Capital`}</title>;
};
export const query = graphql`
  query BlogList {
    allNodeArticle(sort: { revision_timestamp: DESC }) {
      nodes {
        id
        drupal_id
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

export async function getServerData(props) {
  //   console.log("props", props);
  // const { params } = props;
  // const { slug } = params;
  // const client = createClient({
  //   url: process.env.VALHALLA_ENDPOINT,
  // });

  // const QUERY = `
  //   query CompanyPage($slug: StringQueryOperatorInput!){
  //     contentfulCompany(slug: $slug) {
  //       name
  //       slug
  //       description {
  //         description
  //       }
  //       logo {
  //         url
  //         width
  //         height
  //         description
  //       }
  //       person {
  //         id
  //         firstName
  //         lastName
  //         role
  //         headshot {
  //           title

  //         }
  //       }
  //     }
  //     allNodeArticle {
  //       nodes {
  //         id
  //         title
  //         field_related_companies
  //         field_slug
  //       }
  //     }
  //   }
  // `;
  // const data = await client
  //   .query(QUERY, { slug: { eq: slug } })
  //   .toPromise()
  //   .then(({ data }) => {
  //     // console.log("data", data);
  //     const date = new Date();
  //     const renderedAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  //     const { allNodeArticle } = data;
  //     const relatedArticles = allNodeArticle.nodes.filter(
  //       ({ field_related_companies }) => {
  //         return field_related_companies.includes(slug);
  //       }
  //     );
  //     return { renderedAt, relatedArticles, ...data };
  //   })
  //   .catch((e) => console.error(e));

  return {
    status: 200,
    props: null,
  };
}
