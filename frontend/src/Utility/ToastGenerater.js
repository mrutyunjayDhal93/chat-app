import { useToast } from "@chakra-ui/react";

const useAlertToast = () => {
  const Toast = useToast();
  return (msg, status) =>
    Toast({
      title: msg,
      status: status,
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
};

export default useAlertToast;
