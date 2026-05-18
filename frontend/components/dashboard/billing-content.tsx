"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  CreditCard, 
  Check, 
  Zap,
  Building,
  Rocket,
  Download,
  Calendar,
  Receipt,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started",
    icon: Zap,
    features: [
      "1 website",
      "BizGen subdomain",
      "Basic templates",
      "Community support",
      "5GB storage",
    ],
    current: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For growing businesses",
    icon: Building,
    popular: true,
    features: [
      "5 websites",
      "Custom domain",
      "Premium templates",
      "Priority support",
      "50GB storage",
      "Analytics dashboard",
      "AI content generation",
    ],
    current: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/month",
    description: "For agencies and teams",
    icon: Rocket,
    features: [
      "Unlimited websites",
      "White-label branding",
      "All templates",
      "24/7 phone support",
      "500GB storage",
      "Advanced analytics",
      "Team collaboration",
      "API access",
    ],
    current: false,
  },
]

const invoices = [
  { id: "INV-001", date: "May 1, 2024", amount: "$19.00", status: "Paid" },
  { id: "INV-002", date: "Apr 1, 2024", amount: "$19.00", status: "Paid" },
  { id: "INV-003", date: "Mar 1, 2024", amount: "$19.00", status: "Paid" },
  { id: "INV-004", date: "Feb 1, 2024", amount: "$19.00", status: "Paid" },
  { id: "INV-005", date: "Jan 1, 2024", amount: "$19.00", status: "Paid" },
]

export function BillingContent() {
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false)

  const currentPlan = plans.find(p => p.current)
  const usageData = {
    websites: { used: 3, total: 5 },
    storage: { used: 23.4, total: 50 },
    bandwidth: { used: 145, total: 500 },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Pro plan</CardDescription>
            </div>
            <Badge className="bg-accent text-accent-foreground">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-accent/10 p-3">
                  <Building className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{currentPlan?.name}</p>
                  <p className="text-muted-foreground">
                    <span className="text-xl font-semibold text-foreground">{currentPlan?.price}</span>
                    {currentPlan?.period}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Next billing date: June 1, 2024</span>
              </div>
              <div className="flex gap-3">
                <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
                  <DialogTrigger asChild>
                    <Button>Upgrade Plan</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Upgrade Your Plan</DialogTitle>
                      <DialogDescription>
                        Choose a plan that best fits your needs
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 md:grid-cols-3">
                      {plans.map((plan) => (
                        <div
                          key={plan.name}
                          className={`relative rounded-xl border p-4 ${
                            plan.current 
                              ? "border-accent bg-accent/5" 
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          {plan.popular && (
                            <Badge className="absolute -top-2 right-4 bg-accent">
                              Popular
                            </Badge>
                          )}
                          <plan.icon className="mb-2 h-6 w-6 text-accent" />
                          <h3 className="font-semibold">{plan.name}</h3>
                          <p className="mt-1 text-2xl font-bold">
                            {plan.price}
                            <span className="text-sm font-normal text-muted-foreground">
                              {plan.period}
                            </span>
                          </p>
                          <ul className="mt-4 space-y-2">
                            {plan.features.slice(0, 4).map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button 
                            className="mt-4 w-full" 
                            variant={plan.current ? "outline" : "default"}
                            disabled={plan.current}
                          >
                            {plan.current ? "Current Plan" : "Select"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="space-y-4">
              <h4 className="font-semibold">Usage This Month</h4>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Websites</span>
                    <span>{usageData.websites.used} / {usageData.websites.total}</span>
                  </div>
                  <Progress 
                    value={(usageData.websites.used / usageData.websites.total) * 100} 
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Storage</span>
                    <span>{usageData.storage.used}GB / {usageData.storage.total}GB</span>
                  </div>
                  <Progress 
                    value={(usageData.storage.used / usageData.storage.total) * 100} 
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Bandwidth</span>
                    <span>{usageData.bandwidth.used}GB / {usageData.bandwidth.total}GB</span>
                  </div>
                  <Progress 
                    value={(usageData.bandwidth.used / usageData.bandwidth.total) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-400">
                <span className="text-sm font-bold text-white">VISA</span>
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Payment Method</DialogTitle>
                  <DialogDescription>
                    Enter your new card details
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Card</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Download your past invoices</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-500 border-green-500/30">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Receipt className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
