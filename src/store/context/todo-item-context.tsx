import { createContext, useEffect, useReducer } from "react";

type TodoItemsContextType = {
  todoItems: initialStateType;
  addItem: (item: string) => void;
  updateTaskStatus: (id: number) => void;
  updateItem: (id: number, item: string) => void;
  deleteItem: (id: number) => void;
};

export const TodoItemsContext = createContext({} as TodoItemsContextType);

type initialStateType = Array<{
  id: number;
  item: string;
  isCompleted: boolean;
}>;

const initialState: initialStateType =
  JSON.parse(localStorage.getItem("todoItems") || '""') || [];

type addAction = {
  type: "ADD_ITEM";
  payload: {
    id: number;
    item: string;
    isCompleted: boolean;
  };
};

type updateAction = {
  type: "UPDATE_ITEM";
  payload: {
    id: number;
    item: string;
  };
};

type deleteAction = {
  type: "DELETE_ITEM";
  payload: {
    id: number;
  };
};

type taskStatusAction = {
  type: "TASK_STATUS";
  payload: {
    id: number;
  };
};

type reducerAction = addAction | updateAction | deleteAction | taskStatusAction;

const todoItemsReducer = (
  currentState: typeof initialState,
  action: reducerAction
) => {
  const newState = currentState;
  switch (action.type) {
    case "ADD_ITEM":
      return [...newState, action.payload];
    case "TASK_STATUS":
      return newState.map((todoItem) =>
        todoItem.id === action.payload.id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem
      );
    case "UPDATE_ITEM":
      return newState.map((todoItem) =>
        todoItem.id === action.payload.id
          ? { ...todoItem, item: action.payload.item }
          : todoItem
      );
    case "DELETE_ITEM":
      return newState.filter((todoItem) => todoItem.id !== action.payload.id);
    /* default:
      return newState; */
  }
  return newState;
};

type TodoItemsContextProviderProps = {
  children: React.ReactNode;
};

const TodoItemsContextProvider = ({
  children,
}: TodoItemsContextProviderProps) => {
  const [todoItems, dispatchTodoItems] = useReducer(
    todoItemsReducer,
    initialState
  );

  const addItem = (item: string) => {
    const addItemAction: addAction = {
      type: "ADD_ITEM",
      payload: {
        id: Date.now(),
        item: item,
        isCompleted: false,
      },
    };
    dispatchTodoItems(addItemAction);
  };

  const updateTaskStatus = (id: number) => {
    const TaskStatusAction: taskStatusAction = {
      type: "TASK_STATUS",
      payload: {
        id: id,
      },
    };
    dispatchTodoItems(TaskStatusAction);
  };

  const updateItem = (id: number, item: string) => {
    const updateItemAction: updateAction = {
      type: "UPDATE_ITEM",
      payload: {
        id: id,
        item: item,
      },
    };
    dispatchTodoItems(updateItemAction);
  };

  const deleteItem = (id: number) => {
    const deleteItemAction: deleteAction = {
      type: "DELETE_ITEM",
      payload: {
        id: id,
      },
    };
    dispatchTodoItems(deleteItemAction);
  };

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems: todoItems,
        addItem: addItem,
        updateTaskStatus: updateTaskStatus,
        updateItem: updateItem,
        deleteItem: deleteItem,
      }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
