import HttpException from "./http.exception.js";

class UserExisted extends HttpException {
  constructor(username) {
    const status = 400;
    const message = `User ${username} already existed`;
    super(status, message);
  }
}

export default UserExisted;