import { Routes, Route } from "react-router-dom";
import Issues from "./Issue/Issues";

// Login popup
import Login from "./auth/Login";
// signup popup
import Signup from "./auth/Signup";
// createIssue popup
import CreateIssue from "./Issue/Form";
// create Logout
import Logout from "./auth/Logout";

const Main = (props) => {

  return (
    <>
      <main className="content">
        <div className="issue-box">
          <Issues />
        </div>
      </main>
      <Routes>
        <Route path="/login" element={<Login />}>
          <></>
        </Route>
        <Route path="/signup" element={<Signup />}>
          <></>
        </Route>
        <Route path="/create-issue" element={<CreateIssue />}>
          <></>
        </Route>
        <Route path="/logout" element={<Logout />}>
          <></>
        </Route>
        <Route path="/" element={<></>}>
          <></>
        </Route>
      </Routes>
    </>
  );
};

export default Main;
