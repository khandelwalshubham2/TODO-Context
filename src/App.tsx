import "./App.css";
import Controls from "./component/Controls";
import Heading from "./component/Heading";
import ItemsList from "./component/ItemsList";
import TodoItemsContextProvider from "./store/context/todo-item-context";

function App() {
  return (
    <TodoItemsContextProvider>
      <div className="container list-container">
        <Heading></Heading>
        <Controls></Controls>
        <ItemsList></ItemsList>
      </div>
    </TodoItemsContextProvider>
  );
}

export default App;
