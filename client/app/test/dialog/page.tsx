"use client"
import { MegaDialog } from "@/components/main/data-dialog";
import { Button } from "@/components/ui/button"; 

export default function App() {
  return (
    <div className="p-10">
      <MegaDialog
        trigger={<Button>Open Dialog</Button>}
        title="Shadcn Dialog"
      >
        {(close) => (
          <div>
            <p className="text-sm text-muted-foreground">
              This content is rendered inside a beautiful, pre-styled Shadcn dialog.
              You can close it programmatically.
            </p>

            <div className="mt-6 flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={close} 
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Saving data...");
                  close();
                }}
              >
                Save and Close
              </Button>
            </div>
          </div>
        )}
      </MegaDialog>
    </div>
  );
}