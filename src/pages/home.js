import React from 'react';
import { useQuery } from '@apollo/client';

import TaskFeed from '../components/TaskFeed';
import Button from '../components/Button';
import { GET_TASKS } from '../gql/query';

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_TASKS, {
    variables: { cursor: null }, // Start with null for the first page
    notifyOnNetworkStatusChange: true, // Ensures fetchMore updates the UI
  });

  if (loading && !data) return <p>Loading...</p>;
  if (error) {
    return <p>Error! {"Unable to load notes."}</p>;
  }

  const handleLoadMore = () => {
    if (data.taskFeed.hasNextPage) {
      fetchMore({
        variables: { cursor: data.taskFeed.cursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          return {
            taskFeed: {
              cursor: fetchMoreResult.taskFeed.cursor,
              hasNextPage: fetchMoreResult.taskFeed.hasNextPage,
              tasks: [
                ...previousResult.taskFeed.tasks,
                ...fetchMoreResult.taskFeed.tasks,
              ],
              __typename: previousResult.taskFeed.__typename,
            },
          };
        },
      });
    }
  };

  return (
    <React.Fragment>
      <TaskFeed tasks={data.taskFeed.tasks} />
      {data.taskFeed.hasNextPage && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
    </React.Fragment>
  );
};

export default Home;