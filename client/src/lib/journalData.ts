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
      id: "mp-intro",
      title: "Introduction and Context",
      icon: "brain",
      content: [
        {
          id: "mp-intro-1",
          type: "paragraph",
          content: "This phase advances the inquiry from initial question framing into a focused examination of the infrastructures and capital flows that sustain AI deployment in conservation and ecological governance. Building on the cohort synthesis, this phase treats AI not as a neutral tool, but as a socio-technical system embedded in power relations, policy narratives, and economic priorities (Baxter & Sommerville, 2011). Central tensions remain visible: AI promises efficiency and predictive capacity, yet may reinforce extractive systems, marginalize Indigenous epistemologies, and externalize ecological costs (Crawford, 2021). The purpose of this phase is to sharpen the analytical frame by examining how material and financial structures shape what AI does and whom it serves (Reynolds, 2024)."
        }
      ]
    },
    {
      id: "mp-lenses",
      title: "Inquiry Focus and Analytical Lenses",
      icon: "search",
      content: [
        {
          id: "mp-lenses-1",
          type: "paragraph",
          content: "The inquiry centers on wildlife monitoring and human\u2013wildlife conflict within broader ecological governance systems. Two analytical lenses guide the work: resources and investments. The resources lens examines energy demand, digital infrastructure expansion, and ecological pressures associated with AI systems (Alotaibi & Nassif, 2024). The investments lens traces conservation funding, development finance, and private capital flows that influence technology adoption and problem framing (Reim & Eckerwall, 2023). Together, these lenses situate AI within political economy and governance structures rather than treating it as a purely technical intervention (Denzin & Cannella, 2024)."
        }
      ]
    },
    {
      id: "mp-framework",
      title: "Methodological Framework",
      icon: "compass",
      content: [
        {
          id: "mp-framework-1",
          type: "paragraph",
          content: "Four methodological strands structure the learning pathway. Infrastructure mapping identifies the material systems\u2014data centers, cloud computing, sensors, satellites, and broadband networks\u2014that enable AI-enabled conservation (Stephenson & Januchowski-Hartley, 2020). Capital flow analysis traces funding streams and investment incentives that shape deployment priorities (Ullah & Xiong, 2024). Policy alignment review examines how AI is justified within environmental and national strategy documents, including sustainability and innovation narratives (Stilgoe & Macnaghten, 2013). Power dynamics assessment analyzes who controls infrastructure, funding decisions, and environmental data, with attention to Indigenous knowledge inclusion and relational accountability (Zidny & Eilks, 2020). These strands provide a structured architecture for evidence gathering and critical interpretation."
        }
      ]
    },
    {
      id: "mp-resources",
      title: "Analytical Focus: Resources",
      icon: "cpu",
      content: [
        {
          id: "mp-resources-1",
          type: "paragraph",
          content: "Through the resources lens, the inquiry evaluates AI\u2019s ecological footprint, including energy intensity, carbon emissions, and infrastructure embedded within conservation landscapes (Olawade & Oladapo, 2024). It considers whether AI reduces ecological pressure or displaces environmental costs into energy systems and digital expansion (Griffin, 2024). Resource governance is also examined, particularly who controls access to environmental data and predictive tools, and how authority is redistributed through technological systems (Abrahms & West, 2023)."
        }
      ]
    },
    {
      id: "mp-investments",
      title: "Analytical Focus: Investments",
      icon: "trending-up",
      content: [
        {
          id: "mp-investments-1",
          type: "paragraph",
          content: "Through the investments lens, the inquiry investigates how funding priorities shape AI deployment. Public budgets, philanthropic finance, and private investments are analyzed to determine which technological applications are prioritized and why (Reim & Eckerwall, 2023). The inquiry interrogates whether AI adoption aligns with ecological resilience or reflects economic growth narratives and innovation-driven incentives (Zacher & Rudolph, 2024). Policy alignment is assessed to identify tensions between sustainability commitments and infrastructural realities (Crawford, 2021)."
        }
      ]
    },
    {
      id: "mp-reflective",
      title: "Reflective Practice and Knowledge Development",
      icon: "sparkles",
      content: [
        {
          id: "mp-reflective-1",
          type: "paragraph",
          content: "The learning pathway is sustained through structured weekly engagement and reflection. Each week includes focused examination of a case or source followed by interpretive reflection addressing ecological limits, funding rationales, and power dynamics. Peer dialogue supports thematic clustering around relational ethics, governance, digital equity, and Indigenous knowledge integration (Datta & Starlight, 2024). The inquiry platform functions as an evolving archive, enabling tagged reflections and mid-phase synthesis to identify emerging patterns and unresolved tensions (Bryant & Charmaz, 2024)."
        }
      ]
    },
    {
      id: "mp-milestone",
      title: "Milestone",
      icon: "target",
      content: [
        {
          id: "mp-milestone-1",
          type: "paragraph",
          content: "At this stage, the inquiry demonstrates a more precise articulation of the research questions, supported by documented case evidence and identified thematic patterns. Rather than producing closure, this phase clarifies tensions between ecological sustainability and capital-driven deployment, establishing a structured foundation for deeper analytical synthesis in the following stage (Hill, 2021)."
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
    },
    {
      id: "month-2",
      monthNumber: 2,
      title: "Exploration",
      theme: "Widening the Field of Vision",
      sections: [
        {
          id: "m2-opening",
          title: "Opening Reflection",
          icon: "eye",
          content: [
            {
              id: "m2-o1",
              type: "paragraph",
              content: "This phase feels less like building an argument and more like widening my field of vision. I am not trying to prove anything yet. I am trying to notice. This stage is about slowing down enough to see how AI actually shows up in practice\u2014how it is embedded in infrastructure, funding priorities, environmental governance, and everyday systems that often remain invisible."
            },
            {
              id: "m2-o2",
              type: "paragraph",
              content: "As I experiment with tools and examine cases, I am paying attention to what becomes visible when I look closely."
            }
          ]
        },
        {
          id: "m2-strengths",
          title: "What Strengths and Limitations Became Visible?",
          icon: "search",
          content: [
            {
              id: "m2-s1",
              type: "paragraph",
              content: "One strength that stands out is AI\u2019s capacity to process complex environmental data at scale. Monitoring wildlife movement, predicting conflict patterns, and modeling habitat change can produce forms of visibility that were previously difficult or slow to achieve. There is genuine potential in this capacity for early warning and informed decision-making."
            },
            {
              id: "m2-s2",
              type: "paragraph",
              content: "At the same time, the limitations are equally clear. These systems depend on high energy demand, infrastructure pressure, and sustained technology deployment that carry their own ecological footprint. AI appears efficient at the level of output, but when I widen the lens to include resource competition, funding priorities, and infrastructure investment, the picture becomes more complicated. The \u201csolution\u201d is rarely neutral. It is always attached to capital flows, policy alignment, and governance structures that shape who benefits and who bears the cost."
            }
          ]
        },
        {
          id: "m2-surprises",
          title: "What Surprised or Unsettled Me?",
          icon: "alert-triangle",
          content: [
            {
              id: "m2-su1",
              type: "paragraph",
              content: "What unsettles me most is how quickly technological expansion is framed as inevitable. The language of innovation and optimization often bypasses shared governance and resource management questions. I notice how easily AI is presented as the logical next step in conservation and environmental governance, rather than as a choice that requires deliberation."
            },
            {
              id: "m2-su2",
              type: "paragraph",
              content: "I am also unsettled by how invisible certain costs remain. Energy demand, material extraction, and infrastructure expansion are rarely foregrounded in discussions about conservation AI. This invisibility reinforces my concern that ecological impacts can be displaced while economic incentives remain central."
            },
            {
              id: "m2-su3",
              type: "paragraph",
              content: "At a more personal level, I feel the tension between curiosity and caution. I am genuinely interested in what AI can make visible in ecological systems. Yet I am equally aware that technological systems can reshape governance in ways that reduce adaptive capacity or amplify systemic risk if power dynamics are not examined carefully."
            }
          ]
        },
        {
          id: "m2-patterns",
          title: "What Patterns Am I Noticing Across Systems?",
          icon: "trending-up",
          content: [
            {
              id: "m2-p1",
              type: "paragraph",
              content: "Across cases and readings, I am noticing a recurring pattern: technology deployment follows funding priorities more than ecological need. Infrastructure investment tends to cluster where capital is already concentrated. Policy alignment often emphasizes growth, innovation, and competitiveness rather than long-term sustainability pathways or intergenerational outcomes."
            },
            {
              id: "m2-p2",
              type: "paragraph",
              content: "I am also seeing that AI intensifies existing structures rather than replacing them. Where power dynamics are already unequal, AI can reinforce those asymmetries through data ownership, infrastructure control, and access to predictive tools. Where governance is participatory and shared, AI has the potential to support resilience strategies. The technology itself does not determine the outcome; the economic and political context does."
            }
          ]
        },
        {
          id: "m2-where",
          title: "Where I Am in the Inquiry",
          icon: "compass",
          content: [
            {
              id: "m2-w1",
              type: "paragraph",
              content: "At this stage, I am not drawing final conclusions. Instead, I am building intellectual texture. My inquiry question feels clearer, but also more layered. I now see more sharply how the resources and investments lenses are foundational to understanding AI\u2019s ecological and economic impacts. Before I can fully analyze habitat change, conflict frequency, or livelihoods, I need to understand the infrastructure investment and capital architecture that make AI deployment possible."
            },
            {
              id: "m2-w2",
              type: "paragraph",
              content: "This stage is about exposure and disciplined curiosity. I am learning to hold complexity without rushing to resolution. The joy of inquiry, at this point, is not excitement about technological novelty, but the deeper satisfaction of noticing patterns, naming tensions, and allowing my questions to mature before I attempt to answer them."
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
      authors: "Baxter, G., & Sommerville, I.",
      year: "2011",
      title: "Socio-technical systems: From design methods to systems engineering",
      source: "Interacting with Computers, 23(1), 4–17",
      doi: "10.1016/j.intcom.2010.07.003",
      type: "journal"
    },
    {
      id: "ref-20",
      authors: "Reynolds, S. A., Beery, S., Burgess, N., Burgman, M., Butchart, S. H. M., Cooke, S. J., ... & Sutherland, W. J.",
      year: "2024",
      title: "The potential for AI to revolutionize conservation: A horizon scan",
      source: "Trends in Ecology & Evolution",
      doi: "10.1016/j.tree.2024.11.013",
      type: "journal"
    },
    {
      id: "ref-21",
      authors: "Alotaibi, E., & Nassif, N.",
      year: "2024",
      title: "Artificial intelligence in environmental monitoring: In-depth analysis",
      source: "Discover Artificial Intelligence, 4(1), 84",
      doi: "10.1007/s44163-024-00198-1",
      type: "journal"
    },
    {
      id: "ref-22",
      authors: "Reim, W., Andersson, E., & Eckerwall, K.",
      year: "2023",
      title: "Enabling collaboration on digital platforms: A study of digital twins",
      source: "International Journal of Production Research, 61(12), 3926–3942",
      doi: "10.1080/00207543.2022.2116499",
      type: "journal"
    },
    {
      id: "ref-23",
      authors: "Denzin, N. K., Lincoln, Y. S., Giardina, M. D., & Cannella, G. S.",
      year: "2024",
      title: "The SAGE handbook of qualitative research",
      source: "Los Angeles: SAGE (Sixth edition)",
      type: "book"
    },
    {
      id: "ref-24",
      authors: "Stephenson, P. J., Stengel, C., & Januchowski-Hartley, F.",
      year: "2020",
      title: "An inventory of biodiversity data sources for conservation monitoring",
      source: "PLOS ONE, 15",
      doi: "10.1371/journal.pone.0242923",
      type: "journal"
    },
    {
      id: "ref-25",
      authors: "Ullah, F., Saqib, S., & Xiong, Y.",
      year: "2024",
      title: "Integrating artificial intelligence in biodiversity conservation: Bridging classical and modern approaches",
      source: "Biodiversity and Conservation",
      doi: "10.1007/s10531-024-02977-9",
      type: "journal"
    },
    {
      id: "ref-26",
      authors: "Zidny, R., Sjöström, J., & Eilks, I.",
      year: "2020",
      title: "A multi-perspective reflection on how indigenous knowledge and related ideas can improve science education for sustainability",
      source: "Science & Education, 29(1), 145–185",
      doi: "10.1007/s11191-019-00100-x",
      type: "journal"
    },
    {
      id: "ref-27",
      authors: "Abrahms, B., Carter, N. H., Clark-Wolf, T., Gaynor, K. M., Johansson, E., McInturff, A., Nisi, A. C., Rafiq, K., & West, L.",
      year: "2023",
      title: "Climate change as a global amplifier of human–wildlife conflict",
      source: "Nature Climate Change, 13(3), 224–234",
      doi: "10.1038/s41558-023-01608-5",
      type: "journal"
    },
    {
      id: "ref-28",
      authors: "Zacher, H., Kühner, C., Katz, I. M., & Rudolph, C. W.",
      year: "2024",
      title: "Leadership and environmental sustainability: An integrative conceptual model of multilevel antecedents and consequences of leader green behavior",
      source: "Group & Organization Management, 49(2), 365–394",
      doi: "10.1177/10596011241229891",
      type: "journal"
    },
    {
      id: "ref-29",
      authors: "Datta, R., & Starlight, T.",
      year: "2024",
      title: "Building a meaningful bridge between indigenous and western worldviews: Through decolonial conversation",
      source: "International Journal of Qualitative Methods, 23",
      doi: "10.1177/16094069241235564",
      type: "journal"
    },
    {
      id: "ref-30",
      authors: "Bryant, A., & Charmaz, K.",
      year: "2024",
      title: "The SAGE handbook of grounded theory",
      source: "SAGE Publications",
      doi: "10.4135/9781848607941",
      type: "book"
    },
    {
      id: "ref-31",
      authors: "Hill, C. M.",
      year: "2021",
      title: "Conflict is integral to human-wildlife coexistence",
      source: "Frontiers in Conservation Science",
      doi: "10.3389/fcosc.2021.734314",
      type: "journal"
    }
  ]
};
