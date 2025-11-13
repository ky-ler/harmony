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
import { useModal } from "~/hooks/useModalStore";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  // name: z.string().min(1, { message: "Server name is required" }),
  imageUrl: z.string().min(1, { message: "Profile picture is required" }),
});

export const EditUserProfileModal = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { isOpen, onClose, modalType, modalData } = useModal();
  const isModalOpen = isOpen && modalType === "editUserProfile";
  const { user } = modalData;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // username: "",
      imageUrl: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (user) {
      // form.setValue("username", server.name);
      form.setValue("imageUrl", user.imageUrl);
    }
  }, [form, user]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await api.patch(`users/${user?.sub}`, {
        ...data,
        Id: user?.sub,
        Username: user?.username,
      });
      getAccessTokenSilently({ cacheMode: "off" });
      onClose();
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onClose();
    navigate(-1);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-card p-0 ">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Edit User Profile
          </DialogTitle>
          <DialogDescription className="text-center">
            (Currently only supports changing profile picture)
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
              <Button disabled={isLoading}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
