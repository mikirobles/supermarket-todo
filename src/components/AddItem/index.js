import React from "react";
import PropTypes from "prop-types";
import "./AddItem.css";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { inputValue } = this.state;
    onSubmit({name: inputValue});
  };

  onChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value
    });
  };

  render() {
    const { onCancel } = this.props;
    const { inputValue } = this.state;
    return (
      <div className={"modal"}>
        <div className="modal-container">
          <form onSubmit={this.onSubmit}>
            <h3>Add item</h3>
            <input
              autoFocus
              value={inputValue}
              onChange={this.onChange}
              type="text"
            />
            <div className="button-row">
              <button type="button" onClick={onCancel} className={"btn secondary"}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={inputValue.length === 0}
                className={"btn primary"}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddItem.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AddItem;
