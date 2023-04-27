import React from "react";
import { graphql, HeadFC } from "gatsby";
import Layout from "../../components/Layout";
import Companies from "../../components/Companies";

export default function CompaniesListPage({ data }) {
  const {
    allContentfulCompany: { nodes },
  } = data;
  return (
    <Layout>
      <Companies companies={nodes} />
    </Layout>
  );
}
export const Head: HeadFC = (props) => {
  return <title>{`Companies | Money &amp; Money Capital`}</title>;
};

export const query = graphql`
  query CompaniesList {
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
