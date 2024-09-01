import { Button } from "../ui/button";

export type Props = {
  title: string | undefined;
};

export default function AdminQuizCard({ title }: Props) {
  return <Button>{title}</Button>;
}
