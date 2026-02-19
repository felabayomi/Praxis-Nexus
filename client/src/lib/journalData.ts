import type { JournalEntry, Reference } from "@shared/schema";

export const journalData: JournalEntry = {
  id: "edd-ai-inquiry-2026",
  projectTitle: "AI, Conservation, and the Reconfiguration of Human–Wildlife Relations",
  cohortTheme: "EdD Inquiry on AI's Ecological and Economic Entanglements",
  author: "Felix Abayomi",
  introduction: [
    {
      id: "intro-1",
      type: "paragraph",
      content: "At the outset of this inquiry, I am intentionally decelerating my approach to observe how artificial intelligence (AI) is already entangled within conservation practices, environmental governance, and human–wildlife relations (Akbaş & Koklu, 2025; Willer et al., 2025). Rather than framing AI as a neutral or solely technical tool, I begin with an attitude of curiosity and openness to complexity (Sandbrook et al., 2019)."
    },
    {
      id: "intro-2",
      type: "paragraph",
      content: "I'm particularly interested in how AI manifests across ecological and economic systems—through data collection, automation, remote sensing, and predictive modeling—and how these systems reconfigure land use, habitat surveillance, energy infrastructures, and patterns of human–wildlife conflict in order to establish the problem landscape (Arts et al., 2015; Crawford, 2021; Olawade et al., 2024; Sandbrook et al., 2019)."
    },
    {
      id: "intro-3",
      type: "paragraph",
      content: "This slow inquiry invites me to examine the visibility and invisibility of AI in environmental contexts. In some cases, AI is visibly shaping decisions, such as in drone-based animal monitoring (Pedrazzi et al., 2025; Priyambodo et al., 2026), where image recognition and tracking algorithms alter how landscapes are surveyed and managed. In other contexts, AI's presence is more ambient or extractive, embedded in data infrastructures whose ecological cost—through energy consumption and material extraction—remains largely unseen."
    },
    {
      id: "intro-4",
      type: "paragraph",
      content: "My inquiry follows a flexible weekly pathway that emphasizes reflection over resolution. In these first two weeks, I will attend to the foundational lenses of resources, habitat, and conflict as they relate to AI's embeddedness in conservation systems. This includes examining where AI is deployed (e.g., in predicting human–elephant conflict zones), what kinds of knowledge it privileges or excludes, and what assumptions about efficiency and optimization underpin its use."
    },
    {
      id: "intro-5",
      type: "paragraph",
      content: "Crucially, I'm also beginning to map out which stakeholders are involved in shaping, deploying, or contesting these technologies. For example, marine mammal conservation programs involve collaboration between AI researchers, local fishers, and environmental regulators—a model that contrasts sharply with top-down, techno-solutionist interventions (Bogomolni et al., 2025). Similarly, AI tools integrated into food system hazard mitigation must be critically assessed for their implications on livelihoods and ecological justice."
    },
    {
      id: "intro-6",
      type: "paragraph",
      content: "By noticing these tensions and reflecting on them early, I aim not to resolve them but to bring them into sharper focus. This inquiry is a process of staying with complexity, recognizing that AI in environmental systems is neither inherently liberatory nor inherently extractive—but deeply contextual, political, and relational (Arts et al., 2015; Crawford, 2021; Latour, 2004; Sandbrook et al., 2019)."
    }
  ],
  inquiryQuestions: [
    {
      id: "iq-framing",
      title: "Framing the Inquiry: AI, Ecology, and Economy in Human–Wildlife Conflict",
      icon: "brain",
      content: [
        {
          id: "iq-intro",
          type: "paragraph",
          content: "This inquiry explores how ecological disruption and economic development together intensify human–wildlife conflict and how AI tools might mediate these tensions. At its core, the inquiry asks:"
        },
        {
          id: "iq-questions",
          type: "list",
          content: "",
          items: [
            "How do resource use, habitat change, and economic development contribute to human–wildlife conflict?",
            "How do ecological impacts intersect with economic consequences such as livelihoods, funding, and industry practices?",
            "How might AI tools reshape monitoring, mitigation, and investment decisions affecting both wildlife and human communities?"
          ]
        }
      ]
    },
    {
      id: "iq-conflict",
      title: "Conflict Lens",
      icon: "alert-triangle",
      content: [
        {
          id: "iq-conflict-1",
          type: "paragraph",
          content: "Research shows that land-use change, deforestation, and agricultural expansion lead to shrinking wildlife habitats, forcing animals into closer contact with humans (Akbaş & Koklu, 2025; Priyambodo et al., 2026; Woodroffe & Rabinowitz, 2005). This intensifies crop damage, livestock predation, and retaliatory killings of wildlife, escalating ecological degradation and social unrest."
        }
      ]
    },
    {
      id: "iq-livelihoods",
      title: "Livelihoods Lens",
      icon: "home",
      content: [
        {
          id: "iq-livelihoods-1",
          type: "paragraph",
          content: "Human–wildlife conflict (HWC) disproportionately affects rural communities whose livelihoods depend on agriculture or pastoralism. Crop losses, reduced income, and food insecurity are common, especially in regions where conservation policies limit traditional mitigation practices (Olawade et al., 2024; Sandbrook et al., 2019; Madden, 2007; Srivastava, 2023). The economic burden falls unequally, often exacerbating pre-existing inequities (Harris & Nhleko, 2023)."
        }
      ]
    },
    {
      id: "iq-investment",
      title: "Investment Lens",
      icon: "trending-up",
      content: [
        {
          id: "iq-investment-1",
          type: "paragraph",
          content: "Public and private investments—whether in conservation, agriculture, or infrastructure—play a pivotal role. Decisions about where to fund roads, mines, or wildlife corridors influence the scale and geography of HWC. Similarly, global funding for conservation and the design of economic incentives can either support coexistence or deepen conflict (Bogomolni et al., 2025; Willer et al., 2025; Rands & Vira, 2010)."
        }
      ]
    },
    {
      id: "iq-ai-role",
      title: "The Role of AI",
      icon: "cpu",
      content: [
        {
          id: "iq-ai-1",
          type: "paragraph",
          content: "AI tools are increasingly used in wildlife monitoring (e.g., drones, camera traps), conflict prediction, and policy modelling. These technologies can enhance early-warning systems and inform targeted interventions. However, they also raise ethical questions around surveillance, data ownership, and unequal access (Crawford, 2021; Pedrazzi et al., 2025; Stilgoe et al., 2013). Economically, AI may shift how resources are allocated—potentially prioritising technocratic solutions over community-led approaches."
        }
      ]
    },
    {
      id: "iq-reflection",
      title: "Reflection Notes for Discussion",
      icon: "message-circle",
      content: [
        {
          id: "iq-ref-insight",
          type: "paragraph",
          content: "Emerging Insight: Human–wildlife conflict cannot be understood solely as an ecological or economic problem; it is a deeply entangled socio-ecological challenge shaped by policy, investment, and power."
        },
        {
          id: "iq-ref-tension",
          type: "paragraph",
          content: "Unresolved Tension: The same AI systems that promise predictive efficiency and improved conservation outcomes may reinforce extractive, top-down decision-making that excludes local voices."
        },
        {
          id: "iq-ref-question",
          type: "paragraph",
          content: "One Question I'm Not Ready to Answer: How can AI systems be co-designed with communities to ensure they serve both ecological sustainability and human dignity?"
        }
      ]
    }
  ],
  methodsPathway: [
    {
      id: "mp-framing",
      title: "Framing the Inquiry: AI, Ecology, and Economy in Human–Wildlife Conflict",
      icon: "brain",
      content: [
        {
          id: "mp-intro-1",
          type: "paragraph",
          content: "This inquiry examines how ecological disruption and economic development intersect to intensify human–wildlife conflict (HWC), and how artificial intelligence (AI) technologies may mediate, reshape, or potentially exacerbate these tensions. Rather than treating AI as a neutral technical instrument, the study situates it within broader systems of infrastructure, capital investment, governance, and power (Crawford, 2021). The methodological approach therefore integrates ecological analysis, political economy, and ethical inquiry (Stilgoe, Owen, & Macnaghten, 2013)."
        },
        {
          id: "mp-intro-2",
          type: "paragraph",
          content: "At its core, the inquiry is guided by three interrelated questions:"
        },
        {
          id: "mp-intro-questions",
          type: "list",
          content: "",
          items: [
            "How do resource use, habitat change, and economic development contribute to human–wildlife conflict? (Treves & Karanth, 2003)",
            "How do ecological impacts intersect with economic consequences such as livelihoods, funding structures, and industry practices? (Distefano, 2005)",
            "How might AI tools reshape monitoring, mitigation, and investment decisions affecting both wildlife and human communities? (Reynolds, 2024)"
          ]
        },
        {
          id: "mp-intro-3",
          type: "paragraph",
          content: "These questions frame HWC as a socio-ecological phenomenon shaped by land-use change, economic incentives, and policy priorities. AI technologies—such as predictive analytics, wildlife monitoring systems, and automated detection tools—are analyzed not only for their technical capabilities but also for their material requirements, governance implications, and ethical consequences (Ullah, Saqib, & Xiong, 2024)."
        },
        {
          id: "mp-intro-4",
          type: "paragraph",
          content: "The learning pathway proceeds through three primary analytical lenses—conflict, livelihoods, and investment—while maintaining sustained attention to the role of AI across each domain. Structured reflection and case comparison support the development of a coherent analytical framework that prepares the inquiry for deeper synthesis."
        }
      ]
    },
    {
      id: "mp-conflict",
      title: "Conflict Lens",
      icon: "alert-triangle",
      content: [
        {
          id: "mp-conflict-1",
          type: "paragraph",
          content: "The conflict lens centers the ecological dimensions of human–wildlife conflict. Research demonstrates that deforestation, agricultural expansion, mining, infrastructure development, and urban encroachment shrink wildlife habitats and disrupt migratory pathways (Treves & Karanth, 2003). As habitats fragment and ecological corridors are severed, animals are forced into closer proximity with human settlements. The result is increased crop damage, livestock predation, retaliatory killings, and cycles of ecological degradation and social unrest (Madden, 2007)."
        },
        {
          id: "mp-conflict-2",
          type: "paragraph",
          content: "This lens examines how land-use decisions and resource extraction are embedded within broader development models that prioritize economic growth (Woodroffe, Thirgood, & Rabinowitz, 2005). Infrastructure projects such as roads, dams, or industrial expansion reshape landscapes in ways that intensify human–wildlife interaction. Conflict therefore emerges not as an isolated ecological problem but as a structural outcome of development pathways and governance choices (Lawson & Nguyen-Van, 2020)."
        },
        {
          id: "mp-conflict-3",
          type: "paragraph",
          content: "Within this analytical frame, AI-enabled monitoring systems are examined for their capacity to identify conflict hotspots, predict animal movement, and inform targeted interventions (Griffin, 2024). Tools such as drones, camera traps, acoustic sensors, and predictive modeling platforms promise enhanced data accuracy and early-warning capabilities (Pedrazzi et al., 2025). However, the inquiry interrogates whether these tools address root causes—such as habitat loss and economic expansion—or primarily respond to symptoms of deeper ecological disruption (Auster & Brazier, 2021)."
        },
        {
          id: "mp-conflict-4",
          type: "paragraph",
          content: "The conflict lens therefore situates AI within a landscape already shaped by structural pressures. It asks whether technological intervention meaningfully reduces ecological harm or whether it operates within—and potentially stabilizes—development models that continue to generate conflict (Knight et al., 2019)."
        }
      ]
    },
    {
      id: "mp-livelihoods",
      title: "Livelihoods Lens",
      icon: "home",
      content: [
        {
          id: "mp-livelihoods-1",
          type: "paragraph",
          content: "The livelihoods lens foregrounds the human dimensions of HWC, particularly the disproportionate burden borne by rural and agrarian communities. Crop destruction, livestock loss, reduced income, and food insecurity frequently accompany intensified wildlife encounters (Li et al., 2023). In many regions, conservation policies restrict traditional mitigation strategies, further constraining community responses (Abayomi & Beryllinda, 2017)."
        },
        {
          id: "mp-livelihoods-2",
          type: "paragraph",
          content: "Economic vulnerability is unevenly distributed. Smallholder farmers and pastoralists often absorb the costs of conservation-driven land use restrictions while receiving limited compensation. As a result, conflict becomes both ecological and socio-economic (Manfredo & Dayer, 2010). The livelihoods lens examines how governance structures allocate risk and responsibility and how economic losses are addressed—or neglected—within conservation policy (Bennett & Dearden, 2014)."
        },
        {
          id: "mp-livelihoods-3",
          type: "paragraph",
          content: "AI tools enter this landscape as potential mediators. Predictive systems may reduce crop loss through early-warning alerts, while monitoring technologies can inform more targeted interventions (Akbaş & Koklu, 2025). Yet these tools also introduce new dynamics. Data ownership, surveillance practices, and access to predictive analytics may concentrate authority among state agencies, private firms, or international organizations (Hanna et al., 2025). Communities may become subjects of technological monitoring rather than partners in co-design (Ossa et al., 2024)."
        },
        {
          id: "mp-livelihoods-4",
          type: "paragraph",
          content: "This strand of the inquiry emphasizes relational accountability. It asks whether AI systems are designed with communities in ways that respect local knowledge, cultural practices, and autonomy (Tom, Huaman, & McCarty, 2019). It also interrogates whether AI adoption shifts attention away from structural economic inequities toward technocratic management of conflict. By centering livelihoods, the inquiry ensures that technological evaluation remains grounded in human dignity and distributive justice (Harris et al., 2023)."
        }
      ]
    },
    {
      id: "mp-investment",
      title: "Investment Lens",
      icon: "trending-up",
      content: [
        {
          id: "mp-investment-1",
          type: "paragraph",
          content: "The investment lens examines how financial flows shape ecological outcomes and technological deployment (Reynolds, 2024). Public funding, philanthropic conservation finance, development spending, and private capital investments influence where and how AI systems are implemented. Decisions to fund surveillance infrastructure, predictive analytics, or broadband expansion are not neutral; they reflect priorities about efficiency, innovation, and measurable outcomes (Griffin, 2024)."
        },
        {
          id: "mp-investment-2",
          type: "paragraph",
          content: "Infrastructure investments—such as roads, mining operations, or agricultural intensification—often contribute directly to habitat fragmentation and conflict escalation. At the same time, funding streams may support AI-driven monitoring initiatives framed as sustainable solutions. This duality raises a central question: do investment priorities address the structural drivers of conflict, or do they favor technological mitigation within growth-oriented development models?"
        },
        {
          id: "mp-investment-3",
          type: "paragraph",
          content: "The inquiry maps capital flows associated with AI deployment in conservation contexts. It analyzes how public–private partnerships, venture capital, and philanthropic initiatives influence the design and uptake of technological tools. Particular attention is given to the narratives accompanying these investments—innovation, modernization, green growth—and how they align or conflict with ecological resilience goals."
        },
        {
          id: "mp-investment-4",
          type: "paragraph",
          content: "This lens also considers the material resource demands of AI infrastructure. Data centers, cloud computing systems, satellite networks, and sensor arrays require energy, land, water, and mineral extraction. The ecological footprint of these systems complicates claims that AI inherently advances sustainability. Investment decisions therefore shape not only technological adoption but also resource competition and environmental impact."
        }
      ]
    },
    {
      id: "mp-ai-role",
      title: "The Role of AI Across Lenses",
      icon: "cpu",
      content: [
        {
          id: "mp-ai-1",
          type: "paragraph",
          content: "Across conflict, livelihoods, and investment lenses, AI emerges as both opportunity and tension. On one hand, AI tools offer enhanced monitoring accuracy, improved predictive modeling, and data-driven policy insights. They may enable more targeted interventions, reduce unnecessary harm, and inform adaptive management strategies."
        },
        {
          id: "mp-ai-2",
          type: "paragraph",
          content: "On the other hand, AI systems depend on infrastructure expansion and capital investment that carry ecological and social consequences. High-energy computing, broadband expansion into remote areas, and extraction of rare earth minerals for hardware production introduce new environmental pressures. Moreover, algorithmic systems can centralize authority, privilege quantitative indicators, and marginalize relational or Indigenous knowledge systems."
        },
        {
          id: "mp-ai-3",
          type: "paragraph",
          content: "A recurring tension surfaces: Is AI serving ecological resilience, or reinforcing capital accumulation under sustainability rhetoric? The inquiry does not assume a singular answer. Instead, it evaluates AI deployment through evidence-based analysis of infrastructure demands, funding structures, governance arrangements, and community inclusion."
        },
        {
          id: "mp-ai-4",
          type: "paragraph",
          content: "Ethical concerns remain central. Surveillance technologies raise questions about consent and autonomy. Data ownership and governance frameworks influence who benefits from predictive capabilities. Co-design processes become critical to ensuring that AI supports rather than overrides community knowledge and agency."
        }
      ]
    },
    {
      id: "mp-reflective",
      title: "Reflective Practice and Evidence Development",
      icon: "compass",
      content: [
        {
          id: "mp-reflective-1",
          type: "paragraph",
          content: "The learning pathway integrates structured reflection with empirical case analysis. Each week involves engagement with scholarly literature, policy documents, technological case studies, or tool experimentation. Following each engagement, reflective analysis documents emerging insights, contradictions, and unresolved questions."
        },
        {
          id: "mp-reflective-2",
          type: "paragraph",
          content: "This iterative reflection strengthens interpretive rigor and builds a cumulative evidence base. Rather than pursuing breadth, the inquiry prioritizes depth and coherence. Reflections trace how ecological impacts intersect with economic incentives and how AI systems mediate these intersections."
        },
        {
          id: "mp-reflective-3",
          type: "paragraph",
          content: "Case evidence is gathered through disciplined selection of two to three relevant examples of AI-enabled conservation or conflict mitigation initiatives. Each case is analyzed using a consistent framework: ecological context, infrastructural requirements, funding sources, governance structure, community involvement, and preliminary outcomes. This comparative approach enables identification of patterns and divergences across contexts."
        },
        {
          id: "mp-reflective-4",
          type: "paragraph",
          content: "Peer dialogue further supports thematic clustering and pattern recognition. Differences in interpretation are treated as analytically generative, clarifying assumptions and expanding conceptual range."
        }
      ]
    },
    {
      id: "mp-emerging",
      title: "Emerging Insight and Ongoing Tensions",
      icon: "sparkles",
      content: [
        {
          id: "mp-emerging-1",
          type: "paragraph",
          content: "An emerging insight from this phase is that human–wildlife conflict cannot be reduced to a single domain. It is a deeply entangled socio-ecological challenge shaped by land-use policy, economic development, infrastructure investment, governance structures, and technological mediation. AI tools operate within these systems rather than outside them."
        },
        {
          id: "mp-emerging-2",
          type: "paragraph",
          content: "An unresolved tension remains visible. The same AI systems that promise predictive efficiency and improved conservation outcomes may also reinforce extractive, top-down decision-making. Efficiency gains may obscure inequitable power distributions or shift attention away from structural ecological degradation."
        },
        {
          id: "mp-emerging-3",
          type: "paragraph",
          content: "One persistent question continues to guide the inquiry: How can AI systems be co-designed with communities to ensure they serve both ecological sustainability and human dignity? This question foregrounds relational accountability and resists technological determinism."
        }
      ]
    },
    {
      id: "mp-conclusion",
      title: "Conclusion of Methods Phase",
      icon: "target",
      content: [
        {
          id: "mp-conclusion-1",
          type: "paragraph",
          content: "The Methods / Learning Pathway establishes a structured and ethically attentive framework for analyzing AI within human–wildlife conflict. By integrating ecological disruption, economic incentives, capital investment, and governance dynamics, the inquiry moves beyond simplistic technological evaluation toward systemic analysis."
        },
        {
          id: "mp-conclusion-2",
          type: "paragraph",
          content: "This phase does not seek definitive answers. Instead, it strengthens the analytical frame, clarifies tensions, and builds an evidence foundation for subsequent synthesis. Through disciplined reflection, comparative case analysis, and multi-lens evaluation, the inquiry prepares to advance toward deeper examination of ecological impacts, justice implications, and the political economy of AI-enabled conservation."
        }
      ]
    }
  ],
  months: [
    {
      id: "month-1",
      monthNumber: 1,
      title: "Framing the Inquiry",
      theme: "What Do We Want to Learn and How?",
      sections: [
        {
          id: "m1-inquiry",
          title: "Inquiry Question",
          icon: "brain",
          content: [
            {
              id: "m1-q1",
              type: "paragraph",
              content: "How is AI reconfiguring conservation governance and human–wildlife conflict through ecological, economic, and political entanglements—and what tensions or values are made visible or obscured in the process?"
            },
            {
              id: "m1-q2",
              type: "paragraph",
              content: "This guiding question reflects a move from general curiosity toward a more focused exploration of how AI systems intersect with land use, habitat monitoring, energy demand, community livelihoods, and conservation ethics."
            }
          ]
        },
        {
          id: "m1-assumptions",
          title: "Assumptions I Hold About AI",
          icon: "search",
          content: [
            {
              id: "m1-a1",
              type: "list",
              content: "",
              items: [
                "That AI is not neutral—it encodes values such as efficiency, control, and optimization that may conflict with the rhythms of living ecological systems.",
                "That AI's role in environmental systems is both promising and problematic—capable of enabling large-scale monitoring while also obscuring local knowledge and justice concerns.",
                "That the current deployment of AI in conservation often lacks full accountability for its long-term ecological or social consequences."
              ]
            }
          ]
        },
        {
          id: "m1-influence",
          title: "Where is AI Already Influencing My Field?",
          icon: "leaf",
          content: [
            {
              id: "m1-i1",
              type: "list",
              content: "",
              items: [
                "In conservation, AI is being used in drone-based wildlife tracking (Pedrazzi et al., 2025), predictive models for human–elephant conflict (Priyambodo et al., 2026), and ecological surveillance systems.",
                "These tools are shaping how landscapes are managed, how decisions are made, and who gets included—or excluded—from the process.",
                "Marine mammal conservation (Bogomolni et al., 2025) and food system planning (Willer et al., 2025) offer examples of cross-sector collaboration or friction."
              ]
            }
          ]
        },
        {
          id: "m1-excites",
          title: "What Excites Me?",
          icon: "sparkles",
          content: [
            {
              id: "m1-e1",
              type: "list",
              content: "",
              items: [
                "The potential to reveal previously invisible patterns in human–wildlife conflict and habitat change.",
                "Opportunities to integrate data-rich insights with ethical, community-driven conservation.",
                "AI's capacity to support anticipatory environmental planning—if governed justly."
              ]
            }
          ]
        },
        {
          id: "m1-concerns",
          title: "What Concerns or Resistance Do I Notice?",
          icon: "alert-triangle",
          content: [
            {
              id: "m1-c1",
              type: "list",
              content: "",
              items: [
                "The extractive logic of AI infrastructures (energy use, data colonialism, technical elitism).",
                "The risk of reinforcing top-down or techno-solutionist approaches that marginalize Indigenous knowledge, local stewardship, or ecological complexity.",
                "The invisibility of AI's long-term ecological cost—both material (e.g., server farms) and conceptual (e.g., narrowing what counts as \"efficient\")."
              ]
            }
          ]
        },
        {
          id: "m1-purpose",
          title: "Purpose of My Inquiry",
          icon: "compass",
          content: [
            {
              id: "m1-p1",
              type: "paragraph",
              content: "To surface and explore how AI is actively reshaping conservation governance and human–wildlife relations—especially in ways that might remain unseen or under-theorized. This includes investigating both visible impacts (like automation and land-use decisions) and invisible ones (like energy demands or erased forms of knowledge)."
            }
          ]
        },
        {
          id: "m1-scope",
          title: "Scope and Boundaries",
          icon: "book-open",
          content: [
            {
              id: "m1-s1",
              type: "list",
              content: "",
              items: [
                "Focuses on AI in conservation and environmental governance, with attention to conflict zones (e.g., elephants, marine mammals), data infrastructures, and economic systems.",
                "Examines global and local scales, while remaining grounded in stakeholder tensions.",
                "Uses reflective journaling and case-based analysis as primary methods."
              ]
            }
          ]
        },
        {
          id: "m1-objectives",
          title: "Objectives",
          icon: "target",
          content: [
            {
              id: "m1-o1",
              type: "list",
              content: "",
              items: [
                "Surface ethical tensions in AI-based conservation practices.",
                "Explore stakeholder perspectives and unequal power dynamics in technology design and deployment.",
                "Stay with complexity rather than seeking premature solutions—honoring ecological and relational insights."
              ]
            }
          ]
        },
        {
          id: "m1-process",
          title: "Planned Exploration Process",
          icon: "refresh-cw",
          content: [
            {
              id: "m1-pr1",
              type: "list",
              content: "",
              items: [
                "Weekly journal reflections using the inquiry journal framework (resources, conflict, livelihoods, justice).",
                "Engagement with case studies and critical AI/environmental literature.",
                "Participation in group dialogue to test and evolve ideas.",
                "Integration of theory (e.g., Crawford, Latour, Sandbrook) with real-world examples (e.g., marine conservation, elephant conflict mapping)."
              ]
            }
          ]
        }
      ]
    }
  ],
  references: [
    {
      id: "ref-1",
      authors: "Akbaş, I., & Koklu, M.",
      year: "2025",
      title: "Artificial intelligence and deep learning approaches to human-wildlife conflict: A bibliometric analysis (2015-2024)",
      source: "ResearchGate Publication",
      type: "report"
    },
    {
      id: "ref-2",
      authors: "Arts, K., van der Wal, R., & Adams, W. M.",
      year: "2015",
      title: "Digital technology and the conservation of nature",
      source: "Ambio, 44 Suppl 4(Suppl 4), 661–673",
      doi: "10.1007/s13280-015-0705-1",
      type: "journal"
    },
    {
      id: "ref-3",
      authors: "Bogomolni, A. L., Cammen, K. M., & Jackman, J.",
      year: "2025",
      title: "Editorial: Rebounding marine mammal species and conservation recovery challenges",
      source: "Frontiers in Conservation Science, 6",
      doi: "10.3389/fcosc.2025.1565870",
      type: "journal"
    },
    {
      id: "ref-4",
      authors: "Crawford, K.",
      year: "2021",
      title: "The atlas of AI: Power, politics, and the planetary costs of artificial intelligence",
      source: "Yale University Press",
      type: "book"
    },
    {
      id: "ref-5",
      authors: "Griffin, G.",
      year: "2024",
      title: "Conservation technology: How technology protects wildlife",
      source: "Forestry.com",
      type: "website"
    },
    {
      id: "ref-6",
      authors: "Hanna, M. G., Pantanowitz, L., Jackson, B., Palmer, O., Visweswaran, S., Pantanowitz, J., Deebajah, M., & Rashidi, H. H.",
      year: "2025",
      title: "Ethical and bias considerations in artificial intelligence/machine learning",
      source: "Modern Pathology, 38(3)",
      doi: "10.1016/j.modpat.2024.100686",
      type: "journal"
    },
    {
      id: "ref-7",
      authors: "Harris, N. C., Wilkinson, C. E., Fleury, G., & Nhleko, Z. N.",
      year: "2023",
      title: "Responsibility, equity, justice, and inclusion in dynamic human–wildlife interactions",
      source: "Frontiers in Ecology and the Environment",
      doi: "10.1002/fee.2603",
      type: "journal"
    },
    {
      id: "ref-8",
      authors: "Latour, B.",
      year: "2004",
      title: "Why has critique run out of steam? From matters of fact to matters of concern",
      source: "Critical Inquiry",
      doi: "10.1086/421123",
      type: "journal"
    },
    {
      id: "ref-9",
      authors: "Madden, F.",
      year: "2007",
      title: "Human-wildlife conflict: A case for global collaboration",
      source: "Report",
      type: "report"
    },
    {
      id: "ref-10",
      authors: "Olawade, D. B., Wada, O. Z., Ige, A. O., Egbewole, B. I., Olojo, A., & Oladapo, B. I.",
      year: "2024",
      title: "Artificial intelligence in environmental monitoring: Advancements, challenges, and future directions",
      source: "Hygiene and Environmental Health Advances, 12, 100114",
      doi: "10.1016/j.heha.2024.100114",
      type: "journal"
    },
    {
      id: "ref-11",
      authors: "Pedrazzi, L., Naik, H., Sandbrook, C., Lurgi, M., Fürtbauer, I., & King, A.",
      year: "2025",
      title: "Advancing animal behaviour research using drone technology",
      source: "Animal Behaviour, 222, 123147",
      doi: "10.1016/j.anbehav.2025.123147",
      type: "journal"
    },
    {
      id: "ref-12",
      authors: "Priyambodo, P., Rustiati, E. L., Alfandy, D. D., Hamidatul 'Aliyah, S., & Permatasari, N.",
      year: "2026",
      title: "Global research trends on human-elephant conflicts and sustainable plantation management: A 30-year bibliometric study",
      source: "Journal of Bioresources and Environmental Sciences, 0(0)",
      doi: "10.61435/jbes.2026.19978",
      type: "journal"
    },
    {
      id: "ref-13",
      authors: "Rands, M. R. W., Adams, W. M., Bennun, L., Butchart, S. H. M., Clements, A., Coomes, D., Entwistle, A., Hodge, I., Kapos, V., Scharlemann, J. P. W., Sutherland, W. J., & Vira, B.",
      year: "2010",
      title: "Biodiversity conservation: Challenges beyond 2010",
      source: "Science, 329(5997), 1298–1303",
      doi: "10.1126/science.1189138",
      type: "journal"
    },
    {
      id: "ref-14",
      authors: "Sandbrook, C., Fisher, J. A., Holmes, G., Luque-Lora, R., & Keane, A.",
      year: "2019",
      title: "The global conservation movement is diverse but not divided",
      source: "Nature Sustainability, 2(4), 316–323",
      doi: "10.1038/s41893-019-0267-5",
      type: "journal"
    },
    {
      id: "ref-15",
      authors: "Srivastava, S.",
      year: "2023",
      title: "On the edge of the wild: Confrontation between humans and wildlife – A qualitative study of human wildlife conflict",
      source: "Jaipuria Institute of Management, Jaipur",
      doi: "10.2139/ssrn.4513132",
      type: "report"
    },
    {
      id: "ref-16",
      authors: "Stilgoe, J., Owen, R., & Macnaghten, P.",
      year: "2013",
      title: "Developing a framework for responsible innovation",
      source: "Research Policy, 42(9), 1568–1580",
      doi: "10.1016/j.respol.2013.05.008",
      type: "journal"
    },
    {
      id: "ref-17",
      authors: "Willer, D., Short, S., Khripko, D., Bremner, J., Aldridge, D., Sutherland, W., & Petrovan, S.",
      year: "2025",
      title: "Challenges and opportunities in leveraging an existing systematic evidence database for mitigating hazards to the global food system",
      source: "Royal Society Open Science, 12",
      doi: "10.1098/rsos.241645",
      type: "journal"
    },
    {
      id: "ref-18",
      authors: "Woodroffe, R., Thirgood, S., & Rabinowitz, A.",
      year: "2005",
      title: "People and wildlife, conflict or co-existence?",
      source: "Cambridge University Press",
      doi: "10.1017/CBO9780511614774",
      type: "book"
    },
    {
      id: "ref-19",
      authors: "Treves, A., & Karanth, K. U.",
      year: "2003",
      title: "Human-carnivore conflict and perspectives on carnivore management worldwide",
      source: "Conservation Biology, 17(6), 1491–1499",
      type: "journal"
    },
    {
      id: "ref-20",
      authors: "Distefano, E.",
      year: "2005",
      title: "Human-Wildlife Conflict worldwide: Collection of case studies, analysis of management strategies and good practices",
      source: "FAO Report",
      type: "report"
    },
    {
      id: "ref-21",
      authors: "Ullah, F., Saqib, S., & Xiong, Y.",
      year: "2024",
      title: "Integrating artificial intelligence in biodiversity conservation: Bridging classical and modern approaches",
      source: "Biodiversity and Conservation",
      doi: "10.1007/s10531-024-02977-9",
      type: "journal"
    },
    {
      id: "ref-22",
      authors: "Reynolds, M.",
      year: "2024",
      title: "AI and investment in wildlife conservation",
      source: "Conservation Finance Review",
      type: "report"
    },
    {
      id: "ref-23",
      authors: "Lawson, E. T., & Nguyen-Van, P.",
      year: "2020",
      title: "Human–wildlife conflict: Linking governance, land use, and livelihood impacts",
      source: "Environmental Policy and Governance",
      type: "journal"
    },
    {
      id: "ref-24",
      authors: "Auster, R. E., & Brazier, R. E.",
      year: "2021",
      title: "Reframing human–wildlife conflict as human–wildlife coexistence",
      source: "People and Nature",
      type: "journal"
    },
    {
      id: "ref-25",
      authors: "Knight, A. T., Cowling, R. M., Rouget, M., Balmford, A., Lombard, A. T., & Campbell, B. M.",
      year: "2019",
      title: "Knowing but not doing: Selecting priority conservation areas and the research–implementation gap",
      source: "Conservation Biology",
      type: "journal"
    },
    {
      id: "ref-26",
      authors: "Li, J., Wang, D., Yin, H., Zhaxi, D., Jiagong, Z., Schaller, G. B., Mishra, C., McCarthy, T. M., Wang, H., Wu, L., Xiao, L., Basang, L., Zhang, Y., Zhou, Y., & Lu, Z.",
      year: "2023",
      title: "Role of Tibetan Buddhist monasteries in snow leopard conservation",
      source: "Conservation Biology, 28(1), 87–94",
      type: "journal"
    },
    {
      id: "ref-27",
      authors: "Abayomi, F. O., & Beryllinda, C.",
      year: "2017",
      title: "Conservation policies and community responses in human–wildlife conflict zones",
      source: "Journal of Rural Studies",
      type: "journal"
    },
    {
      id: "ref-28",
      authors: "Manfredo, M. J., & Dayer, A. A.",
      year: "2010",
      title: "Concepts for exploring the social aspects of human–wildlife conflict in a global context",
      source: "Human Dimensions of Wildlife, 9(4), 1–20",
      type: "journal"
    },
    {
      id: "ref-29",
      authors: "Bennett, N. J., & Dearden, P.",
      year: "2014",
      title: "Why local people do not support conservation: Community perceptions of marine protected area livelihood impacts, governance, and management",
      source: "Marine Policy, 44, 107–116",
      doi: "10.1016/j.marpol.2013.08.017",
      type: "journal"
    },
    {
      id: "ref-30",
      authors: "Tom, L., Huaman, E. S., & McCarty, T. L.",
      year: "2019",
      title: "Indigenous knowledges as vital contributions to sustainability",
      source: "International Review of Education, 65, 1–18",
      type: "journal"
    },
    {
      id: "ref-31",
      authors: "Ossa, G., Bernstein, J., et al.",
      year: "2024",
      title: "Community-centered conservation technology: Co-design frameworks for equitable wildlife monitoring",
      source: "Conservation Science and Practice",
      type: "journal"
    }
  ]
};
