export interface Slide {
  id: string;
  type: 'title' | 'recap' | 'agenda' | 'concept1' | 'concept2' | 'example' | 'demo' | 'activity' | 'takeaways' | 'summary' | 'preview';
  title: string;
  subtitle?: string;
  bullets?: string[];
  paragraph?: string;
  numberedSteps?: string[];
}

export interface DayDeck {
  day: number;
  week: number;
  topic: string;
  slides: Slide[];
}

export const deckData: DayDeck[] = [
  {
    day: 1,
    week: 1,
    topic: "What is AI? The Big Picture",
    slides: [
      {
        id: "d1-s1",
        type: "title",
        title: "What is AI? The Big Picture",
        subtitle: "Day 1 · AI Summer Camp 2026"
      },
      {
        id: "d1-s2",
        type: "recap",
        title: "Welcome to Camp!",
        paragraph: "Welcome to AI Summer Camp 2026! Let's start."
      },
      {
        id: "d1-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Brief history of AI technology",
          "Narrow versus General AI types",
          "How machines learn from data",
          "AI versus human intelligence differences"
        ]
      },
      {
        id: "d1-s4",
        type: "concept1",
        title: "Brief History of AI",
        bullets: [
          "1950: Modern AI concept is born",
          "1997: Deep Blue beats chess champion",
          "2012: Super-fast image recognition begins",
          "2022: ChatGPT changes the world overnight",
          "Today: Smart tools are everywhere now"
        ]
      },
      {
        id: "d1-s5",
        type: "concept2",
        title: "Three Main AI Levels",
        bullets: [
          "Narrow AI: excels at single tasks",
          "General AI: matches overall human level",
          "Agentic AI: takes actions on goals",
          "We focus mainly on Agentic AI"
        ]
      },
      {
        id: "d1-s6",
        type: "example",
        title: "A Helpful Analogy",
        paragraph: "AI is like a super-fast reader. It has read every single book in the world, but it has never lived life or felt emotion."
      },
      {
        id: "d1-s7",
        type: "demo",
        title: "Live Demo: AI Chat",
        bullets: [
          "Ask ChatGPT three tricky questions",
          "Compare answers with Claude live",
          "Identify speed and accuracy differences"
        ]
      },
      {
        id: "d1-s8",
        type: "activity",
        title: "Activity: AI Trivia Quiz",
        numberedSteps: [
          "Form teams of two students",
          "Open the online quiz link",
          "Answer ten fast-paced trivia questions",
          "Discuss the correct answers together",
          "Celebrate the winning team together"
        ]
      },
      {
        id: "d1-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "AI concept started in the 1950s",
          "Current AI models are mostly narrow",
          "Agentic AI works on automatic goals"
        ]
      },
      {
        id: "d1-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Explored the timeline of smart machines",
          "Classified narrow and agentic intelligence",
          "Compared human learning to raw data"
        ]
      },
      {
        id: "d1-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we explore AI types in daily life. Thank you for joining!"
      }
    ]
  },
  {
    day: 2,
    week: 1,
    topic: "Types of AI & Where They Live",
    slides: [
      {
        id: "d2-s1",
        type: "title",
        title: "Types of AI & Where They Live",
        subtitle: "Day 2 · AI Summer Camp 2026"
      },
      {
        id: "d2-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we learned the history and main levels of artificial intelligence."
      },
      {
        id: "d2-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "What is predictive model forecasting",
          "Generative AI tools and creation",
          "Agentic AI actions and automation",
          "AI inside your daily phone apps"
        ]
      },
      {
        id: "d2-s4",
        type: "concept1",
        title: "Predictive vs Generative",
        bullets: [
          "Predictive AI spots trends and patterns",
          "Generative AI makes brand new content",
          "Both use massive training datasets",
          "Predictive forecasts the next event",
          "Generative creates custom text or art"
        ]
      },
      {
        id: "d2-s5",
        type: "concept2",
        title: "AI in Daily Life",
        bullets: [
          "Social media filters feed recommendation",
          "Streaming services suggest perfect movies",
          "Navigation apps calculate traffic changes",
          "Face recognition unlocks smart phones instantly"
        ]
      },
      {
        id: "d2-s6",
        type: "example",
        title: "The Chef Analogy",
        paragraph: "Predictive AI is like a chef guessing what you want based on past orders. Generative AI is like the chef inventing a new recipe on the spot."
      },
      {
        id: "d2-s7",
        type: "demo",
        title: "Live Demo: App Spotting",
        bullets: [
          "Analyze custom Netflix algorithm suggestions",
          "Check Google Maps real-time route options",
          "Deconstruct visual camera filters in real-time"
        ]
      },
      {
        id: "d2-s8",
        type: "activity",
        title: "Activity: AI Spotting Map",
        numberedSteps: [
          "Open your shared project digital board",
          "Pin daily apps containing hidden AI",
          "Label each as predictive or generative",
          "Explain why to your classmate",
          "Submit your finished group board link"
        ]
      },
      {
        id: "d2-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Predictive AI forecasts future data trends",
          "Generative AI builds brand new content",
          "Hidden AI powers our favorite apps"
        ]
      },
      {
        id: "d2-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Distinguished prediction from active generation",
          "Mapped everyday software using smart models",
          "Identified unseen intelligence in standard tools"
        ]
      },
      {
        id: "d2-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we look inside language models. See you soon!"
      }
    ]
  },
  {
    day: 3,
    week: 1,
    topic: "How AI Models Work (Visually)",
    slides: [
      {
        id: "d3-s1",
        type: "title",
        title: "How AI Models Work (Visually)",
        subtitle: "Day 3 · AI Summer Camp 2026"
      },
      {
        id: "d3-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we learned about predictive, generative, and daily hidden AI apps."
      },
      {
        id: "d3-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Visual concept of language models",
          "How tokens slice up letters",
          "The training process made simple",
          "Why models hallucinate wrong facts"
        ]
      },
      {
        id: "d3-s4",
        type: "concept1",
        title: "What is a Token?",
        bullets: [
          "AI does not read whole words",
          "Words are split into tiny pieces",
          "These word fragments are called tokens",
          "Tokens help models process text fast",
          "Each token represents mathematical value"
        ]
      },
      {
        id: "d3-s5",
        type: "concept2",
        title: "The Word Predictor Game",
        bullets: [
          "AI is like advanced auto-complete",
          "Calculates probability of next words",
          "Relies entirely on past training text",
          "Does not actually understand the meaning"
        ]
      },
      {
        id: "d3-s6",
        type: "example",
        title: "The Lego Analogy",
        paragraph: "Tokens are like Lego bricks. AI puts them together based on pictures it saw during training, sometimes building things that don't exist."
      },
      {
        id: "d3-s7",
        type: "demo",
        title: "Live Demo: Tokenizer",
        bullets: [
          "Open an official visual tokenizer tool",
          "Enter student names and watch splits",
          "Analyze the color-coded token fragments live"
        ]
      },
      {
        id: "d3-s8",
        type: "activity",
        title: "Activity: Build a Word Predictor Game",
        numberedSteps: [
          "Sit in circles of five students",
          "First student says a single word",
          "Next student says most likely word",
          "Complete three sentences this manual way",
          "Reflect on how AI duplicates this"
        ]
      },
      {
        id: "d3-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Tokens are pieces of processed words",
          "Models predict the next best token",
          "Hallucinations are confident guess errors"
        ]
      },
      {
        id: "d3-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Visualized word pieces called tokens",
          "Learned math behind predicting words",
          "Identified the causes of model mistakes"
        ]
      },
      {
        id: "d3-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we meet ChatGPT, Claude, and Gemini head-to-head. See you then!"
      }
    ]
  },
  {
    day: 4,
    week: 1,
    topic: "Meet the AI Models",
    slides: [
      {
        id: "d4-s1",
        type: "title",
        title: "Meet the AI Models",
        subtitle: "Day 4 · AI Summer Camp 2026"
      },
      {
        id: "d4-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we visualized word tokens and the prediction process."
      },
      {
        id: "d4-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Introduction to major model builders",
          "Comparing ChatGPT, Claude, and Gemini",
          "Free versus paid features breakdown",
          "How to choose the best assistant"
        ]
      },
      {
        id: "d4-s4",
        type: "concept1",
        title: "The Big Three Builders",
        bullets: [
          "OpenAI builds ChatGPT for general utility",
          "Anthropic creates Claude with safety focus",
          "Google designs Gemini for native integration",
          "Each has unique strengths and weaknesses",
          "All use deep neural network structures"
        ]
      },
      {
        id: "d4-s5",
        type: "concept2",
        title: "Paid vs Free Models",
        bullets: [
          "Free models use older speed versions",
          "Paid versions access advanced reasoning logic",
          "Paid accounts get larger context sizes",
          "Paid tiers upload file types directly"
        ]
      },
      {
        id: "d4-s6",
        type: "example",
        title: "The Specialist Analogy",
        paragraph: "Gemini is like a connected search assistant. ChatGPT is a fast copywriter. Claude is a thoughtful editor who reads carefully."
      },
      {
        id: "d4-s7",
        type: "demo",
        title: "Live Demo: Prompt Battle",
        bullets: [
          "Enter same prompt into three models",
          "Analyze layout and tone variations live",
          "Point out Google Search Grounding features"
        ]
      },
      {
        id: "d4-s8",
        type: "activity",
        title: "Activity: AI Model Showdown",
        numberedSteps: [
          "Get a specific student creative challenge",
          "Draft prompt for three different tools",
          "Compare outputs on speed and style",
          "Rate each model on visual scale",
          "Share ratings on class board"
        ]
      },
      {
        id: "d4-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Different models have different strengths",
          "Choose model based on your task",
          "Paid tiers offer better thinking capability"
        ]
      },
      {
        id: "d4-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Analyzed the top three market models",
          "Discovered formatting and feature differences",
          "Evaluated model replies across multiple goals"
        ]
      },
      {
        id: "d4-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow is Week 1 review and project presentation! Bring your ideas!"
      }
    ]
  },
  {
    day: 5,
    week: 1,
    topic: "Week 1 Review + Mini Project",
    slides: [
      {
        id: "d5-s1",
        type: "title",
        title: "Week 1 Review & Mini Project",
        subtitle: "Day 5 · AI Summer Camp 2026"
      },
      {
        id: "d5-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we compared Gemini, Claude, and ChatGPT models."
      },
      {
        id: "d5-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Review core vocabulary and definitions",
          "Explore AI impact across ten industries",
          "Mini project collaboration and guidelines",
          "Student group presentations and feedback"
        ]
      },
      {
        id: "d5-s4",
        type: "concept1",
        title: "Core Vocabulary Review",
        bullets: [
          "Artificial Intelligence: smart machine algorithms",
          "Generative models: creating new media",
          "Tokens: building blocks of text",
          "Hallucination: incorrect model confident output",
          "Agentic: autonomous task planning system"
        ]
      },
      {
        id: "d5-s5",
        type: "concept2",
        title: "AI in Ten Industries",
        bullets: [
          "Healthcare: faster diagnostic support",
          "Education: automated study plans",
          "Finance: rapid market analysis",
          "Entertainment: personalized media selection"
        ]
      },
      {
        id: "d5-s6",
        type: "example",
        title: "The Toolkit Analogy",
        paragraph: "AI is a multi-tool. It can act as a hammer, screwdriver, or measuring tape depending on how you use it."
      },
      {
        id: "d5-s7",
        type: "demo",
        title: "Live Demo: Project Scope",
        bullets: [
          "Show previous student outstanding project work",
          "Demonstrate visual slide builder tool integrations",
          "Walk through group presentation structure quickly"
        ]
      },
      {
        id: "d5-s8",
        type: "activity",
        title: "Project: \"AI in My World\" Presentation",
        numberedSteps: [
          "Gather in your assigned group",
          "Pick one industry to analyze",
          "Find three real AI use cases",
          "Build three simple visual slides",
          "Present your ideas to camp mates"
        ]
      },
      {
        id: "d5-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "AI is transforming every major field",
          "Knowing basic vocabulary guides professional use",
          "Collaboration yields the best insights"
        ]
      },
      {
        id: "d5-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Completed our entire Week 1 review",
          "Researched AI use across business markets",
          "Coached classmates on creative slide techniques"
        ]
      },
      {
        id: "d5-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Next week we master prompt engineering secrets. Enjoy your weekend!"
      }
    ]
  },
  {
    day: 6,
    week: 2,
    topic: "What is a Prompt?",
    slides: [
      {
        id: "d6-s1",
        type: "title",
        title: "What is a Prompt?",
        subtitle: "Day 6 · AI Summer Camp 2026"
      },
      {
        id: "d6-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Welcome to Week 2! Last week we covered AI model basics."
      },
      {
        id: "d6-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Understanding input instructions and prompts",
          "Why exact words change outputs drastically",
          "The four parts of amazing prompts",
          "Before and after prompt examples"
        ]
      },
      {
        id: "d6-s4",
        type: "concept1",
        title: "Instructions vs Conversation",
        bullets: [
          "A prompt is a direct instruction",
          "Vague prompts generate boring generic results",
          "Specific rules unlock high-quality outputs",
          "Model reacts to every single word",
          "Good prompts provide clear context directions"
        ]
      },
      {
        id: "d6-s5",
        type: "concept2",
        title: "The Perfect Prompt Recipe",
        bullets: [
          "Role: who is the AI acting as",
          "Task: what must be done",
          "Context: important background info needed",
          "Output Format: how to style result"
        ]
      },
      {
        id: "d6-s6",
        type: "example",
        title: "The Director Analogy",
        paragraph: "Prompting is like directing an actor. If you say 'act happy,' it is okay. If you explain the whole scene backstory, the performance is beautiful."
      },
      {
        id: "d6-s7",
        type: "demo",
        title: "Live Demo: Simple to Elite",
        bullets: [
          "Input weak prompt into the model",
          "Apply the four-part recipe and rewrite",
          "Compare the massive difference in output"
        ]
      },
      {
        id: "d6-s8",
        type: "activity",
        title: "Activity: Fix the Broken Prompts",
        numberedSteps: [
          "Open your class exercise file",
          "Find five weak, broken prompts",
          "Rewrite them using our custom formula",
          "Test updated prompts in the chat",
          "Share the improved prompt designs"
        ]
      },
      {
        id: "d6-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Vague prompts always get vague answers",
          "Specific prompt structure gets brilliant results",
          "Always define role, task, and format"
        ]
      },
      {
        id: "d6-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Defined the core anatomy of prompting",
          "Designed clear instructions for models",
          "Transformed vague text into rich queries"
        ]
      },
      {
        id: "d6-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we learn advanced prompt engineering hacks. Prepare your minds!"
      }
    ]
  },
  {
    day: 7,
    week: 2,
    topic: "Prompt Engineering Techniques",
    slides: [
      {
        id: "d7-s1",
        type: "title",
        title: "Prompt Engineering Techniques",
        subtitle: "Day 7 · AI Summer Camp 2026"
      },
      {
        id: "d7-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we learned the core prompt recipe: role, task, and format."
      },
      {
        id: "d7-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "How role prompting directs tone",
          "Chain of thought reasoning step-by-step",
          "Few-shot prompting with examples",
          "Setting rules and negative constraints"
        ]
      },
      {
        id: "d7-s4",
        type: "concept1",
        title: "Chain of Thought",
        bullets: [
          "Tell AI: 'think step by step'",
          "Forces logical sequencing before final answer",
          "Slashes calculation errors in math tasks",
          "Mimics human inner problem-solving skills",
          "Reveals the model reasoning pathway clearly"
        ]
      },
      {
        id: "d7-s5",
        type: "concept2",
        title: "Few-Shot Prompting",
        bullets: [
          "Provide examples of good outputs",
          "AI copies the style and pattern",
          "Best technique for structured data formats",
          "Reduces random variations in tone"
        ]
      },
      {
        id: "d7-s6",
        type: "example",
        title: "The Math Tutor Analogy",
        paragraph: "Chain of thought is like a math teacher saying 'show your work' instead of just guessing the final answer."
      },
      {
        id: "d7-s7",
        type: "demo",
        title: "Live Demo: Lab Secrets",
        bullets: [
          "Build a zero-shot prompt live",
          "Transform into few-shot with examples",
          "Implement chain-of-thought and watch quality jump"
        ]
      },
      {
        id: "d7-s8",
        type: "activity",
        title: "Activity: Prompt Lab — 5 Challenges",
        numberedSteps: [
          "Log into our interactive lab platform",
          "Solve prompt puzzle one with constraints",
          "Apply few-shot technique for puzzle three",
          "Complete chain-of-thought on puzzle five",
          "Log your successful prompt keys"
        ]
      },
      {
        id: "d7-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Step-by-step instructions improve thinking quality",
          "Examples help AI learn format styles",
          "Negative constraints block bad output words"
        ]
      },
      {
        id: "d7-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Mastered advanced chain-of-thought methods",
          "Constructed high-performing few-shot prompt libraries",
          "Blocked unwanted outputs using direct constraints"
        ]
      },
      {
        id: "d7-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we learn context engineering and custom bot personas. Bye!"
      }
    ]
  },
  {
    day: 8,
    week: 2,
    topic: "Context Engineering",
    slides: [
      {
        id: "d8-s1",
        type: "title",
        title: "Context Engineering",
        subtitle: "Day 8 · AI Summer Camp 2026"
      },
      {
        id: "d8-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we learned chain-of-thought and few-shot prompting techniques."
      },
      {
        id: "d8-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "What is context memory limit",
          "System prompts versus user prompts",
          "Creating unique custom model personas",
          "Designing reusable prompt master templates"
        ]
      },
      {
        id: "d8-s4",
        type: "concept1",
        title: "The System Prompt",
        bullets: [
          "Foundational rules model must follow",
          "Runs silently behind normal conversation",
          "Defines personality, safety, and constraints",
          "Keeps AI acting on track permanently",
          "Cannot be easily bypassed by users"
        ]
      },
      {
        id: "d8-s5",
        type: "concept2",
        title: "Context Window Limits",
        bullets: [
          "A model has temporary active memory",
          "Memory is measured in active tokens",
          "Old messages fade as chat grows",
          "Keep background notes short and clean"
        ]
      },
      {
        id: "d8-s6",
        type: "example",
        title: "The Desk Analogy",
        paragraph: "Context is like desk space. A bigger desk holds more papers, but if it gets too cluttered, finding things gets hard."
      },
      {
        id: "d8-s7",
        type: "demo",
        title: "Live Demo: Custom GPTs",
        bullets: [
          "Create custom system prompt live",
          "Upload custom reference document file",
          "Test persona boundaries and system limits"
        ]
      },
      {
        id: "d8-s8",
        type: "activity",
        title: "Activity: Build Your AI Assistant Persona",
        numberedSteps: [
          "Choose a specific assistant job role",
          "Draft custom system prompt on sheet",
          "Define character voice and response length",
          "Deploy custom prompt in sandbox playground",
          "Have your partner test the assistant"
        ]
      },
      {
        id: "d8-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "System prompts set core model behaviors",
          "AI has limits on active memory",
          "Personas make interactions feel highly natural"
        ]
      },
      {
        id: "d8-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Designed invisible core system instruction layers",
          "Managed token memory bounds for effectiveness",
          "Programmed fully functional custom text personas"
        ]
      },
      {
        id: "d8-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we use AI to solve five real-world tasks. See you then!"
      }
    ]
  },
  {
    day: 9,
    week: 2,
    topic: "AI for Real Tasks",
    slides: [
      {
        id: "d9-s1",
        type: "title",
        title: "AI for Real Tasks",
        subtitle: "Day 9 · AI Summer Camp 2026"
      },
      {
        id: "d9-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we built system prompts and custom model personas."
      },
      {
        id: "d9-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "AI as super research assistant tool",
          "Creative script and content ideation partner",
          "Smart personalized study helper methods",
          "Professional business email and proposal drafting"
        ]
      },
      {
        id: "d9-s4",
        type: "concept1",
        title: "The Smart Study Buddy",
        bullets: [
          "Turn school notes into interactive quizzes",
          "Ask AI to explain complex math",
          "Create customized spaced-repetition flashcards",
          "Saves hours of basic exam prep",
          "Adapts difficulty based on student replies"
        ]
      },
      {
        id: "d9-s5",
        type: "concept2",
        title: "AI as Creative Partner",
        bullets: [
          "Generate original plot ideas and concepts",
          "Refine existing drafts for rhythm style",
          "Draft visual design prompts for imagery",
          "Helps smash frustrating writer block blocks"
        ]
      },
      {
        id: "d9-s6",
        type: "example",
        title: "The Bicycle Analogy",
        paragraph: "AI is like a bicycle for your mind. It does not pedal for you, but it makes your effort go ten times further."
      },
      {
        id: "d9-s7",
        type: "demo",
        title: "Live Demo: Prompt Workflows",
        bullets: [
          "Convert dry raw facts into quiz",
          "Draft polished customer email response live",
          "Create engaging TikTok script from article"
        ]
      },
      {
        id: "d9-s8",
        type: "activity",
        title: "Activity: Solve 5 Real-World Problems",
        numberedSteps: [
          "Receive five real-world scenario cards",
          "Use prompting skills on each puzzle",
          "Draft email, study plan, script, pitch",
          "Log your prompts and model outputs",
          "Share most creative solution with team"
        ]
      },
      {
        id: "d9-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "AI is incredible for summarizing data",
          "Collaborative study helper formats speed up learning",
          "Human oversight ensures accuracy of output"
        ]
      },
      {
        id: "d9-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Applied models directly to homework routines",
          "Designed multi-format creative script ideas",
          "Practiced safe verification of AI facts"
        ]
      },
      {
        id: "d9-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow is Week 2 Project! Build your prompt playbook. Bye!"
      }
    ]
  },
  {
    day: 10,
    week: 2,
    topic: "Week 2 Project — Prompt Portfolio",
    slides: [
      {
        id: "d10-s1",
        type: "title",
        title: "Week 2 Project — Prompt Portfolio",
        subtitle: "Day 10 · AI Summer Camp 2026"
      },
      {
        id: "d10-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we solved real study, business, and creative tasks."
      },
      {
        id: "d10-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Portfolio project requirements and goals",
          "Building five perfect reusable prompts",
          "Documenting prompt objectives and structures",
          "Classmate peer testing and playbook launch"
        ]
      },
      {
        id: "d10-s4",
        type: "concept1",
        title: "What is a Playbook?",
        bullets: [
          "Collection of proven working prompts",
          "Ready to copy and paste anytime",
          "Saves hours of repetitive daily typing",
          "Valuable asset for any digital creator",
          "Demonstrates professional prompting logic"
        ]
      },
      {
        id: "d10-s5",
        type: "concept2",
        title: "Peer Testing Magic",
        bullets: [
          "Other people test your written prompts",
          "Highlights weak instructions or missing detail",
          "Uncovers funny or unexpected output gaps",
          "Refines prompts for broad general use"
        ]
      },
      {
        id: "d10-s6",
        type: "example",
        title: "The Recipe Book Analogy",
        paragraph: "Your prompt portfolio is like a chef's personal recipe book. Anyone can cook delicious meals if the instructions are clear."
      },
      {
        id: "d10-s7",
        type: "demo",
        title: "Live Demo: Polishing",
        bullets: [
          "Review classic common prompt formatting errors",
          "Show clean Markdown output structure live",
          "Walk through final playbook export steps"
        ]
      },
      {
        id: "d10-s8",
        type: "activity",
        title: "Project: Personal Prompt Playbook",
        numberedSteps: [
          "Select five different software use-cases",
          "Write optimized prompts using formulas",
          "Test prompts inside active model window",
          "Gather feedback from adjacent classmate tester",
          "Compile into digital portfolio playbook file"
        ]
      },
      {
        id: "d10-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Prompt libraries are powerful efficiency assets",
          "Testing is vital for instruction accuracy",
          "Polished formatting keeps prompt books readable"
        ]
      },
      {
        id: "d10-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Organized custom prompts into practical guides",
          "Iterated on logic through user tests",
          "Completed second week project requirements successfully"
        ]
      },
      {
        id: "d10-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Next week we build active AI Agents! Have a great weekend!"
      }
    ]
  },
  {
    day: 11,
    week: 3,
    topic: "What are AI Agents?",
    slides: [
      {
        id: "d11-s1",
        type: "title",
        title: "What are AI Agents?",
        subtitle: "Day 11 · AI Summer Camp 2026"
      },
      {
        id: "d11-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Welcome to Week 3! Last week we built prompt portfolios."
      },
      {
        id: "d11-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Chatbots versus autonomous software agents",
          "How agents plan and execute steps",
          "External tools agents use every day",
          "Real-world agent automations in business"
        ]
      },
      {
        id: "d11-s4",
        type: "concept1",
        title: "Chatbots vs Agents",
        bullets: [
          "Chatbots wait for your every text",
          "Agents work on high-level goals independently",
          "Agents make decisions without constant prompts",
          "Agents chain multiple tasks together automatically",
          "Agents run continuously in the background"
        ]
      },
      {
        id: "d11-s5",
        type: "concept2",
        title: "Agent Tools",
        bullets: [
          "Agents read and write text files",
          "Agents search Google for live info",
          "Agents send emails to human workers",
          "Agents trigger actions in external software"
        ]
      },
      {
        id: "d11-s6",
        type: "example",
        title: "The Travel Agent Analogy",
        paragraph: "A chatbot is like a map — it answers questions. An AI agent is like a travel agent — it books the flights, hotels, and tours for you."
      },
      {
        id: "d11-s7",
        type: "demo",
        title: "Live Demo: Agent Run",
        bullets: [
          "Launch working agent system model live",
          "Watch agent search and format data",
          "Observe autonomous decision loops in terminal"
        ]
      },
      {
        id: "d11-s8",
        type: "activity",
        title: "Activity: Design a Human Agent First",
        numberedSteps: [
          "Form teams of three student players",
          "Receive high-level goal challenge card",
          "Assign tool access to each player",
          "Map step-by-step logic to solve goal",
          "Present your paper flow chart plan"
        ]
      },
      {
        id: "d11-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Agents act autonomously to reach goals",
          "Tool access empowers model capabilities vastly",
          "Agent design starts with logical flowcharts"
        ]
      },
      {
        id: "d11-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Distinguished passive chat from active agency",
          "Visualized logical paths for complex goals",
          "MAPPED software tools for model execution"
        ]
      },
      {
        id: "d11-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we build workflows using visual n8n software. See you!"
      }
    ]
  },
  {
    day: 12,
    week: 3,
    topic: "No-Code Workflows with n8n",
    slides: [
      {
        id: "d12-s1",
        type: "title",
        title: "No-Code Workflows with n8n",
        subtitle: "Day 12 · AI Summer Camp 2026"
      },
      {
        id: "d12-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we discovered the power of autonomous AI agents."
      },
      {
        id: "d12-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Introduction to visual canvas in n8n",
          "Understanding triggers, nodes, and connections",
          "Building your first automated data flow",
          "Connecting model API keys to visual apps"
        ]
      },
      {
        id: "d12-s4",
        type: "concept1",
        title: "Nodes and Triggers",
        bullets: [
          "Trigger: starting event of any flow",
          "Node: specific app actions and tasks",
          "Connections pass data block to block",
          "Visual building blocks replace standard coding",
          "Easy to read and debug live"
        ]
      },
      {
        id: "d12-s5",
        type: "concept2",
        title: "Connecting AI to Apps",
        bullets: [
          "n8n hosts AI nodes natively",
          "Send incoming email data to model",
          "Format model reply dynamically in flow",
          "Deliver result back out to users"
        ]
      },
      {
        id: "d12-s6",
        type: "example",
        title: "The Domino Analogy",
        paragraph: "An n8n workflow is like a row of falling dominoes. Push the first one (the trigger), and the rest execute automatically."
      },
      {
        id: "d12-s7",
        type: "demo",
        title: "Live Demo: n8n Launch",
        bullets: [
          "Create a blank n8n canvas live",
          "Connect simple Webhook trigger to model",
          "Execute live flow test and watch success"
        ]
      },
      {
        id: "d12-s8",
        type: "activity",
        title: "Build: Auto Email Responder Flow",
        numberedSteps: [
          "Open your n8n workspace browser tab",
          "Set up email inbox listener node",
          "Link to model node for drafting",
          "Add draft auto email response block",
          "Run active test with mock email"
        ]
      },
      {
        id: "d12-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Visual nodes make automations very simple",
          "Triggers start workflows without manual clicks",
          "AI nodes connect chat intelligence anywhere"
        ]
      },
      {
        id: "d12-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Navigated visual canvas building blocks easily",
          "Constructed active triggers to start tasks",
          "Integrated Gemini models into custom email flows"
        ]
      },
      {
        id: "d12-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we learn how AI stores long-term memory. See you!"
      }
    ]
  },
  {
    day: 13,
    week: 3,
    topic: "Memory & Knowledge in AI Systems",
    slides: [
      {
        id: "d13-s1",
        type: "title",
        title: "Memory & Knowledge in AI",
        subtitle: "Day 13 · AI Summer Camp 2026"
      },
      {
        id: "d13-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we built our first auto-responder in n8n."
      },
      {
        id: "d13-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Short-term versus long-term model memory",
          "What is Retrieval-Augmented Generation (RAG)",
          "How databases store custom text vectorially",
          "Accessing custom knowledge bases live"
        ]
      },
      {
        id: "d13-s4",
        type: "concept1",
        title: "What is RAG?",
        bullets: [
          "Retrieval-Augmented Generation: adding external facts",
          "AI searches custom database first",
          "Pulls relevant context info into prompt",
          "Slashes model hallucination rates massively",
          "Keeps private business records highly secure"
        ]
      },
      {
        id: "d13-s5",
        type: "concept2",
        title: "AI Memory Types",
        bullets: [
          "Chat history is short temporary memory",
          "Vector database acts as permanent storage",
          "RAG queries database on demand",
          "Gives models customized learning instantly"
        ]
      },
      {
        id: "d13-s6",
        type: "example",
        title: "The Open Book Analogy",
        paragraph: "RAG is like an student taking an open-book exam. Instead of guessing, they look up the exact formula in the textbook."
      },
      {
        id: "d13-s7",
        type: "demo",
        title: "Demo: Personal Knowledge Assistant",
        bullets: [
          "Upload student handbook PDF file live",
          "Ask system specific rules about camp",
          "Observe model citation of page sources"
        ]
      },
      {
        id: "d13-s8",
        type: "activity",
        title: "Activity: Test the RAG Assistant",
        numberedSteps: [
          "Form teams of three students",
          "Log into our custom RAG platform",
          "Query database with tough handbook questions",
          "Verify answers match manual PDF search",
          "Log any model lookup errors found"
        ]
      },
      {
        id: "d13-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "RAG links models to external libraries",
          "Vector lookup prevents simple model mistakes",
          "Databases keep custom private details safe"
        ]
      },
      {
        id: "d13-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Discovered short and long memory types",
          "Connected custom files for smart lookups",
          "Audited model source facts for accuracy"
        ]
      },
      {
        id: "d13-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we learn how agent teams work together. Bye!"
      }
    ]
  },
  {
    day: 14,
    week: 3,
    topic: "Multi-Agent Systems",
    slides: [
      {
        id: "d14-s1",
        type: "title",
        title: "Multi-Agent Systems",
        subtitle: "Day 14 · AI Summer Camp 2026"
      },
      {
        id: "d14-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we learned about RAG and custom knowledge bases."
      },
      {
        id: "d14-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "When single agents hit system limits",
          "Manager and worker agent organization models",
          "Simulating AI research team workflows live",
          "Design rules for multi-agent systems"
        ]
      },
      {
        id: "d14-s4",
        type: "concept1",
        title: "Teams of Agents",
        bullets: [
          "Break big goals into sub-tasks",
          "Assign each agent a specialty role",
          "Agents talk to each other automatically",
          "Improves system output quality enormously",
          "Prevents single agent focus overload bugs"
        ]
      },
      {
        id: "d14-s5",
        type: "concept2",
        title: "The Manager-Worker Pattern",
        bullets: [
          "Manager agent designs task list plan",
          "Delegates sub-tasks to specialized worker agents",
          "Workers execute and return result data",
          "Manager checks work for quality standard"
        ]
      },
      {
        id: "d14-s6",
        type: "example",
        title: "The Play Analogy",
        paragraph: "Multi-agent systems are like a theater production. You need a director, actors, and light crew working together to make a great show."
      },
      {
        id: "d14-s7",
        type: "demo",
        title: "Live Demo: Research Team",
        bullets: [
          "Launch a coder and tester agent",
          "Watch them review and fix code",
          "Monitor agent communications in loop dashboard"
        ]
      },
      {
        id: "d14-s8",
        type: "activity",
        title: "Activity: Role-Play a Multi-Agent System",
        numberedSteps: [
          "Form teams of four classmate players",
          "Assign manager, researcher, writer, editor roles",
          "Pass paper messages to create summary",
          "Adhere strictly to role instructions only",
          "Review finished team writing sample together"
        ]
      },
      {
        id: "d14-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Dividing labor yields high-quality outputs",
          "Standard rules guide agent communication loops",
          "Multi-agent structures solve highly complex tasks"
        ]
      },
      {
        id: "d14-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Structured multi-step task delegation rules",
          "Simulated human agency through group activity",
          "Identified logic errors in agent loops"
        ]
      },
      {
        id: "d14-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow is Week 3 Project! Build your agent. See you!"
      }
    ]
  },
  {
    day: 15,
    week: 3,
    topic: "Week 3 Project — Build an AI Agent",
    slides: [
      {
        id: "d15-s1",
        type: "title",
        title: "Week 3 Project — Build an AI Agent",
        subtitle: "Day 15 · AI Summer Camp 2026"
      },
      {
        id: "d15-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we learned to orchestrate teams of agents."
      },
      {
        id: "d15-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Agent builder project options and scopes",
          "Mapping logical steps on visual paper",
          "Configuring n8n workflows and active keys",
          "Live class demo and feedback roundtable"
        ]
      },
      {
        id: "d15-s4",
        type: "concept1",
        title: "Designing the Logic First",
        bullets: [
          "Never build without planning flow",
          "Map trigger events on paper first",
          "Trace what data flows between blocks",
          "Write down negative edge case states",
          "Keeps build phase simple and fast"
        ]
      },
      {
        id: "d15-s5",
        type: "concept2",
        title: "Debugging Your Agent",
        bullets: [
          "Check execution history logs for errors",
          "Find which node passed empty data",
          "Fix formatting steps in intermediate blocks",
          "Run clean single-node tests continuously"
        ]
      },
      {
        id: "d15-s6",
        type: "example",
        title: "The Assembly Line Analogy",
        paragraph: "Building an agent workflow is like constructing an assembly line. Each station must receive, modify, and pass the product correctly."
      },
      {
        id: "d15-s7",
        type: "demo",
        title: "Live Demo: Troubleshooting",
        bullets: [
          "Break active visual workflow node deliberately",
          "Open error logs to spot failure",
          "Correct setting errors and re-run live"
        ]
      },
      {
        id: "d15-s8",
        type: "activity",
        title: "Project: Working n8n Agent Demo",
        numberedSteps: [
          "Select custom agent idea card target",
          "Draw logical flowcharts on desk board",
          "Build n8n node connections in browser",
          "Deploy test runs and squish bugs",
          "Demonstrate working agent to camp mentor"
        ]
      },
      {
        id: "d15-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Planning flow charts saves massive time",
          "Debugging is normal part of creation",
          "Working agents automate repetitive human tasks"
        ]
      },
      {
        id: "d15-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Designed complete custom n8n logic maps",
          "Squished active node configuration data bugs",
          "Presented operational no-code software agents live"
        ]
      },
      {
        id: "d15-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Next week we cover ethics, careers, and graduation. Enjoy!"
      }
    ]
  },
  {
    day: 16,
    week: 4,
    topic: "AI Ethics & Responsible Use",
    slides: [
      {
        id: "d16-s1",
        type: "title",
        title: "AI Ethics & Responsible Use",
        subtitle: "Day 16 · AI Summer Camp 2026"
      },
      {
        id: "d16-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Welcome to Week 4! Last week we built working AI agents."
      },
      {
        id: "d16-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "How training data introduces model bias",
          "Privacy and files tech companies collect",
          "Identifying fake images and media tricks",
          "Global rules and safety guidelines overview"
        ]
      },
      {
        id: "d16-s4",
        type: "concept1",
        title: "What is AI Bias?",
        bullets: [
          "AI learns from historic human data",
          "Data contains unfair prejudices or assumptions",
          "Model copies and amplifies these biases",
          "Leads to unfair decisions in tools",
          "Requires human engineering to balance out"
        ]
      },
      {
        id: "d16-s5",
        type: "concept2",
        title: "Digital Fingerprints & Fake Media",
        bullets: [
          "Generators produce super realistic fake photos",
          "Misinformation spreads fast across social networks",
          "Always verify source origins and claims",
          "Look for strange visual error artifacts"
        ]
      },
      {
        id: "d16-s6",
        type: "example",
        title: "The Mirror Analogy",
        paragraph: "AI is like a mirror reflecting society. If the picture of our world is dusty, the reflection will be dusty too."
      },
      {
        id: "d16-s7",
        type: "demo",
        title: "Live Demo: Spotting Fakes",
        bullets: [
          "Analyze visual signs of fake images",
          "Inspect generated text for telltale patterns",
          "Use reverse image search lookup live"
        ]
      },
      {
        id: "d16-s8",
        type: "activity",
        title: "Activity: Ethics Debate Teams",
        numberedSteps: [
          "Gather in two debate team lines",
          "Receive real AI ethics topic prompt",
          "Formulate three logical arguments for stance",
          "Present views in alternating speaker turns",
          "Reflect on compromises and balance choices"
        ]
      },
      {
        id: "d16-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Data bias creates unfair model results",
          "Verify everything you read online closely",
          "Responsible use ensures tech benefits everyone"
        ]
      },
      {
        id: "d16-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Uncovered hidden algorithmic bias in systems",
          "Analyzed privacy risks of training data",
          "Debated deep rules for future safety"
        ]
      },
      {
        id: "d16-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we map your AI career options! See you!"
      }
    ]
  },
  {
    day: 17,
    week: 4,
    topic: "AI & Your Career Future",
    slides: [
      {
        id: "d17-s1",
        type: "title",
        title: "AI & Your Career Future",
        subtitle: "Day 17 · AI Summer Camp 2026"
      },
      {
        id: "d17-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we debated ethical safety rules and model bias."
      },
      {
        id: "d17-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Jobs being automated versus brand new roles",
          "Why human creativity always remains essential",
          "Overview of modern tech jobs in industry",
          "How to stay learning after summer camp"
        ]
      },
      {
        id: "d17-s4",
        type: "concept1",
        title: "New AI Careers",
        bullets: [
          "Prompt engineers draft specialized instruction logic",
          "AI trainers teach models clean habits",
          "Ethicists ensure systems stay safe fair",
          "Workflow creators build autonomous agent stacks",
          "These jobs did not exist years ago"
        ]
      },
      {
        id: "d17-s5",
        type: "concept2",
        title: "Uniquely Human Skills",
        bullets: [
          "Empathy: understanding deep human emotional needs",
          "Original creativity: imagining completely new paths",
          "Moral judgment: making difficult life choices",
          "These skills are impossible to code"
        ]
      },
      {
        id: "d17-s6",
        type: "example",
        title: "The Calculator Analogy",
        paragraph: "AI is like the calculator. It did not replace mathematicians — it freed them to solve bigger, more exciting problems."
      },
      {
        id: "d17-s7",
        type: "demo",
        title: "Live Demo: Project Paths",
        bullets: [
          "Browse active prompt engineer job boards",
          "Review visual workflow career certifications online",
          "Look at open-source learning repositories online"
        ]
      },
      {
        id: "d17-s8",
        type: "activity",
        title: "Activity: 'My AI Career' Vision Board",
        numberedSteps: [
          "Pick three futuristic career ideas you like",
          "Outline the human skills you need most",
          "Draw visual board detailing your path",
          "Present your future dream to classmates",
          "Save board in personal student profile"
        ]
      },
      {
        id: "d17-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "New technology creates exciting job roles",
          "Human skills are more valuable than ever",
          "Keep learning and building code-free automations"
        ]
      },
      {
        id: "d17-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Mapped shifting labor landscapes in tech",
          "Defined core values of human empathy",
          "Designed clear next-step study pathway goals"
        ]
      },
      {
        id: "d17-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow we peek at the ultimate future of AGI! Bye!"
      }
    ]
  },
  {
    day: 18,
    week: 4,
    topic: "The Future of AI — What's Coming",
    slides: [
      {
        id: "d18-s1",
        type: "title",
        title: "The Future of AI — What's Coming",
        subtitle: "Day 18 · AI Summer Camp 2026"
      },
      {
        id: "d18-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we mapped out future jobs and careers."
      },
      {
        id: "d18-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Understanding Artificial General Intelligence (AGI)",
          "AI solving medicine and climate issues",
          "Major trends to watch over five years",
          "How students will shape future tech"
        ]
      },
      {
        id: "d18-s4",
        type: "concept1",
        title: "What is AGI?",
        bullets: [
          "Artificial General Intelligence behaves humanly versatile",
          "Can learn any intellectual human task",
          "Still a scientific research dream today",
          "Spark of massive active debate among experts",
          "Requires completely brand new computing structures"
        ]
      },
      {
        id: "d18-s5",
        type: "concept2",
        title: "AI Saving the Planet",
        bullets: [
          "Predicting protein folds for medical cures",
          "Optimizing energy grids for climate relief",
          "Analyzing solar patterns for advanced power",
          "Processing space telescope telescope images fast"
        ]
      },
      {
        id: "d18-s6",
        type: "example",
        title: "The Spaceship Analogy",
        paragraph: "The future of AI is like building a spaceship. We have built the booster rocket — but the destination is up to us."
      },
      {
        id: "d18-s7",
        type: "demo",
        title: "Live Demo: Sci-Fi Tech",
        bullets: [
          "Show active visual robotics model projects",
          "Demonstrate real-time language translations live",
          "Display climate pattern heat maps powered visually"
        ]
      },
      {
        id: "d18-s8",
        type: "activity",
        title: "Activity: Future World Scenarios",
        numberedSteps: [
          "Get assigned a 2040 year scenario card",
          "Brainstorm how AI solves scenario troubles",
          "Draft one-page futuristic news report text",
          "Read report in dramatic reporter voice",
          "Vote on most hopeful future world"
        ]
      },
      {
        id: "d18-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "AGI is equal human general intelligence",
          "AI helps solve major scientific problems",
          "The future depends on youth building responsibly"
        ]
      },
      {
        id: "d18-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Demystified high-level general machine definitions",
          "Explored breakthrough scientific research applications",
          "Shared creative visions of tomorrow's society"
        ]
      },
      {
        id: "d18-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow is final capstone prep and presentation rehearsals. See you!"
      }
    ]
  },
  {
    day: 19,
    week: 4,
    topic: "Capstone Project Prep",
    slides: [
      {
        id: "d19-s1",
        type: "title",
        title: "Capstone Project Prep",
        subtitle: "Day 19 · AI Summer Camp 2026"
      },
      {
        id: "d19-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we envisioned the exciting future of AGI technology."
      },
      {
        id: "d19-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Finalizing team capstone visual decks",
          "Gathering feedback from camp mentors",
          "Polishing active live workspace demonstrations",
          "Rehearsal presentations round on stage"
        ]
      },
      {
        id: "d19-s4",
        type: "concept1",
        title: "A Perfect Demo Slide",
        bullets: [
          "Never show massive blocks of text",
          "Use screenshot graphics for visual aid",
          "Keep descriptions under eight words always",
          "Highlight the user problem clearly first",
          "Focus on high-level functional outcomes always"
        ]
      },
      {
        id: "d19-s5",
        type: "concept2",
        title: "Overcoming Stage Jitters",
        bullets: [
          "Take slow deep breaths before speaking",
          "Present key ideas with high confidence",
          "Look at camp friends for support",
          "Keep your script notes very brief"
        ]
      },
      {
        id: "d19-s6",
        type: "example",
        title: "The Dress Rehearsal",
        paragraph: "Preparing is like tuning a musical instrument. A little practice beforehand ensures your concert sounds beautiful."
      },
      {
        id: "d19-s7",
        type: "demo",
        title: "Workshop: Presentation Skills",
        bullets: [
          "Demonstrate perfect body posture on stage",
          "Show how to transition slides smoothly",
          "Practice answering tricky judge questions live"
        ]
      },
      {
        id: "d19-s8",
        type: "activity",
        title: "Activity: Pitch Rehearsals",
        numberedSteps: [
          "Stand with your capstone team members",
          "Deliver your full draft slide speech",
          "Get constructive tips from team mentors",
          "Modify slides based on visual feedback",
          "Complete one final successful dress run"
        ]
      },
      {
        id: "d19-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "Simple slides deliver much stronger messages",
          "Rehearsing slashes presentation stress levels",
          "Feedback makes your final project shine"
        ]
      },
      {
        id: "d19-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Designed clean and focused slide narratives",
          "Coached teams on physical stage presence",
          "Polished live agent software demonstrations perfectly"
        ]
      },
      {
        id: "d19-s11",
        type: "preview",
        title: "Next Session Preview",
        paragraph: "Tomorrow is the big DEMO DAY and Graduation! Rest up!"
      }
    ]
  },
  {
    day: 20,
    week: 4,
    topic: "Demo Day & Graduation",
    slides: [
      {
        id: "d20-s1",
        type: "title",
        title: "🏆 Demo Day & Graduation",
        subtitle: "Day 20 · AI Summer Camp 2026"
      },
      {
        id: "d20-s2",
        type: "recap",
        title: "Quick Recap",
        paragraph: "Yesterday we polished our speeches and finalized slide deck formats."
      },
      {
        id: "d20-s3",
        type: "agenda",
        title: "Today's Agenda",
        bullets: [
          "Team live capstone project pitch presentations",
          "Q&A session with industry guest judges",
          "Camp graduation certificate awards ceremony",
          "Closing remarks and community resource sharing"
        ]
      },
      {
        id: "d20-s4",
        type: "concept1",
        title: "You Are AI Creators",
        bullets: [
          "You understand how smart machines think",
          "You designed expert-level prompt libraries successfully",
          "You built visual autonomous agent workflows",
          "You evaluated tech ethics and values",
          "This is only your beginning step"
        ]
      },
      {
        id: "d20-s5",
        type: "concept2",
        title: "Continuing Your Journey",
        bullets: [
          "Join online student builder tech forums",
          "Follow latest AI product releases weekly",
          "Keep building custom tools without code",
          "Share your creations with the world"
        ]
      },
      {
        id: "d20-s6",
        type: "example",
        title: "The Launchpad Analogy",
        paragraph: "This camp is not a finish line — it is a launchpad. You now have the fuel to fly wherever you choose."
      },
      {
        id: "d20-s7",
        type: "demo",
        title: "Live Celebration",
        bullets: [
          "Display class collage of daily highlights",
          "Roll student quotes and funny bloopers",
          "Open guest speaker feedback chat wall"
        ]
      },
      {
        id: "d20-s8",
        type: "activity",
        title: "Event: Graduation & Awards",
        numberedSteps: [
          "Walk proudly onto the main stage",
          "Receive custom print camp graduation certificate",
          "Take class photo with guest judges",
          "Throw caps into the air celebrating",
          "Grab cupcakes and juice at buffet"
        ]
      },
      {
        id: "d20-s9",
        type: "takeaways",
        title: "Key Takeaways",
        bullets: [
          "You possess valuable future career skills",
          "No-code tools enable rapid world-class creation",
          "Your curiosity is your greatest superpower"
        ]
      },
      {
        id: "d20-s10",
        type: "summary",
        title: "Daily Summary",
        bullets: [
          "Completed final team capstone project pitches",
          "Awarded camp completion certificates to all",
          "Initiated long-term student builder network platform"
        ]
      },
      {
        id: "d20-s11",
        type: "preview",
        title: "Teaser",
        paragraph: "Thank you for joining AI Summer Camp 2026! Go change the world! 👋🎓"
      }
    ]
  }
];
