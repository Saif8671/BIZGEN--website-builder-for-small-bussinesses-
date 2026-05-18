"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const pageViewsData = [
  { name: "Mon", views: 1200, visitors: 890 },
  { name: "Tue", views: 1900, visitors: 1200 },
  { name: "Wed", views: 1600, visitors: 1100 },
  { name: "Thu", views: 2100, visitors: 1400 },
  { name: "Fri", views: 2400, visitors: 1600 },
  { name: "Sat", views: 1800, visitors: 1100 },
  { name: "Sun", views: 1400, visitors: 900 },
]

const monthlyData = [
  { name: "Jan", revenue: 4000, sites: 12 },
  { name: "Feb", revenue: 5200, sites: 18 },
  { name: "Mar", revenue: 6100, sites: 24 },
  { name: "Apr", revenue: 7800, sites: 32 },
  { name: "May", revenue: 9200, sites: 41 },
  { name: "Jun", revenue: 11500, sites: 52 },
]

const trafficSources = [
  { name: "Direct", value: 35, color: "#8b5cf6" },
  { name: "Organic", value: 30, color: "#06b6d4" },
  { name: "Social", value: 20, color: "#10b981" },
  { name: "Referral", value: 15, color: "#f59e0b" },
]

const topPages = [
  { page: "/home", views: 12400, change: 12.5 },
  { page: "/about", views: 8200, change: -3.2 },
  { page: "/services", views: 6800, change: 8.1 },
  { page: "/contact", views: 4500, change: 15.3 },
  { page: "/blog", views: 3200, change: 22.7 },
]

export function AnalyticsContent() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Total Page Views",
      value: "12,847",
      change: "+12.5%",
      isPositive: true,
      icon: Eye,
    },
    {
      title: "Unique Visitors",
      value: "8,234",
      change: "+8.2%",
      isPositive: true,
      icon: Users,
    },
    {
      title: "Avg. Session Duration",
      value: "3m 24s",
      change: "+15.3%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Bounce Rate",
      value: "42.3%",
      change: "-5.1%",
      isPositive: true,
      icon: BarChart3,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your website performance and visitor insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-accent/10 p-2">
                    <stat.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.isPositive ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.isPositive ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Page Views Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Page Views & Visitors</CardTitle>
            <CardDescription>Daily traffic over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pageViewsData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a2e', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#06b6d4"
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a2e', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {trafficSources.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-sm">{source.name}</span>
                  </div>
                  <span className="text-sm font-medium">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and sites created</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a2e', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages on your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{page.page}</p>
                      <p className="text-sm text-muted-foreground">
                        {page.views.toLocaleString()} views
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    page.change > 0 ? "text-green-500" : "text-red-500"
                  }`}>
                    {page.change > 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {Math.abs(page.change)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
