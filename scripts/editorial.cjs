// Verified copy, deliberate public-link allowlist, media attribution, and editorial ordering.
module.exports = {
  featured: [11, 18, 27],
  // Public proofs first, then management and systems work. Internal refresh is last.
  order: [
    11, 18, 27, 28, 9, 4, 5, 2, 23, 21, 8, 22, 7, 17, 3, 19, 10, 12, 24, 20, 25,
    6, 26, 15, 13, 14, 16, 1,
  ],
  publicIds: [9, 10, 11, 13, 16, 17, 18, 27, 28],
  categories: {
    "core-data": "Data systems",
    "intelligent-products": "AI & tools",
    "interface-labs": "Interfaces",
    mobile: "Mobile",
  },
  overrides: {
    1: {
      name: "Guarded Environment Refresh",
      slug: "environment-refresh",
      discipline: "Data architecture",
      subtitle: "Repeatable environments",
      brief:
        "A repeatable workflow for rebuilding staging and development from production-safe snapshots, with a scrubbing step before reuse.",
      role: "Data architecture & automation",
      contribution:
        "I designed a repeatable way to refresh development and staging from production-safe snapshots. The workflow sequences data scrubbing and the system refresh across DynamoDB and OpenSearch.",
      outcome:
        "The same refresh procedure can be repeated without hand-rebuilding each environment.",
      tech: ["AWS", "DynamoDB", "OpenSearch"],
      access: "Internal utility",
    },
    2: {
      brief:
        "An AWS Step Functions logging workflow that makes ingestion failures visible and gives operators a retry path.",
      contribution:
        "I defined retry behavior and failure states for the ingestion workflow.",
      outcome:
        "An operator can see where a run stopped and follow its recovery path.",
    },
    3: {
      brief:
        "A practical introduction to building AI prototypes with ingestion, retrieval and model calls.",
      contribution:
        "I structured reusable examples for feeding data into a prototype, retrieving context and generating a response.",
      outcome:
        "Engineers can follow a working pattern rather than wiring every step together from scratch.",
    },
    4: {
      brief:
        "A natural-language interface for exploring relationships in a Neo4j graph.",
      contribution:
        "I designed a path from a plain-language question to a graph query and a visual result.",
      outcome:
        "A user can explore relationships without starting with a handwritten Cypher query.",
    },
    5: {
      brief:
        "A prototype that turns a business question into a structured MySQL query.",
      contribution:
        "I defined the steps for translating and validating a prompt before executing SQL.",
      outcome:
        "Users can ask a question in familiar language instead of composing the first SQL statement themselves.",
    },
    6: {
      brief:
        "A poster-session assistant that combines computer vision, speech and generated responses.",
      contribution:
        "I connected recognition, speech input and speech output to the assistant’s response workflow.",
      outcome:
        "A visitor can ask a spoken question as part of an interactive poster demonstration.",
    },
    7: {
      brief:
        "A document pipeline for extracting résumé details and comparing them with proposal criteria.",
      contribution:
        "I built the normalization step between parsing a résumé and comparing it with the specified criteria.",
      outcome:
        "Reviewers can compare structured candidate details rather than reformatting each document.",
    },
    8: {
      brief:
        "A scenario-based assessment for data modeling, pipeline design and troubleshooting.",
      contribution:
        "I designed checkpoints around the decisions a data engineer makes during a simulated workflow.",
      outcome:
        "A reviewer can examine how a participant approaches a concrete engineering problem.",
    },
    9: {
      brief:
        "A browser interface that combines orbital position, telemetry and map overlays.",
      contribution:
        "I mapped position and telemetry into a single tracking interface.",
      outcome:
        "Readers can relate an object’s reported state to its position on the map.",
    },
    10: {
      brief:
        "A guided learning experience for experimenting with AI-assisted coding.",
      contribution:
        "I arranged the material into a sequence of lessons and interactive checkpoints.",
      outcome:
        "Learners can follow concepts in order and pause to practice between stages.",
    },
    11: {
      name: "ClawdMarks",
      slug: "clawdmarks",
      discipline: "Web development",
      subtitle: "A directory for agent field reports",
      brief:
        "Agents and developers can look up field reports from other agents before trying an API or tool.",
      role: "Co-developer",
      contribution:
        "I co-built a searchable catalog where AI agents can check other agents’ field reports before using an API or tool, then contribute what they found.",
      outcome:
        "A web directory and search API make the reports available to both people and agents.",
      tech: ["Search API", "Web directory", "Agent integrations"],
      access: "Public website",
      linkLabel: "Visit ClawdMarks",
    },
    12: {
      brief:
        "An operations dashboard that brings system status and controls into one view.",
      contribution:
        "I combined status information from multiple sources in a common interface.",
      outcome:
        "An operator can review several systems without opening a separate status screen for each one.",
    },
    13: {
      brief:
        "A responsive personal website built around clear, readable storytelling.",
      contribution:
        "I organized the site content and designed how it adapts to different screen sizes.",
      outcome:
        "Readers can navigate a coherent narrative on desktop or mobile.",
    },
    14: {
      brief:
        "An interactive album with sequenced tracks, lyrics and visual transitions.",
      contribution:
        "I built the playback states and transitions between songs, lyrics and supporting media.",
      outcome:
        "A listener can explore the album as a connected sequence rather than a list of audio files.",
    },
    15: {
      brief:
        "An engineering patch log for documenting AI workflow changes and reliability fixes.",
      contribution:
        "I organized patch notes into a chronological record of behavior changes, fixes and follow-up work.",
      outcome: "Readers can trace how an assistant workflow changed over time.",
    },
    16: {
      brief:
        "A responsive web résumé that presents career experience in a browsable format.",
      contribution:
        "I organized the career material and built the responsive presentation.",
      outcome:
        "A reader can browse a professional profile without opening a separate document.",
    },
    17: {
      brief:
        "A searchable database and interface for organizing résumé profiles.",
      contribution:
        "I connected profile storage and retrieval to a searchable interface.",
      outcome:
        "A reviewer can find an existing professional profile instead of browsing a folder of documents.",
    },
    18: {
      brief:
        "A browser demo that puts sample avian influenza records alongside migration routes on an interactive globe.",
      contribution:
        "I combined a globe, migration-route overlays, filters, and a playable timeline in one browser demo.",
      outcome:
        "Readers can explore records by place and time alongside migration routes.",
      linkLabel: "Open the globe",
    },
    19: {
      brief: "A local-first library for saving, searching and reusing prompts.",
      contribution:
        "I built category browsing, variable-aware templates, quick copy and persistent local storage into a browser app.",
      outcome:
        "Users can retrieve a prompt and fill in its variables without retyping the whole instruction.",
    },
    20: {
      brief:
        "A workspace for routing acquisition requests through intake and checklist review.",
      contribution:
        "I separated requester, manager and specialist workflows into role-aware queues with readiness details.",
      outcome:
        "Each role can see the next step and outstanding checklist items for a request.",
    },
    21: {
      brief:
        "An operator console for reviewing study readiness and downloading approved export packages.",
      contribution:
        "I brought study selection, readiness checks and export history into a protected workflow.",
      outcome:
        "Operators can trace a package back to its run and associated checks.",
    },
    22: {
      brief:
        "A catalog that pairs reusable agent skills with installation requests and governance review.",
      contribution:
        "I connected inventory and documentation to signed-in requests, review and reporting.",
      outcome:
        "Users have a defined route from discovering a skill to requesting its installation.",
    },
    23: {
      brief:
        "An export dashboard for selecting records, previewing changes and tracking generated packages.",
      contribution:
        "I designed the selection, dry-run review and package history interfaces.",
      outcome:
        "An operator can inspect the intended effects before generating a package.",
    },
    24: {
      brief:
        "A contract-closeout workbench for reviewing evidence, missing items and ownership.",
      contribution:
        "I modeled role-specific queues, readiness checklists, follow-up requests and review.",
      outcome:
        "Reviewers can identify a missing item and the next person responsible for it.",
    },
    25: {
      brief:
        "A facilitator’s prototype for turning workshop notes into draft action plans.",
      contribution:
        "I combined sample scenarios, coverage checks and AI-assisted drafting with explicit facilitator review.",
      outcome:
        "A facilitator can compare a draft with the planning criteria before accepting the wording.",
    },
    26: {
      brief:
        "A private reference wiki for searching prior development conversations and daily notes.",
      contribution:
        "I built the import, date-based navigation, search and multiple viewing modes.",
      outcome:
        "Earlier project decisions can be retrieved without exposing the underlying personal archive.",
    },
    27: {
      name: "Couples Alarm",
      slug: "couples-alarm",
      discipline: "iOS development",
      subtitle: "An alarm made for two",
      brief:
        "I built and shipped an iPhone app for partners on different wake-up schedules. A short listening check helps them choose a tone before they schedule an alarm.",
      role: "iOS app developer",
      contribution:
        "I paired a listening check and bedside confirmation with AlarmKit scheduling for one-time or weekly alarms. If no tested tone fits, setup stops rather than guessing.",
      outcome:
        "Partners can test a tone before adding it to their wake-up routine. Microphone setup stays on the device.",
      tech: ["iOS", "AlarmKit", "Local audio"],
      access: "Public website & App Store",
      url: "https://couplesalarm.com/",
      linkLabel: "Visit Couples Alarm",
      secondaryUrl: "https://apps.apple.com/us/app/couples-alarm/id6792771975",
      secondaryLabel: "View on the App Store",
    },
    28: {
      name: "Forever Paws",
      slug: "forever-paws",
      discipline: "Product development",
      brief:
        "A guided memorial builder that turns a pet’s photos and memories into a shareable page.",
      role: "Application developer",
      contribution:
        "I built a guided flow for creating a pet memorial and presenting photos and memories together on a dedicated page.",
      outcome:
        "Visitors can explore the finished experience through Bailey’s public memorial.",
      tech: ["Guided forms", "Responsive web UI", "Photo galleries"],
      access: "Public example",
      url: "https://foreverpaws.love/bailey-0s6r38",
      linkLabel: "Visit Bailey’s memorial",
      gallery: [
        {
          type: "Product screenshot",
          src: "static/portfolio/forever-paws-home.webp",
          width: 1280,
          height: 889,
          caption: "Public landing page",
          alt: "Forever Paws homepage with a watercolor dog and cat beside the guided memorial invitation.",
        },
      ],
    },
  },
  media: {
    1: {
      type: "Architecture illustration",
      src: "static/portfolio/guarded-refresh.webp",
      caption: "Environment refresh",
      width: 1536,
      height: 1024,
      alt: "Illustration of data snapshots passing a guard and scrubbing stage before splitting into two isolated test environments.",
    },
    4: {
      type: "Concept illustration",
      src: "static/portfolio/neo4j-natural-language-ui.webp",
      width: 1536,
      height: 1024,
      caption: "Tracing a relationship",
      alt: "A bright route passes through a cluster of connected nodes, illustrating how a question can surface a relationship in a graph.",
    },
    5: {
      type: "Concept illustration",
      src: "static/portfolio/mysql-natural-language-query-system.webp",
      width: 1536,
      height: 1024,
      caption: "From question to selected data",
      alt: "A speech bubble connects by a golden line to stacked data grids; one highlighted row emerges as the result.",
    },
    9: {
      type: "Public screenshot",
      src: "static/portfolio/aerospace-orbital-command-map.webp",
      width: 1280,
      height: 567,
      caption: "Map detail · Nov 25, 2026",
      alt: "Aerospace Orbital Command map shows orbital paths alongside telemetry for altitude, speed and radar footprint.",
    },
    10: {
      type: "Concept illustration",
      src: "static/portfolio/vibe-coding-journey.webp",
      width: 1536,
      height: 1024,
      caption: "Learning milestones",
      alt: "A glowing route on a folded map connects a lightbulb, a prototype cube and a sprouting seed.",
    },
    11: {
      type: "Public screenshot",
      src: "static/portfolio/clawdmarks-public-directory.webp",
      width: 1280,
      height: 889,
      caption: "Public directory · Nov 25, 2026",
      alt: "ClawdMarks public directory with developer tools, category filters and recent agent field reports.",
    },
    13: {
      type: "Archived screenshot",
      src: "static/project_13_vanessa_markowitz.png",
      width: 1365,
      height: 768,
      alt: "Public Vanessa Markowitz homepage showing a stage portrait and performance work.",
    },
    18: {
      type: "Product screenshot",
      src: "static/portfolio/fluglobe.webp",
      caption: "Globe and timeline",
      width: 1280,
      height: 889,
      alt: "FluGlobe shows an interactive globe, migration routes and sample avian influenza records.",
    },
    27: {
      type: "Public screenshot",
      src: "static/portfolio/couples-alarm-landing.webp",
      caption: "Product landing page · Nov 25, 2026",
      width: 1280,
      height: 800,
      alt: "Couples Alarm homepage with the headline “Your alarm doesn’t have to be theirs,” app-store badges, and two phone screens.",
    },
    28: {
      type: "Product screenshot",
      src: "static/portfolio/forever-paws-bailey.webp",
      caption: "Bailey’s public memorial",
      width: 1280,
      height: 889,
      alt: "Bailey’s public Forever Paws memorial, with her portrait and theme controls.",
    },
  },
};

Object.assign(module.exports.media, require("./illustration-media.cjs"));
