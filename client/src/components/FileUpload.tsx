import { useCallback, useEffect, useState } from "react";
import {
  DropzoneOptions,
  type FileRejection,
  useDropzone,
} from "react-dropzone";
// import "react-dropzone/examples/theme.css";

import { BlobServiceClient } from "@azure/storage-blob";
import { FileIcon, X } from "lucide-react";
import { env } from "~/lib/env";
import { Button } from "./ui/button";

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  container: string;
};

export const FileUpload = ({ onChange, value, container }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [selectedFileSize, setSelectedFileSize] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const account = import.meta.env.VITE_STORAGE_ACCOUNT;
  const sasToken = import.meta.env.VITE_STORAGE_SAS;

  const curContainer: DropzoneOptions =
    container == env.CONTAINER_SERVER_IMAGES
      ? { accept: { "image/*": [] } }
      : { accept: { "*/*": [] } };

  const handleOnDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0]);

    // if (selectedFile != null && selectedFileSize == null) {
    //   if (selectedFile.size < 1024) {
    //     setSelectedFileSize(`${selectedFile.size} bytes`);
    //   } else if (selectedFile.size >= 1024 && selectedFile.size < 1048576) {
    //     setSelectedFileSize(`${(selectedFile.size / 1024).toFixed(1)} KB`);
    //   } else if (selectedFile.size >= 1048576) {
    //     setSelectedFileSize(`${(selectedFile.size / 1048576).toFixed(1)} MB`);
    //   }
    // }

    setIsDisabled(false);
  }, []);

  const handleOnDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      const { errors } = fileRejections[0];
      const errorMessage = errors[0].message;

      if (errorMessage.includes("larger than")) {
        alert("File size must be under 8 MB");
        return;
      }

      if (errorMessage.includes("image/*")) {
        alert("File must be an image");
      }
    },
    [],
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    ...curContainer,
    maxSize: 8 * 1024 * 1024,
    multiple: false,
    onDrop: handleOnDrop,
    onDropRejected: handleOnDropRejected,
  });

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net/?${sasToken}`,
  );
  const containerClient = blobServiceClient.getContainerClient(container);

  const handleSubmit = async () => {
    if (!selectedFile) return;

    // already handling this in the input element
    // if (Number((file.size / 1048576).toFixed(1)) >= 8) {
    //   alert("File size must be under 8 MB");
    //   return;
    // }

    if (!account || !sasToken) return;

    try {
      setIsLoading("Uploading");
      const blobName = `${new Date().getTime()}-${selectedFile.name}`; // Specify a default blob name if needed
      const blobClient = containerClient.getBlockBlobClient(blobName); // get the blob client
      await blobClient.uploadData(selectedFile, {
        blobHTTPHeaders: { blobContentType: selectedFile.type },
      });
      if (blobClient.url) {
        onChange(blobClient.url.split("?")[0]); // set the url to the parent component
      }
    } catch (error) {
      console.error(error); // Handle error
    } finally {
      setIsLoading(""); // Turn off loading
    }
  };

  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20 text-primary-foreground/75">
        <img
          src={value}
          alt="Upload"
          className="h-20 w-20 rounded-full object-cover"
        />
        <button
          onClick={() => {
            try {
              setIsLoading("Deleting");
              const curFile = value.split("/").pop()!.split("?")[0];
              containerClient.deleteBlob(curFile);
            } catch (error) {
              console.error(error);
            } finally {
              onChange("");
              setSelectedFile(null);
              setIsLoading("");
            }
          }}
          className="primary absolute right-0 top-0 rounded-full p-1 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
        <FileIcon className="h-10 w-10" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-smhover:underline ml-2"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="primary absolute -right-2 -top-2 rounded-full p-1 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (isLoading === "Loading") return <div>Loading...</div>;
  if (isLoading === "Uploading") return <div>Uploading...</div>;
  if (isLoading === "Deleting") return <div>Deleting...</div>;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 ">
      {!selectedFile && (
        <div className="flex flex-col">
          <div
            {...getRootProps({
              className:
                "focus:border-primary disabled:opacity-60 flex flex-1 flex-col items-center px-5 py-8 rounded-sm border bg-background outline-none transition duration-150 ease-in-out cursor-pointer",
            })}
          >
            <input multiple={false} {...getInputProps()} />
            <p className="text-base text-muted-foreground">
              Drag 'n' drop{" "}
              {container != env.CONTAINER_SERVER_IMAGES ? "a file" : "an image"}{" "}
              here, or click to select{" "}
              {container != env.CONTAINER_SERVER_IMAGES ? "a file" : "an image"}
            </p>
          </div>
        </div>
      )}
      {selectedFile && (
        <aside>
          <h4>Currently Selected File:</h4>
          <ul className="mt-2">
            <li
              key={selectedFile.name}
              className="list-inside list-disc font-semibold"
            >
              {selectedFile.name}
              <X
                className="primary ml-2 inline h-4 w-4 cursor-pointer rounded-full shadow-sm"
                onClick={() => {
                  acceptedFiles.pop();
                  setSelectedFile(null);
                }}
              />
            </li>
          </ul>
        </aside>
      )}

      {selectedFile && (
        <Button
          variant={"default"}
          onClick={handleSubmit}
          disabled={!selectedFile || isDisabled}
          // className="buttonEsque"
          className="font-semibold"
        >
          Upload
        </Button>
      )}
    </div>
  );
};
