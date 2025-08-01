import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Activity, Brain, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { assessmentApi } from "@/services/api";

interface PersonalInfo {
  age: string;
  gender: string;
  height: string;
  weight: string;
}

interface DiabetesRisk {
  familyHistory: string;
  bloodPressure: string;
  activityLevel: string;
  waistCircumference: string;
}

interface StressEvaluation {
  sleepHours: string;
  sleepQuality: string;
  workStress: string;
  relationships: string;
}

interface CopingStrategies {
  strategies: string[];
}

const HealthAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    age: "", gender: "", height: "", weight: ""
  });
  const [diabetesRisk, setDiabetesRisk] = useState<DiabetesRisk>({
    familyHistory: "", bloodPressure: "", activityLevel: "", waistCircumference: ""
  });
  const [stressEvaluation, setStressEvaluation] = useState<StressEvaluation>({
    sleepHours: "", sleepQuality: "", workStress: "", relationships: ""
  });
  const [copingStrategies, setCopingStrategies] = useState<CopingStrategies>({
    strategies: []
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const calculateBMI = () => {
    const heightM = parseFloat(personalInfo.height) / 100;
    const weightKg = parseFloat(personalInfo.weight);
    return weightKg / (heightM * heightM);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", risk: "low" };
    if (bmi < 25) return { category: "Normal", risk: "low" };
    if (bmi < 30) return { category: "Overweight", risk: "moderate" };
    return { category: "Obese", risk: "high" };
  };

  const calculateDiabetesRisk = () => {
    let score = 0;
    if (diabetesRisk.familyHistory === "yes") score += 2;
    if (diabetesRisk.bloodPressure === "high") score += 2;
    if (diabetesRisk.activityLevel === "low") score += 1;
    if (diabetesRisk.waistCircumference === "high") score += 1;
    
    if (score >= 4) return { level: "High Risk", risk: "high" };
    if (score >= 2) return { level: "Moderate Risk", risk: "moderate" };
    return { level: "Low Risk", risk: "low" };
  };

  const calculateStressLevel = () => {
    let score = 0;
    if (parseInt(stressEvaluation.sleepHours) < 6) score += 2;
    if (stressEvaluation.sleepQuality === "poor") score += 2;
    if (stressEvaluation.workStress === "high") score += 2;
    if (stressEvaluation.relationships === "poor") score += 1;
    
    if (score >= 5) return { level: "High Stress", risk: "high" };
    if (score >= 3) return { level: "Moderate Stress", risk: "moderate" };
    return { level: "Low Stress", risk: "low" };
  };

  const getOverallRisk = () => {
    const bmi = calculateBMI();
    const bmiRisk = getBMICategory(bmi).risk;
    const diabetesRisk = calculateDiabetesRisk().risk;
    const stressRisk = calculateStressLevel().risk;
    
    const risks = [bmiRisk, diabetesRisk, stressRisk];
    if (risks.includes("high")) return "High Risk";
    if (risks.includes("moderate")) return "Moderate Risk";
    return "Low Risk";
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStrategyChange = (strategy: string, checked: boolean) => {
    setCopingStrategies(prev => ({
      strategies: checked 
        ? [...prev.strategies, strategy]
        : prev.strategies.filter(s => s !== strategy)
    }));
  };

  const resetAssessment = () => {
    setCurrentStep(1);
    setPersonalInfo({ age: "", gender: "", height: "", weight: "" });
    setDiabetesRisk({ familyHistory: "", bloodPressure: "", activityLevel: "", waistCircumference: "" });
    setStressEvaluation({ sleepHours: "", sleepQuality: "", workStress: "", relationships: "" });
    setCopingStrategies({ strategies: [] });
  };

  const { toast } = useToast();

  const handleSaveAssessment = async () => {
    try {
      await assessmentApi.create({
        personalInfo,
        diabetesRisk,
        stressEvaluation,
        copingStrategies,
      });
      toast({
        title: "Assessment saved!",
        description: "Your health assessment has been saved.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not save assessment. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (currentStep === totalSteps) {
      handleSaveAssessment();
    }
    // eslint-disable-next-line
  }, [currentStep]);

  return (
    <div className="relative">
      <Card className="glass border border-white/80 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-red-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-foreground text-xl">Health Assessment</CardTitle>
          </div>
          {currentStep < totalSteps && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-lg flex items-center">
                <Heart className="w-5 h-5 mr-2 text-green-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Age</Label>
                  <Input 
                    placeholder="25"
                    value={personalInfo.age}
                    onChange={(e) => setPersonalInfo({...personalInfo, age: e.target.value})}
                    className="bg-white/80 border border-gray-300 text-foreground placeholder:text-muted-foreground focus:border-green-600 focus:ring-green-600"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Height (cm)</Label>
                  <Input 
                    placeholder="170"
                    value={personalInfo.height}
                    onChange={(e) => setPersonalInfo({...personalInfo, height: e.target.value})}
                    className="bg-white/80 border border-gray-300 text-foreground placeholder:text-muted-foreground focus:border-green-600 focus:ring-green-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Weight (kg)</Label>
                  <Input 
                    placeholder="70"
                    value={personalInfo.weight}
                    onChange={(e) => setPersonalInfo({...personalInfo, weight: e.target.value})}
                    className="bg-white/80 border border-gray-300 text-foreground placeholder:text-muted-foreground focus:border-green-600 focus:ring-green-600"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Gender</Label>
                  <RadioGroup value={personalInfo.gender} onValueChange={(value) => setPersonalInfo({...personalInfo, gender: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-muted-foreground">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-muted-foreground">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}
          {/* Step 2: Diabetes Risk */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-lg flex items-center">
                <Activity className="w-5 h-5 mr-2 text-red-500" />
                Diabetes Risk Assessment
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Family history of diabetes?</Label>
                  <RadioGroup value={diabetesRisk.familyHistory} onValueChange={(value) => setDiabetesRisk({...diabetesRisk, familyHistory: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="fh-yes" />
                      <Label htmlFor="fh-yes" className="text-muted-foreground">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="fh-no" />
                      <Label htmlFor="fh-no" className="text-muted-foreground">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-muted-foreground">Blood pressure level</Label>
                  <RadioGroup value={diabetesRisk.bloodPressure} onValueChange={(value) => setDiabetesRisk({...diabetesRisk, bloodPressure: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="bp-normal" />
                      <Label htmlFor="bp-normal" className="text-muted-foreground">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="bp-high" />
                      <Label htmlFor="bp-high" className="text-muted-foreground">High</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-muted-foreground">Physical activity level</Label>
                  <RadioGroup value={diabetesRisk.activityLevel} onValueChange={(value) => setDiabetesRisk({...diabetesRisk, activityLevel: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="act-high" />
                      <Label htmlFor="act-high" className="text-muted-foreground">High (5+ days/week)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="act-mod" />
                      <Label htmlFor="act-mod" className="text-muted-foreground">Moderate (2-4 days/week)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="act-low" />
                      <Label htmlFor="act-low" className="text-muted-foreground">Low (0-1 days/week)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}
          {/* Step 3: Stress Evaluation */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-lg flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-400" />
                Sleep & Stress Evaluation
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Average sleep hours per night</Label>
                  <Input 
                    placeholder="7"
                    value={stressEvaluation.sleepHours}
                    onChange={(e) => setStressEvaluation({...stressEvaluation, sleepHours: e.target.value})}
                    className="bg-white/80 border border-gray-300 text-foreground placeholder:text-muted-foreground focus:border-green-600 focus:ring-green-600"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Sleep quality</Label>
                  <RadioGroup value={stressEvaluation.sleepQuality} onValueChange={(value) => setStressEvaluation({...stressEvaluation, sleepQuality: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excellent" id="sq-exc" />
                      <Label htmlFor="sq-exc" className="text-muted-foreground">Excellent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="sq-good" />
                      <Label htmlFor="sq-good" className="text-muted-foreground">Good</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="sq-poor" />
                      <Label htmlFor="sq-poor" className="text-muted-foreground">Poor</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-muted-foreground">Work stress level</Label>
                  <RadioGroup value={stressEvaluation.workStress} onValueChange={(value) => setStressEvaluation({...stressEvaluation, workStress: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="ws-low" />
                      <Label htmlFor="ws-low" className="text-muted-foreground">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="ws-mod" />
                      <Label htmlFor="ws-mod" className="text-muted-foreground">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="ws-high" />
                      <Label htmlFor="ws-high" className="text-muted-foreground">High</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}
          {/* Step 4: Coping Strategies */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold text-lg">Coping Strategies</h3>
              <p className="text-muted-foreground">Select all that apply to you:</p>
              <div className="space-y-3">
                {[
                  "Regular exercise", "Meditation/Mindfulness", "Healthy diet", 
                  "Social support", "Professional counseling", "Hobbies/Recreation",
                  "Time management", "Deep breathing exercises"
                ].map((strategy) => (
                  <div key={strategy} className="flex items-center space-x-2">
                    <Checkbox 
                      id={strategy}
                      checked={copingStrategies.strategies.includes(strategy)}
                      onCheckedChange={(checked) => handleStrategyChange(strategy, checked as boolean)}
                    />
                    <Label htmlFor={strategy} className="text-muted-foreground">{strategy}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Step 5: Results */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-foreground font-semibold text-lg text-center">Your Health Assessment Results</h3>
              <div className="grid gap-4">
                {/* Overall Risk */}
                <div className="glass p-4 text-center border border-white/80">
                  <h4 className="text-2xl font-bold text-foreground mb-2">Overall Health Risk</h4>
                  <div className={`text-3xl font-bold ${
                    getOverallRisk() === "High Risk" ? "text-red-500" :
                    getOverallRisk() === "Moderate Risk" ? "text-yellow-500" : "text-green-600"
                  }`}>
                    {getOverallRisk()}
                  </div>
                </div>
                {/* Individual Scores */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass p-4 text-center border border-white/80">
                    <Heart className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="text-sm text-muted-foreground">BMI</div>
                    <div className="font-semibold text-foreground">{calculateBMI().toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground">{getBMICategory(calculateBMI()).category}</div>
                  </div>
                  <div className="glass p-4 text-center border border-white/80">
                    <Activity className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <div className="text-sm text-muted-foreground">Diabetes</div>
                    <div className="font-semibold text-foreground">{calculateDiabetesRisk().level}</div>
                  </div>
                  <div className="glass p-4 text-center border border-white/80">
                    <Brain className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                    <div className="text-sm text-muted-foreground">Stress</div>
                    <div className="font-semibold text-foreground">{calculateStressLevel().level}</div>
                  </div>
                </div>
                {/* Recommendations */}
                <div className="glass p-4 border border-white/80">
                  <h4 className="text-foreground font-semibold mb-3">Recommendations</h4>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Maintain regular exercise routine (150 min/week)</li>
                    <li>• Follow a balanced diet with proper portions</li>
                    <li>• Prioritize 7-9 hours of quality sleep</li>
                    <li>• Practice stress management techniques</li>
                    <li>• Schedule regular health checkups</li>
                  </ul>
                </div>
              </div>
              <Button 
                onClick={resetAssessment}
                className="w-full bg-gradient-to-r from-green-600 to-red-500 hover:from-blue-400 hover:to-purple-400 text-white rounded-2xl py-6"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Assessment Again
              </Button>
            </div>
          )}
          {/* Navigation Buttons */}
          {currentStep < totalSteps && (
            <div className="flex justify-between pt-4">
              <Button 
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="bg-white/80 border border-white/80 text-foreground hover:bg-green-700/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-green-600 to-red-500 hover:from-blue-400 hover:to-purple-400 text-white"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAssessment;