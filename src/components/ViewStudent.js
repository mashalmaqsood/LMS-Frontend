import React from "react";
import Modal from "antd/es/modal/Modal";
import moment from "moment";
const ViewStudent = (props) => {
  const { name, email, semester, issue_date, return_date } = props.viewData;
  const issueDate = moment(issue_date).format("MMM Do YY");
  const returnDate = moment(return_date).format("MMM Do YY");
  return (
    <div>
      <Modal
        title="Student Details"
        open={props.visible}
        onCancel={props.handleCancel}
        onOk={props.handleOk}
      >
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <p>Semester : {semester}</p>
        <p>Issue Date : {issueDate}</p>
        <p>Return Date : {returnDate} </p>
      </Modal>
    </div>
  );
};

export default ViewStudent;
