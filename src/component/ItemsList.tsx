import { useContext } from "react";
import { TodoItemsContext } from "../store/context/todo-item-context";
import Item from "./Item";

const ItemsList = () => {
  const { todoItems } = useContext(TodoItemsContext);
  return (
    <>
      {todoItems.map((todoItem) => (
        <Item key={todoItem.id} todoItem={todoItem}></Item>
      ))}
    </>
  );
};

export default ItemsList;
