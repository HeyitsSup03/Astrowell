"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function AdminModerationPage() {
  const [flaggedItems, setFlaggedItems] = useState([
    { id: "mod-01", type: "Review", author: "User #892", target: "Pt. Vikramaditya Pande", text: "Inappropriate language in chat.", status: "open" },
    { id: "mod-02", type: "Chat Flag", author: "Automated System Filter", target: "Tarot Reader #04", text: "Attempt to share external contact details.", status: "open" },
  ]);

  const handleResolve = (id: string) => {
    setFlaggedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          Content Moderation Queue
        </h1>
        <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
          Review flagged customer reviews and system chat safety alerts.
        </p>
      </div>

      {flaggedItems.length === 0 ? (
        <Card className="text-center py-12 px-4 space-y-2">
          <ShieldCheck className="h-12 w-12 text-success mx-auto" />
          <h3 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
            Moderation queue clear
          </h3>
          <p className="text-xs text-text-muted dark:text-text-muted-dark">
            No flagged chats or reviews requiring moderator action.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {flaggedItems.map((item) => (
            <Card key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="danger">{item.type}</Badge>
                  <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark">
                    Reported: {item.target}
                  </span>
                </div>
                <p className="text-xs text-text-muted dark:text-text-muted-dark">
                  "{item.text}" — <span className="italic">By {item.author}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => handleResolve(item.id)}>
                  Dismiss Flag
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleResolve(item.id)}>
                  Issue Warning
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
