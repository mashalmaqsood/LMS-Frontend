import React, { useEffect } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
const InputForm = (props) => {
  const { initialValues } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (initialValues) {
      const { title, author, price, language, status } = initialValues;
      form.setFieldValue("title", title);
      form.setFieldValue("author", author);
      form.setFieldValue("price", price);
      form.setFieldValue("language", language);
      form.setFieldValue("status", status);
    }
  });

  return (
    <div>
      <Modal
        title={props.title}
        open={props.visible}
        onCancel={props.handleCancel}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          onFinish={props.handleFormSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please enter the author" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Language"
            name="language"
            rules={[{ required: true, message: "Please select the language" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Published Date"
            name="published_date"
            rules={[
              { required: true, message: "Please select the published date" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status" }]}
          >
            <Select>
              <Select.Option value={true}>Assigned</Select.Option>
              <Select.Option value={false}>Not Assigned</Select.Option>
            </Select>
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

export default InputForm;
