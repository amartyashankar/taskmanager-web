import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 20%;
`;

const TaskForm = ({ type, action, task = {} }) => {
  // Set default state for the form
  const [value, setValue] = useState({
    title: task.title || '',
    description: task.description || '',
    status: task.status || '',
  });

  // Update the state when a user types in the form
  const onChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Wrapper>
      <Form
        onSubmit={(e) => {
        e.preventDefault();
        if (type === 'edit') {
        action({
        variables: { id: task.id, status: value.status },
        });
        } else {
        action({
        variables: { ...value },
        });
      }
    }}
    >
        {/* Show title and description fields only in "new" mode */}
        {type === 'new' && (
          <>
            <Input
              required
              type="text"
              name="title"
              placeholder="Task title"
              value={value.title}
              onChange={onChange}
            />
            <Input
              required
              type="text"
              name="description"
              placeholder="Task description"
              value={value.description}
              onChange={onChange}
            />
          </>
        )}

        {/* Status field is always shown */}
        <TextArea
          required
          type="text"
          name="status"
          placeholder="Task status"
          value={value.status}
          onChange={onChange}
        />
        <Button type="submit">{type === 'edit' ? 'Update' : 'Create'}</Button>
      </Form>
    </Wrapper>
  );
};

export default TaskForm;
