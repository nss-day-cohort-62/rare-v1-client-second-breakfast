export const isStaff = () => {
    const auth = localStorage.getItem("auth_token")
    const userType = JSON.parse(auth)
    return userType?.staff
  }