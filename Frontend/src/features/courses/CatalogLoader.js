  import apiClient from "../../api/client";
export const CatalogLoader = async ({ request }) => {
  try {
    // 1. Parse the current URL to grab any active search filters
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "All";
    const page = url.searchParams.get("page") || 1;

    // 2. Send those params to the backend
    const response = await apiClient.get(
      `/courses?search=${search}&category=${category}&page=${page}`
    );

    // 3. Return the courses AND the search parameters so the UI knows what is active
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