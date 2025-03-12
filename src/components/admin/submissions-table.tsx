"use client";

import { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  ExternalLink,
  Eye,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Check,
  X,
  AlertTriangle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock data for submissions
const allSubmissions = Array.from({ length: 50 }, (_, i) => {
  const id = `SUB-${1000 + i}`;
  const statuses = ["pending", "approved", "rejected"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const names = [
    "Rahul Sharma", "Priya Patel", "Amit Kumar", "Sneha Gupta", "Vikram Singh",
    "Neha Verma", "Raj Malhotra", "Ananya Desai", "Karan Mehta", "Pooja Sharma"
  ];
  const name = names[Math.floor(Math.random() * names.length)];
  const handle = name.toLowerCase().replace(" ", "_");
  
  // Generate a date within the last 30 days
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  
  return {
    id,
    name,
    instagramHandle: `@${handle}`,
    date: date.toISOString(),
    status,
    imageUrl: "https://placehold.co/600x600/png",
    phoneNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    orderId: Math.random() > 0.3 ? `ORD-${Math.floor(Math.random() * 10000)}` : null,
  };
});

interface SubmissionsTableProps {
  searchQuery: string;
  statusFilter: string;
}

export function SubmissionsTable({ searchQuery, statusFilter }: SubmissionsTableProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<typeof allSubmissions[0] | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter submissions based on search query and status filter
  const filteredSubmissions = allSubmissions.filter((submission) => {
    const matchesSearch = 
      searchQuery === "" ||
      submission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.instagramHandle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Paginate submissions
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
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
  
  const handleApprove = () => {
    if (!selectedSubmission) return;
    
    // In a real application, this would be an API call
    toast.success(`Submission ${selectedSubmission.id} approved`, {
      description: "Coupon code has been sent to the customer.",
    });
    
    setShowApprovalDialog(false);
    setSelectedSubmission(null);
  };
  
  const handleReject = () => {
    if (!selectedSubmission) return;
    
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    
    // In a real application, this would be an API call
    toast.success(`Submission ${selectedSubmission.id} rejected`, {
      description: "Customer has been notified.",
    });
    
    setRejectionReason("");
    setShowRejectionDialog(false);
    setSelectedSubmission(null);
  };

  return (
    <>
      <div className="rounded-md border">
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
            {paginatedSubmissions.length > 0 ? (
              paginatedSubmissions.map((submission) => (
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedSubmission(submission)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setShowApprovalDialog(true);
                          }}
                          disabled={submission.status === "approved"}
                          className={submission.status === "approved" ? "opacity-50" : ""}
                        >
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setShowRejectionDialog(true);
                          }}
                          disabled={submission.status === "rejected"}
                          className={submission.status === "rejected" ? "opacity-50" : ""}
                        >
                          <X className="mr-2 h-4 w-4 text-red-500" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No submissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {filteredSubmissions.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSubmissions.length)} of {filteredSubmissions.length} submissions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Submission Details Dialog */}
      <Dialog open={!!selectedSubmission && !showApprovalDialog && !showRejectionDialog} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
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
                  <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                  <p className="text-base">{selectedSubmission.phoneNumber}</p>
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
                
                {selectedSubmission.orderId && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Order ID</h3>
                    <p className="text-base">{selectedSubmission.orderId}</p>
                  </div>
                )}
                
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
                    onClick={() => setShowApprovalDialog(true)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    disabled={selectedSubmission.status === "rejected"}
                    onClick={() => setShowRejectionDialog(true)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Approval Confirmation Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Submission</DialogTitle>
            <DialogDescription>
              This will approve the submission and send a coupon code to the customer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
            <CheckCircle className="h-5 w-5" />
            <p>A coupon code will be automatically assigned and emailed to the customer.</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>
              Approve Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Rejection Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this submission.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md mb-4">
            <AlertTriangle className="h-5 w-5" />
            <p>The customer will be notified of the rejection with your reason.</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="rejection-reason" className="text-sm font-medium">
              Rejection Reason
            </label>
            <Textarea
              id="rejection-reason"
              placeholder="Please explain why this submission is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 