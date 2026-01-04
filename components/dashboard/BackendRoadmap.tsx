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
    title: "Backend Fundamentals",
    description: "Core backend & server concepts",
    lessons: [
      {
        title: "Client–Server Architecture",
        url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview",
      },
      {
        title: "HTTP Methods & Status Codes",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
      },
      {
        title: "REST APIs",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
      },
    ],
  },
  {
    title: "Node.js",
    description: "JavaScript runtime for backend",
    lessons: [
      {
        title: "Node.js Introduction",
        url: "https://nodejs.org/en/docs/guides",
      },
      {
        title: "Event Loop",
        url: "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick",
      },
      {
        title: "File System & Streams",
        url: "https://nodejs.org/api/fs.html",
      },
    ],
  },
  {
    title: "Express.js",
    description: "Backend framework for Node.js",
    lessons: [
      {
        title: "Express Basics",
        url: "https://expressjs.com/en/starter/installing.html",
      },
      {
        title: "Routing",
        url: "https://expressjs.com/en/guide/routing.html",
      },
      {
        title: "Middleware",
        url: "https://expressjs.com/en/guide/using-middleware.html",
      },
    ],
  },
  {
    title: "Databases",
    description: "Store & manage data",
    lessons: [
      {
        title: "SQL Basics",
        url: "https://www.postgresql.org/docs/current/tutorial.html",
      },
      {
        title: "NoSQL (MongoDB)",
        url: "https://www.mongodb.com/docs/manual/introduction/",
      },
      {
        title: "ORM Basics",
        url: "https://www.prisma.io/docs/concepts/overview",
      },
    ],
  },
  {
    title: "Authentication & Security",
    description: "Secure backend systems",
    lessons: [
      {
        title: "Authentication vs Authorization",
        url: "https://developer.mozilla.org/en-US/docs/Web/Security/Authentication",
      },
      {
        title: "JWT Authentication",
        url: "https://jwt.io/introduction",
      },
      {
        title: "Web Security Basics",
        url: "https://developer.mozilla.org/en-US/docs/Web/Security",
      },
    ],
  },
  {
    title: "Deployment",
    description: "Deploy backend services",
    lessons: [
      {
        title: "Environment Variables",
        url: "https://12factor.net/config",
      },
      {
        title: "Docker Basics",
        url: "https://docs.docker.com/get-started/",
      },
      {
        title: "CI/CD Basics",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
]

export default function BackendRoadmap() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Backend Developer Roadmap</h1>
      <p className="text-muted-foreground mb-8">
        Learn backend development using official documentation & best practices.
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
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
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
