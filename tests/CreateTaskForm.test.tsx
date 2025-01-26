import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskManagement from '../components/todos/todoList';
import { useTodos } from '../hooks/useTodos';
import '@testing-library/jest-dom';

jest.mock('../hooks/useTodos', () => ({
  useTodos: jest.fn(),
}));

describe('TaskManagement', () => {
  beforeEach(() => {
    (useTodos as jest.Mock).mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      fetchTodos: jest.fn(),
      addTodo: jest.fn(),
      removeTodo: jest.fn(),
      updateTodo: jest.fn(),
      alert: { message: '', severity: '', open: false },
      closeAlert: jest.fn(),
    });
  });

  test('should render the form correctly with required fields', () => {
    render(<TaskManagement />);

    const input = screen.getByLabelText(/new task/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).toBeInTheDocument();
  });

  test('should add a task when the button is clicked', async () => {
    const addTodoMock = jest.fn();
    (useTodos as jest.Mock).mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      fetchTodos: jest.fn(),
      addTodo: addTodoMock,
      removeTodo: jest.fn(),
      updateTodo: jest.fn(),
      alert: { message: '', severity: '', open: false },
      closeAlert: jest.fn(),
    });

    render(<TaskManagement />);

    const input = screen.getByLabelText(/new task/i);
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(button);

    await waitFor(() => expect(addTodoMock).toHaveBeenCalledWith('New task'));
  });
});