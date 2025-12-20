"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function AddFriendDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-xl font-bold text-(--primary-color) hover:text-(--primary-color-hover)"
        >
          Add Friend
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add friend</DialogTitle>
          <DialogDescription>
            Enter your friend's username to send a request.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input id="username" className="col-span-3" placeholder="user@123" />
        </div>
        <DialogFooter>
          <Button type="submit" className="btn-primary" variant={"outline"}>
            Send request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
