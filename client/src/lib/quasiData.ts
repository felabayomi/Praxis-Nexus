export interface QuasiSection {
  id: string;
  title: string;
  icon: string;
  content: QuasiContentBlock[];
}

export interface QuasiContentBlock {
  id: string;
  type: "question" | "answer" | "paragraph" | "list" | "heading";
  question?: string;
  content: string;
  items?: string[];
}

export interface QuasiReference {
  id: string;
  citation: string;
  url?: string;
}

export const quasiData = {
  title: "Quasi-Qualitative Project",
  subtitle: "Topic and Research Question Development",
  author: "Felix Abayomi",
  affiliation: "EdD Candidate, Antioch University",
  
  researchQuestion: {
    main: "How do everyday residents who regularly encounter wildlife describe the ways a mobile app for reporting encounters and receiving guidance could help them prevent or mitigate human–wildlife conflict?",
    overview: "This small-scale qualitative study explores how everyday adults think a simple mobile app could help them respond to human–wildlife encounters in safer and more informed ways. The focus is on two adult participants (over 18) who may have had experiences encountering wildlife in ordinary situations—for example, while driving, farming, traveling, or living near areas where animals and humans share space. In the interviews, I will describe a mobile app that allows users to report wildlife sightings and receive practical guidance, and I will ask participants how such a tool could be helpful."
  },

  sections: [
    {
      id: "theoretical-framework",
      title: "Rationale for Theoretical Framework",
      icon: "BookOpen",
      content: [
        {
          id: "tf-1",
          type: "question",
          question: "What is the theoretical framework you have selected?",
          content: "For this study, I have selected Pragmatism as my theoretical framework. Pragmatism is a philosophical approach that emphasizes practical consequences as central to meaning and truth. An idea or theory is understood as \"true\" when it works in real-world situations and helps us successfully predict and respond to our world (PHILO-notes, 2022)."
        },
        {
          id: "tf-2",
          type: "question",
          question: "Why is this theoretical framework foundational to your work?",
          content: "Pragmatism is foundational to my work because my core goal is very practical: to understand how a mobile app could actually help people prevent or reduce human–wildlife conflict in their daily lives. I am less interested in abstract attitudes toward technology and more interested in what people say would really help when they meet wildlife on the road, on their farms, or near their homes."
        },
        {
          id: "tf-3",
          type: "question",
          question: "How will this theoretical framework guide your work?",
          content: "Pragmatism will guide how I frame my research question, conduct interviews, and interpret the data. My interview questions will invite participants to describe specific situations and to imagine how they would use the app. In analysis, I will look for themes that highlight practical consequences—times and ways the app could support better decisions, prevent harm, or improve coexistence."
        },
        {
          id: "tf-4",
          type: "question",
          question: "Is this theoretical framework appropriate to your work?",
          content: "Pragmatism is appropriate because both this small project and my broader dissertation are oriented toward real-world problem solving. My intention is not just to describe human–wildlife conflict, but to contribute to the design of a prototype app that works for people in real encounters."
        }
      ]
    },
    {
      id: "research-design",
      title: "Selection of Research Design/Methodology",
      icon: "Microscope",
      content: [
        {
          id: "rd-1",
          type: "question",
          question: "Why have I selected this design/methodology?",
          content: "I selected interview research, specifically semi-structured interviews, because my research question is about how everyday residents describe ways a mobile app could help them prevent or mitigate human–wildlife conflict. Interviews allow participants to share personal experiences, describe specific encounters with wildlife, and reflect on what types of app features would actually be helpful in real situations."
        },
        {
          id: "rd-2",
          type: "question",
          question: "How does it fit into what I am doing?",
          content: "Interview research fits what I am doing because my project is small-scale and highly focused. With only two participants, I can conduct in-depth conversations that would not be possible through surveys or experiments. Interviews give space for participants to explain why they would or would not use certain app features, and how their past experiences shape their thinking."
        },
        {
          id: "rd-3",
          type: "question",
          question: "How will it inform my dissertation?",
          content: "These interviews will inform my dissertation by giving me an early, user-centered perspective. The themes that emerge from this quasi-qualitative study will help refine my dissertation's research design and interview protocols. They may also highlight practical concerns I had not considered."
        },
        {
          id: "rd-4",
          type: "question",
          question: "How will it assist in gathering/collecting data?",
          content: "Interview research directly supports data collection by giving me a clear, structured way to gather rich qualitative data. Semi-structured interviews allow me to follow a consistent set of questions while also pursuing relevant follow-ups based on what participants share."
        },
        {
          id: "rd-5",
          type: "question",
          question: "Will I be able to analyze the data by using this design/methodology?",
          content: "Yes, this design will allow me to analyze the data effectively. I will transcribe each interview, then code and categorize responses to identify key themes. This thematic analysis approach is standard for qualitative interview research and is manageable with a small sample."
        },
        {
          id: "rd-6",
          type: "question",
          question: "Does this design/methodology flow and fit in Chapter 1? Chapter 2?",
          content: "This design flows well with Chapter 1 and Chapter 2 of my dissertation. Chapter 1 establishes the problem of human–wildlife conflict and the need for accessible, user-friendly tools like a mobile app. Chapter 2 will review literature on technology for conservation and human–wildlife coexistence. Interview-based research fits naturally as a method to bridge theory and real-world user perspectives."
        },
        {
          id: "rd-7",
          type: "question",
          question: "Will this design/methodology help me make arguments/implications for Chapter 5?",
          content: "Yes. While Chapter 5 of the dissertation will primarily be based on my main evaluation study, insights from this quasi-qualitative project will help ground my recommendations. Understanding what users actually say they need—rather than what I assume they need—will make those final implications more credible and practical."
        }
      ]
    },
    {
      id: "participants",
      title: "Selection of Participants",
      icon: "Users",
      content: [
        {
          id: "p-1",
          type: "question",
          question: "How many male/females will you engage?",
          content: "I will engage two participants in this study: one female (my spouse) and one male (my adult son)."
        },
        {
          id: "p-2",
          type: "question",
          question: "What is their age approximation?",
          content: "The female participant is in her mid-40s, and the male participant is in his early 20s. Both are over the age of 18."
        },
        {
          id: "p-3",
          type: "question",
          question: "How many (total) will be part of your study?",
          content: "The total number of participants in this study is two. This aligns with the course guidelines for a small-scale Quasi-Qualitative project."
        },
        {
          id: "p-4",
          type: "question",
          question: "What is their educational level?",
          content: "Both participants are college educated. The female participant has completed university-level education, and the male participant has also completed or is completing college-level studies."
        },
        {
          id: "p-5",
          type: "question",
          question: "Approximation of socio-economic status?",
          content: "Both participants can be described as middle-class, living in a household with stable income and access to education and basic resources."
        },
        {
          id: "p-6",
          type: "question",
          question: "What is/are their current roles in place of employment?",
          content: "The female participant is employed full-time in a professional role. The male participant is a university student and/or in the early stages of his career."
        },
        {
          id: "p-7",
          type: "question",
          question: "Give the reader a sense of ethnicity, race, etc.",
          content: "Both participants identify as Black Africans of Nigerian origin, currently residing in the United States. They live in a context where wildlife encounters are part of everyday experiences, such as driving or moving through natural areas."
        }
      ]
    },
    {
      id: "data-collection",
      title: "Collection of Data",
      icon: "Database",
      content: [
        {
          id: "dc-1",
          type: "question",
          question: "What is/are your methods for collecting data?",
          content: "I will use qualitative, semi-structured interviews as my primary method of data collection. I will interview two adult participants (my spouse and my adult son) about any experiences they have had encountering wildlife and how they think a mobile app could help them prevent or mitigate human–wildlife conflict."
        },
        {
          id: "dc-2",
          type: "question",
          question: "What or how will you do this?",
          content: "I will schedule one individual interview with each participant, either in person or via an online call. Before starting, I will explain the purpose of the study, emphasize voluntary participation, and seek permission to record. I will follow a semi-structured guide with open-ended questions."
        },
        {
          id: "dc-3",
          type: "question",
          question: "What is your approach in getting as much great data as you can?",
          content: "To gather rich data, I will build rapport, ask open-ended follow-ups, encourage storytelling, and allow silence for reflection. Each interview will last 30–45 minutes."
        },
        {
          id: "dc-4",
          type: "question",
          question: "How will you store your data to protect and keep it confidential?",
          content: "I will use pseudonyms and store audio files and transcripts in a password-protected folder on my personal computer or encrypted cloud. Audio files will be deleted after transcription."
        },
        {
          id: "dc-5",
          type: "question",
          question: "How will you code it? Find patterns? Themes?",
          content: "After transcription, I will highlight key ideas and assign initial codes. These codes will be grouped into categories like 'types of encounters' or 'barriers to app use'. I'll compare themes across the two interviews."
        },
        {
          id: "dc-6",
          type: "question",
          question: "What will you keep? Not use and discard?",
          content: "I will keep all data related to wildlife encounters and app usefulness. Off-topic side conversations, unnecessary identifiers, and anything participants request be excluded will be discarded."
        },
        {
          id: "dc-7",
          type: "question",
          question: "Will you transcribe it? Paraphrase the data?",
          content: "Yes. I will transcribe recordings mostly verbatim, clean fillers if needed, and quote or paraphrase sections in the final analysis."
        }
      ]
    },
    {
      id: "data-interpretation",
      title: "Interpretation of Data",
      icon: "BarChart",
      content: [
        {
          id: "di-1",
          type: "question",
          question: "Explain the steps you will take to carefully analyze your data.",
          content: "First, I will transcribe each interview from the audio recording into a written document. Next, I will read each transcript several times to become familiar with the content. During these readings, I will begin initial coding by highlighting key phrases and notes related to human–wildlife encounters and how the app could help. After that, I will group similar codes together to form broader themes across both participants. Throughout the process, I will keep a short reflexive journal to note my thoughts, biases, and any patterns I notice."
        },
        {
          id: "di-2",
          type: "question",
          question: "Be specific and clear in how you will approach analyzing the data.",
          content: "My analysis will follow a simple, manual thematic analysis approach: 1. Transcription: Create a written transcript for each interview. 2. Familiarization: Read each transcript slowly, making margin notes about important ideas, emotions, and repeated points. 3. Open coding: Line by line, mark short codes such as \"fear of accident,\" \"needs clear instructions,\" \"wants quick response,\" or \"concern about false alarms.\" 4. Categorizing codes: Organize these codes into categories. 5. Identifying themes: Step back and identify overarching themes. 6. Connecting to framework: Relate themes back to my Pragmatist framework."
        },
        {
          id: "di-3",
          type: "question",
          question: "Will you find themes? Concepts? Theories?",
          content: "Yes. My primary focus will be on themes that describe how participants experience human–wildlife encounters and how they imagine the app could help. I will look for commonalities (similar needs, ideas, concerns) and differences (e.g., focus on different settings or types of encounters). I will connect these themes back to my Pragmatist framework, emphasizing practical consequences."
        },
        {
          id: "di-4",
          type: "question",
          question: "How will you visually present your data to the reader?",
          content: "I will use simple tables to present my findings: A theme table listing each main theme with sample participant quotes. A comparison table showing similarities and differences across the two participants. These visuals will support the narrative discussion of results and highlight the practical insights that emerge from the interviews."
        }
      ]
    },
    {
      id: "ethics",
      title: "Ethical Considerations",
      icon: "Shield",
      content: [
        {
          id: "e-1",
          type: "question",
          question: "How will you protect the identities of your participants?",
          content: "To protect identities, I will use pseudonyms in all transcripts, notes, and reports. No real names will be included in any published or submitted documents. I will remove identifying details, including location or work-related specifics that could reveal identity."
        },
        {
          id: "e-2",
          type: "question",
          question: "Will you use real names or fake names?",
          content: "I will use fake names (pseudonyms) for both participants. Real names will only be known to me and will not appear in any analysis or documentation."
        },
        {
          id: "e-3",
          type: "question",
          question: "How will you keep data secure?",
          content: "I will store all audio files and transcripts in a secure, password-protected folder on my encrypted laptop and/or cloud storage with two-factor authentication. Files will be deleted after analysis is complete and grades are submitted."
        },
        {
          id: "e-4",
          type: "question",
          question: "What might be ethical risks in your study?",
          content: "Because I am interviewing family members, power dynamics may affect how openly they respond. I will clearly explain that participation is voluntary and that they can skip any question or withdraw at any time without any consequences."
        },
        {
          id: "e-5",
          type: "question",
          question: "How will you make sure participants are fully informed and participate willingly?",
          content: "Before starting the interview, I will verbally explain the study, answer questions, and confirm consent to record. I will let them know they can stop at any time and that they are not required to answer anything that makes them uncomfortable."
        }
      ]
    },
    {
      id: "summary",
      title: "Chapter Summary",
      icon: "FileText",
      content: [
        {
          id: "s-1",
          type: "paragraph",
          content: "This small-scale quasi-qualitative study uses Pragmatism and semi-structured interviews to explore how everyday people imagine a mobile app could help them prevent or mitigate human–wildlife conflict. Participants will reflect on real or potential wildlife encounters and describe features they think would be helpful in an app."
        },
        {
          id: "s-2",
          type: "paragraph",
          content: "Data will be coded for themes about what supports or hinders safe and informed decision-making. Themes will be visually summarized in simple tables, and ethical safeguards—including pseudonyms, voluntary participation, and secure data storage—will protect participants throughout the process."
        },
        {
          id: "s-3",
          type: "paragraph",
          content: "This project serves as an early exploration that will help inform the larger dissertation study, ensuring that the eventual app design is grounded in real user perspectives and practical needs."
        }
      ]
    }
  ] as QuasiSection[],

  references: [
    {
      id: "ref-1",
      citation: "MeanThat. (2017). 5.3 Unstructured, semi-structured and structured interviews [Video]. YouTube.",
      url: "https://youtu.be/gzwGEBJGz8s"
    },
    {
      id: "ref-2",
      citation: "PHILO-notes. (2022). What is pragmatism? [Video]. YouTube.",
      url: "https://youtu.be/DlizC_dU7fQ?si=OQRd7wi0TgtngkoU"
    }
  ] as QuasiReference[]
};
