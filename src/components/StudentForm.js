import React from "react";
import { Modal, Form, DatePicker, Input, Button } from "antd";
import axios from "axios";

const StudentForm = (props) => {
  const [form] = Form.useForm();
  const handleAssignBook = async (values) => {
    values.bookId = props.bookId;
    try {
      await axios.post("http://localhost:5000/students/createStudent", values);
      await axios.put(`http://localhost:5000/books/updateBook/${values.bookId}`,
        { status: true }
      );
      props.handleCancel();
      props.getData();
    } catch(err) {
      console.log("Student not created", err);
    }
  };

  return (
    <div>
      <Modal
        title="Assign book"
        open={props.visible}
        onCancel={props.handleCancel}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          onFinish={handleAssignBook}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Semester"
            name="semester"
            rules={[{ required: true, message: "Please enter the semester" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Issue date"
            name="issue_date"
            rules={[
              { required: true, message: "Please select the issue date" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Return date"
            name="return_date"
            rules={[
              { required: true, message: "Please select the return date" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentForm;
