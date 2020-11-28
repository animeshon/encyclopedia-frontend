import gql from 'graphql-tag';

const getCollaboration = () => gql`
query details($id: String!, $collaborator: Boolean!, $content: Boolean!) {
  result: getCollaboration(id: $id) {
    id
    role {
      ... on TypedRole {
        id
        type
      }
      ... on FreeTextRole {
        id
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
    }
    localization {
      language {
        code
      }
      script {
        code
      }
    }
    collaborator @include(if: $collaborator) {
      __typename
      ... on Circle {
        images {
          type
          image {
            files {
              publicUri
            }
          }
          ageRatings {
            age
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on Organization {
        images {
          type
          image {
            files {
              publicUri
            }
          }
          ageRatings {
            age
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on Person {
        images {
          type
          image {
            files {
              publicUri
            }
          }
          ageRatings {
            age
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on Magazine {
        images {
          type
          image {
            files {
              publicUri
            }
          }
          ageRatings {
            age
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
    }
    content @include(if: $content) {
      __typename
      __typename
      ... on Anime {
        id
        status
        ageRatings {
          age
        }
        runnings {
          localization {
            country {
              code
            }
          }
          from
          to
        }
        images {
          type
          image {
            files {
              format
              publicUri
            }
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on Manga {
        id
        status
        ageRatings {
          age
        }
        runnings {
          localization {
            country {
              code
            }
          }
          from
          to
        }
        images {
          type
          image {
            files {
              format
              publicUri
            }
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on Doujinshi {
        id
        status
        ageRatings {
          age
        }
        runnings {
          localization {
            country {
              code
            }
          }
          from
          to
        }
        images {
          type
          image {
            files {
              format
              publicUri
            }
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on LightNovel {
        id
        status
        ageRatings {
          age
        }
        runnings {
          localization {
            country {
              code
            }
          }
          from
          to
        }
        images {
          type
          image {
            files {
              format
              publicUri
            }
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on VisualNovel {
        id
        ageRatings {
          age
        }
        images {
          type
          image {
            files {
              format
              publicUri
            }
          }
        }
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
    }
  }
}
`;

export default getCollaboration;