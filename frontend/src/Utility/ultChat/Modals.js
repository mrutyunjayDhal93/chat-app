import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  PinInput,
  PinInputField,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect, useReducer } from "react";

const Modals = ({ isOpen, onClose, setcheetCode }) => {
  const [inputedCode, setinputedCode] = useState("");

  const isDone = () => {
    inputedCode ? setcheetCode(inputedCode) : setcheetCode("");
    setinputedCode("");
    onClose();
  };

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CHEET-CODE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <PinInput
                type="alphanumeric"
                onComplete={(v) => {
                  setinputedCode(v);
                }}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                {/* <PinInputField /> */}
              </PinInput>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={isDone}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modals;
