import { gql } from '@apollo/client';

const NEW_TASK = gql`
  mutation newTask($title: String!, $description: String, $status: String!) {
    newTask(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const EDIT_TASK = gql`
  mutation updateTask($id: ID!, $status: String!) {
    updateTask(id: $id, status: $status) {
      id
      title
      description
      status
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`;

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;
const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export {
  NEW_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_FAVORITE,
  SIGNIN_USER,
  SIGNUP_USER,
  DELETE_USER
};
