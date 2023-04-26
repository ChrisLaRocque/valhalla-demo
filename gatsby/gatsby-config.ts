import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby`,
    siteUrl: `https://valhallademomain.gatsbyjs.io`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://dev-netlify-connect.pantheonsite.io/`,
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-netlify",
  ],
};

export default config;
