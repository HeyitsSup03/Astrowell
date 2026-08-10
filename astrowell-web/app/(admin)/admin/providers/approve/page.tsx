"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  Check,
  CheckCircle2,
  Clock,
  FileText,
  ShieldAlert,
  UserCheck,
  X,
} from "lucide-react";
import { useState } from "react";

interface PendingProvider {
  id: string;
  name: string;
  category: string;
  experienceYears: number;
  ratePerMin: number;
  avatarUrl: string;
  submittedAt: string;
  documents: string[];
  status: "pending" | "approved" | "rejected";
}

const initialPendingList: PendingProvider[] = [
  {
    id: "app-001",
    name: "Dr. Alok Nath Shastri",
    category: "Vedic Astrologer",
    experienceYears: 16,
    ratePerMin: 35,
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Alok",
    submittedAt: "2026-08-10T08:30:00Z",
    documents: ["Aadhaar_Alok.pdf", "Jyotish_Vishwa_Diploma.pdf"],
    status: "pending",
  },
  {
    id: "app-002",
    name: "Kavita Deshmukh",
    category: "Yoga Teacher",
    experienceYears: 9,
    ratePerMin: 15,
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Kavita",
    submittedAt: "2026-08-09T14:15:00Z",
    documents: ["PAN_Card_Kavita.pdf", "RYT_200_Certification.pdf"],
    status: "pending",
  },
  {
    id: "app-003",
    name: "Harishchandra Bhatt",
    category: "Tarot Reader",
    experienceYears: 7,
    ratePerMin: 18,
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Harish",
    submittedAt: "2026-08-09T11:00:00Z",
    documents: ["Aadhaar_Harish.pdf", "Tarot_Association_Cert.pdf"],
    status: "pending",
  },
];

export default function AdminApprovePage() {
  const [applicants, setApplicants] = useState<PendingProvider[]>(initialPendingList);

  const handleAction = (id: string, newStatus: "approved" | "rejected") => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const pendingCount = applicants.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Provider Applications & Approval Queue
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
            Review KYC documents and approve/reject new astrologer and wellness practitioner profiles.
          </p>
        </div>

        <Badge variant={pendingCount > 0 ? "warning" : "success"}>
          {pendingCount} Applications Pending
        </Badge>
      </div>

      {/* ── Applicants List ──────────────────────────────────────── */}
      <div className="space-y-4">
        {applicants.map((app) => (
          <Card key={app.id} className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar src={app.avatarUrl} name={app.name} size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
                      {app.name}
                    </h3>
                    <Badge variant="primary">{app.category}</Badge>
                    {app.status === "approved" && <Badge variant="success">Approved</Badge>}
                    {app.status === "rejected" && <Badge variant="danger">Rejected</Badge>}
                  </div>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                    {app.experienceYears} Years Exp • Requested Rate: {formatCurrency(app.ratePerMin)}/min
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {app.status === "pending" ? (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleAction(app.id, "rejected")}
                    className="text-xs gap-1"
                  >
                    <X className="h-4 w-4" /> Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="accent"
                    onClick={() => handleAction(app.id, "approved")}
                    className="text-xs gap-1 font-semibold"
                  >
                    <Check className="h-4 w-4" /> Approve & Activate
                  </Button>
                </div>
              ) : (
                <span className="text-xs text-text-muted dark:text-text-muted-dark italic">
                  Decision recorded as {app.status}
                </span>
              )}
            </div>

            {/* Submitted Documents Row */}
            <div className="pt-3 border-t border-black/5 dark:border-white/8 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-text-muted dark:text-text-muted-dark mr-2">
                Attached Verification Docs:
              </span>
              {app.documents.map((doc) => (
                <span
                  key={doc}
                  onClick={() => alert(`Simulated: Opening document ${doc}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/4 dark:bg-white/5 text-primary dark:text-primary-light font-medium cursor-pointer hover:underline"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {doc}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
