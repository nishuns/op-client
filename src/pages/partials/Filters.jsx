import React from "react";

const Filter = (props) => {
   // const handleFeaturedFilter
   const handleFeaturedFilter = (e) => {
      e.preventDefault();
      const sortMethod = (a, b) => b.opinions.length - a.opinions.length;
      const filteredIssues = props.issues.sort(sortMethod);
      console.log(filteredIssues);
      props.handleIssues([]);
      setTimeout(() => {
         props.handleIssues(filteredIssues);
      }, 1);
   };

   // const handleNewestFilter
   const handleNewestFilter = (e) => {
      e.preventDefault();
      const sortMethod = (a, b) =>
         new Date(b.createdAt) - new Date(a.createdAt);
      const filteredIssues = props.issues.sort(sortMethod);
      console.log(filteredIssues);
      props.handleIssues([]);
      setTimeout(() => {
         props.handleIssues(filteredIssues);
      }, 1);
   };

   // const handleOldestFilter
   const handleOldestFilter = (e) => {
      e.preventDefault();
      const sortMethod = (a, b) =>
         new Date(a.createdAt) - new Date(b.createdAt);
      const filteredIssues = props.issues.sort(sortMethod);
      console.log(filteredIssues);
      props.handleIssues([]);
      setTimeout(() => {
         props.handleIssues(filteredIssues);
      }, 1);
   };

   // const handleOldestFilter
   const handleMostViewedFilter = (e) => {
      e.preventDefault();
      const sortMethod = (a, b) => {
         const aLikes = a.opinions.filter((op) => op.opinion === "like");
         const bLikes = b.opinions.filter((op) => op.opinion === "dislike");
         return bLikes.length - aLikes.length;
      };
      const filteredIssues = props.issues.sort(sortMethod);
      console.log(filteredIssues);
      props.handleIssues([]);
      setTimeout(() => {
         props.handleIssues(filteredIssues);
      }, 1);
   };

   return (
      <div className="filters-box">
         <ul className="filters-list">
            <li
               className="filters-list__filter"
               onClick={(e) => handleFeaturedFilter(e)}
            >
               <a href="#top">Featured</a>
            </li>
            <li
               className="filters-list__filter"
               onClick={(e) => handleNewestFilter(e)}
            >
               <a href="#top">Newest</a>
            </li>
            <li
               className="filters-list__filter"
               onClick={(e) => handleOldestFilter(e)}
            >
               <a href="#top">Oldest</a>
            </li>
            <li
               className="filters-list__filter"
               onClick={(e) => handleMostViewedFilter(e)}
            >
               <a href="#top">Most Viewed</a>
            </li>
         </ul>
      </div>
   );
};

export default Filter;
