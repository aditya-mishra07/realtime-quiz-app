import { Card, CardHeader, CardTitle } from "@/components/ui/card";
type questionCardProps = {
  title?: string;
};

const QuestionCard = ({ title }: questionCardProps) => {
  return (
    <Card className=" text-center rounded-2xl shadow-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default QuestionCard;
