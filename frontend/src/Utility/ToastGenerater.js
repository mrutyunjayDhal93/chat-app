import { useToast } from "@chakra-ui/react";

//create a custom hooks for generate Toasts
const useAlertToast = () => {
  // get Toast fun, we could make Toast throught that
  const Toast = useToast();

  // return fun which could take display msg and status
  return (msg, status) =>
    Toast({
      title: msg,
      status: status, //status-> success/error/warnning
      duration: 2000, //it shows within this duration
      isClosable: true,
      position: "bottom",
    });
};

export default useAlertToast;
