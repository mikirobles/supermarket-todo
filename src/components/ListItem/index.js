import React from 'react';
import './ListItem.css'

const ListItem = ({label, onDelete}) => (
    <li className={'list-item'}>{label}</li>
);

export default ListItem;
