import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import "../styles/main.css";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Companies from "../components/Companies";

const IndexPage: React.FC<PageProps<Queries.HomepageQuery>> = ({ data }) => {
  const {
    allContentfulCompany: { nodes },
  } = data;
  return (
    <Layout>
      <Hero />
      <Companies companies={nodes} />
    </Layout>
  );
};

export const query = graphql`
  query Homepage {
    allContentfulCompany {
      nodes {
        id
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
            gatsbyImageData(width: 300)
          }
        }
      }
    }
  }
`;
export default IndexPage;

export const Head: HeadFC = () => (
  <title>Home | Money &amp; Money Capital</title>
);
