interface IUser {
  id: string;
  name: string;
  isAuthor: boolean;
}

interface IFormErrMessage {
  message: string;
  value: string;
  field: string;
}

interface signUpOkResponse extends IUser {
  message: string;
}
