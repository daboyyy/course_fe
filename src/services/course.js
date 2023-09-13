import { instance } from "../utils/axios";

const courseServices = {
  createCourse: async (params) => {
    try {
      const res = await instance.post("/course/create", {
        title: params.title,
        description: params.description,
        category: params.category,
        subject: params.subject,
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
  searchCourse: async (params) => {
    try {
      const res = await instance.get("/course/search", {
        params: {
          title: params.title,
          page: params.page || 1,
          limit: params.limit || null,
        },
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
};

export default courseServices;
