import React, { useState, useEffect } from "react";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

export default function Projects() {
  const [repo, setrepo] = useState([]);

  useEffect(() => {
    getRepoData();
  }, []);

  function getRepoData() {
    const client = new ApolloClient({
      uri: "https://api.github.com/graphql",
      request: operation => {
        operation.setContext({
          headers: {
            authorization: "Bearer 689d60cfaaae01925c155d423d80f80d04618dbd"
          }
        });
      }
    });

    client
      .query({
        query: gql`
          {
            repositoryOwner(login: "saadpasta") {
              ... on User {
                pinnedRepositories(first: 6) {
                  edges {
                    node {
                      name
                      description
                      forkCount
                      stargazers {
                        totalCount
                      }
                      url
                    }
                  }
                }
              }
            }
          }
        `
      })
      .then(result => {
        setrepoFunction(result.data.repositoryOwner.pinnedRepositories.edges);
        console.log(result);
      });
  }

  function setrepoFunction(array) {
    setrepo(array);
  }

  return (
    <div>
      {repo.map((v, i) => {
        return <p>{v.node.description}</p>;
      })}
    </div>
  );
}
