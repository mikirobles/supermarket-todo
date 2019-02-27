import React from "react";
import PropTypes from "prop-types";
import "./ListItem.css";
import Trash from "../../trash.svg";

const ListItem = ({label, onDelete, disabled}) => (
  <li className={"list-item"}>
    <span>{label}</span>
    <button onClick={onDelete} disabled={disabled} className="delete">
      <img src={Trash} alt=""/>
    </button>
  </li>
);

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

ListItem.defaultProps = {
  disabled: true
};

export default ListItem;
