"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Check, 
  X, 
  FileSearch, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  Instagram 
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Submission {
  id: number;
  timestamp: string;
  fullName: string;
  phoneNumber: string;
  instagramHandle: string;
  orderId: string;
  screenshot: string;
  status: "Pending" | "Approved" | "Rejected";
  notes: string;
  couponCode: string;
  processingDate: string;
  processingNotes: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [couponCode, setCouponCode] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [processingNotes, setProcessingNotes] = useState("");
  
  // Fetch submissions from API
  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/submissions");
      const data = await response.json();
      
      if (data.success) {
        setSubmissions(data.submissions);
        setFilteredSubmissions(data.submissions);
        
        // Calculate stats
        const stats = {
          total: data.submissions.length,
          pending: data.submissions.filter((s: Submission) => s.status === "Pending").length,
          approved: data.submissions.filter((s: Submission) => s.status === "Approved").length,
          rejected: data.submissions.filter((s: Submission) => s.status === "Rejected").length,
        };
        setStats(stats);
      } else {
        toast.error("Failed to load submissions");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Error loading submissions");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial load
  useEffect(() => {
    if (status === "authenticated") {
      fetchSubmissions();
    }
  }, [status]);
  
  // Filter submissions when search term or status filter changes
  useEffect(() => {
    if (searchTerm || statusFilter !== "all") {
      const filtered = submissions.filter((submission) => {
        const matchesSearch = searchTerm 
          ? (
              submission.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              submission.phoneNumber.includes(searchTerm) ||
              submission.instagramHandle.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (submission.orderId && submission.orderId.toLowerCase().includes(searchTerm.toLowerCase()))
            )
          : true;
        
        const matchesStatus = statusFilter !== "all" 
          ? submission.status.toLowerCase() === statusFilter.toLowerCase()
          : true;
        
        return matchesSearch && matchesStatus;
      });
      
      setFilteredSubmissions(filtered);
    } else {
      setFilteredSubmissions(submissions);
    }
  }, [searchTerm, statusFilter, submissions]);
  
  const handleOpenSubmission = (submission: Submission) => {
    setCurrentSubmission(submission);
    setCouponCode(submission.couponCode || "");
    setRejectionReason("");
    setProcessingNotes(submission.processingNotes || "");
    setShowModal(true);
  };
  
  const handleApprove = async () => {
    if (!currentSubmission) return;
    
    try {
      const response = await fetch("/api/admin/process-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId: currentSubmission.id,
          action: "approve",
          couponCode,
          notes: processingNotes,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Submission approved");
        setShowModal(false);
        fetchSubmissions();
      } else {
        toast.error(data.error || "Failed to process submission");
      }
    } catch (error) {
      console.error("Error processing submission:", error);
      toast.error("Error processing submission");
    }
  };
  
  const handleReject = async () => {
    if (!currentSubmission) return;
    
    if (!rejectionReason) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    
    try {
      const response = await fetch("/api/admin/process-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId: currentSubmission.id,
          action: "reject",
          reason: rejectionReason,
          notes: processingNotes,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Submission rejected");
        setShowModal(false);
        fetchSubmissions();
      } else {
        toast.error(data.error || "Failed to process submission");
      }
    } catch (error) {
      console.error("Error processing submission:", error);
      toast.error("Error processing submission");
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Skeleton loader for the dashboard
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="rounded-lg border">
          <div className="p-4 flex justify-between items-center border-b">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-10 w-64" />
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/5" />
                  <Skeleton className="h-6 w-1/5" />
                  <Skeleton className="h-6 w-1/6" />
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            Manage Instagram post submissions and send coupons to approved users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchSubmissions}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              
              <div className="flex">
                <Button 
                  variant={statusFilter === "all" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setStatusFilter("all")}
                  className="rounded-r-none"
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === "pending" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setStatusFilter("pending")}
                  className="rounded-none border-x-0"
                >
                  Pending
                </Button>
                <Button 
                  variant={statusFilter === "approved" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setStatusFilter("approved")}
                  className="rounded-none border-x-0"
                >
                  Approved
                </Button>
                <Button 
                  variant={statusFilter === "rejected" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setStatusFilter("rejected")}
                  className="rounded-l-none"
                >
                  Rejected
                </Button>
              </div>
            </div>
            
            <div className="relative max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No submissions found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Instagram</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {formatDate(submission.timestamp)}
                    </TableCell>
                    <TableCell>{submission.fullName}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Instagram className="h-4 w-4" />
                        <span>{submission.instagramHandle}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {submission.status === "Pending" && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Pending
                        </Badge>
                      )}
                      {submission.status === "Approved" && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Approved
                        </Badge>
                      )}
                      {submission.status === "Rejected" && (
                        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                          Rejected
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenSubmission(submission)}
                      >
                        <FileSearch className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Submission details modal */}
      {currentSubmission && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Review Submission</DialogTitle>
              <DialogDescription>
                Submission from {currentSubmission.fullName} on {formatDate(currentSubmission.timestamp)}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="screenshot">Screenshot</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <div className="text-sm font-medium border p-2 rounded-md">
                      {currentSubmission.fullName}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Phone Number</Label>
                    <div className="text-sm font-medium border p-2 rounded-md">
                      {currentSubmission.phoneNumber}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Instagram Handle</Label>
                    <div className="text-sm font-medium border p-2 rounded-md flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      {currentSubmission.instagramHandle}
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="ml-auto"
                        onClick={() => {
                          const url = currentSubmission.instagramHandle.startsWith('https://') 
                            ? currentSubmission.instagramHandle
                            : `https://instagram.com/${currentSubmission.instagramHandle.replace('@', '')}`;
                          window.open(url, '_blank');
                        }}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Order ID</Label>
                    <div className="text-sm font-medium border p-2 rounded-md">
                      {currentSubmission.orderId || "Not provided"}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Status</Label>
                    <div className={`text-sm font-medium border p-2 rounded-md ${
                      currentSubmission.status === "Pending" 
                        ? "text-yellow-500" 
                        : currentSubmission.status === "Approved" 
                        ? "text-green-500" 
                        : "text-red-500"
                    }`}>
                      {currentSubmission.status}
                    </div>
                  </div>
                  
                  {currentSubmission.status === "Approved" && currentSubmission.couponCode && (
                    <div>
                      <Label>Coupon Code</Label>
                      <div className="text-sm font-medium border p-2 rounded-md font-mono">
                        {currentSubmission.couponCode}
                      </div>
                    </div>
                  )}
                </div>
                
                {currentSubmission.status === "Pending" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="couponCode">Coupon Code</Label>
                      <Input
                        id="couponCode"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code to send"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rejectionReason">Rejection Reason</Label>
                      <Input
                        id="rejectionReason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Reason for rejection"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="screenshot">
                <div className="aspect-video relative bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                  {currentSubmission.screenshot ? (
                    <img 
                      src={currentSubmission.screenshot} 
                      alt="Instagram Post" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground">No screenshot available</div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="notes">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="adminNotes">Admin Notes</Label>
                    <Textarea
                      id="adminNotes"
                      value={processingNotes}
                      onChange={(e) => setProcessingNotes(e.target.value)}
                      placeholder="Add notes about this submission"
                      rows={5}
                    />
                  </div>
                  
                  {currentSubmission.notes && (
                    <div>
                      <Label>Previous Notes</Label>
                      <div className="text-sm border rounded-md p-3 bg-gray-50">
                        {currentSubmission.notes}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              {currentSubmission.status === "Pending" ? (
                <>
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleReject}>
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button variant="default" onClick={handleApprove}>
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 