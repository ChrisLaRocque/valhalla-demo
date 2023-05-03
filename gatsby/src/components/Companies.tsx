import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Logo from "../components/Logo";

export default function Companies({ companies }) {
  return (
    <section>
      <div className="content">
        <div className="heder-wrapper flex justify-between border-b-2 border-black">
          <h2 className="">Companies</h2>
          {/* <Logo and="contentful" /> */}
        </div>

        {/* <p>
          We take pride in identifying and investing in the most innovative
          startups across a range of industries, from tech to healthcare to
          sustainability and beyond.
        </p> */}
        <div className="company-row">
          {companies.map(
            ({
              id,
              name,
              description,
              person,
              slug,
            }: Queries.ContentfulCompany) => {
              return (
                <div className="company pt-5 pb-7 lg:flex" key={id}>
                  <div className="company-info p-5 lg:w-[50%] lg:p-0 lg:pr-5">
                    <h3>{name}</h3>
                    <p style={{ marginTop: "0" }}>{description?.description}</p>
                    <Link
                      to={`/companies/${slug}/`}
                      className="my-4 inline-block border-2 border-black p-2 text-lg font-bold tracking-tight hover:bg-black hover:text-white"
                    >
                      Learn more
                    </Link>
                  </div>
                  {person && (
                    <div className="people p-5 lg:w-[50%] lg:p-0">
                      {person.map(
                        ({ id, firstName, lastName, role, headshot }) => {
                          return (
                            <div
                              className="person mb-4 flex  justify-between"
                              key={id}
                            >
                              <div className="person-text p-4">
                                <h4 className="">{`${firstName} ${lastName}`}</h4>
                                <p className="">{role}</p>
                              </div>

                              <GatsbyImage
                                image={headshot.gatsbyImageData}
                                alt={headshot.title}
                                className="w-[33%]"
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
