"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, BookOpen, Trophy, Zap } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { TextSplit } from "./ui/text-split"
import { TextReveal } from "./ui/text-reveal"
import { RadialNav } from "./animate-ui/components/community/radial-nav"

export default function Landing() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUser, setIsUser] = useState(true)

  useEffect(() => {
      setEmail("")
      setPassword("")
    }, [isUser])

  const handleSignUp = async () => {
    setIsLoading(true)
    if (!email || !password) {
      setIsLoading(false)
      toast.error("Email and password required", {
            position: 'top-center',
            style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
          } as React.CSSProperties
      })
      return
    }
    try{
    const result = await axios.post("http://localhost:3000/api/auth/signup", {
      email, 
      password
    })
     if(result.status === 200){  
       localStorage.setItem("token", result.data.token)
       router.push("/dashboard")
     }
    } catch(e) {
       
      console.log(e, "Failed to Signup")
    } finally {
      setIsLoading(false)
    } 
  }

  const handleSignIn = async () => {
  setIsLoading(true)
  try {
    const res = await axios.post("http://localhost:3000/api/auth/signin", {
      email,
      password,
    })
    if(res.status === 200){  
       localStorage.setItem("token", res.data.token)
       router.push("/dashboard")
     }
  } catch (e) {
    toast.error("Invalid credentials")
  } finally {
    setIsLoading(false)
  }
}

  return (
<div className="min-h-screen text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <TextSplit
                className="text-4xl font-semibold uppercase"
                topClassName="text-blue-200"
                bottomClassName="text-zinc-950 dark:text-zinc-50"
              >
                UIETMATE
              </TextSplit>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-blue-400 transition">
              Features
            </a>
            <a href="#about" className="hover:text-blue-400 transition">
              About
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-6 md:px-12 py-12 md:py-20 max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 animate-fadeInLeft">
            <div className="space-y-3">
              <div className="inline-block">
                <span className="text-xs font-semibold px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/50 text-blue-300">
                  Your College Success Platform
                </span>
              </div>
              
              <TextReveal
                  className="font-bold text-7xl bg-gradient-to-b from-zinc-900 dark:from-zinc-50 to-zinc-300 dark:to-zinc-500 bg-clip-text "
                  from="bottom"
                  split="letter"
                >
                  Master Your
                </TextReveal>
              <TextReveal
                  className=" text-7xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent "
                  from="bottom"
                  split="letter"
                >
                  College Journey
                </TextReveal>

              
              <p className="text-lg text-slate-300 max-w-md">
                Track attendance, ace exams, find lost items, and build your career—all in one place.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 py-4">
              {<RadialNav items={[
                {id: 1, icon: BookOpen, label: "Attendance Tracking", angle: 0  },
                {id: 2, icon: Trophy, label: "Career Boost", angle: 90  },
                {id: 3, icon: Users, label: "Community Support", angle: 180  },
                {id: 4,icon: Zap, label: "Smart Tools", angle: 270  },
              ]} defaultActiveId={3} />}
            </div>
          </div>

          {/* Right - Sign In Form */}
          <div className="flex items-center justify-center animate-fadeInRight">
            {isUser && <Card className="w-full pb-12 max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                 <CardContent className="pt-8">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Welcome Back</h2>
                    <p className="text-slate-300 text-sm">Sign in to access your dashboard</p>
                  </div>

                  {/* Form */}
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200 font-medium text-sm">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@uiet.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-200 font-medium text-sm">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 h-11"
                      />
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold h-11 shadow-lg hover:shadow-cyan-500/50 transition"
                      disabled={isLoading}
                      onClick={handleSignIn}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>

                  {/* Info */}
                  <div className="bg-blue-500/20 border cursor-pointer border-blue-400/50 rounded-lg p-3"
                  onClick={()=> {
                    setIsUser(false)
                  }}>
                    <p className="text-xs text-blue-200 text-center">
                      <span className="font-semibold">New: </span> Click here to Signup
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>}
            {!isUser && <Card className="w-full pb-12 max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="pt-8">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Welcome!</h2>
                    <p className="text-slate-300 text-sm">Sign up to access your dashboard</p>
                  </div>

                  {/* Form */}
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200 font-medium text-sm">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@uiet.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-200 font-medium text-sm">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 h-11"
                      />
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold h-11 shadow-lg hover:shadow-cyan-500/50 transition"
                      disabled={isLoading}
                      onClick={handleSignUp}
                    >
                      {isLoading ? "Signing up..." : "Sign Up"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>}
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Everything you need to succeed in college</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Attendance",
                desc: "Track your attendance and never miss a class",
                icon: "📊",
                color: "from-blue-400 to-blue-600",
              },
              {
                title: "Career Help",
                desc: "Get career guidance and interview prep",
                icon: "🚀",
                color: "from-purple-400 to-purple-600",
              },
              {
                title: "Lost & Found",
                desc: "Find lost items on campus quickly",
                icon: "🔍",
                color: "from-pink-400 to-pink-600",
              },
              {
                title: "Exam Prep",
                desc: "Organize study materials and exams",
                icon: "📚",
                color: "from-cyan-400 to-cyan-600",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition hover:bg-white/15 group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.desc}</p>
              </div>
            ))}
            
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 md:px-12 py-8 text-center text-slate-400 text-sm">
          <p>© 2026 UIETMATE. Your college success companion.</p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  )
}
