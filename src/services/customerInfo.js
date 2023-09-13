import { instance } from "../utils/axios";

const customerInfoServices = {
  getInfo: async () => {
    try {
      const res = await instance.get("/customerInfo/getInfo");

      if (res.status == 200) {
        const data = await res.data;
        return data;
      }

      return { error: true };
    } catch (error) {
      return { error: true };
    }
  },
};

export default customerInfoServices;
