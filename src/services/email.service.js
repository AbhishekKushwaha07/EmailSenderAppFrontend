import axios from "axios";
import { customAxios } from "./helper";

export async function sendEmail(emailData) {
  const result = (await customAxios.post(`/api/email/v1/send`, emailData)).data;
  return result;
}
