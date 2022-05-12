import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import {
  Home,
  FeaturedPlayListOutlined,
  AssignmentTurnedInOutlined,
  PeopleAltOutlined,
  NotificationsOutlined,
  Search,
  ExpandMore,
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar, Button, Input } from "@material-ui/core";
import "./css/QuoraHeader.css";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";

function QuoraHeader() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const Close = <CloseIcon />;

  const handleSubmit = async () => {
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user,
      };
      await axios
        .post(`/api/questions`, body, config)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
          alert("Error in adding question");
        });
    }
  };
  const handleLogout = () => {
    if (window.confirm(`Are you sure to logout?`)) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          console.log(`Logged Out`);
        })
        .catch(() => {
          console.log(`Error in logging out`);
        });
    }
  };
  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <Home />
          </div>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlined />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlined />
          </div>
          <div className="qHeader__input">
            <Search />
            <input type="text" placeholder="Search question" />
          </div>
          <div className="qHeader__Rem">
            <span onClick={handleLogout}>
              <Avatar src={user?.photo} />
            </span>
            <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
            <Modal
              open={isModalOpen}
              closeIcon={Close}
              onClose={() => setIsModalOpen(false)}
              closeOnEsc
              center
              closeOnOverlayClick={false}
              styles={{
                overlay: {
                  height: "auto",
                },
              }}
            >
              <div className="modal__title">
                <h5>Add Question</h5>
                <h5>Share Link</h5>
              </div>
              <div className="modal__info">
                <Avatar src={user?.photo} className="avatar" />
                <div className="modal__scope">
                  <PeopleAltOutlined />
                  <p>Public</p>
                  <ExpandMore />
                </div>
              </div>
              <div className="modal__Field">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type="text"
                  placeholder="Start your question with 'What', 'How', 'Why' etc."
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <input
                    style={{
                      margin: "5px 0",
                      border: "1px solid lightgray",
                      padding: "10px",
                      outline: "2px solid #000",
                    }}
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    type="text"
                    placeholder="Optional: Include a link that gives context"
                  />
                  {inputUrl !== "" && (
                    <img
                      style={{
                        height: "40vh",
                        objectFit: "contain",
                      }}
                      src={inputUrl}
                      alt="displayimage"
                    />
                  )}
                </div>
              </div>
              <div className="modal__buttons">
                <button
                  className="cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button onClick={handleSubmit} type="submit" className="add">
                  Add Question
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoraHeader;
