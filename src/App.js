import React, {useState, useEffect} from "react";
import api from "./api";
import "./App.css";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setFetching(true);
      const items = await api.fetchItems();
      setItems(items);
    } catch (e) {
      setError("An error has occurred while fetching the items.");
    }
    setFetching(false);
    setInitialLoad(false);
  };

  const switchModal = () => {
    setIsEditing(!isEditing);
  };

  const addItem = async item => {
    setIsEditing(false);
    const oldItems = [...items];
    if (fetching) return;
    setFetching(true);
    try {
      setItems([...items, item]);
      const newItems = await api.addItem(item);
      setItems(newItems);
    } catch (e) {
      setItems(oldItems);
    }
    setFetching(false);
  };

  const removeItem = async item => {
    if (fetching || typeof item.id === "undefined") {
      return;
    }
    const oldItems = [...items];
    setFetching(true);
    try {
      setItems([...items].filter(({ id }) => id !== item.id));
      api.removeItem(item);
    } catch (e) {
      setItems(oldItems);
    }
    setFetching(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Supermarket List</h1>
        {items.length ? (
          <span className={"item-count"}>{items.length} items</span>
        ) : initialLoad ? (
          <span className={"item-count"}>Loading...</span>
        ) : (
          <span className={"item-count"}>List is empty</span>
        )}
        <ul className={"list"}>
          {items.map(({ name, id }, index) => (
            <ListItem
              key={id || name + index}
              label={name}
              disabled={typeof id === "undefined" || fetching}
              onDelete={() => removeItem({ name, id })}
            />
          ))}
        </ul>
        <button
          autoFocus
          onClick={switchModal}
          className={"btn primary add-item"}
        >
          Add item
        </button>
        {error && <strong>{error}</strong>}
        {isEditing && !error && (
          <AddItem onCancel={switchModal} onSubmit={addItem} />
        )}
      </div>
    </div>
  );
}

export default App;
