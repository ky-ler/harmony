import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { FileUpload } from "~/components/FileUpload";
import { env } from "~/lib/env";
import { api } from "~/lib/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "~/hooks/useModalStore";

const formSchema = z.object({
  // name: z.string().min(1, { message: "Server name is required" }),
  imageUrl: z.string().min(1, { message: "Profile picture is required" }),
});

export const PostRegistrationModal = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const { isOpen, onClose, modalType } = useModal();
  const isModalOpen = isOpen && modalType === "postRegistration";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // username: "",
      imageUrl: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    if (!user?.picture?.startsWith("https://s.gravatar.com/avatar")) {
      onClose();
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await api.patch(`users/${user?.sub}`, {
        ...data,
        Id: user?.sub,
        Username: user?.username,
      });
      getAccessTokenSilently({ cacheMode: "off" });
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: FIX THIS -> force user to upload a profile picture after registration
  // need to implement this a better way

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="text-card-foregroundi z-[9999] overflow-hidden bg-card p-0">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Almost there!
          </DialogTitle>
          <DialogDescription className="text-center text-primary-foreground/75">
            Upload a profile picture to complete your registration
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          container={env.CONTAINER_SERVER_IMAGES}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="px-6 pb-4">
              <Button variant={"default"} disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
