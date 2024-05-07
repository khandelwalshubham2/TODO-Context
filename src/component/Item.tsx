import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import { TodoItemsContext } from "../store/context/todo-item-context";

type ItemProps = {
  todoItem: { item: string; id: number; isCompleted: boolean };
};

const Item = ({ todoItem }: ItemProps) => {
  const [item, setItem] = useState(todoItem.item);
  const [editItem, setEditItem] = useState(false);
  const { updateTaskStatus, updateItem, deleteItem } =
    useContext(TodoItemsContext);
  const itemElement = useRef<HTMLInputElement>(null);

  const updateTask = () => {
    updateTaskStatus(todoItem.id);
    //console.log(todoItem);
  };

  const update = () => {
    updateItem(todoItem.id, item);
    setEditItem(false);
  };

  const removeItem = () => {
    deleteItem(todoItem.id);
  };

  return (
    <div className="item-box">
      <input
        type="checkbox"
        className="control-check"
        checked={todoItem.isCompleted}
        onChange={updateTask}
      />
      <input
        type="text"
        className={`list-input ${todoItem.isCompleted ? "line-cut" : ""}`}
        readOnly={!editItem}
        value={item}
        ref={itemElement}
        onChange={(e) => setItem(e.target.value)}
      />
      {todoItem.isCompleted ? (
        ""
      ) : editItem ? (
        <FaRegSave
          onClick={update}
          className={`icon-size ${
            todoItem.isCompleted ? "not-allowed" : "pointer"
          }`}
        ></FaRegSave>
      ) : (
        <MdModeEdit
          onClick={() => {
            setEditItem(true);
            itemElement.current?.focus();
          }}
          className={`icon-size ${
            todoItem.isCompleted ? "not-allowed" : "pointer"
          }`}
        ></MdModeEdit>
      )}
      <MdDelete className="icon-size pointer" onClick={removeItem}></MdDelete>
    </div>
  );
};

export default Item;
