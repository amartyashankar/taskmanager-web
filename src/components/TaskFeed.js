import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Task from './Task';
const TaskWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;



const TaskFeed = ({ tasks }) => {
  return (
    <div className="task-feed">
      {tasks.map(task => (
        <TaskWrapper key={task.id}>
          <Task task={task} />
          <Link to={`/task/${task.id}`}>Permalink</Link>
        </TaskWrapper>
      ))}
    </div>
  );
};

export default TaskFeed;
