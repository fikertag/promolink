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
  functionToRun: (message: string) => void;
  isLoading?: boolean;
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    functionToRun(message);
    setMessage("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="cursor-pointer"
          disabled={isLoading}
        >
          {buttonText}
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
              {isLoading ? "Submitting..." : finalButtonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
