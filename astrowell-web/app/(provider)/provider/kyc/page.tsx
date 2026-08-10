"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileCheck, FileText, ShieldAlert, ShieldCheck, Upload } from "lucide-react";
import { useState } from "react";

export default function KycPage() {
  const [kycStatus, setKycStatus] = useState<"Approved" | "Pending" | "Rejected">("Approved");
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({
    idProof: "Aadhaar_Card_Raghavendra.pdf",
    degreeProof: "Jyotish_Acharya_Varanasi_Cert.pdf",
    bankProof: "Cancelled_Cheque_HDFC.pdf",
  });

  const handleSimulateUpload = (docKey: string, name: string) => {
    setUploadedFiles((prev) => ({ ...prev, [docKey]: name }));
  };

  const statusBadges = {
    Approved: { variant: "success" as const, icon: ShieldCheck, text: "Verification Approved — Account Active" },
    Pending: { variant: "warning" as const, icon: ShieldAlert, text: "Verification Under Review (24-48 hrs)" },
    Rejected: { variant: "danger" as const, icon: ShieldAlert, text: "Documents Rejected — Please Re-upload" },
  };

  const CurrentIcon = statusBadges[kycStatus].icon;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            KYC & Document Verification
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
            Submit identity and qualification certificates for platform verification.
          </p>
        </div>

        <Badge variant={statusBadges[kycStatus].variant} className="text-xs py-1.5 px-3">
          <CurrentIcon className="h-4 w-4 mr-1.5 inline" />
          {kycStatus} Status
        </Badge>
      </div>

      {/* ── Status Banner Card ────────────────────────────────────── */}
      <Card className="p-6 bg-gradient-to-r from-primary via-primary-light to-secondary text-white border-0 shadow-md space-y-2">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-accent flex-shrink-0" />
          <div>
            <h2 className="font-display text-xl font-bold">
              {statusBadges[kycStatus].text}
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              Verified providers get a green checkmark badge and priority listing in customer search results.
            </p>
          </div>
        </div>
      </Card>

      {/* ── Document Upload List ─────────────────────────────────── */}
      <div className="space-y-4">
        {[
          {
            key: "idProof",
            title: "Government Issued Photo ID",
            subtitle: "Aadhaar Card, Passport, or PAN Card",
          },
          {
            key: "degreeProof",
            title: "Professional Certification / Degree",
            subtitle: "Vedic Astrology diploma, Yoga 200-hr RYT certificate, or Dietitian license",
          },
          {
            key: "bankProof",
            title: "Bank Account Details (Payout Verification)",
            subtitle: "Cancelled Cheque or Bank Passbook copy for weekly earnings transfer",
          },
        ].map((doc) => (
          <Card key={doc.key} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary dark:text-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
                  {doc.title}
                </h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark">
                  {doc.subtitle}
                </p>
                {uploadedFiles[doc.key] && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-success mt-2">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Uploaded: {uploadedFiles[doc.key]}
                  </span>
                )}
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSimulateUpload(doc.key, `Document_Uploaded_${Date.now()}.pdf`)}
              className="text-xs gap-1.5 whitespace-nowrap self-start sm:self-center"
            >
              <Upload className="h-3.5 w-3.5" />
              {uploadedFiles[doc.key] ? "Replace File" : "Upload Document"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
