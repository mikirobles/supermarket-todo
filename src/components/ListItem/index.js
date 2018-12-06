import React from "react";
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

export default ListItem;
