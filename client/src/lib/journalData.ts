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
          content: "This inquiry examines how ecological disruption and economic development intersect to intensify human–wildlife conflict (HWC), and how artificial intelligence (AI) technologies may mediate, reshape, or potentially exacerbate these tensions. Rather than treating AI as a neutral technical instrument, the study situates it within broader systems of infrastructure, capital investment, governance, and power (Crawford, 2021). The methodological approach integrates ecological analysis, political economy, and ethical inquiry (Stilgoe et al., 2013)."
        },
        {
          id: "mp-intro-2",
          type: "paragraph",
          content: "The inquiry is guided by three central questions:"
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
          content: "These questions frame HWC as a socio-ecological phenomenon shaped by land-use change, economic incentives, and governance priorities. AI technologies\u2014such as predictive analytics, wildlife monitoring systems, and automated detection tools\u2014are evaluated not only for technical performance but also for their infrastructural demands, governance implications, and distributive consequences (Ullah et al., 2024)."
        },
        {
          id: "mp-intro-4",
          type: "paragraph",
          content: "The learning pathway proceeds through three interconnected lenses: conflict, livelihoods, and investment."
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
          content: "Human\u2013wildlife conflict is strongly linked to habitat loss, agricultural expansion, infrastructure development, and extractive land-use practices (Treves & Karanth, 2003). As ecosystems fragment, wildlife movement shifts toward human settlements, resulting in crop damage, livestock predation, and retaliatory killings (Madden, 2007). Conflict therefore reflects structural development choices rather than isolated ecological incidents."
        },
        {
          id: "mp-conflict-2",
          type: "paragraph",
          content: "This lens examines how economic growth models reshape landscapes and intensify human\u2013wildlife interaction (Woodroffe et al., 2005). AI tools\u2014such as drones, camera traps, and predictive systems\u2014are increasingly used to identify conflict hotspots and improve early-warning systems (Pedrazzi et al., 2025). While these tools may enhance monitoring, the inquiry questions whether they address underlying drivers such as habitat destruction and infrastructure expansion, or primarily manage the symptoms of deeper ecological disruption."
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
          content: "Human\u2013wildlife conflict disproportionately affects rural communities dependent on agriculture and pastoralism (Li et al., 2023). Crop loss, livestock predation, and food insecurity often compound pre-existing economic vulnerability. Conservation policies may restrict traditional mitigation strategies, placing disproportionate burdens on local populations (Bennett & Dearden, 2014)."
        },
        {
          id: "mp-livelihoods-2",
          type: "paragraph",
          content: "AI systems may offer tools for reducing losses through predictive alerts or improved data collection (Akba\u015f & Koklu, 2025). However, these systems also introduce questions of data ownership, surveillance, and access to technological infrastructure (Hanna et al., 2025). Authority may shift toward state agencies, private firms, or external experts, potentially marginalizing community knowledge and decision-making."
        },
        {
          id: "mp-livelihoods-3",
          type: "paragraph",
          content: "This lens foregrounds relational accountability. It asks whether AI systems are co-designed with affected communities and whether technological interventions support human dignity and distributive justice (Tom et al., 2019). The inquiry remains attentive to the risk that AI may reframe conflict as a technocratic management issue rather than a structural socio-economic challenge."
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
          content: "Financial flows significantly shape both ecological disruption and technological deployment (Reynolds, 2024). Public funding, conservation finance, development spending, and private capital influence where AI systems are implemented and which problems are prioritized. Investments in roads, mining, agriculture, or broadband infrastructure can intensify habitat fragmentation while simultaneously funding AI-based mitigation tools."
        },
        {
          id: "mp-investment-2",
          type: "paragraph",
          content: "The inquiry examines whether funding priorities align with ecological resilience or reflect innovation-driven growth narratives (Griffin, 2024). AI infrastructure\u2014including data centers, cloud systems, and sensor networks\u2014requires energy, land, and mineral extraction, raising questions about its environmental footprint (Crawford, 2021)."
        },
        {
          id: "mp-investment-3",
          type: "paragraph",
          content: "This lens asks a central political economy question: Is AI serving ecological sustainability, or reinforcing capital accumulation under the language of green innovation?"
        }
      ]
    },
    {
      id: "mp-emerging",
      title: "Emerging Insight and Tension",
      icon: "sparkles",
      content: [
        {
          id: "mp-emerging-1",
          type: "paragraph",
          content: "An emerging insight is that human\u2013wildlife conflict cannot be understood as solely ecological or economic. It is a deeply entangled socio-ecological challenge shaped by policy, infrastructure investment, funding priorities, and governance structures."
        },
        {
          id: "mp-emerging-2",
          type: "paragraph",
          content: "A central tension remains unresolved. AI systems that promise predictive efficiency and improved conservation outcomes may also reinforce top-down decision-making and extractive development models. Technological intervention may enhance monitoring while leaving structural drivers of conflict intact."
        },
        {
          id: "mp-emerging-3",
          type: "paragraph",
          content: "The guiding question moving forward is therefore ethical and relational: How can AI systems be designed and governed in ways that prioritize ecological sustainability, community dignity, and shared accountability rather than efficiency alone?"
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
      authors: "Reynolds, S. A., Beery, S., Burgess, N., Burgman, M., Butchart, S. H. M., Cooke, S. J., Coomes, D., Danielsen, F., Minin, E. D., Durán, A. P., ... & Sutherland, W. J.",
      year: "2024",
      title: "The potential for AI to revolutionize conservation: A horizon scan",
      source: "Trends in Ecology & Evolution",
      doi: "10.1016/j.tree.2024.11.013",
      type: "journal"
    },
    {
      id: "ref-23",
      authors: "Li, M., Jiang, W., Li, B., & Butt, N.",
      year: "2023",
      title: "Social and cultural aspects of human-wildlife conflicts: Understanding people's attitudes to crop-raiding animals and other wildlife in agricultural systems of the Tibetan Plateau",
      source: "Integrative Conservation, 2(4), 214–225",
      doi: "10.1002/inc3.30",
      type: "journal"
    },
    {
      id: "ref-24",
      authors: "Bennett, N. J., & Dearden, P.",
      year: "2014",
      title: "Why local people do not support conservation: Community perceptions of marine protected area livelihood impacts, governance and management in Thailand",
      source: "Marine Policy, 44, 107–116",
      doi: "10.1016/j.marpol.2013.08.017",
      type: "journal"
    },
    {
      id: "ref-25",
      authors: "Tom, M. N., Huaman, E. S., & McCarty, T. L.",
      year: "2019",
      title: "Indigenous knowledges as vital contributions to sustainability",
      source: "International Review of Education, 65(1), 1–18",
      doi: "10.1007/s11159-019-09770-9",
      type: "journal"
    }
  ]
};
