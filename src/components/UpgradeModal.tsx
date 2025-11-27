
"use client";

import {

    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";


interface UpgradeModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const UpgradeModal = ({ open, setOpen }: UpgradeModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Upgrade to pro
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You need to upgrade to the pro plan to access this feature.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button className="" onClick={() => authClient.checkout({ slug: "nodebase-pro" })}>Upgrade Now</Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )


}
