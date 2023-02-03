import axios from "axios";
import showAlert from "./alert";

const updateProduct = async (id, method, token, data = null) => {
  try {
    let url = `https://yolo-backend.onrender.com/api/v1/products/${id}`;
    if (method === "POST")
      url = `https://yolo-backend.onrender.com/api/v1/products`;

    const res = await axios({
      method: method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        // 'content-type': 'multipart/form-data',
      },
    });

    if ((res.status === 204) & (method === "DELETE")) {
      showAlert("success", `Xoá thành công!`);
    } else if ((res.status === 201) & (method === "POST")) {
      showAlert("success", `Thêm thành công!`);
    } else {
      showAlert("success", `Cập nhật thành công!`);
    }
    return res.data;
  } catch (err) {
    // showAlert("error", err.response.data.message);
    showAlert("error", err);
  }
};

export default updateProduct;
