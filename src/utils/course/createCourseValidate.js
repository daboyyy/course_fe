import { courseError } from "../../consts/courseError";

export const isDefaultError = (error) => {
  return error.isError && error.message == courseError.defaultErrorMsg;
};
export const isInvalidTitleError = (error) => {
  return error.isError && error.message == courseError.invalidTitleMsg;
};
export const isInvalidDescError = (error) => {
  return error.isError && error.message == courseError.invalidDescMsg;
};
export const isInvalidCategoryError = (error) => {
  return error.isError && error.message == courseError.invalidCategoryMsg;
};
export const isInvalidSubjectError = (error) => {
  return error.isError && error.message == courseError.invalidSubjectMsg;
};
