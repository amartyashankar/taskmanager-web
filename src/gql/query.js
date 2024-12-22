import { gql } from '@apollo/client';

const GET_TASKS = gql`
  query taskFeed($cursor: String) {
    taskFeed(cursor: $cursor) {
      cursor
      hasNextPage
      tasks {
        id
        title
        description
        status
        createdAt
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const GET_TASK = gql`
  query task($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      createdAt
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

const GET_MY_TASKS = gql`
  query me {
    me {
      id
      username
      tasks {
        id
        title
        description
        status
        createdAt
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const GET_MY_FAVORITES = gql`
  query me {
    me {
      id
      username
      favorites {
        id
        title
        description
        status
        createdAt
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const GET_ME = gql`
  query me {
    me {
      id
      username
      avatar
      favorites {
        id
      }
      tasks{
        id
        title
        description
        status
      }
    }
  }
`;

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
const GET_USERS = gql`
  query {
    users {
      id
      username
      email
      avatar
      tasks{
        id
        title
        description
        status
      }
    }
  }
`;
const GET_USER_BY_ID = gql`
  query userById($id: ID!) {
    userById(id: $id) {
      id
      username
      avatar
      tasks {
        id
        title
        description
        status
        createdAt
        favoriteCount
        author {
          username
          id
          avatar
        } 
      }
    }
  }
`;

export {
  GET_TASKS,
  GET_TASK,
  GET_MY_TASKS,
  GET_MY_FAVORITES,
  GET_ME,
  IS_LOGGED_IN,
  GET_USERS,
  GET_USER_BY_ID
};
