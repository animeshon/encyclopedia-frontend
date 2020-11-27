import gql from 'graphql-tag';

export const getTypedStaff = () => gql`
  query details($id: String!) {
    result : getVisualNovel(id:$id) {
      id
      staff @cascade {
        id
        role  {
          ...on TypedRole {
            id
            type
          }
        }
      }
    }
  }`;