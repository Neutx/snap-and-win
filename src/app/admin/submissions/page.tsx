"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmissionsTable } from "@/components/admin/submissions-table";
import { Search, Filter } from "lucide-react";

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Submissions"
        description="Manage and review customer Instagram post submissions"
      />
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, Instagram handle, or submission ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="w-[180px]">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}>
                Reset
              </Button>
            </div>
          </div>
          
          <SubmissionsTable searchQuery={searchQuery} statusFilter={statusFilter} />
        </CardContent>
      </Card>
    </div>
  );
} 