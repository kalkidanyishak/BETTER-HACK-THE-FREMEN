"use client"
import { MegaDialog } from "@/components/main/data-dialog";
import { CustomForm, FormItem } from "@/components/main/data-form";
import { Button } from "@/components/ui/button";
import { userFields } from "@/lib/form-config";

export default function Page() {
        return (

                <MegaDialog
                        trigger={<Button>Open Form</Button>}
                        title="User Form"
                >
                        {(close) =>

                                <CustomForm
                                        fields={userFields}
                                        onSubmit={(data) => {
                                                console.log(data);
                                                close();
                                        }}
                                />
                        }
                </MegaDialog>

        );
}
