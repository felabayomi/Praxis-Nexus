export interface EssaySection {
  id: string;
  title: string;
  description: string;
  promptGuidance: string;
}

export interface EssayReference {
  id: string;
  citation: string;
  url?: string;
}

export const integratedEssayData = {
  title: "Integrated Essay",
  subtitle: "Synthesis of Doctoral Learning Across Three Strands",
  author: "Felix Olusola Abayomi",
  affiliation: "EdD Candidate, Antioch University",
  
  overview: "The Integrated Essay is the analytical and reflective centerpiece of the doctoral portfolio. It synthesizes learning across the three strands (Knowledge, Practice, Self-in-Context) and demonstrates readiness for dissertation work.",

  dissertationTitle: "Designing and Recommending a Pragmatic Prototype for Human–Wildlife Interaction and Conflict Resolution: A Socio-Technical Design Science Approach",

  coreRequirements: [
    "Demonstrate integration across the program strands",
    "Connect learning to dissertation design",
    "Show evidence of growth and coherence",
    "Use academic voice and structure (APA 7th edition)"
  ],

  sections: [
    {
      id: "introduction",
      title: "Introduction",
      description: "Opening that establishes the purpose and scope of the integrated essay.",
      promptGuidance: "Introduce the purpose of the integrated essay: to synthesize doctoral learning across Knowledge, Practice, and Self-in-Context strands. Preview how this learning culminates in dissertation readiness."
    },
    {
      id: "knowledge-strand",
      title: "Knowledge Strand Integration",
      description: "How theoretical and methodological learning informs the dissertation.",
      promptGuidance: "Discuss how engagement with theory, research paradigms, and scholarly literature has shaped the dissertation design. Reference the Paradigm Paper, Theoretical Framework, Literature Review, and Research Design chapters. Connect to pragmatism, ecological systems theory, and socio-technical systems thinking."
    },
    {
      id: "practice-strand",
      title: "Practice Strand Integration",
      description: "How applied learning connects to innovation and leadership practice.",
      promptGuidance: "Explain how concept papers and the HWICRM prototype design demonstrate the application of theory to practice. Discuss how design science research methodology bridges knowledge and action. Connect to human-wildlife conflict resolution as applied innovation."
    },
    {
      id: "self-in-context",
      title: "Self-in-Context Integration",
      description: "Reflexivity, ethical awareness, and professional identity development.",
      promptGuidance: "Articulate the evolving self-understanding as a reflective scholar-practitioner. Discuss how ecological ethics, leadership philosophy, and professional reflection shape identity within social-ecological systems. Connect to ecofeminist perspectives and ethical commitments."
    },
    {
      id: "strand-synthesis",
      title: "Synthesis Across Strands",
      description: "How the three strands interconnect and inform each other.",
      promptGuidance: "Demonstrate how Knowledge, Practice, and Self-in-Context strands are not separate but mutually reinforcing. Show how theoretical learning shapes practice, how practice challenges and refines theory, and how reflexivity grounds both in ethical commitment."
    },
    {
      id: "dissertation-connection",
      title: "Connection to Dissertation Design",
      description: "How doctoral learning culminates in the dissertation focus.",
      promptGuidance: "Explain how coursework, paradigm development, and professional experience culminate in the dissertation: 'Designing and Recommending a Pragmatic Prototype for Human–Wildlife Interaction and Conflict Resolution: A Socio-Technical Design Science Approach.' Connect pragmatism, DSR, and socio-technical systems theory."
    },
    {
      id: "growth-trajectory",
      title: "Evidence of Growth and Coherence",
      description: "Demonstration of intellectual and professional development.",
      promptGuidance: "Demonstrate how the doctoral journey has advanced thinking about educational leadership, digital governance, ecological ethics, and collaborative systems. Show coherence between early coursework and current dissertation focus."
    },
    {
      id: "conclusion",
      title: "Conclusion",
      description: "Synthesis and forward-looking reflection on dissertation readiness.",
      promptGuidance: "Conclude by affirming readiness for dissertation work. Summarize how the integrated learning across strands prepares for rigorous, ethical, and impactful research. Articulate commitment to scholar-practitioner identity and contribution to professional practice."
    }
  ] as EssaySection[],

  references: [
    {
      id: "ref-1",
      citation: "Abrahms, B., Carter, N. H., Clark-Wolf, T., Gaynor, K. M., Johansson, E., McInturff, A., Nisi, A. C., Rafiq, K., & West, L. (2023). Climate change as a global amplifier of human–wildlife conflict. Nature Climate Change, 13(3), 224–234.",
      url: "https://doi.org/10.1038/s41558-023-01608-5"
    },
    {
      id: "ref-2",
      citation: "Arts, K., van der Wal, R., & Adams, W. M. (2015). Digital technology and the conservation of nature. Ambio, 44(Suppl 4), 661–673.",
      url: "https://doi.org/10.1007/s13280-015-0705-1"
    },
    {
      id: "ref-3",
      citation: "Baxter, G., & Sommerville, I. (2011). Socio-technical systems: From design methods to systems engineering. Interacting with Computers, 23(1), 4–17.",
      url: "https://doi.org/10.1016/j.intcom.2010.07.003"
    },
    {
      id: "ref-4",
      citation: "Bronfenbrenner, U. (1979). The ecology of human development: Experiments by nature and design. Harvard University Press."
    },
    {
      id: "ref-5",
      citation: "Gaard, G. (2011). Ecofeminism revisited: Rejecting essentialism and re-placing species in a material feminist environmentalism. Feminist Formations, 23(2), 26–53.",
      url: "https://doi.org/10.1353/ff.2011.0017"
    },
    {
      id: "ref-6",
      citation: "Grant, C., & Osanloo, A. (2014). Understanding, selecting, and integrating a theoretical framework in dissertation research. Administrative Issues Journal, 4(2), 12–26.",
      url: "https://doi.org/10.5929/2014.4.2.9"
    },
    {
      id: "ref-7",
      citation: "Gregg, E. A., Steinberg, D., & Elzinga, C. (2022). Harnessing AI for conservation: Principles, practice, and priorities. Biodiversity and Conservation, 31, 2875–2892.",
      url: "https://doi.org/10.1007/s10531-022-02461-w"
    },
    {
      id: "ref-8",
      citation: "Leopold, A. (1949). A sand county almanac. Oxford University Press."
    },
    {
      id: "ref-9",
      citation: "Plumwood, V. (1993). Feminism and the mastery of nature. Routledge."
    },
    {
      id: "ref-10",
      citation: "Pooley, S., Barua, M., Beinart, W., Dickman, A., Holmes, G., Lorimer, J., & Marvin, G. (2021). An interdisciplinary review of current research and future directions in human–wildlife conflict. Conservation Biology, 35(3), 803–813.",
      url: "https://doi.org/10.1111/cobi.13660"
    },
    {
      id: "ref-11",
      citation: "Stilgoe, J., Owen, R., & Macnaghten, P. (2013). Developing a framework for responsible innovation. Research Policy, 42(9), 1568–1580.",
      url: "https://doi.org/10.1016/j.respol.2013.05.008"
    },
    {
      id: "ref-12",
      citation: "Vom Brocke, J., Hevner, A. R., & Maedche, A. (2020). Design science research and analytics: The interplay. Journal of Business Analytics, 3(2), 81–91.",
      url: "https://doi.org/10.1080/2573234X.2020.1760548"
    },
    {
      id: "ref-13",
      citation: "Warren, K. J. (2000). Ecofeminist philosophy: A western perspective on what it is and why it matters. Rowman & Littlefield."
    }
  ] as EssayReference[]
};
