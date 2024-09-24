import { Card, CardHeader, CardTitle } from "@/components/ui/card";
type questionCardProps = {
  title?: string;
};

const QuestionCard = ({ title }: questionCardProps) => {
  return (
    <Card className=" text-center rounded-2xl shadow-xl w-24">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default QuestionCard;
