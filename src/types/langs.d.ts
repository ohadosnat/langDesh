namespace Formatted {
  interface LanguageDoc {
    flagPath: string;
    name: string;
    id: langsID;
  }
}

type langsID = "rus" | "ita" | "fra" | "spa";
