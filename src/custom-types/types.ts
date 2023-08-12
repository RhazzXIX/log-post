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

interface IPostContent {
  _id: string;
  headerImg?: { data: Buffer; contentType: string };
  title: string;
  text: string;
}

interface IPost {
  _id: string;
  content: IPostContent[];
  isPublished: boolean;
  publishedDate?: Date;
  author: { id: string; name: string };
  totalComments: number;
}
