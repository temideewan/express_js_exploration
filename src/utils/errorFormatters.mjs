export const errorFormatter = (arrayOfErrors) => {
  return arrayOfErrors.map((error) => {
    console.log(error)
    return error.value? `Invalid value '${error.value}' for '${error.path}'. ${error.msg}`: error.msg
  })
}

