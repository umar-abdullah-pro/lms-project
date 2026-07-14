  import apiClient from "../../api/client";
export const CatalogLoader = async ({ request }) => {
  try {

    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "All";
    const page = url.searchParams.get("page") || 1;

    const response = await apiClient.get(
      `/courses?search=${search}&category=${category}&page=${page}`
    );

    return {
      courses: response.data.data.courses,
      meta: response.data.data.meta,
      searchParams: { search, category, page }
    };
  } catch (error) {
    console.log("Error loading catalog:", error);
    return { courses: [], meta: null, searchParams: {} };
  }
};

export default CatalogLoader