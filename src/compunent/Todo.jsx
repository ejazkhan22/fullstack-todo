import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Todo = ({ text, handelEdit, handelDelete }) => {
  return (
    <div className="todo">
      <div className="text">{typeof text === 'string' ? text : text.text}</div>
      <div className="icons">
        <CiEdit className="icon" onClick={handelEdit} />
        <MdDelete className="icon" onClick={handelDelete} />
      </div>
    </div>
  );
};

export default Todo;
