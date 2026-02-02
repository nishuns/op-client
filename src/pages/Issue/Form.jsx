import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addIssue } from "../../store/issues/actions";
import Icon from "../../components/Icons";

const IssueForm = (props) => {
  const [isIssueCreated, setIssueCreated] = useState(false);
  const dispatch = useDispatch();
  const [credentials, setCredetials] = useState({
    title: "",
    content: "",
  });

  const [notifier, setNotifier] = useState({
    isVisible: false,
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredetials({ ...credentials, [name]: value });
  };

  const handleClearField = () => {
    for (let each in credentials) {
      setCredetials({ ...credentials, [each]: "" });
    }
  };

  const showNotification = (message) => {
    setNotifier({ isVisible: true, text: message });
    setTimeout(() => {
      setNotifier({ ...notifier, isVisible: false });
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(
      addIssue(credentials.title, credentials.content)
    );
    if (success) {
      setIssueCreated(true);
    } else {
      showNotification("Failed to create issue");
    }
  };
  if (isIssueCreated) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="add-issue-box">
        <form action="#" onSubmit={handleSubmit} className="add-issue-form">
          <Link to="/" className="router-link">
            <button type="button" className="close__button">
              <Icon iconName="cross" styleName="close__icon" />
            </button>
          </Link>
          <h3>Create Issue...</h3>
          <input
            type="text"
            placeholder="Title"
            className="signup-form__input"
            name="title"
            value={credentials.title}
            onChange={handleChange}
          />
          <textarea
            placeholder="Content"
            className="signup-form__input"
            rows="6"
            name="content"
            value={credentials.content}
            onChange={handleChange}
          ></textarea>
          <button className="signup-form__button">Create Issue</button>
          {notifier.isVisible ? (
            <span className="notification">{notifier.text}</span>
          ) : (
            <></>
          )}
        </form>
      </div>
    );
  }
};

export default IssueForm;
