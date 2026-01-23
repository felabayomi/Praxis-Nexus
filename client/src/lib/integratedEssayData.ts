export interface EssaySection {
  id: string;
  title: string;
  description: string;
  promptGuidance: string;
  content?: string;
  pageLength?: string;
}

export interface EssayReference {
  id: string;
  citation: string;
  url?: string;
}

export const integratedEssayData = {
  title: "Integrated Essay",
  fullTitle: "Integrating Knowledge, Practice, and Self-in-Context through Pragmatic Design Science Research: A Socio-Technical Pathway to Human–Wildlife Coexistence",
  subtitle: "Synthesis of Doctoral Learning Across Three Strands",
  author: "Felix Olusola Abayomi",
  affiliation: "EdD Candidate, Antioch University",
  degree: "Doctor of Education in Educational and Professional Practice",
  
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
      pageLength: "1–1.5 pages",
      promptGuidance: "Introduce the purpose of the integrated essay: to synthesize doctoral learning across Knowledge, Practice, and Self-in-Context strands. Preview how this learning culminates in dissertation readiness.",
      content: `The Doctor of Education in Educational and Professional Practice at Antioch University has provided me with an intellectual and professional space to integrate theory, practice, and self-awareness as a scholar-practitioner. The Integrated Essay represents both reflection and synthesis—an analysis of how my learning across the program's three strands—Knowledge, Practice, and Self-in-Context—has culminated in a coherent scholarly identity and research agenda. Each strand has contributed to my capacity to design, implement, and evaluate complex systems-oriented solutions within my field of human–wildlife conflict resolution and environmental governance.

Through this learning journey, I have come to understand knowledge as relational, dynamic, and pragmatic. The Ed.D. program has challenged me to link philosophical reflection with professional innovation, producing scholarship that serves practical ends while maintaining ethical and ecological sensitivity. The evolution of my scholarly practice has led directly to my dissertation, titled Designing and Recommending a Pragmatic Prototype for Human–Wildlife Interaction and Conflict Resolution: A Socio-Technical Design Science Approach. This study exemplifies my integration of theory and practice, grounded in Pragmatism and Socio-Technical Systems Theory, and implemented through a Design Science Research (DSR) methodology.`
    },
    {
      id: "knowledge-strand",
      title: "Integrating the Knowledge Strand",
      description: "How theoretical and methodological learning informs the dissertation.",
      pageLength: "2–3 pages",
      promptGuidance: "Discuss how engagement with theory, research paradigms, and scholarly literature has shaped the dissertation design. Reference the Paradigm Paper, Theoretical Framework, Literature Review, and Research Design chapters. Connect to pragmatism, ecological systems theory, and socio-technical systems thinking.",
      content: `The Knowledge strand of the Antioch Ed.D. program provided the intellectual foundation for my transformation from practitioner to scholar-practitioner. In early coursework, I explored the philosophical assumptions that guide inquiry, leading me to adopt Pragmatism as my paradigmatic orientation. Pragmatism emphasizes practical consequences as central to meaning and truth; ideas are considered valid when they produce results that work in real contexts (PHILO-notes, 2022). This perspective resonated with my professional experience in conservation and governance, where theory must yield effective outcomes in dynamic, real-world systems.

My Paradigm Paper and Theoretical Framework Paper deepened my understanding of how Pragmatism can integrate with systems-based theoretical approaches. I was drawn to Socio-Technical Systems Theory, which recognizes the interdependence of human and technological elements in organizational and ecological systems. This theoretical alignment enables me to conceptualize human–wildlife conflict not merely as a biological or behavioral issue, but as a systemic challenge requiring coordinated digital, institutional, and community responses.

The Knowledge strand also strengthened my methodological competence. Through coursework and the Methodology Concept Paper, I learned to employ Design Science Research as both a framework for innovation and a mode of inquiry. DSR's iterative cycle of problem identification, artifact design, and evaluation fits naturally within a pragmatic worldview. It allows for the creation of artifacts—such as digital platforms or governance tools—that both embody and generate knowledge. Additionally, the Modified Delphi Study (MDS) complements this approach by engaging experts in validating the design's relevance and ethical grounding. Together, these methodological tools enable me to pursue scholarly rigor and social utility simultaneously.

Through this strand, I also refined my academic writing and analytical reasoning. The Research Design (Chapters 1–3) submission required integrating theory, method, and ethics into a coherent proposal. This exercise reinforced the importance of alignment—ensuring that epistemology, theoretical framing, and methodology cohere conceptually. In sum, the Knowledge strand provided me with the epistemic clarity and methodological discipline necessary to conduct applied, ethically responsible research that addresses practical problems in environmental governance and education.`
    },
    {
      id: "practice-strand",
      title: "Integrating the Practice Strand",
      description: "How applied learning connects to innovation and leadership practice.",
      pageLength: "3–4 pages",
      promptGuidance: "Explain how concept papers and the HWICRM prototype design demonstrate the application of theory to practice. Discuss how design science research methodology bridges knowledge and action. Connect to human-wildlife conflict resolution as applied innovation.",
      content: `The Practice strand has been where theory met the complexities of the field. My professional work with the Wildlife of Africa Conservation Initiative (WACI) and the West Africa Biodiversity and Climate Change (WA BiCC) program offered rich contexts in which to test and refine my understanding of collaboration, innovation, and systems thinking. These experiences underscored the need for tools that enable real-time data sharing, conflict mediation, and cross-sectoral coordination among communities, conservationists, and government agencies.

In the Professional Innovation Design Project, I applied the DSR model to conceptualize a digital governance platform aimed at facilitating human–wildlife conflict mitigation. This project demonstrated how research and design can operate as complementary processes: inquiry informs design, and design generates new insights for inquiry. Working with interdisciplinary teams, I developed functional and ethical specifications for a prototype platform that would support both community-level reporting and institutional decision-making. This experience confirmed the practicality of the Pragmatic paradigm: knowledge becomes meaningful when it improves real conditions of human and ecological coexistence.

The Practice strand also strengthened my leadership and facilitation capacities. I learned to integrate design thinking methodologies, participatory engagement, and systems mapping into collaborative processes. My Coursework Project on Digital Governance for Conservation Systems and Peer Presentation Materials provided further evidence of how applied scholarship can translate into governance innovation. Through these artifacts, I learned to mediate between technical feasibility and social legitimacy—a key competency in designing socio-technical systems.

Moreover, practice-based learning revealed the ethical dimensions of innovation. I became acutely aware that technological interventions can reproduce inequities if not designed inclusively. Thus, my professional practice increasingly emphasized Responsible Innovation and Data Justice, ensuring transparency, accountability, and equity in digital governance systems. The lessons of the Practice strand now underpin my dissertation's design, where user needs (elicited through semi-structured interviews) and expert validation (via the Delphi method) combine to produce a socially responsive and ecologically grounded prototype.`
    },
    {
      id: "self-in-context",
      title: "Integrating the Self-in-Context Strand",
      description: "Reflexivity, ethical awareness, and professional identity development.",
      pageLength: "2–3 pages",
      promptGuidance: "Articulate the evolving self-understanding as a reflective scholar-practitioner. Discuss how ecological ethics, leadership philosophy, and professional reflection shape identity within social-ecological systems. Connect to ecofeminist perspectives and ethical commitments.",
      content: `The Self-in-Context strand has been the most personally transformative aspect of my doctoral journey. It invited me to examine who I am as a scholar, practitioner, and ethical actor within broader social and ecological systems. Through reflective inquiry and engagement with environmental ethics, I learned that my work is inseparable from my values and identity.

My Environmental Ethics Paper explored Deep Ecology, Ecofeminism, and Land Ethic frameworks, which collectively emphasize interdependence, intrinsic value, and moral responsibility toward the more-than-human world. These perspectives reshaped how I understand leadership and innovation. I realized that designing technology for conservation is not merely a technical act—it is a moral and relational practice that requires humility, empathy, and reciprocity.

The Week 13 Observation and Reflection Paper from the virtual Human–Wildlife Conflict workshop reinforced these insights. Participating in collaborative dialogues highlighted how positionality and communication influence collective decision-making. I learned to recognize my own positional authority as a researcher and to practice reflexivity in balancing expert knowledge with community perspectives.

My Professional Reflection and Leadership Philosophy Statement further integrated these lessons by articulating a vision of leadership grounded in ecological consciousness and collaborative governance. This strand has helped me internalize the Antioch commitment to social justice, sustainability, and self-in-context as foundational to educational leadership. It also reinforces the ethical dimension of my dissertation, ensuring that the design of digital systems for human–wildlife coexistence honors both human dignity and ecological integrity.`
    },
    {
      id: "strand-synthesis",
      title: "Synthesis: Integration Across Strands",
      description: "How the three strands interconnect and inform each other.",
      pageLength: "1.5–2 pages",
      promptGuidance: "Demonstrate how Knowledge, Practice, and Self-in-Context strands are not separate but mutually reinforcing. Show how theoretical learning shapes practice, how practice challenges and refines theory, and how reflexivity grounds both in ethical commitment.",
      content: `Across the Knowledge, Practice, and Self-in-Context strands, a clear thread of integration emerges: the synthesis of Pragmatism, Socio-Technical Systems Theory, and Design Science Research as a holistic framework for scholarly practice. Pragmatism provides the philosophical orientation that values actionable knowledge; the Socio-Technical perspective situates that action within complex human–ecological networks; and DSR operationalizes both through iterative design and evaluation.

My professional experiences have continually tested and reinforced these theoretical insights. Each strand has contributed a different dimension of readiness. The Knowledge strand sharpened my intellectual and methodological rigor; the Practice strand honed my ability to apply inquiry in dynamic contexts; and the Self-in-Context strand grounded my actions in ethical reflection and ecological responsibility. Together, they have prepared me to undertake dissertation research that is both scientifically sound and socially responsive.

This integration is not merely conceptual—it represents a transformation in how I approach problems. I now view leadership and scholarship as intertwined practices of design: identifying systemic patterns, collaborating across boundaries, and creating innovations that advance both learning and justice. The Antioch Ed.D. program's structure has allowed me to see education itself as a form of systems design, where theory, practice, and self-awareness converge to produce change.`
    },
    {
      id: "dissertation-connection",
      title: "Connection to Dissertation Design",
      description: "How doctoral learning culminates in the dissertation focus.",
      pageLength: "1–1.5 pages",
      promptGuidance: "Explain how coursework, paradigm development, and professional experience culminate in the dissertation: 'Designing and Recommending a Pragmatic Prototype for Human–Wildlife Interaction and Conflict Resolution: A Socio-Technical Design Science Approach.' Connect pragmatism, DSR, and socio-technical systems theory.",
      content: `My forthcoming dissertation embodies this integrated identity. Grounded in Pragmatism and informed by Socio-Technical Systems Theory, it applies Design Science Research and the Modified Delphi method to develop a prototype for real-time human–wildlife conflict resolution. This research seeks not only to advance digital innovation in conservation governance but also to model an ethically grounded, participatory approach to technological design.

The dissertation design reflects the synthesis of all three strands: the Knowledge strand's theoretical and methodological grounding, the Practice strand's applied innovation, and the Self-in-Context strand's ethical reflexivity. Through this research, I aim to demonstrate how scholar-practitioners can bridge academic inquiry and professional practice in service of both human communities and ecological systems.`
    },
    {
      id: "growth-trajectory",
      title: "Evidence of Growth and Coherence",
      description: "Demonstration of intellectual and professional development.",
      pageLength: "1–1.5 pages",
      promptGuidance: "Demonstrate how the doctoral journey has advanced thinking about educational leadership, digital governance, ecological ethics, and collaborative systems. Show coherence between early coursework and current dissertation focus.",
      content: `As I transition from doctoral coursework to dissertation research, I recognize the profound ways this program has reshaped my professional identity. I have moved from viewing myself primarily as a conservation practitioner to understanding myself as a scholar-practitioner-designer—someone who generates knowledge through action and reflection in service of the common good.

The progression from foundational coursework through the paradigm paper, theoretical framework, literature review, and research design represents a coherent arc of development. Each artifact built upon the last, creating an integrated body of work that demonstrates intellectual growth, methodological sophistication, and ethical commitment. This coherence validates the Antioch Ed.D. model of learning through structured reflection and progressive integration.`
    },
    {
      id: "conclusion",
      title: "Conclusion and Forward View",
      description: "Synthesis and forward-looking reflection on dissertation readiness.",
      pageLength: "1–1.5 pages",
      promptGuidance: "Conclude by affirming readiness for dissertation work. Summarize how the integrated learning across strands prepares for rigorous, ethical, and impactful research. Articulate commitment to scholar-practitioner identity and contribution to professional practice.",
      content: `Ultimately, the integration of Knowledge, Practice, and Self-in-Context has prepared me to contribute meaningfully to both scholarship and practice. It has taught me that rigorous research and moral imagination are not opposing forces but complementary sources of wisdom. The Antioch Ed.D. experience has affirmed that to educate, to design, and to lead are all acts of stewardship—toward knowledge, toward community, and toward the living world we share.

I am ready to undertake dissertation research that honors this integrated learning. Through the design and recommendation of a pragmatic prototype for human–wildlife coexistence, I will demonstrate how scholar-practitioners can generate knowledge that matters—knowledge that works in the world and serves the flourishing of all beings.`
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
      citation: "Baskerville, R., & Myers, M. D. (2015). Design science research in information systems. In K. Lyytinen, M. Newman, & J. DeGross (Eds.), Information systems foundations: Theory building in information systems (pp. 77–109). Springer."
    },
    {
      id: "ref-5",
      citation: "Bronfenbrenner, U. (1979). The ecology of human development: Experiments by nature and design. Harvard University Press."
    },
    {
      id: "ref-6",
      citation: "Bryson, J. M., Crosby, B. C., & Bloomberg, L. (2014). Public value governance: Moving beyond traditional public administration and the new public management. Public Administration Review, 74(4), 445–456."
    },
    {
      id: "ref-7",
      citation: "Checkland, P. (1999). Systems thinking, systems practice. John Wiley & Sons."
    },
    {
      id: "ref-8",
      citation: "Dewey, J. (1938). Logic: The theory of inquiry. Henry Holt & Company."
    },
    {
      id: "ref-9",
      citation: "Freeman, R. E. (1984). Strategic management: A stakeholder approach. Pitman."
    },
    {
      id: "ref-10",
      citation: "Freeman, R. E., & Evan, W. M. (1990). Corporate governance: A stakeholder interpretation. Journal of Behavioral Economics, 19(4), 337–359."
    },
    {
      id: "ref-11",
      citation: "Gaard, G. (2011). Ecofeminism revisited: Rejecting essentialism and re-placing species in a material feminist environmentalism. Feminist Formations, 23(2), 26–53.",
      url: "https://doi.org/10.1353/ff.2011.0017"
    },
    {
      id: "ref-12",
      citation: "Grant, C., & Osanloo, A. (2014). Understanding, selecting, and integrating a theoretical framework in dissertation research. Administrative Issues Journal, 4(2), 12–26.",
      url: "https://doi.org/10.5929/2014.4.2.9"
    },
    {
      id: "ref-13",
      citation: "Gregg, E. A., Steinberg, D., & Elzinga, C. (2022). Harnessing AI for conservation: Principles, practice, and priorities. Biodiversity and Conservation, 31, 2875–2892.",
      url: "https://doi.org/10.1007/s10531-022-02461-w"
    },
    {
      id: "ref-14",
      citation: "Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. MIS Quarterly, 28(1), 75–105."
    },
    {
      id: "ref-15",
      citation: "Jasanoff, S. (2016). The ethics of invention: Technology and the human future. W.W. Norton & Company."
    },
    {
      id: "ref-16",
      citation: "Latour, B. (2005). Reassembling the social: An introduction to actor-network theory. Oxford University Press."
    },
    {
      id: "ref-17",
      citation: "Lejano, R. P., Ingram, H., & Ingram, M. (2013). The power of narrative in environmental networks. MIT Press."
    },
    {
      id: "ref-18",
      citation: "Leopold, A. (1949). A sand county almanac. Oxford University Press."
    },
    {
      id: "ref-19",
      citation: "March, S. T., & Smith, G. F. (1995). Design and natural science research on information technology. Decision Support Systems, 15(4), 251–266."
    },
    {
      id: "ref-20",
      citation: "Noddings, N. (2013). Caring: A relational approach to ethics and moral education (2nd ed.). University of California Press."
    },
    {
      id: "ref-21",
      citation: "PHILO-notes. (2022). Pragmatism: Definition, key ideas, and thinkers.",
      url: "https://www.philonotes.com/"
    },
    {
      id: "ref-22",
      citation: "Plumwood, V. (1993). Feminism and the mastery of nature. Routledge."
    },
    {
      id: "ref-23",
      citation: "Pooley, S., Barua, M., Beinart, W., Dickman, A., Holmes, G., Lorimer, J., & Marvin, G. (2021). An interdisciplinary review of current research and future directions in human–wildlife conflict. Conservation Biology, 35(3), 803–813.",
      url: "https://doi.org/10.1111/cobi.13660"
    },
    {
      id: "ref-24",
      citation: "Rawls, J. (1971). A theory of justice. Harvard University Press."
    },
    {
      id: "ref-25",
      citation: "Schön, D. A. (1983). The reflective practitioner: How professionals think in action. Basic Books."
    },
    {
      id: "ref-26",
      citation: "Star, S. L., & Ruhleder, K. (1996). Steps toward an ecology of infrastructure: Design and access for large information spaces. Information Systems Research, 7(1), 111–134."
    },
    {
      id: "ref-27",
      citation: "Stilgoe, J., Owen, R., & Macnaghten, P. (2013). Developing a framework for responsible innovation. Research Policy, 42(9), 1568–1580.",
      url: "https://doi.org/10.1016/j.respol.2013.05.008"
    },
    {
      id: "ref-28",
      citation: "Vogt, E. Z., Vogt, W. P., & Gardner, H. (2012). When systems meet: An introduction to socio-technical integration. Routledge."
    },
    {
      id: "ref-29",
      citation: "Vom Brocke, J., Hevner, A. R., & Maedche, A. (2020). Design science research and analytics: The interplay. Journal of Business Analytics, 3(2), 81–91.",
      url: "https://doi.org/10.1080/2573234X.2020.1760548"
    },
    {
      id: "ref-30",
      citation: "Warren, K. J. (2000). Ecofeminist philosophy: A western perspective on what it is and why it matters. Rowman & Littlefield."
    },
    {
      id: "ref-31",
      citation: "Wilson, E. O. (1984). Biophilia. Harvard University Press."
    }
  ] as EssayReference[]
};

export function getSectionReadingTime(section: EssaySection): number {
  if (!section.content) return 0;
  const words = section.content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function getTotalReadingTime(): number {
  return integratedEssayData.sections.reduce((total, section) => {
    return total + getSectionReadingTime(section);
  }, 0);
}
