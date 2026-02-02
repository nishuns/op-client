import React from "react";
import { useForm } from "react-hook-form";
import Icon from "../../components/Icons";
import store from "../../redux/store";

const Search = (props) => {
  const { register, handleSubmit } = useForm();
  const backup = store.getState().issues;

  const handleSearchEvent = (data) => {
    const val = data.search.toLowerCase();

    if (val.length > 0) {
      const updatedIssues = store
        .getState()
        .backup.filter(
          (each) =>
            each.title.toLowerCase().includes(val) ||
            each.content.toLowerCase().includes(val)
        );
      console.log(updatedIssues);
      store.dispatch({
        type: "FILTER_ISSUES",
        payloads: { issues: updatedIssues },
      });
    } else {
      console.log("backup", backup);
      store.dispatch({
        type: "FILTER_ISSUES",
        payloads: {
          issues: store.getState().backup,
        },
      });
    }
  };
  return (
    <form action="#" className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Search your Issue"
        {...register("search")}
        onKeyUp={handleSubmit(handleSearchEvent)}
      />
      <button className="search__button">
        <Icon iconName="magnifying-glass" styleName="search__icon" />
      </button>
    </form>
  );
};

export default Search;
