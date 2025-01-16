import { defaultErrorMessage } from "./constants.mjs";

export const errorFormatter = (error) => {
  if(error && error.value && error.path && error.msg){
    return `Invalid value '${error.value}' for '${error.path}. ${error.msg}'`;
  }
  if (error &&  error.msg) {
    return error.msg;
  }
  return defaultErrorMessage;
};
