import React, {useState} from "react";
import PropTypes from "prop-types";
import "./AddItem.css";

function AddItem({onSubmit, onCancel}) {
  const [inputValue, setInputValue] = useState("");

  const submit = e => {
    e.preventDefault();
    onSubmit({name: inputValue});
  };

  const onChange = ({ target: { value } }) => setInputValue(value);

  return (
    <div className={"modal"}>
      <div className="modal-container">
        <form onSubmit={submit}>
          <h3>Add item</h3>
          <input
            autoFocus
            value={inputValue}
            onChange={onChange}
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

AddItem.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AddItem;
