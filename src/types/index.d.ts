/**
 * The Error Message Format for all requests.
 * @param message - should contain what was failed
 * @param error - the actual error
 */
interface ErrorMessage {
  message: string;
  error: unknown;
}

// Loader Type
type Loader = Loader;

// Input Component Type
type InputType = "email" | "password" | "name" | "search";

/* Hooks */

// useForm
type useFormReturn = [
  Record<string, string>,
  (e: ChangeEvent<HTMLInputElement>) => void
];

/** Courses */

type CoursesID = 150 | 51100 | 101153 | 154207;

// Course Card
interface CourseCard {
  langID: langsID;
  wordsRange: CourseDoc["wordsRange"];
  courseName: CourseDoc["courseName"];
  wordsData: Word[];
  courseID: CoursesID;
  langTitle: string;
}

/** Location's State Objects */

interface WordsLocationState extends CourseCard {
  inPrecentProgress: number;
}
