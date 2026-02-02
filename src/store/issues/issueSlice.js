import { createSlice } from "@reduxjs/toolkit";

export const issueSlice = createSlice({
  name: "issues",
  initialState: {
    issues: [],
    backup: [],
  },
  reducers: {
    ADD_ISSUES(state, action) {
      state.issues = [...state.issues, ...action.payload.issues];
    },
    ADD_ISSUE(state, action) {
      state.issues = [...state.issues, action.payload.issue];
    },
    EDIT_ISSUE(state, action) {
      let updatedIssues = state.issues.map((each) => {
        if (each._id === action.payload.issue._id) {
          each = action.payload.issue;
        }
        return each;
      });
      state.issues = updatedIssues;
    },
    UPDATE_OPINION(state, action) {
      const { userOpinion, userId, issueId } = action.payload;
      const updatedIssues = state.issues.map((issue) => {
        if (issue._id === issueId) {
          const opinions = issue.opinions ? [...issue.opinions] : [];
          const existingOpinionIndex = opinions.findIndex(
            (op) => op.userId === userId
          );

          if (existingOpinionIndex !== -1) {
            opinions[existingOpinionIndex] = {
              ...opinions[existingOpinionIndex],
              opinion: userOpinion,
            };
          } else {
            opinions.push({ userId: userId, opinion: userOpinion });
          }
          return { ...issue, opinions: opinions };
        }
        return issue;
      });
      state.issues = updatedIssues;
    },
    DELETE_ISSUE(state, action) {
      const updatedIssues = state.issues.filter(
        (each) => each._id !== action.payload.issue._id
      );
      state.issues = updatedIssues;
    },
    BACKUP_ISSUES(state, action) {
      state.backup = state.issues;
    },
    FILTER_ISSUES(state, action) {
      state.issues = action.payload.issues;
    },
  },
});

export const {
  ADD_ISSUES,
  ADD_ISSUE,
  EDIT_ISSUE,
  DELETE_ISSUE,
  BACKUP_ISSUES,
  UPDATE_OPINION,
  FILTER_ISSUES,
} = issueSlice.actions;

export default issueSlice.reducer;
