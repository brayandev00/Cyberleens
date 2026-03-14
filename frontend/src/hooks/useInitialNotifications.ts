import { useEffect } from "react";
import { useNotifications } from "@/contexts/NotificationContext";

export const useInitialNotifications = () => {
  const { addNotification } = useNotifications();
  useEffect(() => {
    addNotification({ title: "Welcome", message: "CyberLeens is ready for reconnaissance.", type: "info" });
  }, []);
};
