/**
 * Example showing a list of statically-rendered blog posts, with the ability
 * to add them to a 'saved articles' list that fetches article information from
 * Netlify Connect.
 */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Logo from "../../components/Logo";
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
          field_slug
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
    // console.log("Articles saved in cookie", cookies.savedArticles);
    if (
      typeof cookies.savedArticles === "undefined" ||
      cookies.savedArticles.length === 0
    ) {
      console.log("No articles saved in cookie");
      return setSavedArticles([]);
    } else {
      console.log("Getting articles from Valhalla");
      getSaved(cookies.savedArticles);
    }
  }, [cookies]);
  return (
    <Layout>
      <section>
        <h1>Blog</h1>
        <p>All our industry knowledge in one convenient place.</p>
      </section>
      <section className="lg:flex lg:gap-3">
        <div id="latest-articles" className="lg:w-3/4">
          <h2>Latest articles</h2>
          <div className="flex-wrap justify-between gap-1 lg:flex">
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
                  <div key={id} className="basis-[49%]">
                    <Image
                      src={url}
                      layout="constrained"
                      width={400}
                      height={225}
                      alt="A lovely bath"
                      className="mt-3 mb-1 w-full"
                    />
                    <div>
                      <Link to={`/blog/${field_slug}/`}>
                        <h3>{title}</h3>
                      </Link>
                      <div className="text-right">
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
                            {/* Remove */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="#059669"
                              className="h-9 w-9"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
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
                            {/* Save */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-9 w-9"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="saved-articles border-l-2 lg:w-1/4 lg:border-slate-500 lg:px-3">
          <div className="header-wrapper flex justify-between">
            <h3>Your saved articles</h3>
            <Logo and="drupal" />
          </div>
          <div className="justify-between gap-3 lg:flex">
            <ul className="w-full">
              {savedArticles.map((article) => {
                return (
                  <li key={article.drupal_id} className="mb-3 bg-teal-100 p-3">
                    <Link to={`/blog/${article.field_slug}`}>
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
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
