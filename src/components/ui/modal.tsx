import { Portal } from "@radix-ui/react-portal";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode,
}

export const Modal: FC<Props> = ({ children }) => {
  return <Portal asChild>
    <div className="fixed bg-black bg-opacity-60 flex flex-col justify-start items-center top-0 left-0 bottom-0 right-0 overflow-y-auto p-10">
      {children}
    </div>
  </Portal>
}
