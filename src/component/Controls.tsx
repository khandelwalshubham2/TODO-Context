import { useContext, useRef } from "react";
import { TodoItemsContext } from "../store/context/todo-item-context";

const Controls = () => {
  const { addItem } = useContext(TodoItemsContext);
  const inputElement = useRef<HTMLInputElement>(null);
  const AddItem = () => {
    if (inputElement.current && inputElement.current.value) {
      addItem(inputElement.current.value);
      inputElement.current.value = "";
    }
  };

  return (
    <div className="controls">
      <input type="text" className="input-control" ref={inputElement}></input>
      <button type="button" className="add-button pointer" onClick={AddItem}>
        Add
      </button>
    </div>
  );
};

export default Controls;
