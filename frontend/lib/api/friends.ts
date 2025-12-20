import { axiosInstance } from "../axios";
import {
  Friendship,
  FriendshipWithUsers,
  ResponseFormat,
  UpdateUsernameDto,
  User,
} from "@backend/shared";

const getFriends = async (): Promise<
  ResponseFormat<FriendshipWithUsers[]> | undefined
> => {
  try {
    const { data } = await axiosInstance.get<
      ResponseFormat<FriendshipWithUsers[]>
    >("/users/friends");
    return data;
  } catch (error: any) {
    console.log(error.response.data);
    throw new Error(error.response.data.message);
  }
};

const getStrangers = async (): Promise<
  ResponseFormat<Friendship[]> | undefined
> => {
  try {
    const { data } = await axiosInstance.get<ResponseFormat<Friendship[]>>(
      "/users/strangers"
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error");
  }
};

const patchUserName = async (
  inputData: UpdateUsernameDto
): Promise<ResponseFormat<User> | undefined> => {
  try {
    const { data } = await axiosInstance.patch<ResponseFormat<User>>(
      "/users/me/username",
      inputData
    );

    return data;
  } catch (error: any) {
    console.log(error.response.data);
    throw new Error(error.response.data.message);
  }
};

export { getFriends, getStrangers, patchUserName };
