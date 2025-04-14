"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SocialMediaAction {
  platform: "instagram" | "tiktok" | "telegram";
  actionType: "post" | "story";
  quantity: number;
}

export function ContractDialog({
  senderId,
  reciverId,
  opened = false,
  onClose,
}: {
  onClose: () => void;
  senderId: string;
  reciverId: string;
  opened: boolean;
}) {
  const [price, setPrice] = useState<number>(0);
  const [deadline, setDeadline] = useState<Date>();
  const [actions, setActions] = useState<SocialMediaAction[]>([]);
  const [currentAction, setCurrentAction] = useState<
    Omit<SocialMediaAction, "quantity"> & { quantity: string }
  >({
    platform: "instagram",
    actionType: "post",
    quantity: "1",
  });
  const [error, setError] = useState("");

  const handleAddAction = () => {
    const quantity = parseInt(currentAction.quantity);
    if (isNaN(quantity)) {
      setError("Quantity must be a number");
      return;
    }
    if (quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    setActions([
      ...actions,
      {
        ...currentAction,
        quantity,
      },
    ]);
    setCurrentAction({
      platform: "instagram",
      actionType: "post",
      quantity: "1",
    });
    setError("");
  };

  const handleRemoveAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!price || price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    if (!deadline) {
      setError("Please select a deadline");
      return;
    }

    if (actions.length === 0) {
      setError("Please add at least one social media action");
      return;
    }

    try {
      // await onCreateContract({
      //   senderId,
      //   reciverId,
      //   price,
      //   socialMediaActions: actions,
      //   deadline: deadline.toISOString(),
      // });
      // Reset form
      setPrice(0);
      setDeadline(undefined);
      setActions([]);
    } catch (err) {
      setError("Failed to create contract. Please try again.");
    }
  };

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogTrigger asChild>{}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Contract</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-2 justify-start text-left font-normal",
                    !deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? (
                    format(deadline, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Social Media Actions</Label>
            <div className="flex gap-2">
              <Select
                value={currentAction.platform}
                onValueChange={(value) =>
                  setCurrentAction({
                    ...currentAction,
                    platform: value as SocialMediaAction["platform"],
                  })
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={currentAction.actionType}
                onValueChange={(value) =>
                  setCurrentAction({
                    ...currentAction,
                    actionType: value as SocialMediaAction["actionType"],
                  })
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={currentAction.quantity}
                onChange={(e) =>
                  setCurrentAction({
                    ...currentAction,
                    quantity: e.target.value,
                  })
                }
                className="w-[80px]"
                min="1"
              />

              <Button type="button" onClick={handleAddAction}>
                Add
              </Button>
            </div>

            {actions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {actions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md border px-3 py-1 text-sm"
                  >
                    <span className="capitalize">
                      {action.platform} {action.actionType} (x{action.quantity})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAction(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Send Contract
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
