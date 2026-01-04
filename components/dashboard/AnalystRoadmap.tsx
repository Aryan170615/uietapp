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
    title: "Data Analysis Fundamentals",
    description: "Core data concepts",
    lessons: [
      {
        title: "What is Data Analysis?",
        url: "https://www.ibm.com/topics/data-analysis",
      },
      {
        title: "Types of Data",
        url: "https://www.scribbr.com/methodology/types-of-data/",
      },
      {
        title: "Data Cleaning",
        url: "https://www.kaggle.com/learn/data-cleaning",
      },
    ],
  },
  {
    title: "Excel & Spreadsheets",
    description: "Foundation tool for analysts",
    lessons: [
      {
        title: "Excel Basics",
        url: "https://support.microsoft.com/excel",
      },
      {
        title: "Pivot Tables",
        url: "https://support.microsoft.com/en-us/excel/pivottables",
      },
      {
        title: "Excel Functions",
        url: "https://support.microsoft.com/en-us/excel/excel-functions",
      },
    ],
  },
  {
    title: "SQL for Analysis",
    description: "Query structured data",
    lessons: [
      {
        title: "SQL Basics",
        url: "https://www.w3schools.com/sql/",
      },
      {
        title: "Joins & Aggregations",
        url: "https://mode.com/sql-tutorial/sql-joins/",
      },
      {
        title: "Window Functions",
        url: "https://www.postgresql.org/docs/current/tutorial-window.html",
      },
    ],
  },
  {
    title: "Python for Data Analysis",
    description: "Analyze & process data",
    lessons: [
      {
        title: "Python Basics",
        url: "https://docs.python.org/3/tutorial/",
      },
      {
        title: "NumPy",
        url: "https://numpy.org/doc/stable/user/quickstart.html",
      },
      {
        title: "Pandas",
        url: "https://pandas.pydata.org/docs/getting_started/index.html",
      },
    ],
  },
  {
    title: "Data Visualization",
    description: "Communicate insights",
    lessons: [
      {
        title: "Data Visualization Principles",
        url: "https://www.tableau.com/learn/articles/data-visualization",
      },
      {
        title: "Matplotlib",
        url: "https://matplotlib.org/stable/tutorials/index.html",
      },
      {
        title: "Power BI / Tableau Basics",
        url: "https://learn.microsoft.com/power-bi/",
      },
    ],
  },
  {
    title: "Statistics",
    description: "Core statistical knowledge",
    lessons: [
      {
        title: "Descriptive Statistics",
        url: "https://www.khanacademy.org/math/statistics-probability",
      },
      {
        title: "Probability",
        url: "https://www.khanacademy.org/math/statistics-probability/probability-library",
      },
      {
        title: "Hypothesis Testing",
        url: "https://www.scribbr.com/statistics/hypothesis-testing/",
      },
    ],
  },
]

export default function AnalystRoadmap() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Data Analyst Roadmap</h1>
      <p className="text-muted-foreground mb-8">
        Learn data analysis using trusted industry documentation.
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
