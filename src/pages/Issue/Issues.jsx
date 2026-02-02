import React, {useEffect} from "react";
import Issue from './Issue';
import { useDispatch, useSelector } from "react-redux";
import { getIssues } from "../../store/issues/actions";
// import store from '../../redux/store';

const Issues = () => {
   const issues = useSelector((state) => state.issueStore.issues);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getIssues());
   }, [dispatch])
   
   return (
      <ul className="issue-list">
         {issues.map((issue, index) => {
            return <Issue key={index} hash={index + 1} issue={issue} />;
         })}
      </ul>
   );
};

export default Issues
