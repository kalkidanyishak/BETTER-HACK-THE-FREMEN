// src/components/main/mega-dialog.tsx (or your preferred path)

"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Assuming standard Shadcn UI path

interface MegaDialogProps {
  trigger: React.ReactNode;
  title?: string;
  children: (close: () => void) => React.ReactNode;
  className?: string; // For custom styling on the DialogContent (e.g., width)
}

export function MegaDialog({
  trigger,
  title,
  children,
  className,
}: MegaDialogProps) {
  // 1. We still control the open state to provide a close function
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  return (
    // 2. The component is controlled via `open` and `onOpenChange`
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* 3. Use Shadcn's DialogContent, which handles overlay, styling, and the 'X' button */}
      <DialogContent className={className}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>

        {/* 4. The render prop pattern is identical. We call the children function
               with our 'close' callback. */}
        <div className="py-4">
            {children(closeDialog)}
        </div>
      </DialogContent>
    </Dialog>
  );
}