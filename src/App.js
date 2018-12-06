import React, { Component } from "react";
import api from "./api";
import "./App.css";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

class App extends Component {
  constructor () {
    super();
    this.fetchQueue = [];
    this.addItemButton = React.createRef();
    this.state = {
      isEditing: false,
      error: null,
      items: [],
    };
  }

  componentWillMount () {
    this.fetchItems();
  }

  componentDidMount () {
    this.addItemButton.current.focus();
  }

  fetchItems = async () => {
    try {
      const items = await api.fetchItems();
      this.setState({
        items,
      });
    } catch (e) {
      console.error(e);
      this.setState({
        error: "An error has occurred while fetching the items.",
      });
    }
  };

  switchModal = () => {
    this.setState(({isEditing}) => ({
      isEditing: !isEditing,
    }));
  };

  addItem = async newItem => {
    const {items} = this.state;
    try {
      this.setState({
        items: [...items, newItem],
        isEditing: false,
      });
      this.fetchQueue.push('add item');
      const newItems = await api.addItem(newItem);
      if (this.fetchQueue.length === 1) {
        this.setState({
          items: newItems,
        });
      }
    } catch (e) {
      console.error(e);
      this.setState({
        items,
      });
    }
    this.fetchQueue.pop();
  };

  removeItem = async item => {
    const {items} = this.state;
    if (typeof item.id === "undefined") {
      return;
    }
    try {
      this.setState({
        items: [...items].filter(({id}) => id !== item.id)
      });
      this.fetchQueue.push('remove item');
      const newItems = await api.removeItem(item);
      if (this.fetchQueue.length === 1) {
        this.setState({
          items: newItems,
        });
      }
    } catch (e) {
      console.error(e);
      this.setState({
        items,
      });
    }
    this.fetchQueue.pop()
  };

  render () {
    const {items, error, isEditing} = this.state;
    return (
      <div className="App">
        <div className="container">
          <h1>Supermarket List</h1>
          {items.length ? (
            <span className={"item-count"}>{items.length} items</span>
          ) : <span className={"item-count"}>List is empty</span>}
          <ul className={"list"}>
            {items.map(({name, id}, index) => (
              <ListItem
                key={id || name + index}
                label={name}
                disabled={typeof id === "undefined"}
                onDelete={() => this.removeItem({name, id})}
              />
            ))}
          </ul>
          <button ref={this.addItemButton} onClick={this.switchModal}
                  className={"btn primary add-item"}>
            Add item
          </button>
          {error && <strong>{error}</strong>}
          {isEditing && (
            <AddItem onCancel={this.switchModal} onSubmit={this.addItem}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
