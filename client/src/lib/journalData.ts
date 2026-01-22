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
      authors: "Latour, B.",
      year: "2004",
      title: "Why has critique run out of steam? From matters of fact to matters of concern",
      source: "Critical Inquiry",
      doi: "10.1086/421123",
      type: "journal"
    },
    {
      id: "ref-6",
      authors: "Olawade, D. B., Wada, O. Z., Ige, A. O., Egbewole, B. I., Olojo, A., & Oladapo, B. I.",
      year: "2024",
      title: "Artificial intelligence in environmental monitoring: Advancements, challenges, and future directions",
      source: "Hygiene and Environmental Health Advances, 12, 100114",
      doi: "10.1016/j.heha.2024.100114",
      type: "journal"
    },
    {
      id: "ref-7",
      authors: "Pedrazzi, L., Naik, H., Sandbrook, C., Lurgi, M., Fürtbauer, I., & King, A.",
      year: "2025",
      title: "Advancing animal behaviour research using drone technology",
      source: "Animal Behaviour, 222, 123147",
      doi: "10.1016/j.anbehav.2025.123147",
      type: "journal"
    },
    {
      id: "ref-8",
      authors: "Priyambodo, P., Rustiati, E. L., Alfandy, D. D., Hamidatul 'Aliyah, S., & Permatasari, N.",
      year: "2026",
      title: "Global research trends on human-elephant conflicts and sustainable plantation management: A 30-year bibliometric study",
      source: "Journal of Bioresources and Environmental Sciences, 0(0)",
      doi: "10.61435/jbes.2026.19978",
      type: "journal"
    },
    {
      id: "ref-9",
      authors: "Sandbrook, C., Fisher, J. A., Holmes, G., Luque-Lora, R., & Keane, A.",
      year: "2019",
      title: "The global conservation movement is diverse but not divided",
      source: "Nature Sustainability, 2(4), 316–323",
      doi: "10.1038/s41893-019-0267-5",
      type: "journal"
    },
    {
      id: "ref-10",
      authors: "Willer, D., Short, S., Khripko, D., Bremner, J., Aldridge, D., Sutherland, W., & Petrovan, S.",
      year: "2025",
      title: "Challenges and opportunities in leveraging an existing systematic evidence database for mitigating hazards to the global food system",
      source: "Royal Society Open Science, 12",
      doi: "10.1098/rsos.241645",
      type: "journal"
    }
  ]
};
