import React from "react";
import api from "./api";
import "./App.css";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

class App extends React.Component {
  state = {
    isEditing: false,
    initialLoad: true,
    error: null,
    items: []
  };
  

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = async () => {
    try {
      const items = await api.fetchItems();
      this.setState({
        items,
        initialLoad: false
      });
    } catch (e) {
      this.setState({
        error: "An error has occurred while fetching the items.",
        initialLoad: false
      });
    }
  };

  switchModal = () => {
    this.setState(({ isEditing }) => ({
      isEditing: !isEditing
    }));
  };

  addItem = async item => {
    const { items } = this.state;
    try {
      this.setState({
        items: [...items, item],
        isEditing: false
      });
      const newItems = await api.addItem(item);
      this.setState({
        items: newItems
      });
    } catch (e) {
      this.setState({
        items
      });
    }
  };

  removeItem = async item => {
    const { items } = this.state;
    if (typeof item.id === "undefined") {
      return;
    }
    try {
      this.setState({
        items: [...items].filter(({ id }) => id !== item.id)
      });
      api.removeItem(item);
    } catch (e) {
      this.setState({
        items
      });
    }
  };

  render() {
    const { items, error, isEditing, initialLoad } = this.state;
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
                disabled={typeof id === "undefined"}
                onDelete={() => this.removeItem({ name, id })}
              />
            ))}
          </ul>
          <button
            autoFocus
            onClick={this.switchModal}
            className={"btn primary add-item"}
          >
            Add item
          </button>
          {error && <strong>{error}</strong>}
          {isEditing && (
            <AddItem onCancel={this.switchModal} onSubmit={this.addItem} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
