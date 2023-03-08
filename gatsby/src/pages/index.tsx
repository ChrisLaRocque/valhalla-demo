import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import "../styles/main.css";
import Hero from "../components/Hero";
import Companies from "../components/Companies";

const IndexPage: React.FC<PageProps<Queries.HomepageQuery>> = ({ data }) => {
  const {
    allContentfulCompany: { nodes },
  } = data;
  return (
    <main id="main">
      <Hero />
      <Companies companies={nodes} />
    </main>
  );
};

export const query = graphql`
  fragment CompanyInfo on ContentfulCompany {
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
  query Homepage {
    allContentfulCompany {
      nodes {
        ...CompanyInfo
      }
    }
  }
`;
export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
