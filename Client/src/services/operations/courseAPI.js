import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints, categories } from "../apis";

const {
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

const { CATEGORIES_API } = categories;

// Fetch all categories
export async function fetchCourseCategories() {
  let result = [];
  try {
    const response = await apiConnector("GET", CATEGORIES_API);
    console.log("CATEGORIES_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.allCategory;
  } catch (error) {
    console.log("CATEGORIES_API ERROR:", error);
    toast.error(error.message);
  }
  return result;
}

// Create a new course
export async function createCourse(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_COURSE_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Course");
    }
    toast.success("Course Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_COURSE_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Edit course details
export async function editCourseDetails(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT_COURSE_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT_COURSE_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Get all courses
export async function getAllCourses() {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    console.log("GET_ALL_COURSES_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_COURSES_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Get course details
export async function getCourseDetails(courseId) {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });
    console.log("GET_COURSE_DETAILS_API RESPONSE:", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("GET_COURSE_DETAILS_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Get full course details
export async function getFullDetailsOfCourse(courseId, token) {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );
    console.log("GET_FULL_COURSE_DETAILS_API RESPONSE:", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_FULL_COURSE_DETAILS_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Get instructor courses
export async function fetchInstructorCourses(token) {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_INSTRUCTOR_COURSES_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_INSTRUCTOR_COURSES_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Delete a course
export async function deleteCourse(data, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_COURSE_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Course Deleted Successfully");
  } catch (error) {
    console.log("DELETE_COURSE_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}

// Create a section
export async function createSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_SECTION_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }
    toast.success("Section Created");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("CREATE_SECTION_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Update a section
export async function updateSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_SECTION_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Section Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE_SECTION_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Delete a section
export async function deleteSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_SECTION_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Section Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_SECTION_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Create a subsection
export async function createSubSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_SUBSECTION_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_SUBSECTION_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Update a subsection
export async function updateSubSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_SUBSECTION_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture");
    }
    toast.success("Lecture Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE_SUBSECTION_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Delete a subsection
export async function deleteSubSection(data, token) {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE_SUBSECTION_API RESPONSE:", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_SUBSECTION_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

// Update course progress
export async function updateCourseProgress(data, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_COURSE_PROGRESS_API RESPONSE:", response);
    if (!response?.data?.message) {
      throw new Error("Could Not Update Course Progress");
    }
    toast.success("Lecture Completed");
  } catch (error) {
    console.log("UPDATE_COURSE_PROGRESS_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}
