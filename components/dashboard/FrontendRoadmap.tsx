"use client"

import { ExternalLink } from "lucide-react"

type Lesson = {
  title: string
  url: string
}

type Module = {
  title: string
  description: string
  lessons: Lesson[]
}

const roadmap: Module[] = [
  {
    title: "Web Fundamentals",
    description: "How the web and browsers work",
    lessons: [
      {
        title: "How the Internet Works",
        url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work",
      },
      {
        title: "HTTP & HTTPS",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
      },
      {
        title: "How Browsers Render Pages",
        url: "https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work",
      },
    ],
  },
  {
    title: "HTML",
    description: "Structure the web",
    lessons: [
      {
        title: "HTML Basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML",
      },
      {
        title: "Semantic HTML",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
      },
      {
        title: "Forms & Inputs",
        url: "https://developer.mozilla.org/en-US/docs/Learn/Forms",
      },
    ],
  },
  {
    title: "CSS",
    description: "Style and layout websites",
    lessons: [
      {
        title: "CSS Basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps",
      },
      {
        title: "Flexbox",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout",
      },
      {
        title: "Grid",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
      },
      {
        title: "Responsive Design",
        url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
      },
    ],
  },
  {
    title: "JavaScript",
    description: "Make websites interactive",
    lessons: [
      {
        title: "JavaScript Basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps",
      },
      {
        title: "DOM Manipulation",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
      },
      {
        title: "Events",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events",
      },
      {
        title: "Async JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
      },
    ],
  },
  {
    title: "React (Core Concepts)",
    description: "Build modern frontend apps",
    lessons: [
      {
        title: "React Introduction",
        url: "https://react.dev/learn",
      },
      {
        title: "Components & Props",
        url: "https://react.dev/learn/your-first-component",
      },
      {
        title: "State & Hooks",
        url: "https://react.dev/learn/state-a-components-memory",
      },
      {
        title: "Effects",
        url: "https://react.dev/learn/synchronizing-with-effects",
      },
    ],
  },
]

export default function FrontendRoadmap() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Frontend Developer Roadmap</h1>
      <p className="text-muted-foreground mb-8">
        Click any topic to learn directly from MDN & official docs.
      </p>

      <div className="space-y-6">
        {roadmap.map((module, index) => (
          <div key={index} className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold">{module.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {module.description}
            </p>

            <div className="space-y-3">
              {module.lessons.map((lesson, i) => (
                <a
                  key={i}
                  href={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <span>{lesson.title}</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
