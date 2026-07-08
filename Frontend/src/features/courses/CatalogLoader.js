  import apiClient from "../../API/client";
  const CatalogLoader = async () => {
    try {
      const response = await apiClient.get("/courses");
      return {allCourses: response.data.data || response.data || [] };
    } catch (error) {
      console.error(
        "❌ ERROR: Failed to load all courses in CatalogLoder:",
        error,
      );
      return { allCourses: [] };
    }
  };

  export default CatalogLoader;