module.exports = {
  profile: {
    name: "Harsh",
    headline: "MERN Stack Developer",
    location: "India",
    age: 20,
    degree: "Bachelor of Computer Applications",
    academicYear: "Final year (3rd year)",
    graduated: false,
    cgpa: "7.1 / 10",
    graduationYear: 2027,
    email: "hello@harshog.dev",
    github: "https://github.com/OgHar",
    linkedin: "",
    summary:
      "I am a final-year BCA student and MERN stack developer focused on building reliable web products. I care about clean interfaces, careful debugging, and shipping work that people can actually use. I bring willingness to learn, disciplined follow-through, and the kind of focus that stays with a problem until the code is correct.",
    traits: [
      "Willingness to learn new stacks, tools, and problem domains without being asked twice",
      "Determination to finish work to a production-ready standard",
      "Deep focus when isolating a bug or shaping a feature until the behavior is right",
      "Clear written communication for internships, product notes, and technical handoff",
    ],
  },
  skills: [
    { name: "MongoDB", category: "MERN", level: 80 },
    { name: "Express.js", category: "MERN", level: 82 },
    { name: "React", category: "MERN", level: 88 },
    { name: "Node.js", category: "MERN", level: 84 },
    { name: "JavaScript", category: "Languages", level: 90 },
    { name: "HTML / CSS", category: "Languages", level: 92 },
    { name: "Java", category: "Languages", level: 75 },
    { name: "C", category: "Languages", level: 70 },
    { name: "C++", category: "Languages", level: 72 },
    { name: "Python", category: "Languages", level: 78 },
    { name: "Data Structures and Algorithms", category: "Computer Science", level: 76 },
    { name: "Git / GitHub", category: "Workflow", level: 85 },
  ],
  tools: [
    { name: "VS Code", note: "Primary editor for web work" },
    { name: "IntelliJ IDEA", note: "Used for Java and structured backend study" },
    { name: "Cursor", note: "AI-assisted development environment" },
  ],
  education: [
    {
      title: "Class 10",
      institution: "Secondary education",
      year: "2022",
      result: "91%",
      status: "Graduated",
    },
    {
      title: "Class 12",
      institution: "Senior secondary education",
      year: "2024",
      result: "81%",
      status: "Graduated",
    },
    {
      title: "Bachelor of Computer Applications",
      institution: "Undergraduate programme",
      year: "2024 — 2027",
      result: "CGPA 7.1 / 10",
      status: "Final year (3rd year), expected graduation 2027",
    },
  ],
  experience: [
    {
      role: "Web Development Intern",
      company: "GigaNodes",
      start: "January 2026",
      end: "April 2026",
      summary:
        "Contributed to web development work across the internship period, applying MERN stack skills to real product tasks and delivery timelines.",
    },
    {
      role: "Business Analyst",
      company: "Outlook Publications India",
      start: "27 May 2026",
      end: "30 July 2026",
      summary:
        "Supported analysis and documentation work, translating business requirements into clear notes that technical and editorial teams could act on.",
    },
  ],
  projects: [
    {
      slug: "isaves",
      title: "iSaves",
      stack: "MongoDB, Express, React, Node.js",
      status: "Completed",
      summary:
        "A MERN stack application for generating strong passwords and storing them securely for later use.",
      highlights: ["Password generation", "Secure storage", "Full-stack MERN architecture"],
    },
    {
      slug: "zipurl",
      title: "ZipURL",
      stack: "Web application",
      status: "Completed",
      summary: "A URL shortener that turns long links into compact, shareable addresses.",
      highlights: ["Link shortening", "Redirect handling", "Practical utility product"],
    },
    {
      slug: "moneyminded",
      title: "MoneyMinded",
      stack: "MongoDB, Express, React, Node.js",
      status: "Completed",
      summary: "A personal finance tracker built on the MERN stack for recording and reviewing spending.",
      highlights: ["Expense tracking", "MERN data flow", "Personal finance views"],
    },
    {
      slug: "textlens",
      title: "TextLens",
      stack: "React",
      status: "Completed",
      summary:
        "A React text analyzer with analysis, synonyms, antonyms, rhyming words, grammar checks, dictionary lookup, binary conversion, and Morse conversion.",
      highlights: [
        "Analyze text",
        "Synonyms and antonyms",
        "Rhyming words",
        "Grammar check",
        "Dictionary",
        "Binary and Morse conversion",
      ],
    },
    {
      slug: "missingfilefinder",
      title: "MissingFileFinder",
      stack: "Python, Tkinter",
      status: "Completed",
      summary:
        "A Tkinter desktop app that scans a folder, extracts part numbers from filenames, reports missing numbers, and flags duplicates or files without numbers.",
      highlights: ["Folder scan", "Part-number extraction", "Missing, duplicate, and unlabeled file reports"],
    },
  ],
  currentWork: [
    {
      slug: "fitness-tracker",
      title: "Fitness Tracker (Android)",
      stack: "Android",
      summary:
        "An Android app in progress to track gym sessions, suggest exercises, and review growth over time.",
    },
    {
      slug: "newsmonk",
      title: "NewsMonk",
      stack: "React, public news APIs",
      summary: "A React news reader powered by global news APIs, currently in development.",
    },
    {
      slug: "sudokify",
      title: "Sudokify",
      stack: "React, JavaScript",
      summary:
        "A Sudoku generator and solver built with React and JavaScript, using a backtracking algorithm.",
    },
  ],
};
