import { useState, useEffect } from "react"
export const useToast = () => {
  const toast = ({ title, description, variant }: any) => console.log(title, description, variant);
  return { toast };
};
