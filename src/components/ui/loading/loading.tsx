import { LoaderCircle, LucideProps } from "lucide-react";
import { FC } from "react";

import classes from './loading.module.css'
import { cn } from "@/lib/utils";

type Props = LucideProps

export const Loading: FC<Props> = ({ className, size = 100, ...props }) => {
  return (
    <LoaderCircle size={size} className={cn(className, classes.loading)} {...props} />
  )
}