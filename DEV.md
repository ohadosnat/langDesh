# Development Process

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
    - You can see that we don't store the strength level for each available language (currently have Russian, Italian, Spanish and French)
  - Active languages can be updated and sacle as the app grows.
  - Each user will have this similar template.
  - As the app grows and have more features (such as dark mode), I can quickly add a field `darkMode: true/false`
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

  - Can easliy create more courses by using this structure.
  - Can easliy add more translations to this.
    - Fun Fact: I started with Russian, and at the end I only added more languages. and this structure helped me a lot.
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

  - The Langs collection is small, but have an important part.
  - It defines which languages are available in the app.
  - Again, as mentioned before, I can easliy add more languages as the app grows (German is next!)
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

- How the hell I do user authentication? 🥴 \
  **Answer:** You use Firebase Authentication! 😲
- This was my first time using any kind of authentication service.
- After setting up Firebase Auth, I needed to create a new user document in Firestore, which was easy (after `signup`, create a document with the user's uid, code can be found at `src/contexts/AuthContext.js`).

<br/>

---

## **Sessions**

### **Challenges (some on of them)**

There were a lot of challenges with the session's, here some of them:

- Shuffle 10 random words each session (without words that have strength 5)
- Updating word strength at the end of each session (and how much)

### **Solutions**

<details>
<summary>At the start of each session, I run a function called <code>filterWords</code> that do the following (by order):</summary>

- **Filter:** finds the user's strongest words and filter them out of the array (using lodash's `_.differenceby()`)
  - _I had a bit of trouble doing it, and this worked the best so I used it._
- **Extract:** makes a copy of the original array, shuffles the array using the `Fisher-Yates Shuffle Modern Algorithm` which help me to make sure everything is truly shuffled.
- **Flatten:** Takes only 10 words from the shuffled array, and flatten each word to make it easier to work with later on.

**_This function can be found at `src/utils/sessionFuncs.js` if you want to take a look (a bit long for this document)._**

</details>

<details>
<summary>What happens when the user got less than 10 words below 4? Great question! 😲</summary>

- If the user finished 80% of the course (meaning 80% of the words are at strength 5), the session will not filter the words and the practice will 10 random words from all levels.
- To make sure I don't add strength to level 5 words, I added a small condition that handles this case.

</details>

<details>
<summary>During the session, based on the answer, I add the word's id to an array so I'll know which ones to update.</summary>

```javascript
// looks something like:
const answers: {
  correct: [5, 13, 12, 16],
  wrong: [41, 20, 10],
  skipped: [2, 29, 4]
}
```

</details>

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
<summary>To update the words, at the end it runs <code>updateWordInFirestore</code> that based on the course ID, it knows where to update it.</summary>

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

- Block a user from arriving into the app's main page if he/she isn't logged in.
- Block a user from going into a course that he/she doesn't have (from another language).
- How to structure the routing in this app? 🤔

### **Solutions**

<details>
<summary>I tried many ideas, here are some from my notes:</summary>

      - Idea for Routing
        - View Words: `main -> course:id -> /words`
        - StartQuiz: `main -> course:id -> /session -> quiz`
        - StartFlashcards: `main -> course:id -> /session -> flashcards`

</details>

<details>
<summary>I also made two custom Route components, <code>PrivateRoute</code> & <code>PrivateCourseRoute</code></summary>

- `PrivateRoute` - if the user is not signed in, it redirects the user to `/signin` to sign in.
- `PrivateCourseRoute` - similar to the above, but it redirects the user to `/` (main page) if there's no state (from location).
  - When a user goes into a session, I pass down a few states from the `Link` component.
  - So it's not only if the user doesn't have a specific course, it also prevents other bugs.
  - Before: user at `/rus/150/quiz` -> changes URL to `/ita/150/quiz` = **Error**
  - Now: user at `/rus/150/quiz` -> changes URL to `ita/150/quiz` = **Redirects to the main page.**

</details>

<details>
<summary>I ended up with that</summary>

- `AuthProvider` & `LangsProvider`, are my contexts providers that I use in most pages, so I made them global.

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

On every new page, I made myself a small todo list

<details>
<summary>Examples</summary>

_I got more notes & lists on my **Notion**._

    TODO - Adding new language.
    [x] design
    [x] fetch and render the langs that can be added
      [x] if a user already added a lang, disable it
    [x] the langs should be inside a form and act as a radio buttons.
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
- The list have 207 words, I splitted them into 4 courses **_(1-50, 51-100, 101-153, 154-207)_**

</details>

<details>
<summary>Audio Files</summary>

- Since I wanted to add audio feature to the app, I had a few options:
  - **The first** was to use a Text-To-Speech API (or something similar), but I didn't want to rely on other APIs and make lots of requests every time. \
    Yes, this would give me a more consistant voice across all of my languages & will be easier to implement (with no audio files to store)
  - **The second** was to get all the audio files of the words in that list for each language. \
    Sounds like a lot of work, well kind of. \
    Luckliy, I found a nice project called **Shtooka** which got free to use recordings of most words.
  - I went with the second option (because of the reasons I mentioned).

</details>
<details>
<summary>Structing Data & Files</summary>

To take all the audio files (can be between 500 to 14,000 files per language) and filter them to make sure I only take the ones I need. I made a series of functions (that aren't in this project)

- Each time I want to add a new langauge, I run these functions and it adds to an JSON file eveything and checks for duplicates.

</details>

<details>
<summary>The Plan</summary>

The plan is to have a list in this format (took me some time to get here)

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

- The first step is to **fetch & format the txt file** that comes with evey Shtooka pack which contains all of the information I need (file name, audio text).
  <details>
  <summary>Code</summary>

  ```js
  const langValue = "spa";
  fetchTexts(langValue).then((data) => formatAudioText(data));
  ```

      The txt file looks something like this (but longer):
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

- To format it and remove any unnecessary fields, I made a small Regex expression that handles this problem.

  <details>
  <summary>Code</summary>

  ```js
  const formatTags = text
    .replace(/\n|SWAC_TEXT=|\[|\]/gm, "")
    .match(/^.*\S.*$/gm);
  ```

  </details>

  ***

- Then I run a for loop (backwards) - `NUM` changes based on the amount of files, It can be `14000`, or even `500`.
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
  _The file is a CSV that have been formatted into JSON._

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

- `addTranslationArray` add an array to each word in the original Swadesh list
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
  <details>
  <summary>Firestore</summary>

Now that I got a formatted JSON file, I need to handle the Firestore part.

- What I need to do?
  - Create Course (if needed)
  - Update Course
- This was a simple React page that had a `useState` of the courses words splitted into 4 parts. \
  And a `useEffect` the runs at page load (if I needed to create a course, I would run first `initCourse` before updating it).

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

<!-- <details>
<summary></summary>
</details> -->
<br/>

---

## **Future Ideas**

- Dark mode
- Let the user set each word level (to skip some words)
- Have multiple correct answers to a word.
- Allow users to delete languages (should handle delete of every word strength in that language)

<br/>

---

## **Conclusion**

This was my first ever React project, It started as a simple idea to practice what I've learned (as always), and ended up as more. \
During this project I've learned a lot of new concepts and how React works (I'm sure I can improve the code). \
I learned even more about HTML, CSS and JS and how to combine them with React to achieve beautiful results. \
Currently, there are some bugs in the app, but I'm working on that. So, if you see anything, let me know! 😁 \
<br/>

**_As always, If you got any suggestions/feedback/tips about my code. Feel free to reach out and help me learn!_** 😄\
That's all for today! See you next time!
