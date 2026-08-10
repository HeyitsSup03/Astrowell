import { mockFetch } from "@/lib/mocks";
import { coursesMock, type Course } from "@/lib/mocks/courses.mock";

/** Fetch all courses */
export async function getCourses(category?: Course["category"]): Promise<Course[]> {
  const data = category
    ? coursesMock.filter((c) => c.category === category)
    : coursesMock;
  return mockFetch(data);
}

/** Fetch a single course by ID */
export async function getCourseById(id: string): Promise<Course | null> {
  return mockFetch(coursesMock.find((c) => c.id === id) ?? null);
}
