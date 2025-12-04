import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Status variants
        new: "border-red-200 bg-red-50 text-red-700",
        in_review: "border-amber-200 bg-amber-50 text-amber-700",
        resolved: "border-emerald-200 bg-emerald-50 text-emerald-700",
        escalated: "border-violet-200 bg-violet-50 text-violet-700",
        // Priority variants
        critical: "border-red-200 bg-red-50 text-red-600",
        high: "border-orange-200 bg-orange-50 text-orange-600",
        medium: "border-blue-200 bg-blue-50 text-blue-600",
        low: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
