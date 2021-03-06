import { useLangs } from "../../contexts/LangsContext";
import CourseCard from "./CourseCard";

interface Props {
  lang: Formatted.LanguageDoc["id"];
  title: Formatted.LanguageDoc["name"];
  flag: Formatted.LanguageDoc["flagPath"];
}

const CoursesWrapper = ({ lang, title, flag }: Props) => {
  const { coursesData } = useLangs();

  return (
    <>
      <div key={lang} className="my-8">
        <div className="flex items-center lg:justify-center">
          <h3 className="font-medium text-3xl mr-3">{title}</h3>
          <img
            src={`/assets/imgs/flags/${flag}`}
            className="w-12 shadow-sm rounded-[4px] border-black border border-opacity-10"
            alt=""
          />
        </div>
        <hr className="mt-3 bg-[#BCBCBC] opacity-40 lg:w-4/5 lg:mx-auto 2xl:w-2/5" />
        <div className="overflow-hidden -mr-5">
          <div className="flex py-6 overflow-x-scroll -mb-5 lg:justify-center lg:mx-auto">
            {coursesData
              .sort((a, b) => a.id - b.id)
              .map(({ id, words, wordsRange, courseName }) => (
                <CourseCard
                  key={id}
                  courseID={id}
                  wordsRange={wordsRange}
                  courseName={courseName}
                  wordsData={words}
                  langID={lang}
                  langTitle={title}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesWrapper;
