import { instance } from "../utils/axios";

const authServices = {
  login: async (formData) => {
    try {
      const res = await instance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.status == 200) {
        const data = await res.data;
        return data;
      }

      return { error: true };
    } catch (error) {
      return { error: true };
    }
  },
  logout: async () => {
    try {
      const res = await instance.post("/auth/logout");
      if (res.status == 204) return {};

      return { error: true };
    } catch (error) {
      return { error: true };
    }
  },
  refreshToken: async () => {
    try {
      const res = await instance.post("/auth/refreshToken");
      if (res.status == 200) return {};

      return { error: true };
    } catch (error) {
      return { error: true };
    }
  },
  register: async (formData) => {
    try {
      const res = await instance.post("/auth/register", {
        email: formData.email,
        password: formData.password,
        roleId: formData.roleId,
      });

      if (res.status == 201) {
        const data = await res.data;
        return data;
      }

      return { error: true };
    } catch (error) {
      return { error: true };
    }
  },
};

export default authServices;
