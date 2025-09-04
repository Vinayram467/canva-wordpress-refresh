import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SuccessCardProps {
  title?: string;
  message?: string;
  details?: Array<{ label: string; value: string }>;
}

const SuccessCard = ({ title = "Success!", message, details = [] }: SuccessCardProps) => {
  return (
    <Card className="glass border border-white/80">
      <CardContent className="space-y-4 text-center p-8">
        <div className="flex justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        {message && (
          <p className="text-muted-foreground">{message}</p>
        )}
        {details.length > 0 && (
          <div className="w-full max-w-md mx-auto bg-white/60 rounded-2xl p-4 border border-white/80 text-left">
            {details.map((item, idx) => (
              <div key={`${item.label}-${idx}`} className="flex items-center justify-between py-1">
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className="text-sm font-medium text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuccessCard;


