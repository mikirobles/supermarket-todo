import React from "react";
import PropTypes from "prop-types";
import "./AddItem.css";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      inputValue: ""
    };
  }

  componentDidMount() {
    this.inputRef.current.focus();
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
          <form onSubmit={this.handleSubmit}>
            <h3>Add item</h3>
            <input
              ref={this.inputRef}
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
                onClick={this.onSubmit}
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
