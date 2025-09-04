import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SuccessCardProps {
  title?: string;
  message?: string;
  details?: Array<{ label: string; value: string }>;
}

const SuccessCard = ({ title = "Success!", message, details = [] }: SuccessCardProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
      <Card className="relative glass border border-white/80 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        <CardContent className="space-y-5 text-center p-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition"></div>
              <CheckCircle className="relative w-14 h-14 text-emerald-500 drop-shadow" />
            </div>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h3>
          {message && (
            <p className="text-muted-foreground leading-relaxed">
              {message}
            </p>
          )}
          {details.length > 0 && (
            <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur rounded-2xl p-5 border border-white/80 text-left shadow-sm">
              {details.map((item, idx) => (
                <div key={`${item.label}-${idx}`} className="flex items-center justify-between py-2">
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-semibold text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessCard;


