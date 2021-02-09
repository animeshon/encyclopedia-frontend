import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

export const getSummary = () => gql`
  query details($id: String!) {
    result : getManga(id:$id) {
      id
      ...GenericNames
      ...GenericDescriptions
      starring(first: 5, filter: {relation: {eq: MAIN}}) {
        character {
          ... on Character {
            id
            ...GenericProfileImage
            ...GenericNames
          }
        }
      }
      ...AgeRatingFull
      ...RestrictionFull
      type
      chapters(filter: {type: {eq: REGULAR}}) {
        id
      }
      volumes {
        id
      }
      # status
      genres {
        names {
          ...TextWithLocalization
        }
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
      partOfCanonicals {
        partOfUniverses {
          id
          ...GenericNames
        }
        contents {
          __typename
          ... on Doujinshi {
            id
          }
          ... on Manga {
            id
          }
          ... on LightNovel {
            id
          }
          ... on VisualNovel {
            id
          }
        }
        ...GenericNames
        ...GenericProfileImage
      }
      crossrefs {
        externalID
        namespace
        website {
          formattedAddress
        }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withRestrictionFull}
  ${Core.Fragments.withAgeRatingFull}
  ${Core.Fragments.textWithLocalization}
`;

export default getSummary;
