import axios from "axios";
import showAlert from "./alert";

const updateUser = async (data, type, token) => {
  try {
    const url =
      type === "password"
        ? "https://yolo-backend.onrender.com/api/v1/users/updateMyPassword"
        : "https://yolo-backend.onrender.com/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        // 'content-type': 'multipart/form-data',
      },
    });

    if (res.data.status === "success") {
      showAlert("success", `Cập nhật thành công!`);
      return res.data;
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export default updateUser;
