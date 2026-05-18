"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import {
  User,
  AuthError,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  signInWithRedirect,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth"
import { auth, googleProvider, githubProvider } from "@/lib/firebase"

export interface BackendProfile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  subscription_plan: string
  credits: number
  is_new_user?: boolean
}

interface AuthContextType {
  user: User | null
  profile: BackendProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function buildProfileFromUser(user: User): BackendProfile {
  return {
    id: user.uid,
    email: user.email ?? "",
    name: user.displayName,
    avatar_url: user.photoURL,
    subscription_plan: "free",
    credits: 0,
    is_new_user: false,
  }
}

function shouldFallbackToRedirect(error: AuthError) {
  return (
    error.code === "auth/internal-error" ||
    error.code === "auth/popup-blocked"
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<BackendProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      
      if (currentUser) {
        setProfile(buildProfileFromUser(currentUser))
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Update display name profile immediately
      await updateProfile(userCredential.user, {
        displayName: name
      })
      
      // Update state manually to trigger update in react components with the new displayName
      const updatedUser = auth.currentUser
      setUser(updatedUser ? { ...updatedUser } : userCredential.user)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      const authError = error as AuthError
      if (shouldFallbackToRedirect(authError) && typeof window !== "undefined") {
        await signInWithRedirect(auth, googleProvider)
        return
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithGithub = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, githubProvider)
    } catch (error) {
      const authError = error as AuthError
      if (shouldFallbackToRedirect(authError) && typeof window !== "undefined") {
        await signInWithRedirect(auth, githubProvider)
        return
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    logout,
    signInWithGoogle,
    signInWithGithub
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
