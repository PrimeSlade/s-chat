import { axiosInstance } from "../axios";
import { ResponseFormat, Message, CreateMessageDto } from "@backend/shared";

const createMessage = async (
  inputData: CreateMessageDto
): Promise<ResponseFormat<Message> | undefined> => {
  try {
    const { data } = await axiosInstance.post<ResponseFormat<Message>>(
      "/messages",
      inputData
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
    throw new Error(error.response.data.message);
  }
};

export { createMessage };
