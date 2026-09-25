/**
 * Rendered on /classes as a real accordion and mirrored into FAQPage JSON-LD.
 * Both must stay in sync — Google penalises FAQ markup that isn't visible on
 * the page — so they read from this one array.
 *
 * The wording deliberately repeats the phrases people actually search for
 * ("tabla classes in JP Nagar", "tabla teacher near me", "online tabla
 * classes Bangalore") in natural sentences.
 */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Where are the tabla classes held in Bangalore?",
    answer:
      "Classes are held inside the Swara Hindustani Classical Music School, #38, 3rd Main, Sarakki, JP Nagar 1st Phase, Bengaluru 560078. It is convenient for students across South Bengaluru — JP Nagar, Jayanagar, Banashankari, BTM Layout and Bannerghatta Road.",
  },
  {
    question: "Do you teach complete beginners?",
    answer:
      "Yes. Most students start with no background in music at all. The beginner course starts from how to sit, how to strike each bol, and basic theka in teentaal, and builds from there at a pace that suits you.",
  },
  {
    question: "What is the minimum age to learn tabla?",
    answer:
      "Children from about seven years of age can start, once their hands are large enough to hold the bols comfortably. There is no upper age limit — adult beginners are welcome and form a good part of the current batch.",
  },
  {
    question: "Are online tabla classes available?",
    answer:
      "Yes. Online classes over video call are available for students outside Bangalore and for anyone who prefers to learn from home. The syllabus is the same as the in-person course.",
  },
  {
    question: "How long is each class and how often do they run?",
    answer:
      "Classes typically run once or twice a week for about an hour, in small batches or one-to-one. Weekday evening and weekend morning slots are available.",
  },
  {
    question: "Do I need my own tabla to begin?",
    answer:
      "Not for the first few classes — an instrument is available to practise on during the lesson. Once you decide to continue, guidance is given on buying a good student-grade set and on tuning and maintaining it.",
  },
  {
    question: "Will I be prepared for exams or stage performance?",
    answer:
      "Yes. Students are prepared for graded music examinations where they want to take them, and get regular opportunities to perform — both solo and as accompaniment for vocal, instrumental and Kathak recitals.",
  },
  {
    question: "What does Kaushik Bhat's own training background cover?",
    answer:
      "Kaushik Bhat is a B-High graded tabla artist of All India Radio. He began under his father Shri Ganesh Bhat and has trained for over fourteen years under Pt Gurumurthy Vaidya, performing with artists including Pt Parameshwar Hegde, Ustaad Shafique Khan and Padmashri Kanyakumari Avasarala.",
  },
];
