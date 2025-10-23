import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Comfirm({
  buttonText,
  dialogTitle,
  dialogDescription,
  placeholder,
  finalButtonText,
  functionToRun,
  isLoading = false,
}: {
  buttonText: string;
  dialogTitle?: string;
  dialogDescription?: string;
  placeholder?: string;
  finalButtonText: string;
  functionToRun: (message: string) => void | Promise<unknown>;
  isLoading?: boolean;
}) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const maybePromise = functionToRun(message);
      if (maybePromise && typeof (maybePromise as any).then === "function") {
        await (maybePromise as Promise<unknown>);
      }
      // Success: close dialog and reset
      setOpen(false);
      setMessage("");
    } catch (err) {
      // Keep dialog open on error; parent can show a toast
      console.error("Confirm submit failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="cursor-pointer w-full"
          disabled={isLoading}
        >
          {buttonText}
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal">{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Textarea
            id="feedback"
            placeholder={placeholder}
            aria-label={"Your proposal message"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="flex flex-col sm:flex-row sm:justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting..." : finalButtonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
