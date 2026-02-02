import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icons";
import { useSelector, useDispatch } from "react-redux";
import { submitOpinion } from "../../store/issues/actions";

const Issue = ({ hash, issue }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const [responses, setResponses] = useState({
    userResponse: "",
    likes: 0,
    dislikes: 0,
  });

  if (!issue) return null;

  useEffect(() => {
    if (isAuth) {
      if (issue && issue.opinions && issue.opinions.length > 0) {
        const userId = JSON.parse(localStorage.getItem("userData"))._id;
        // console.log(userId);
        const userResponse = issue.opinions.filter(
          (each) => each.userId === userId
        );
        if (userResponse.length > 0) {
          setResponses({
            ...responses,
            userResponse: userResponse[0].opinion,
          });
        }
      }
    } else {
      setResponses({
        ...responses,
        userResponse: "",
      });
    }
    // eslint-disable-next-line
  }, [isAuth]);

  const getUserResponse = () => {
    const userOpinion = issue.opinions.filter(
      (each) => each.userId === JSON.parse(localStorage.getItem("userData"))._id
    );
    if (userOpinion.length > 0) {
      return userOpinion[0].opinion;
    } else {
      return "";
    }
  };

  //handle response
  const handleResponse = (response) => {
    // ..do something
    dispatch(submitOpinion(issue._id, response));
  };

  const formatLikeclassName = () => {
    // console.log("userResponse", getUserResponse());
    const plainStyle = "issue__response";
    return isAuth
      ? getUserResponse() === "like"
        ? `${plainStyle} active`
        : `${plainStyle}`
      : `${plainStyle}`;
  };

  // format dislike classNameName
  const formatDislikeclassName = () => {
    const plainStyle = "issue__response";
    return isAuth
      ? getUserResponse() === "dislike"
        ? `${plainStyle} active`
        : `${plainStyle}`
      : `${plainStyle}`;
  };

  // handle Like Count
  const handleOpinionCount = (response) => {
    if (issue && issue.opinions && issue.opinions.length > 0) {
      if (response === "like") {
        const count = issue.opinions.filter((each) => each.opinion === "like");
        return count.length;
      } else {
        const count = issue.opinions.filter(
          (each) => each.opinion === "dislike"
        );
        return count.length;
      }
    } else {
      return 0;
    }
  };

  return (
    <li className="issue">
      <div className="issue__header">
        <h3 className="issue__title">
          <span className="issue__title--hash">#{hash} </span>
          <span className="issue__title--text">{issue.title}</span>
        </h3>
        <button className="issue__edit">
          <Icon iconName="pencil" styleName={"issue__edit-icon"} />
        </button>
      </div>
      <div className="issue__body">
        <p className="issue__content">{issue.content}</p>
        <form action="#" className="issue__response-box">
          <span className="issue__response-count">
            {handleOpinionCount("like")}
          </span>
          {isAuth ? (
            <button
              className={formatLikeclassName()}
              type="button"
              onClick={() => handleResponse("like")}
            >
              <Icon iconName="thumbs-up" styleName={"issue__response-icon"} />
              <span className="issue__response-text">Like</span>
            </button>
          ) : (
            <Link to="/login" className="router-link">
              <button className={formatLikeclassName()} type="button">
                <Icon iconName="thumbs-up" styleName={"issue__response-icon"} />
                <span className="issue__response-text">Like</span>
              </button>
            </Link>
          )}
          <span className="issue__response-count">
            {handleOpinionCount("dislike")}
          </span>
          {isAuth ? (
            <button
              type="button"
              className={formatDislikeclassName()}
              onClick={() => handleResponse("dislike")}
            >
              <Icon iconName="thumbs-down" styleName={"issue__response-icon"} />
              <span className="issue_response-text">Dislike</span>
            </button>
          ) : (
            <Link to="/login" className="router-link">
              <button type="button" className={formatDislikeclassName()}>
                <Icon
                  iconName="thumbs-down"
                  styleName={"issue__response-icon"}
                />
                <span className="issue_response-text">Dislike</span>
              </button>
            </Link>
          )}
        </form>
      </div>
    </li>
  );
};

export default Issue;
