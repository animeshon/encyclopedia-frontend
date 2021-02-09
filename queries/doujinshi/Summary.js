import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'
import Core from '@/queries/Core'

export const getSummary = () => gql`
  query details($id: String!) {
      result : getDoujinshi(id:$id) {
      id
      ...GenericNames
      ...GenericDescriptions
      starring(first: 5, filter: {relation: {eq: MAIN}}) {
        character {
          ... on Character {
            id
            ...GenericNames
            ...GenericDescriptions
          }
        }
      }
      type
      ...RestrictionFull
      ...AgeRatingFull
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
  ${Core.Fragments.withAgeRatingFull}
  ${Core.Fragments.withRestrictionFull}
  ${Core.Fragments.textWithLocalization}
`;

export default getSummary;
