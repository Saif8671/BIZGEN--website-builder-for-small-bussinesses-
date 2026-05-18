"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Mail, Lock, Eye, EyeOff, Loader2, User, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { getEmailAuthErrorMessage, getOAuthAuthErrorMessage } from "@/lib/firebase-auth-errors"
import { toast } from "sonner"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type SignupForm = z.infer<typeof signupSchema>

const businessCategories = [
  "Restaurant & Food",
  "Beauty & Salon",
  "Fitness & Gym",
  "Healthcare",
  "Real Estate",
  "Education",
  "E-Commerce",
  "Creative Agency",
  "Other",
]

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { user, loading, signUp, signInWithGoogle, signInWithGithub } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard")
    }
  }, [loading, router, user])

  const onSubmit = async (data: SignupForm) => {
    if (step === 1) {
      setStep(2)
      return
    }
    
    setIsLoading(true)
    try {
      await signUp(data.email, data.password, data.name)
      console.log("Signup successful. Preference saved:", selectedCategory)
      
      toast.success("Welcome to BizGen!", {
        description: `Your account is ready! Customized category: ${selectedCategory}`,
      })
      router.replace("/dashboard")
    } catch (error: any) {
      console.error("Signup error:", error)
      toast.error("Registration failed", {
        description: getEmailAuthErrorMessage(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      toast.success("Welcome to BizGen!", {
        description: "Account created successfully with Google.",
      })
      router.replace("/dashboard")
    } catch (error: any) {
      console.error("Google signup error:", error)
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Google sign up failed", {
          description: getOAuthAuthErrorMessage(error, "Google"),
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubSignUp = async () => {
    setIsLoading(true)
    try {
      await signInWithGithub()
      toast.success("Welcome to BizGen!", {
        description: "Account created successfully with GitHub.",
      })
      router.replace("/dashboard")
    } catch (error: any) {
      console.error("GitHub signup error:", error)
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("GitHub sign up failed", {
          description: getOAuthAuthErrorMessage(error, "GitHub"),
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">BizGen</span>
            </Link>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 1 ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>
                {step > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <div className={`h-1 flex-1 rounded-full ${step > 1 ? 'bg-accent' : 'bg-secondary'}`} />
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 2 ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>
                2
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Create your account
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-accent hover:text-accent/80">
                      Sign in
                    </Link>
                  </p>

                  {/* OAuth Buttons */}
                  <div className="mt-8 space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full gap-3 border-border bg-card hover:bg-secondary"
                      type="button"
                      onClick={handleGoogleSignUp}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </Button>

                    <Button 
                      variant="outline" 
                      className="w-full gap-3 border-border bg-card hover:bg-secondary"
                      type="button"
                      onClick={handleGithubSignUp}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Continue with GitHub
                    </Button>
                  </div>

                  {/* Divider */}
                  <div className="relative mt-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-background px-4 text-muted-foreground">or continue with email</span>
                    </div>
                  </div>

                  {/* Signup Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Full name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10 bg-card border-border"
                            {...register("name")}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">Email address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            className="pl-10 bg-card border-border"
                            {...register("email")}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password (min. 8 characters)"
                            className="pl-10 pr-10 bg-card border-border"
                            {...register("password")}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-destructive">{errors.password.message}</p>
                        )}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By creating an account, you agree to our{" "}
                      <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    What type of business?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select your business category to get personalized templates
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {businessCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-xl border p-4 text-left text-sm transition-colors ${
                          selectedCategory === category
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    <Button 
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="w-full bg-foreground text-background hover:bg-foreground/90"
                      disabled={isLoading || !selectedCategory}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create account"
                      )}
                    </Button>
                    <Button 
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="w-full text-muted-foreground"
                    >
                      Back
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="relative hidden lg:flex lg:flex-1 items-center justify-center bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
        <div className="relative z-10 max-w-md p-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/20">
              <Sparkles className="h-10 w-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Launch in Minutes
            </h3>
            <p className="text-muted-foreground">
              Join 50,000+ businesses who have built their online presence with BizGen. 
              Start your free trial today.
            </p>
            <div className="mt-8 flex justify-center gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Websites</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">150+</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
