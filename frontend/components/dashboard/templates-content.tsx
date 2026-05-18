"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Heart,
  ArrowRight,
  UtensilsCrossed,
  Scissors,
  Dumbbell,
  Stethoscope,
  Building2,
  GraduationCap,
  ShoppingBag,
  Palette,
  Sparkles
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const categories = [
  { id: "all", name: "All Templates", icon: Sparkles, count: 150 },
  { id: "restaurant", name: "Restaurant & Food", icon: UtensilsCrossed, count: 25 },
  { id: "beauty", name: "Beauty & Salon", icon: Scissors, count: 18 },
  { id: "fitness", name: "Fitness & Gym", icon: Dumbbell, count: 15 },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope, count: 16 },
  { id: "realestate", name: "Real Estate", icon: Building2, count: 14 },
  { id: "education", name: "Education", icon: GraduationCap, count: 20 },
  { id: "ecommerce", name: "E-Commerce", icon: ShoppingBag, count: 24 },
  { id: "creative", name: "Creative & Agency", icon: Palette, count: 18 },
]

const templates = [
  { 
    id: 1, 
    name: "La Bella Cucina", 
    category: "restaurant",
    style: "Modern",
    rating: 4.9,
    reviews: 234,
    likes: 1.2,
    gradient: "from-orange-500/30 to-red-500/10",
    isPro: false,
    isNew: true,
  },
  { 
    id: 2, 
    name: "Glow Studio", 
    category: "beauty",
    style: "Elegant",
    rating: 4.8,
    reviews: 189,
    likes: 0.9,
    gradient: "from-pink-500/30 to-rose-500/10",
    isPro: true,
    isNew: false,
  },
  { 
    id: 3, 
    name: "FitLife Pro", 
    category: "fitness",
    style: "Bold",
    rating: 4.7,
    reviews: 156,
    likes: 0.8,
    gradient: "from-green-500/30 to-emerald-500/10",
    isPro: false,
    isNew: false,
  },
  { 
    id: 4, 
    name: "MedCare Plus", 
    category: "healthcare",
    style: "Clean",
    rating: 4.9,
    reviews: 98,
    likes: 0.5,
    gradient: "from-blue-500/30 to-cyan-500/10",
    isPro: true,
    isNew: true,
  },
  { 
    id: 5, 
    name: "Urban Homes", 
    category: "realestate",
    style: "Luxury",
    rating: 4.8,
    reviews: 167,
    likes: 1.1,
    gradient: "from-amber-500/30 to-yellow-500/10",
    isPro: true,
    isNew: false,
  },
  { 
    id: 6, 
    name: "EduHub", 
    category: "education",
    style: "Friendly",
    rating: 4.6,
    reviews: 143,
    likes: 0.7,
    gradient: "from-indigo-500/30 to-violet-500/10",
    isPro: false,
    isNew: false,
  },
  { 
    id: 7, 
    name: "ShopStyle", 
    category: "ecommerce",
    style: "Minimal",
    rating: 4.9,
    reviews: 312,
    likes: 2.1,
    gradient: "from-accent/30 to-accent/10",
    isPro: true,
    isNew: true,
  },
  { 
    id: 8, 
    name: "Creative Studio", 
    category: "creative",
    style: "Artistic",
    rating: 4.7,
    reviews: 178,
    likes: 1.3,
    gradient: "from-fuchsia-500/30 to-purple-500/10",
    isPro: false,
    isNew: false,
  },
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
]

export function TemplatesContent() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Templates</h1>
        <p className="text-muted-foreground">
          Browse {filteredTemplates.length} professional templates for your business
        </p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={sortBy === option.value ? "bg-secondary" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:block w-64 shrink-0"
        >
          <div className="sticky top-6 space-y-1">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    isSelected
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                  <span className={`text-xs ${isSelected ? "text-accent" : "text-muted-foreground"}`}>
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.aside>

        {/* Templates Grid */}
        <div className="flex-1">
          {/* Mobile Categories */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index % 6) }}
              >
                <Card className="group overflow-hidden border-border bg-card hover:border-accent/50 transition-colors">
                  {/* Preview */}
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${template.gradient}`}>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {template.isNew && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                          New
                        </span>
                      )}
                      {template.isPro && (
                        <span className="rounded-full bg-foreground px-2 py-0.5 text-xs font-medium text-background">
                          Pro
                        </span>
                      )}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link href={`/builder?template=${template.id}`}>
                        <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                          Use Template
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                    </div>

                    {/* Favorite */}
                    <button className="absolute top-3 right-3 rounded-full bg-background/50 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background">
                      <Heart className="h-4 w-4 text-foreground" />
                    </button>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{template.name}</h3>
                        <p className="text-xs text-muted-foreground">{template.style}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium text-foreground">{template.rating}</span>
                        <span className="text-muted-foreground">({template.reviews})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
