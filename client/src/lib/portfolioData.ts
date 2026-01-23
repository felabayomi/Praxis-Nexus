export interface PortfolioArtifact {
  id: string;
  title: string;
  description: string;
  reflection: string;
  type: "paper" | "project" | "essay" | "design" | "report" | "documentation";
  wordCount?: number;
}

export interface PortfolioStrand {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  purpose: string;
  strandReflection: string;
  learningOutcomes: string[];
  artifacts: PortfolioArtifact[];
}

export interface PortfolioReference {
  id: string;
  citation: string;
  url?: string;
  authorYear?: string;
}

export interface AppendixItem {
  id: string;
  title: string;
  description: string;
}

// Helper function to estimate reading time (words per minute)
export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export const portfolioData = {
  title: "Doctoral Learning Portfolio",
  subtitle: "Integrating Knowledge, Practice, and Self-in-Context through Pragmatic Design Science Research",
  author: "Felix O. Abayomi",
  affiliation: "Doctor of Education in Educational and Professional Practice, Antioch University",
  
  overview: `This portfolio is the capstone demonstration of doctoral learning prior to the dissertation. It contains artifacts and reflections that document mastery of the Ed.D. program's learning outcomes and strands, demonstrating how coursework, professional experience, and scholarly development collectively prepare for dissertation work and contribution to professional practice.

The portfolio is organized into three strands, each containing a strand reflection and representative artifacts that evidence doctoral-level learning. The Integrated Essay synthesizes the three strands, explaining how the evolution of Knowledge, Practice, and Self-in-Context leads directly into the dissertation focus: Designing and Recommending a Pragmatic Prototype for Human–Wildlife Interaction and Conflict Resolution: A Socio-Technical Design Science Approach.`,

  dissertationTitle: "Designing and Recommending a Pragmatic Prototype for Human–Wildlife Interaction and Conflict Resolution: A Socio-Technical Design Science Approach",

  strands: [
    {
      id: "knowledge",
      title: "Strand One: Knowledge",
      description: "Demonstrates mastery of theoretical, methodological, and scholarly inquiry as the foundation for applied research.",
      icon: "BookOpen",
      color: "blue",
      purpose: "Demonstrate your mastery of theoretical, methodological, and scholarly inquiry as the foundation for applied research.",
      strandReflection: `Throughout the Knowledge strand, I have developed an integrated understanding of research paradigms, theoretical frameworks, and methodological design within applied educational and professional practice. My learning has centered on connecting epistemology to actionable inquiry, ensuring that research contributes meaningfully to problem solving and innovation.

Early in the program, coursework on paradigms and theoretical perspectives helped me examine how paradigmatic assumptions shape research design. Through engaging with positivist, interpretivist, and pragmatist traditions, I developed a nuanced appreciation for how ontological and epistemological commitments influence methodology selection. This foundational work culminated in my Paradigm Paper, where I articulated my commitment to Pragmatism as a philosophical orientation that prioritizes practical consequences and actionable knowledge.

Building upon this foundation, my work in Design Science Research (DSR) clarified how applied design processes can serve as a form of scholarly inquiry. Through my Methodology Concept Paper and Research Design submission (Chapters 1–3), I learned to connect theory, design, and evaluation in ways that prioritize both innovation and practical outcomes. Courses in research design and systems thinking reinforced this understanding by encouraging methodological congruence and theoretical integration.

This strand has culminated in a robust understanding of how Socio-Technical Systems Theory can serve as an applied lens for pragmatic research. By examining how technological and human systems co-evolve, I have grounded my dissertation's focus on designing and recommending a prototype for human–wildlife interaction and conflict resolution. My Knowledge strand thus represents the intellectual scaffolding that enables me to connect philosophical assumptions, theoretical frameworks, and research methodology into a coherent program of scholarly inquiry.`,
      learningOutcomes: [
        "Mastery of research paradigms and design logic",
        "Integration of theory and method in professional inquiry",
        "Scholarly writing and analytic reasoning"
      ],
      artifacts: [
        {
          id: "paradigm-paper",
          title: "Paradigm Paper",
          description: "Pragmatism and Design Science Paradigm - Critical examination of philosophical paradigms and their influence on educational research.",
          reflection: "This paper marked a pivotal shift in my understanding of how paradigmatic assumptions shape research design. Through engaging with positivist, interpretivist, and pragmatist traditions, I developed a nuanced appreciation for how ontological and epistemological commitments influence methodology selection. My commitment to Pragmatism emerged from recognizing that knowledge claims must be evaluated by their practical consequences and actionable utility.",
          type: "paper" as const,
          wordCount: 3500
        },
        {
          id: "theoretical-framework",
          title: "Theoretical Framework Paper",
          description: "Socio-Technical and Ecological Systems - Development and justification of the theoretical lens guiding dissertation research.",
          reflection: "Constructing this theoretical framework required synthesizing Bronfenbrenner's ecological systems theory, socio-technical systems thinking, and pragmatist philosophy. This integration provides the conceptual foundation for understanding human-wildlife conflict within nested social-ecological systems. The framework illuminates how technological interventions must account for human, environmental, and institutional dynamics simultaneously.",
          type: "paper" as const,
          wordCount: 4200
        },
        {
          id: "literature-review",
          title: "Literature Review Strategy Paper",
          description: "Systematic approach to reviewing and synthesizing scholarly literature on human-wildlife conflict and conservation technology.",
          reflection: "Developing a rigorous literature review strategy taught me to move beyond summarization toward critical synthesis. I learned to identify gaps, contradictions, and opportunities for theoretical contribution within the human-wildlife conflict literature. This process revealed the need for integrative frameworks that bridge conservation science, technology design, and community engagement.",
          type: "paper" as const,
          wordCount: 5800
        },
        {
          id: "research-design",
          title: "Research Design (Chapters 1-3)",
          description: "Comprehensive dissertation proposal including introduction, literature review, and methodology - December 2025 submission.",
          reflection: "Writing these foundational chapters crystallized my research identity. The iterative process of aligning research questions, theoretical frameworks, and methodological choices deepened my understanding of coherent research design. I learned to articulate how Design Science Research methodology, combined with Modified Delphi study approaches, can generate both theoretical insights and practical artifacts.",
          type: "paper" as const,
          wordCount: 12000
        }
      ]
    },
    {
      id: "practice",
      title: "Strand Two: Practice",
      description: "Demonstrates the ability to apply theory and research to practice and innovation within conservation and digital governance.",
      icon: "Wrench",
      color: "emerald",
      purpose: "Demonstrate your ability to apply knowledge to solve professional problems and innovate within your field.",
      strandReflection: `The Practice strand has been the arena where theoretical learning transformed into professional innovation. My experience working with the Wildlife of Africa Conservation Initiative and the WA BiCC Program provided authentic contexts for applying design thinking, systems governance, and digital transformation strategies. Through coursework and professional projects, I learned to integrate research findings with practical interventions that address community-based conservation challenges.

The Professional Innovation Design Project served as a key artifact in this strand, allowing me to prototype a digital governance system for human–wildlife conflict mitigation. Through this project, I applied Design Science Research principles to create and refine a socio-technical framework capable of supporting decision-making and collaboration in real time. My practice-focused artifacts demonstrate a sustained commitment to using evidence-informed strategies and stakeholder collaboration to address complex conservation problems.

In this strand, I also deepened my skills in leadership, facilitation, and cross-sectoral governance. By examining how digital platforms can serve as mechanisms for inclusive participation, I have expanded my understanding of educational and civic leadership in the context of sustainability and ethical innovation. These experiences directly inform my dissertation's emphasis on Pragmatism and Socio-Technical Systems Theory, ensuring that my design recommendations are grounded in authentic professional experience and stakeholder needs.`,
      learningOutcomes: [
        "Application of research to practice and innovation",
        "Leadership and systems thinking in applied contexts",
        "Evidence-informed decision-making and evaluation"
      ],
      artifacts: [
        {
          id: "concept-papers",
          title: "Concept Papers",
          description: "Applied conceptualization of innovative solutions to practical problems in conservation and technology integration.",
          reflection: "These concept papers bridged theoretical knowledge with practical application. Each paper required translating abstract ideas into actionable frameworks, strengthening my capacity as a scholar-practitioner. The iterative development process taught me to balance academic rigor with practical feasibility.",
          type: "paper" as const,
          wordCount: 6500
        },
        {
          id: "hwicrm-prototype",
          title: "HWICRM Prototype Design Plan",
          description: "Human-Wildlife Interaction and Conflict Resolution Mobile Application prototype design with socio-technical specifications.",
          reflection: "Designing the HWICRM prototype represented the culmination of my practice strand. This socio-technical design integrates ecological ethics, community-centered design, and responsible AI principles to address real-world human-wildlife conflict challenges. The prototype demonstrates how digital platforms can facilitate stakeholder collaboration while respecting local knowledge systems.",
          type: "project" as const,
          wordCount: 8500
        },
        {
          id: "digital-governance",
          title: "Digital Governance for Conservation Systems",
          description: "Coursework project examining how digital technologies can support transparent and participatory conservation governance.",
          reflection: "This project expanded my understanding of how technology can democratize conservation decision-making. I explored the tensions between centralized data systems and distributed community knowledge, developing frameworks for inclusive digital governance.",
          type: "project" as const,
          wordCount: 4800
        },
        {
          id: "wa-bicc-documentation",
          title: "WA BiCC Program Documentation",
          description: "Collaborative data and policy systems documentation from the West Africa Biodiversity and Climate Change program.",
          reflection: "Working with the WA BiCC Program provided invaluable experience in multi-stakeholder conservation initiatives. I learned to navigate the complexities of cross-border collaboration and policy harmonization while maintaining focus on community-level impacts.",
          type: "documentation" as const,
          wordCount: 3200
        },
        {
          id: "peer-workshops",
          title: "Peer Presentation and Workshop Facilitation Materials",
          description: "Professional presentation materials and peer workshop products demonstrating facilitation and knowledge translation skills.",
          reflection: "Facilitating peer workshops required translating complex research concepts into accessible formats for diverse audiences. These experiences strengthened my ability to communicate scholarly ideas to practitioners and community stakeholders.",
          type: "documentation" as const,
          wordCount: 2500
        }
      ]
    },
    {
      id: "self-in-context",
      title: "Strand Three: Self-in-Context",
      description: "Demonstrates reflexivity, ethical awareness, and understanding of professional identity within social and ecological systems.",
      icon: "User",
      color: "violet",
      purpose: "Demonstrate reflexivity, ethical awareness, and personal transformation as a scholar-practitioner.",
      strandReflection: `The Self-in-Context strand has been transformative, prompting deep reflection on identity, ethics, and purpose as a scholar-practitioner. Through engagement with ecological ethics, reflective leadership, and positionality, I have developed a clearer sense of how personal values shape research and practice. This strand has helped me internalize ethical responsibility, ecological awareness, and cultural humility as essential components of educational and professional practice.

My Environmental Ethics Paper, exploring Deep Ecology, Ecofeminism, and the Land Ethic, provided the conceptual grounding for my evolving ecological worldview. I came to see that ethical leadership requires systems awareness and a commitment to justice not only among people but also within the more-than-human world. This realization complements the Pragmatic foundation of my dissertation, where "what works" must always include what sustains life and community.

The Week 13 Observation and Reflection Paper from the Virtual Human–Wildlife Conflict Workshop allowed me to connect my leadership practice to reflective inquiry, emphasizing empathy, dialogue, and inclusivity. In my Professional Reflection and Leadership Philosophy Statement, I articulated a model of leadership that integrates ecological consciousness, technological responsibility, and collaborative governance. Together, these artifacts demonstrate my evolving self-understanding as a scholar-practitioner committed to ethical, reflexive, and community-centered inquiry.`,
      learningOutcomes: [
        "Self-awareness as a scholar-practitioner",
        "Ethical leadership and reflective practice",
        "Commitment to equity, justice, and ecological responsibility"
      ],
      artifacts: [
        {
          id: "hwc-workshop-reflection",
          title: "Week 13 Observation & Reflection Paper",
          description: "Virtual Human–Wildlife Conflict Workshop - Connecting leadership practice to reflective inquiry through empathy and dialogue.",
          reflection: "This observation and reflection paper allowed me to connect my leadership practice to reflective inquiry, emphasizing empathy, dialogue, and inclusivity. Witnessing diverse stakeholder perspectives on human-wildlife conflict deepened my appreciation for the complexity of conservation challenges.",
          type: "essay" as const,
          wordCount: 2800
        },
        {
          id: "ecological-ethics",
          title: "Environmental Ethics Paper",
          description: "Deep Ecology, Ecofeminism, and the Land Ethic - Exploration of environmental ethics and their implications for professional practice.",
          reflection: "This paper deepened my understanding of human-nature relationships and their ethical dimensions. Engaging with ecofeminist philosophy and land ethics transformed how I conceptualize the moral stakes of human-wildlife conflict. I came to see that ethical leadership requires systems awareness and a commitment to justice not only among people but also within the more-than-human world.",
          type: "paper" as const,
          wordCount: 4500
        },
        {
          id: "professional-reflection",
          title: "Professional Reflection and Leadership Philosophy Statement",
          description: "Articulation of personal leadership values integrating ecological consciousness and collaborative governance.",
          reflection: "Developing my leadership philosophy clarified my commitment to collaborative, ethically-grounded leadership. I recognized how ecological thinking and systems perspectives shape my approach to organizational change. This statement articulates a model of leadership that integrates technological responsibility with community-centered inquiry.",
          type: "essay" as const,
          wordCount: 3500
        },
        {
          id: "self-in-context-paper",
          title: "Self-in-Context Concept Paper",
          description: "Values, Purpose, and Positionality in Conservation Leadership - Examination of how personal values shape research and practice.",
          reflection: "This concept paper required deep introspection about my positionality as a researcher and practitioner. I examined how my cultural background, professional experiences, and ethical commitments influence my approach to conservation research and technology design.",
          type: "paper" as const,
          wordCount: 3800
        },
        {
          id: "peer-reflection",
          title: "Peer Presentation Reflection",
          description: "Critical reflection on peer feedback and collaborative learning experiences throughout the doctoral program.",
          reflection: "Reflecting on peer presentations throughout the program revealed the value of collaborative inquiry. I learned to receive and integrate constructive feedback while developing my voice as a scholar-practitioner.",
          type: "essay" as const,
          wordCount: 1800
        }
      ]
    }
  ] as PortfolioStrand[],

  integratedEssay: {
    title: "Integrated Essay",
    description: "Synthesizes learning across the three strands, explaining how the evolution of Knowledge, Practice, and Self-in-Context leads directly into the dissertation focus.",
    note: "The Integrated Essay will articulate the scholarly trajectory leading to the dissertation: Designing and Recommending a Pragmatic Prototype for Human–Wildlife Interaction and Conflict Resolution: A Socio-Technical Design Science Approach."
  },

  appendix: {
    title: "Appendix",
    description: "Supporting evidence, curriculum vitae, and additional documentation.",
    items: [
      { id: "cv", title: "Curriculum Vitae", description: "Updated academic and professional background" },
      { id: "certificates", title: "Certificates and Professional Recognition", description: "Professional certifications and awards" },
      { id: "wa-bicc-materials", title: "WA BiCC Program and Wildlife of Africa Initiative Documentation", description: "Program materials and organizational documentation" },
      { id: "prototype-visuals", title: "Prototype Concept Visuals and Supporting Materials", description: "HWICRM design mockups and technical specifications" }
    ] as AppendixItem[]
  },

  references: [
    {
      id: "ref-1",
      citation: "Abrahms, B., Carter, N. H., Clark-Wolf, T., Gaynor, K. M., Johansson, E., McInturff, A., Nisi, A. C., Rafiq, K., & West, L. (2023). Climate change as a global amplifier of human–wildlife conflict. Nature Climate Change, 13(3), 224–234.",
      url: "https://doi.org/10.1038/s41558-023-01608-5",
      authorYear: "Abrahms et al., 2023"
    },
    {
      id: "ref-2",
      citation: "Arts, K., van der Wal, R., & Adams, W. M. (2015). Digital technology and the conservation of nature. Ambio, 44(S4), 661–673.",
      url: "https://doi.org/10.1007/s13280-015-0705-1",
      authorYear: "Arts et al., 2015"
    },
    {
      id: "ref-3",
      citation: "Bronfenbrenner, U. (1979). The ecology of human development: Experiments by nature and design. Harvard University Press.",
      authorYear: "Bronfenbrenner, 1979"
    },
    {
      id: "ref-4",
      citation: "Callicott, J. B. (1989). In defense of the land ethic: Essays in environmental philosophy. State University of New York Press.",
      authorYear: "Callicott, 1989"
    },
    {
      id: "ref-5",
      citation: "Domínguez, L., & Luoma, C. (2020). Decolonising conservation policy: How colonial land and conservation ideologies persist and perpetuate Indigenous injustices at the expense of the environment. Land, 9(3), 65.",
      url: "https://doi.org/10.3390/land9030065",
      authorYear: "Domínguez & Luoma, 2020"
    },
    {
      id: "ref-6",
      citation: "Gaard, G. (2011). Ecofeminism revisited: Rejecting essentialism and re-placing species in a material feminist environmentalism. Feminist Formations, 23(2), 26–53.",
      url: "https://doi.org/10.1353/ff.2011.0017",
      authorYear: "Gaard, 2011"
    },
    {
      id: "ref-7",
      citation: "Grant, C., & Osanloo, A. (2014). Understanding, selecting, and integrating a theoretical framework in dissertation research. Administrative Issues Journal, 4(2), 12–26.",
      url: "https://doi.org/10.5929/2014.4.2.9",
      authorYear: "Grant & Osanloo, 2014"
    },
    {
      id: "ref-8",
      citation: "Gregg, D. G., Kulkarni, U. R., & Vinzé, A. S. (2001). Understanding the philosophical underpinnings of software engineering research in information systems. Information Systems Frontiers, 3(2), 169–183.",
      url: "https://doi.org/10.1023/A:1011491322406",
      authorYear: "Gregg et al., 2001"
    },
    {
      id: "ref-9",
      citation: "Haleem, A., Javaid, M., Qadri, M. A., Singh, R. P., & Suman, R. (2022). Artificial intelligence (AI) applications for marketing: A literature-based study. International Journal of Intelligent Networks, 3, 119–132.",
      url: "https://doi.org/10.1016/j.ijin.2022.08.005",
      authorYear: "Haleem et al., 2022"
    },
    {
      id: "ref-10",
      citation: "Knight, A. T., Cowling, R. M., Rouget, M., Balmford, A., Lombard, A. T., & Campbell, B. M. (2008). Knowing but not doing: Selecting priority conservation areas and the research–implementation gap. Conservation Biology, 22(3), 610–617.",
      url: "https://doi.org/10.1111/j.1523-1739.2008.00914.x",
      authorYear: "Knight et al., 2008"
    },
    {
      id: "ref-11",
      citation: "Leopold, A. (1949). A sand county almanac. Oxford University Press.",
      authorYear: "Leopold, 1949"
    },
    {
      id: "ref-12",
      citation: "Mekonen, S. (2020). Coexistence between human and wildlife: The nature, causes and mitigations of human wildlife conflict around Bale Mountains National Park, Southeast Ethiopia. BMC Ecology, 20(1), 51.",
      url: "https://doi.org/10.1186/s12898-020-00319-1",
      authorYear: "Mekonen, 2020"
    },
    {
      id: "ref-13",
      citation: "Naess, A. (1973). The shallow and the deep, long-range ecology movement: A summary. Inquiry, 16(1-4), 95–100.",
      url: "https://doi.org/10.1080/00201747308601682",
      authorYear: "Naess, 1973"
    },
    {
      id: "ref-14",
      citation: "Plumwood, V. (1993). Feminism and the mastery of nature. Routledge.",
      authorYear: "Plumwood, 1993"
    },
    {
      id: "ref-15",
      citation: "Pooley, S., Barua, M., Beinart, W., Dickman, A., Holmes, G., Lorimer, J., Loveridge, A. J., Macdonald, D. W., Marvin, G., Redpath, S., Sillero-Zubiri, C., Zimmermann, A., & Milner-Gulland, E. J. (2017). An interdisciplinary review of current and future approaches to improving human–predator relations. Conservation Biology, 31(3), 513–523.",
      url: "https://doi.org/10.1111/cobi.12859",
      authorYear: "Pooley et al., 2017"
    },
    {
      id: "ref-16",
      citation: "Redpath, S. M., Young, J., Evely, A., Adams, W. M., Sutherland, W. J., Whitehouse, A., Amar, A., Lambert, R. A., Linnell, J. D. C., Watt, A., & Gutiérrez, R. J. (2013). Understanding and managing conservation conflicts. Trends in Ecology & Evolution, 28(2), 100–109.",
      url: "https://doi.org/10.1016/j.tree.2012.08.021",
      authorYear: "Redpath et al., 2013"
    },
    {
      id: "ref-17",
      citation: "Stephenson, P. J., Londono-Murcia, M. C., Borges, P. A. V., Claassens, L., et al. (2022). Measuring the outcome of conservation actions in tropical forests: A review. Frontiers in Forests and Global Change, 5, 825920.",
      url: "https://doi.org/10.3389/ffgc.2022.825920",
      authorYear: "Stephenson et al., 2022"
    },
    {
      id: "ref-18",
      citation: "Stilgoe, J., Owen, R., & Macnaghten, P. (2013). Developing a framework for responsible innovation. Research Policy, 42(9), 1568–1580.",
      url: "https://doi.org/10.1016/j.respol.2013.05.008",
      authorYear: "Stilgoe et al., 2013"
    },
    {
      id: "ref-19",
      citation: "Tom, H. T., Dickson, M. K., & Mbise, F. P. (2021). Indigenous ecological knowledge for sustainable wildlife conservation in Tanzania: A case of the Hadza and Datoga. African Journal of Ecology, 59(2), 311–320.",
      url: "https://doi.org/10.1111/aje.12856",
      authorYear: "Tom et al., 2021"
    },
    {
      id: "ref-20",
      citation: "Vom Brocke, J., Hevner, A., & Maedche, A. (2020). Introduction to design science research. In A. Hevner & S. Chatterjee (Eds.), Design science research in information systems (pp. 1–13). Springer.",
      url: "https://doi.org/10.1007/978-3-030-46781-4_1",
      authorYear: "Vom Brocke et al., 2020"
    },
    {
      id: "ref-21",
      citation: "Warren, K. J. (2000). Ecofeminist philosophy: A western perspective on what it is and why it matters. Rowman & Littlefield.",
      authorYear: "Warren, 2000"
    }
  ] as PortfolioReference[]
};

// Calculate reading times for strands
export function getStrandReadingTime(strand: PortfolioStrand): number {
  const reflectionTime = estimateReadingTime(strand.strandReflection);
  const artifactTime = strand.artifacts.reduce((acc, artifact) => {
    const artifactWords = (artifact.wordCount || 0) + artifact.reflection.split(/\s+/).length;
    return acc + Math.ceil(artifactWords / 200);
  }, 0);
  return reflectionTime + artifactTime;
}

// Calculate total portfolio reading time
export function getTotalReadingTime(): number {
  return portfolioData.strands.reduce((acc, strand) => acc + getStrandReadingTime(strand), 0);
}
