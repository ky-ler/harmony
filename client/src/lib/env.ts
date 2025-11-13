const env = {
  API_URL: import.meta.env.VITE_API_URL as string,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN as string,
  AUTH0_CLIENT: import.meta.env.VITE_AUTH0_CLIENT as string,

  STORAGE_ACCOUNT: import.meta.env.VITE_STORAGE_ACCOUNT as string,
  CONTAINER_SERVER_IMAGES: import.meta.env
    .VITE_STORAGE_SERVER_IMAGES_CONTAINER as string,
  CONTAINER_MESSAGE_ATTACHMENTS: import.meta.env
    .VITE_STORAGE_MESSAGE_ATTACHMENTS_CONTAINER as string,
};

export { env };
