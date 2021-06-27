<div align="center">
  <h1>Development Process</h1>
</div>

**Table of Contents:**
- [Structure](https://github.com/ohadosnat/langDesh/blob/main/DEV.md#structure)
- [User Authentication](https://github.com/ohadosnat/langDesh/blob/main/DEV.md#user-authentication)
- [Sessions](https://github.com/ohadosnat/langDesh/blob/main/DEV.md#sessions)
- [Routing](https://github.com/ohadosnat/langDesh/blob/main/DEV.md#routing)
- [Workflow, Misc, and Components](https://github.com/ohadosnat/langDesh/blob/main/DEV.md#workflow-misc--components)
- [Future Ideas](https://github.com/ohadosnat/langDesh/blob/main/DEV.md#future-ideas)
- [Conclusion](https://github.com/ohadosnat/langDesh/blob/main/DEV.md#conclusion)
- Read the [Design Process](./DESIGN.md)

## **Structure**

### **Challenges**

- How do I structure my data? (users, courses)
- Where should I store it?

### **Solutions**

One of my main goals was to make sure I don't store any unnecessary data.

- I had lots of ideas of how to tackle this (see pictures/notes below)
- I ended up going with **Firebase** as my database
- Since I added more features as I developed, I had to change some stuff. This led me into this structure that allows me to scale this project (more languages, words/courses)
  <details>
  <summary>Users</summary>

  - This structure allows me to quickly update a user's info.
  - Store only necessary progress (only the words the user is familiar with in that lang)
    - You can see that we don't store the strength level for each available language (currently have Russian, Italian, Spanish, and French)
  - Active languages can be updated and scaled as the app grows.
  - Each user will have a similar template.
  - As the app grows and has more features (such as dark mode), I can quickly add a field `darkMode: true/false`
    <br/><br/>

  ```javascript
  Database: Firestore
  Collection: Users
  - user1
      - uid: "123456"
      - soundEffects: true
      - activeLangs: ['rus','ita','spa']
      - name: "ohad"
      - progress: {
          course1: [
              {id: 1, rus_strength: 0.5, ita_strength: 1},
              {id: 45, ita_strength: 2},
          ],
          course2: [],
          course3: [],
          course4: []
      }
  - user2
      - uid: "262345"
      - soundEffects: true
      - activeLangs: ['rus','spa']
      - name: "ohad"
      - progress: {
          course1: [
              {id: 14, spa_strength: 1},
              {id: 45, rus_strength: 4}
          ],
          course2: [],
          course3: [],
          course4: []
      }

  {user3, user4, ...} (and so on other users)
  ```

  </details>

  <details>
  <summary>Courses</summary>

  - Create more courses effortlessly by using this structure.
  - Add more translations effortlessly.
    - Fun Fact: I started with Russian, and in the end, I only added more languages (with the help of this structure).
  - Change/Add anything I need.
    <br/><br/>

  ```javascript
  Collection: Courses
  - course1
      courseName: "Going String!"
      id: 0150
      words: [
          {en: "I",
          id: 1,
          translation: [
              {audioID: "1234", en_pron: "ja", lang: "rus", translation: "я"},
              {audioID: "1251", en_pron: "io", lang: "ita", translation: "io"},
              {audioID: "6142", en_pron: "yo", lang: "spa", translation: "yo"},
              ]
          }
      {word2, word3, ...} (and so on other words)
      ]
  ```

  </details>

  <details>
  <summary>Langs</summary>

  - The Langs collection is small but has an important part.
  - It defines which languages are available in the app.
  - Again, as mentioned before, I can easily add more languages as the app grows (German is next!)
    <br/><br/>

  ```javascript
  Collection: Langs
  - rus
      - flagPath: "rus-flag.png"
      - lang: "Russian"
  - and so on other langs...
  ```

  </details>

<br/>

---

## **User Authentication**

- How the hell do I do user authentication? 🥴 \
  **Answer:** You use Firebase Authentication! 😲
- This was my first time using any authentication service.
- After setting up Firebase Auth, I needed to create a new user document in Firestore, which was easy, create a document with the user's UID after signup.
- Full function at `src/contexts/AuthContext.js`.

<br/>

---

## **Sessions**

### **Challenges (some on of them)**

There were a lot of challenges with the sessions are here some of them:

- Shuffle 10 random words in each session (without words that have strength 5)
- Updating words' strength at the end of each session.

### **Solutions**

<details>
<summary>At the start of each session, I run a function called `filterWords` that do the following (by order):</summary>

- **Filter:** finds the user's strongest words and filters them out of the array (using lodash's `_.differenceby()`)
  - _I had a bit of trouble doing it, and this worked the best._
- **Extract:** makes a copy of the original list and shuffles it using the `Fisher-Yates Shuffle Modern Algorithm`.
- **Flatten:** Takes only ten words from the new list and flattens each word to make it easier to work with later on.

**_Full function at `src/utils/sessionFuncs.js` if you want to take a look (it's a bit long for this document)._**

</details>

<details>
<summary>What happens if a user got less than ten words below 4? Great question! 😲</summary>

- If the user finished 80% of the course (meaning 80% of the words are at strength 5), the session will not filter any words.
- To make sure I don't add strength to level 5 words, There's a simple condition that handles this case.

</details>

<details>
<summary>During the session, based on the answer, I add the word's id to an array to know which words to update.</summary>

```javascript
// looks something like:
const answers: {
  correct: [5, 13, 12, 16],
  wrong: [41, 20, 10],
  skipped: [2, 29, 4]
}
```

</details>

<br/>

**Update Words**

<details>
<summary> At the end of each session, I update the score on the user's document by running <code>updateWords</code> </summary>

```javascript
const updateWords = (score, currentUserDoc, courseID, langID) => {
  // correct
  if (score.correct && score.correct.length > 0) {
    score.correct.forEach((wordID) => {
      updateWordStrength(currentUserDoc, wordID, "correct", courseID, langID);
    });
  }
  // wrong
  if (score.wrong && score.wrong.length > 0) {
    score.wrong.forEach((wordID) => {
      updateWordStrength(currentUserDoc, wordID, "wrong", courseID, langID);
    });
  }
};
// and same for hard, okay, skipped, easy.
```

</details>
<details>
<summary>Based on the array, the function runs <code>updateWordStrength</code> for each word.</summary>

- Scoring: `Correct/Easy = +0.5` | `Hard/Wrong/Skip = -0.5` | `Okay = No Change`.

  ```javascript
  // Update word strength
  const updateWordStrength = (userDoc, id, type, courseID, langID) => {
    const coursePath = userDoc.progress[`course${courseID}`];
    const word = coursePath.find((word) => word.id === id);

    if (type === "correct") {
      if (word) {
        word[`${langID}_strength`] && word[`${langID}_strength`] < 5
          ? (word[`${langID}_strength`] += 0.5)
          : (word[`${langID}_strength`] = 0.5);
      } else {
        // creates a new word object, if the word doesn't exists on userDoc (yet)
        coursePath.push({ id, [`${langID}_strength`]: 0.5 });
      }
      updateWordInFirestore(coursePath, userDoc.uid, courseID);
    } else {
      if (word) {
        word[`${langID}_strength`] && word[`${langID}_strength`] > 0
          ? (word[`${langID}_strength`] -= 0.5)
          : word[`${langID}_strength`] || (word[`${langID}_strength`] = 0);
      }
      updateWordInFirestore(coursePath, userDoc.uid, courseID);
    }
  };
  ```

</details>
<details>
<summary>To update the words on Firestore, <code>updateWordInFirestore</code> runs at the end.</summary>

```javascript
const updateWordInFirestore = (path, uid, courseID) => {
  switch (courseID) {
    case 150:
      database.users.doc(uid).update({
        "progress.course150": path,
      });
      break;
    case 51100:
      database.users.doc(uid).update({
        "progress.course51100": path,
      });
      break;
    case 101153:
      database.users.doc(uid).update({
        "progress.course101153": path,
      });
      break;
    case 154207:
      database.users.doc(uid).update({
        "progress.course154207": path,
      });
      break;

    default:
      break;
  }
};
```

</details>
<br/>

---

## **Routing**

### **Challenges**

- Block a user from arriving on the app's main page if there's no user logged in
- How to structure the Routing correctly? 🤔

### **Solutions**

<details>
<summary>I tried many ideas, here are some from my notes:</summary>

      - Idea for Routing
        - View Words: `main -> course:id -> /words`
        - StartQuiz: `main -> course:id -> /session -> quiz`
        - StartFlashcards: `main -> course:id -> /session -> flashcards`

</details>

<details>
<summary>I made two custom Route components, <code>PrivateRoute</code> & <code>PrivateCourseRoute</code></summary>

- `PrivateRoute` - if the user is not signed in, it redirects the user to `/signin` to sign in.
- `PrivateCourseRoute` - similar to the above, but it redirects the user to `/` (main page) if there's no state (from location).
  - When a user goes into a session, I pass down a few states from the `Link` component.
  - It's not only for if the user doesn't have a specific course. It also prevents other bugs.
  - Before: user at `/rus/150/quiz` -> changes URL to `/ita/150/quiz` = **Error**
  - Now: user at `/rus/150/quiz` -> changes URL to `ita/150/quiz` = **Redirects to the main page.**

</details>

<details>
<summary>I ended up with that</summary>

- `AuthProvider` & `LangsProvider`, are the context providers that I use on most pages, so I made them global.

  ```javascript
  <Router>
    <AuthProvider>
      <LangsProvider>
        <Switch>
          <PrivateRoute path="/" exact component={Main} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/about" exact component={About} />
          <PrivateCourseRoute
            path="/:lang/:courseID/session/quiz"
            component={Quiz}
            exact
          />
          <PrivateCourseRoute
            path="/:lang/:courseID/session/flashcards"
            component={Flashcards}
            exact
          />
          <PrivateCourseRoute
            path="/:lang/:courseID/words"
            component={Words}
            exact
          />
          <PrivateRoute path="/addlanguage" exact component={AddNewLanguage} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/" component={NotFound} />
        </Switch>
      </LangsProvider>
    </AuthProvider>
  </Router>
  ```

    </details>
  <br/>

---

## **Workflow, Misc & Components**

### **Workflow**

On every new page, I made myself a small to-do list.

<details>
<summary>Examples</summary>

_I got more notes & lists on my **Notion**._

    TODO - Adding new language.
    [x] design
    [x] fetch and render the langs that can be added
      [x] if a user already added a lang, disable it
    [x] the langs should be inside a form and act like radio buttons.
      [x] figuring out how to style custom radio buttons.
    [x] add the langs to the user's current "activeLangs" inside firestore.
      [x] update the currentUserDoc to the most recent.

    --------------

    TODO: Words.js
    [x] design
    [x] structure: Words.js(main page), word line component(audio,word,translation,current level)
    [x] showing data
      [x] word & translation
      [x] audio
        [x] animation
      [x] level.
    [x] filter words with an input field.
    [x] sorting (ASC -> DSN -> repeat) by word

</details>
<br/>

### **Swadesh List, Audio Files & Firestore**

<details>
<summary>Swadesh List</summary>

- The Swadesh List can be used to rapidly achieve basic knowledge of a new language just by learning it.
- The list has 207 words. I split them into four courses **_(1-50, 51-100, 101-153, 154-207)_**

</details>

<details>
<summary>Audio Files</summary>

- Since I wanted to add an audio feature to the app, I had a few options:
  - **The first** was to use a Text-To-Speech API (or something similar), but I didn't want to rely on other APIs and make lots of requests every time. \
    Yes, this would give me a more consistent voice across all of my languages & will be easier to implement (with no audio files to store)
  - **The second** was to get all the audio files of each word in the list for each language. \
    Sound like a lot of work. Luckily, I found a project called **Shtooka** which got free-to-use recordings of most words.
  - I went with the second option (because of the reasons I mentioned).

</details>
<details>
<summary>Structuring Data & Files</summary>

To take all the audio files (can be between 500 to 14,000 files per language) and filter them to make sure I only take the ones I need, I made a series of functions (that aren't in this project).

- Each time I want to add a new language, I run these functions, and it adds to a JSON file everything and checks for duplicates.

</details>

<details>
<summary>The Plan</summary>

The plan is to have a list in this format (it took me some time to get here)

```json
  {
    "id": 1,
    "en": "I (1sg)",
    "translations": [
      {
        "lang": "rus",
        "en_pron": "ja",
        "translation": "я",
        "audioID": "a4fd7810"
      },
      {
        "lang": "ita",
        "en_pron": "io",
        "translation": "io",
        "audioID": "28ebbed8"
      },
      {
        "lang": "fra",
        "en_pron": "je",
        "translation": "je",
        "audioID": "e3130405"
      },
      {
        "lang": "spa",
        "en_pron": "yo",
        "translation": "yo",
        "audioID": "ffdfb001"
      }
    ]
  }
  {word2, word3, and so on...}
```

</details>

<details>
<summary>How does it work?</summary>

- The first step is to **fetch & format the `.txt` file** that comes with every Shtooka pack which contains all of the information I need (filename, audio text).
  <details>
  <summary>Code</summary>

  ```js
  const langValue = "spa";
  fetchTexts(langValue).then((data) => formatAudioText(data));
  ```

      The `.txt` file looks something like this (but longer):
      [lang-filenameid.flac]
      SWAC_TEXT=hello

      [lang-filenameid.flac]
      SWAC_TEXT=what

      [lang-filenameid.flac]
      SWAC_TEXT=who

      [lang-filenameid.flac]
      SWAC_TEXT=yes

  </details>

  ***

- To format and remove any unnecessary fields, I made a small Regex expression that handles this problem.

  <details>
  <summary>Code</summary>

  ```js
  const formatTags = text
    .replace(/\n|SWAC_TEXT=|\[|\]/gm, "")
    .match(/^.*\S.*$/gm);
  ```

  </details>

  ***

- Then I run a for loop (backward) - `NUM` changes based on the number of files (it can be `14000`, or even `500`).
  <details>
  <summary>Code</summary>

  ```js
  const formatedText2 = [];
  for (let i = formatTags.length - 1; i > NUM; i--) {
    const temp = formatTags.splice(0, 2);
    const newObject = {
      audioID: temp[0],
      originalWord: temp[1],
    };
    if (
      formatedText2.find(
        (value) => value.originalWord === newObject.originalWord
      )
    ) {
      console.log(`Already Here ${newObject.originalWord}!`);
    }
    formatedText2.push(newObject);
  }
  ```

  </details>

  ***

- Now step 2: (setup below)
  <details>
  <summary>Code</summary>

  ```js
  fetchAudioJSON(langValue)
    .then((data) => (formattedAudioText = data))
    .then(() => fetchSwadeshJSON(langValue)) // gets the Swadesh JSON based on the langValue
    .then((data) => translationFormat(data, langValue)) // organizing the translation values object for each word.
    .then(() => fetchENSwadeshJSON()) // getting the original Swadesh list {id, en, translation: []}
    .then((list) => addTranslationToWord(list, formattedObjects, langValue)) // a function that will check if the lang is already there, if not add it.
    .catch((err) => console.error(err));
  ```

  </details>

  ***

- I'll skip all the fetch functions since they're pretty much the same. \
  `translationFormat` takes the data from our JSON file (for example `itaSwades.json`). \
  _The original file is a CSV that has formatted into JSON._

  <details>
  <summary>Code</summary>

  ```js
  const translationFormat = (data, lang) => {
    for (let i = 0; i < data.length; i++) {
      const { translation } = data[i];
      console.log(data[i]);

      const translationValue =
        translation.substring(0, translation.indexOf(" ")).length === 0
          ? translation
          : translation.substring(0, translation.indexOf(" "));

      const en_pron = translation.substring(
        translation.indexOf("(") + 1,
        translation.indexOf(")")
      );
      const audioID = formattedAudioText.find(
        (value) => value.originalWord === translationValue
      );
      console.log(audioID, i, data[i].translation);
      // Object Template
      const objectTemplate = {
        lang: lang,
        en_pron: en_pron !== "" ? en_pron : translationValue,
        translation: translationValue,
        audioID: audioID.audioID,
      };
      formattedObjects.push(objectTemplate);
    }
  };
  ```

  </details>

  ***

- `addTranslationArray` add an array to each word in the original Swadesh list.
    <details>
    <summary>Code</summary>

  ```js
  const addTranslationArray = (list) => {
    list.forEach((value) => (value.translations = []));
    console.log(JSON.stringify(list));
  };

  const addTranslationToWord = (list, formattedObjects, lang) => {
    const words = [];
    list.forEach((value, i) => {
      // If the langs already exists in the translations array, then do nothing.
      if (value.translations.find((obj) => obj.lang === lang)) {
        console.log("already here");
        words.push(value);
      } else {
        value.translations.push(formattedObjects[i]);
        words.push(value);
      }
    });
    console.log(JSON.stringify(words));
  };
  ```

        </details>

      </details>

</details>
  <details>
  <summary>Firestore</summary>

Now that I got a formatted JSON file, I need to handle the Firestore part.

- What I need to do?
  - Create Course (if needed)
  - Update Course
- A simple React page that has a `useState` of the course's words split into four parts. \
  And a `useEffect` thats runs at page load (if I needed to create a course, I would run first `initCourse` before updating it).

  ```js
  // Creates a course.
  const initCourses = async (courseName, id, wordsRange) => {
    database.courses
      .add({
        courseName,
        id,
        words: [],
        wordsRange,
      })
      .then((docRef) => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  function FirestoreFileTransfer() {
    const [coursesWords, setCoursesWords] = useState({
      150: swadeshList.slice(0, 50),
      51100: swadeshList.slice(50, 100),
      101150: swadeshList.slice(100, 153),
      151207: swadeshList.slice(153),
    });

    useEffect(() => {
      updateCourses("course1ID", coursesWords[150]);
      updateCourses("course2ID", coursesWords[51100]);
      updateCourses("course3ID", coursesWords[101150]);
      updateCourses("course4ID", coursesWords[151207]);
    }, []);
    // the rest of the component (return and such...)
  }
  ```

  </details>

  <details>
  <summary>Getting only the files I need to a new folder</summary>

To get only the words I need, I made a simple `.bat` file. \
Each language had an `audioIDS.txt` file that had all the names, and this batch file uses Windows `robocopy` to loop through the list.

```bat
for /f %%f in (AudioIDs.txt) do robocopy D:\audioFileLocation D:\output  %%f /log+:"D:\output\log.txt"
```

  </details>
  
  <details>
  <summary>Animations (using Lottie)</summary>

- All the animations in this project were powered by `lottie-web`, I wanted to use `lottie-react` but it didn't work well.
- The implementation was simple, this is how I did it.

Implementation:

<details>
<summary>Loading Animation</summary>

- Lottie uses json files that stores all of the information about the animation & svg.
- To load an animation I used `.loadAnimation()` that lottie provides.
- The settings I used are simple but I'll explain some of them:
  - `name` to reference the animation if needed (`.play(name)`, `.stop(name)`, `.destory(name)` and more)
  - container to know where to render the animation, I used `useRef` to create a quick reference to the element I need.
  - `animationData` - what data to use, in our case `loader`
      - In this case we reference a state but in other cases I do import the json file to the document and reference it directly.
  - I added a class of `pointer-event-none` to most of my animation to prevent any click events on them.

  ```js
  // creating a ref
  const loadingRef = useRef(null);

  lottie.loadAnimation({
    name: "loader",
    container: loadingRef.current,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      className: "pointer-events-none", // to prevent click event on the svg/path.
    },
  });

  // reference div
  <div ref={loadingRef} className="mx-auto w-60 -mb-10" />;
  ```

</details>

<details>
<summary>Loaders</summary>

- I added a random loader feature that chooses a random animation on every load since having the same animation can be a bit boring.
- The function for this is a simple random number generator that returns a random JSON file with the animation.

```js
// import statements, removed to save space...

const loaders = [
  loadingCube,
  isometricCubesLoader,
  isometricCubesLoaderSpaced,
  quadCubeShifter,
  shiftingCubes,
  squishyIsometricCubeLoader,
];

const getRandomLoader = () => {
  const randomNum = Math.floor(Math.random() * loaders.length);
  return loaders[randomNum];
};

export default getRandomLoader;
```

- On page load, I run this function (`getRandomLoader()`) to generate a new loader, and set the `loader` to it.
- Loads the animation after the loader has been set (using `useEffect` with a dependecy array of `loader`).

```js
const [loader, setLoader] = useState({});

useState(() => {
  setLoader(getRandomLoader());
}, []);

useEffect(() => {
  if (!isLoading) return;
  lottie.loadAnimation({
    name: "loader",
    container: loadingRef.current,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      className: "pointer-events-none", // to prevent click event on the svg/path.
    },
  });
}, [loader]);
```
</details>

</details>
  

<br/>

---

## **Future Ideas**

- Dark mode
- Let the user set a strength for each word (to skip some words)
- Have multiple correct answers for a word.
- Allow users to delete languages (should handle delete of every word strength in that language)

<br/>

---

## **Conclusion**

This project was my first ever React project. It started as a simple idea to practice what I've learned (as always) and ended up with more. \
During this project, I've learned new concepts and how React works. \
I learned how to combine what I've learned in the past with React to achieve beautiful results. \
Currently, there are some bugs in the app, but I'm working on that. So, if you see any, let me know! 😁 \
<br/>

**_As always, If you got any suggestions/feedback/tips about my code. Feel free to reach out and help me learn!_** 😄\
That's all for today! See you next time!
