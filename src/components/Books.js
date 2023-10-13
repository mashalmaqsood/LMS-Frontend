import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import InputForm from "./InputForm";
import { Table, Button, Layout } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import StudentForm from "./StudentForm";
import ViewStudent from "./ViewStudent";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editBook, setEditBook] = useState("");
  const [bookAssignmentModalOpen, setBookAssignmentModalOpen] = useState(false);
  const [bookId, setbookId] = useState();
  const [viewData, setViewData] = useState("");
  const [viewModalOpen, setviewModalOpen] = useState(false);
  const { Header } = Layout;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
        const res = await axios.get("http://localhost:5000/books/getBooks");
        setBooks(res.data);
    } catch(error) {
        console.log('Error', error);
    }
  };

  const handleAddBooks = () => {
    setIsModalOpen(true);
    setIsEdit(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/books/updateBook/${editBook.id}`,
          values
        );
      } else {
        await axios.post("http://localhost:5000/books/createBook", values);
        console.log("book created successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.log("Book not created", err);
    }
    getData();
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/books/deleteBook/${bookId}`);
      setBooks((prevBooks) => {
        return prevBooks.filter((book) => book.id !== bookId);
      });
    } catch (err) {
      console.log("error deleting record", err);
    }
  };

  const handleEdit = (data) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setEditBook(data);
  };

  const handleAssign = (data) => {
    setbookId(data.id);
    setBookAssignmentModalOpen(true);
  };

  const handleReturn = async (data) => {
    await axios.put(`http://localhost:5000/books/updateBook/${data.id}`, {
      status: false,
    });
    getData();
  };

  const handleView = (data) => {
    setViewData(data.student);
    setviewModalOpen(true);
  };

  const columns = [
    {
      key: "1",
      title: "Book Name",
      dataIndex: "title",
      render: (text) => <p>{text}</p>,
    },
    {
      key: "2",
      title: "Author",
      dataIndex: "author",
      render: (text) => <p>{text}</p>,
    },
    {
      key: "3",
      title: "Price",
      dataIndex: "price",
      render: (text) => <p>{text}</p>,
    },
    {
      key: "4",
      title: "Language",
      dataIndex: "language",
      render: (text) => <p>{text}</p>,
    },
    {
      key: "5",
      title: "Published Date",
      dataIndex: "published_date",
      render: (text) => <p>{moment(text).format("MMM Do YY")}</p>,
    },
    {
      key: "6",
      title: "Status",
      dataIndex: "actions",
      render: (text, data) => {
        return (
          <>
            {data.status ? (
              <>
                <Button
                  onClick={() => handleReturn(data)}
                  style={{ marginRight: 10 }}
                >
                  Return
                </Button>
                <Button onClick={() => handleView(data)}>View</Button>
              </>
            ) : (
              <Button onClick={() => handleAssign(data)}>Assign</Button>
            )}
          </>
        );
      },
    },
    {
      key: "7",
      title: "Actions",
      dataIndex: "actions",
      render: (_, data) => {
        return (
          <>
            <EditOutlined onClick={() => handleEdit(data)} />
            <DeleteOutlined
              onClick={() => handleDelete(data.id)}
              style={{ color: "red", marginLeft: 10 }}
            />
          </>
        );
      },
    },
  ];
  
  return (
    <div>
      <Layout>
        <Header className="headerStyle">
          Library Management System
          <Button className="btn" type="primary" onClick={handleAddBooks}>
            Insert Books
          </Button>
        </Header>
      </Layout>
      <Table columns={columns} dataSource={books}></Table>
      {isModalOpen && (
        <InputForm
          visible={isModalOpen}
          title={isEdit ? " Edit book" : "Add Books"}
          initialValues={isEdit ? editBook : {}}
          handleFormSubmit={handleFormSubmit}
          handleCancel={() => setIsModalOpen(false)}
        />
      )}
      {bookAssignmentModalOpen && (
        <StudentForm
          visible={bookAssignmentModalOpen}
          bookId={bookId}
          title={"Assign Book"}
          handleCancel={() => setBookAssignmentModalOpen(false)}
          getData={getData}
        />
      )}
      {viewModalOpen && (
        <ViewStudent
          visible={viewModalOpen}
          viewData={viewData}
          handleCancel={() => setviewModalOpen(false)}
          handleOk={() => setviewModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Books;
