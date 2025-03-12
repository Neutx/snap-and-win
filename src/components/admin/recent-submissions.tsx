"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  ExternalLink,
  Eye
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data for recent submissions
const recentSubmissions = [
  {
    id: "SUB-1234",
    name: "Rahul Sharma",
    instagramHandle: "@rahul_styles",
    date: "2024-03-10T14:30:00Z",
    status: "approved",
    imageUrl: "https://placehold.co/600x600/png",
  },
  {
    id: "SUB-1235",
    name: "Priya Patel",
    instagramHandle: "@priya.fashion",
    date: "2024-03-10T10:15:00Z",
    status: "pending",
    imageUrl: "https://placehold.co/600x600/png",
  },
  {
    id: "SUB-1236",
    name: "Amit Kumar",
    instagramHandle: "@amit_k",
    date: "2024-03-09T16:45:00Z",
    status: "rejected",
    imageUrl: "https://placehold.co/600x600/png",
  },
  {
    id: "SUB-1237",
    name: "Sneha Gupta",
    instagramHandle: "@sneha.g",
    date: "2024-03-09T09:20:00Z",
    status: "approved",
    imageUrl: "https://placehold.co/600x600/png",
  },
  {
    id: "SUB-1238",
    name: "Vikram Singh",
    instagramHandle: "@vikram_s",
    date: "2024-03-08T13:10:00Z",
    status: "pending",
    imageUrl: "https://placehold.co/600x600/png",
  },
];

export function RecentSubmissions() {
  const [selectedSubmission, setSelectedSubmission] = useState<typeof recentSubmissions[0] | null>(null);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "pending":
        return "text-amber-500";
      case "rejected":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>
            The latest Instagram post submissions from customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Instagram</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.id}</TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>
                    <a
                      href={`https://instagram.com/${submission.instagramHandle.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      {submission.instagramHandle}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>{formatDate(submission.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(submission.status)}
                      <span className={getStatusClass(submission.status)}>
                        {getStatusText(submission.status)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href="/admin/submissions">
                View All Submissions
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        {selectedSubmission && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="aspect-square rounded-md overflow-hidden border">
                  <img
                    src={selectedSubmission.imageUrl}
                    alt="Instagram post"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Submission ID</h3>
                  <p className="text-base">{selectedSubmission.id}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Customer Name</h3>
                  <p className="text-base">{selectedSubmission.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Instagram Handle</h3>
                  <a
                    href={`https://instagram.com/${selectedSubmission.instagramHandle.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base flex items-center hover:underline text-primary"
                  >
                    {selectedSubmission.instagramHandle}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Submission Date</h3>
                  <p className="text-base">{formatDate(selectedSubmission.date)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className="flex items-center gap-1 text-base">
                    {getStatusIcon(selectedSubmission.status)}
                    <span className={getStatusClass(selectedSubmission.status)}>
                      {getStatusText(selectedSubmission.status)}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 flex gap-2">
                  <Button
                    variant="default"
                    className="w-full"
                    disabled={selectedSubmission.status === "approved"}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    disabled={selectedSubmission.status === "rejected"}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
} 