export interface PortfolioArtifact {
  id: string;
  title: string;
  description: string;
  reflection: string;
  type: "paper" | "project" | "essay" | "design";
}

export interface PortfolioStrand {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  artifacts: PortfolioArtifact[];
}

export interface PortfolioReference {
  id: string;
  citation: string;
  url?: string;
}

export const portfolioData = {
  title: "Doctoral Portfolio",
  subtitle: "Capstone Demonstration of Doctoral Learning",
  author: "Felix Olusola Abayomi",
  affiliation: "EdD Candidate, Antioch University",
  
  overview: "This portfolio is the capstone demonstration of doctoral learning prior to the dissertation. It contains artifacts and reflections that document mastery of the Ed.D. program's learning outcomes and strands, demonstrating how coursework, professional experience, and scholarly development collectively prepare for dissertation work and contribution to professional practice.",

  strands: [
    {
      id: "knowledge",
      title: "Strand 1: Knowledge",
      description: "Demonstrates the ability to critically engage with theory, research, and scholarship.",
      icon: "BookOpen",
      color: "blue",
      artifacts: [
        {
          id: "paradigm-paper",
          title: "Paradigm Paper",
          description: "Critical examination of philosophical paradigms and their influence on educational research.",
          reflection: "This paper marked a pivotal shift in my understanding of how paradigmatic assumptions shape research design. Through engaging with positivist, interpretivist, and pragmatist traditions, I developed a nuanced appreciation for how ontological and epistemological commitments influence methodology selection.",
          type: "paper" as const
        },
        {
          id: "theoretical-framework",
          title: "Theoretical Framework Paper",
          description: "Development and justification of the theoretical lens guiding dissertation research.",
          reflection: "Constructing this theoretical framework required synthesizing Bronfenbrenner's ecological systems theory, socio-technical systems thinking, and pragmatist philosophy. This integration provides the conceptual foundation for understanding human-wildlife conflict within nested social-ecological systems.",
          type: "paper" as const
        },
        {
          id: "literature-review",
          title: "Literature Review Strategy",
          description: "Systematic approach to reviewing and synthesizing scholarly literature.",
          reflection: "Developing a rigorous literature review strategy taught me to move beyond summarization toward critical synthesis. I learned to identify gaps, contradictions, and opportunities for theoretical contribution within the human-wildlife conflict literature.",
          type: "paper" as const
        },
        {
          id: "research-design",
          title: "Research Design (Chapters 1-3)",
          description: "Comprehensive dissertation proposal including introduction, literature review, and methodology.",
          reflection: "Writing these foundational chapters crystallized my research identity. The iterative process of aligning research questions, theoretical frameworks, and methodological choices deepened my understanding of coherent research design.",
          type: "paper" as const
        }
      ]
    },
    {
      id: "practice",
      title: "Strand 2: Practice",
      description: "Demonstrates the ability to apply theory and research to practice and innovation.",
      icon: "Wrench",
      color: "emerald",
      artifacts: [
        {
          id: "concept-papers",
          title: "Concept Papers",
          description: "Applied conceptualization of innovative solutions to practical problems.",
          reflection: "These concept papers bridged theoretical knowledge with practical application. Each paper required translating abstract ideas into actionable frameworks, strengthening my capacity as a scholar-practitioner.",
          type: "paper" as const
        },
        {
          id: "hwicrm-prototype",
          title: "HWICRM Prototype Design Plan",
          description: "Human-Wildlife Interaction and Conflict Resolution Mobile Application prototype design.",
          reflection: "Designing the HWICRM prototype represented the culmination of my practice strand. This socio-technical design integrates ecological ethics, community-centered design, and responsible AI principles to address real-world human-wildlife conflict challenges.",
          type: "project" as const
        }
      ]
    },
    {
      id: "self-in-context",
      title: "Strand 3: Self-in-Context",
      description: "Demonstrates reflexivity, ethical awareness, and understanding of professional identity within social and ecological systems.",
      icon: "User",
      color: "violet",
      artifacts: [
        {
          id: "professional-reflection",
          title: "Professional Reflection Essay",
          description: "Critical examination of professional growth and evolving identity.",
          reflection: "This essay required deep introspection about my journey from practitioner to scholar-practitioner. I examined how my professional experiences in technology and education inform my research perspective and ethical commitments.",
          type: "essay" as const
        },
        {
          id: "leadership-philosophy",
          title: "Leadership Philosophy",
          description: "Articulation of personal leadership values and practices.",
          reflection: "Developing my leadership philosophy clarified my commitment to collaborative, ethically-grounded leadership. I recognized how ecological thinking and systems perspectives shape my approach to organizational change.",
          type: "essay" as const
        },
        {
          id: "ecological-ethics",
          title: "Ecological Ethics Paper",
          description: "Exploration of environmental ethics and their implications for professional practice.",
          reflection: "This paper deepened my understanding of human-nature relationships and their ethical dimensions. Engaging with ecofeminist philosophy and land ethics transformed how I conceptualize the moral stakes of human-wildlife conflict.",
          type: "paper" as const
        }
      ]
    }
  ] as PortfolioStrand[],

  appendix: {
    title: "Appendix",
    description: "Curriculum Vitae and additional supporting evidence.",
    items: [
      { id: "cv", title: "Curriculum Vitae", description: "Academic and professional background" },
      { id: "presentations", title: "Presentations", description: "Conference presentations and workshops" },
      { id: "publications", title: "Publications", description: "Published works and manuscripts" },
      { id: "professional-outputs", title: "Professional Outputs", description: "Applied projects and contributions" }
    ]
  },

  references: [
    {
      id: "ref-1",
      citation: "Abrahms, B., Carter, N. H., Clark-Wolf, T., Gaynor, K. M., Johansson, E., McInturff, A., Nisi, A. C., Rafiq, K., & West, L. (2023). Climate change as a global amplifier of human–wildlife conflict. Nature Climate Change, 13(3), 224–234.",
      url: "https://doi.org/10.1038/s41558-023-01608-5"
    },
    {
      id: "ref-2",
      citation: "Bronfenbrenner, U. (1979). The ecology of human development: Experiments by nature and design. Harvard University Press."
    },
    {
      id: "ref-3",
      citation: "Gaard, G. (2011). Ecofeminism revisited: Rejecting essentialism and re-placing species in a material feminist environmentalism. Feminist Formations, 23(2), 26–53.",
      url: "https://doi.org/10.1353/ff.2011.0017"
    },
    {
      id: "ref-4",
      citation: "Grant, C., & Osanloo, A. (2014). Understanding, selecting, and integrating a theoretical framework in dissertation research. Administrative Issues Journal, 4(2), 12–26.",
      url: "https://doi.org/10.5929/2014.4.2.9"
    },
    {
      id: "ref-5",
      citation: "Leopold, A. (1949). A sand county almanac. Oxford University Press."
    },
    {
      id: "ref-6",
      citation: "Plumwood, V. (1993). Feminism and the mastery of nature. Routledge."
    },
    {
      id: "ref-7",
      citation: "Stilgoe, J., Owen, R., & Macnaghten, P. (2013). Developing a framework for responsible innovation. Research Policy, 42(9), 1568–1580.",
      url: "https://doi.org/10.1016/j.respol.2013.05.008"
    },
    {
      id: "ref-8",
      citation: "Warren, K. J. (2000). Ecofeminist philosophy: A western perspective on what it is and why it matters. Rowman & Littlefield."
    }
  ] as PortfolioReference[]
};
