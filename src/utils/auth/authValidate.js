import { authError } from "../../consts/authError";

export const isDefaultError = (error) => {
  return error.isError && error.message == authError.defaultErrorMsg;
};
export const isInvalidEmailError = (error) => {
  return error.isError && error.message == authError.invalidEmailMsg;
};
export const isInvalidPwdError = (error) => {
  return error.isError && error.message == authError.invalidPwdMsg;
};
export const isInvalidRoleError = (error) => {
  return error.isError && error.message == authError.invalidRoleMsg;
};
