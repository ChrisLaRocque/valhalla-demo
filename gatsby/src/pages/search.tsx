import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import "../styles/main.css";
import Layout from "../components/Layout";
import Search from "../components/Search";

const SearchPage: React.FC<PageProps> = ({ data }) => {
  return (
    <Layout>
      <Search />
    </Layout>
  );
};

export default SearchPage;

export const Head: HeadFC = () => (
  <title>Search | Money &amp; Money Capital</title>
);
