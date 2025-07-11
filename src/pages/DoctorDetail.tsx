import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, MapPin, Phone, Mail, Award, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import the doctors data
const doctorsData = [
  // Anaesthesia
  { id: "1", name: "Dr. Rajesh Kumar", specialty: "Anaesthesia", degrees: "MBBS, MD", experience: "15 Years", visitingDays: "Mon–Sat", timings: "9AM – 5PM", consultationFee: "₹700", image: "/placeholder-doctor-1.jpg" },
  { id: "2", name: "Dr. Priya Sharma", specialty: "Anaesthesia", degrees: "MBBS, DA", experience: "12 Years", visitingDays: "Mon–Fri", timings: "8AM – 4PM", consultationFee: "₹650", image: "/placeholder-doctor-2.jpg" },
  
  // Cardiology
  { id: "3", name: "Dr. Hrishikesh Vemula", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "20 Years", visitingDays: "Mon–Sat", timings: "5PM – 7PM", consultationFee: "₹800", image: "/placeholder-doctor-3.jpg" },
  { id: "4", name: "Dr. Lakshmikanth P", specialty: "Cardiology", degrees: "MBBS, MD, DM", experience: "30 Years", visitingDays: "Mon–Sat", timings: "2PM – 4PM", consultationFee: "₹800", image: "/placeholder-doctor-4.jpg" },
  { id: "5", name: "Dr. Arun Nair", specialty: "Cardiology", degrees: "MBBS, MD", experience: "18 Years", visitingDays: "Tue–Sun", timings: "10AM – 2PM", consultationFee: "₹750", image: "/placeholder-doctor-5.jpg" },
  
  // Dentistry
  { id: "6", name: "Dr. Meera Patel", specialty: "Dentistry", degrees: "BDS, MDS", experience: "14 Years", visitingDays: "Mon–Sat", timings: "9AM – 6PM", consultationFee: "₹500", image: "/placeholder-doctor-6.jpg" },
  { id: "7", name: "Dr. Suresh Reddy", specialty: "Dentistry", degrees: "BDS", experience: "10 Years", visitingDays: "Mon–Fri", timings: "2PM – 8PM", consultationFee: "₹450", image: "/placeholder-doctor-7.jpg" },
  
  // Dermatology
  { id: "8", name: "Dr. Kavitha Rao", specialty: "Dermatology", degrees: "MBBS, MD", experience: "16 Years", visitingDays: "Mon–Sat", timings: "11AM – 7PM", consultationFee: "₹600", image: "/placeholder-doctor-8.jpg" },
  { id: "9", name: "Dr. Amit Singh", specialty: "Dermatology", degrees: "MBBS, DVD", experience: "13 Years", visitingDays: "Tue–Sun", timings: "3PM – 9PM", consultationFee: "₹550", image: "/placeholder-doctor-9.jpg" },
  
  // E.N.T
  { id: "10", name: "Dr. Sanjay Gupta", specialty: "E.N.T", degrees: "MBBS, MS", experience: "19 Years", visitingDays: "Mon–Sat", timings: "10AM – 6PM", consultationFee: "₹650", image: "/placeholder-doctor-10.jpg" },
  { id: "11", name: "Dr. Lakshmi Devi", specialty: "E.N.T", degrees: "MBBS, DLO", experience: "22 Years", visitingDays: "Mon–Fri", timings: "4PM – 8PM", consultationFee: "₹700", image: "/placeholder-doctor-11.jpg" },
  
  // General Medicine
  { id: "12", name: "Dr. Raghuveer Karanth", specialty: "General Medicine", degrees: "MBBS, DNB", experience: "20 Years", visitingDays: "Mon–Sat", timings: "12PM – 2PM & 8PM – 10PM", consultationFee: "₹600", image: "/placeholder-doctor-12.jpg" },
  { id: "13", name: "Dr. Deepak Joshi", specialty: "General Medicine", degrees: "MBBS, MD", experience: "17 Years", visitingDays: "Daily", timings: "9AM – 1PM", consultationFee: "₹500", image: "/placeholder-doctor-13.jpg" },
  { id: "14", name: "Dr. Sunita Varma", specialty: "General Medicine", degrees: "MBBS", experience: "14 Years", visitingDays: "Mon–Sat", timings: "6PM – 10PM", consultationFee: "₹450", image: "/placeholder-doctor-14.jpg" },
  
  // General Surgery
  { id: "15", name: "Dr. Vikram Mehta", specialty: "General Surgery", degrees: "MBBS, MS", experience: "25 Years", visitingDays: "Mon–Fri", timings: "7AM – 2PM", consultationFee: "₹800", image: "/placeholder-doctor-15.jpg" },
  { id: "16", name: "Dr. Ravi Kumar", specialty: "General Surgery", degrees: "MBBS, MS", experience: "21 Years", visitingDays: "Tue–Sat", timings: "3PM – 7PM", consultationFee: "₹750", image: "/placeholder-doctor-16.jpg" },
  
  // Nephrology
  { id: "17", name: "Dr. Ananya Das", specialty: "Nephrology", degrees: "MBBS, MD, DM", experience: "18 Years", visitingDays: "Mon–Fri", timings: "11AM – 5PM", consultationFee: "₹900", image: "/placeholder-doctor-17.jpg" },
  { id: "18", name: "Dr. Kiran Bhat", specialty: "Nephrology", degrees: "MBBS, MD", experience: "16 Years", visitingDays: "Wed–Sun", timings: "2PM – 6PM", consultationFee: "₹850", image: "/placeholder-doctor-18.jpg" },
  
  // Neurology
  { id: "19", name: "Dr. Ramesh Patel", specialty: "Neurology", degrees: "MBBS, MD, DM", experience: "25 Years", visitingDays: "Mon–Sat", timings: "7PM – 9PM", consultationFee: "₹850", image: "/placeholder-doctor-19.jpg" },
  { id: "20", name: "Dr. Manish Agarwal", specialty: "Neurology", degrees: "MBBS, MD", experience: "20 Years", visitingDays: "Tue–Fri", timings: "4PM – 8PM", consultationFee: "₹800", image: "/placeholder-doctor-20.jpg" },
  
  // Neurosurgery
  { id: "21", name: "Dr. Sujay Rao", specialty: "Neurosurgery", degrees: "MBBS, MS, MCH", experience: "35 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹1200", image: "/placeholder-doctor-21.jpg" },
  { id: "22", name: "Dr. Ashwin Kulkarni", specialty: "Neurosurgery", degrees: "MBBS, MS", experience: "28 Years", visitingDays: "Mon–Thu", timings: "8AM – 12PM", consultationFee: "₹1100", image: "/placeholder-doctor-22.jpg" },
  
  // Obstetrics & Gynaecology
  { id: "23", name: "Dr. Sharmila Chennappa", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "20 Years", visitingDays: "Appointment Only", timings: "Appointment Only", consultationFee: "₹600", image: "/placeholder-doctor-23.jpg" },
  { id: "24", name: "Dr. Ishwarya B", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "10 Years", visitingDays: "Mon–Sat", timings: "6PM – 8PM", consultationFee: "₹500", image: "/placeholder-doctor-24.jpg" },
  { id: "25", name: "Dr. Sushma B N", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS, DGO", experience: "10 Years", visitingDays: "Mon–Sat", timings: "5PM – 7PM", consultationFee: "₹500", image: "/placeholder-doctor-25.jpg" },
  { id: "26", name: "Dr. Nandini Rao", specialty: "Obstetrics & Gynaecology", degrees: "MBBS, MS", experience: "15 Years", visitingDays: "Tue–Sat", timings: "10AM – 2PM", consultationFee: "₹550", image: "/placeholder-doctor-26.jpg" },
  
  // Ophthalmology
  { id: "27", name: "Dr. N T Babu", specialty: "Ophthalmology", degrees: "MBBS, DOMS", experience: "15 Years", visitingDays: "Mon–Sat", timings: "10AM – 12PM", consultationFee: "₹600", image: "/placeholder-doctor-27.jpg" },
  { id: "28", name: "Dr. Pooja Hegde", specialty: "Ophthalmology", degrees: "MBBS, MS", experience: "12 Years", visitingDays: "Mon–Fri", timings: "3PM – 7PM", consultationFee: "₹550", image: "/placeholder-doctor-28.jpg" },
  
  // Orthopaedics
  { id: "29", name: "Dr. Sunil Gowda", specialty: "Orthopaedics", degrees: "MBBS, MS", experience: "23 Years", visitingDays: "Mon–Sat", timings: "9AM – 1PM", consultationFee: "₹700", image: "/placeholder-doctor-29.jpg" },
  { id: "30", name: "Dr. Mahesh Iyer", specialty: "Orthopaedics", degrees: "MBBS, MS", experience: "19 Years", visitingDays: "Tue–Sun", timings: "5PM – 9PM", consultationFee: "₹650", image: "/placeholder-doctor-30.jpg" },
  
  // Paediatrics
  { id: "31", name: "Dr. Rekha Menon", specialty: "Paediatrics", degrees: "MBBS, MD", experience: "18 Years", visitingDays: "Mon–Sat", timings: "11AM – 6PM", consultationFee: "₹500", image: "/placeholder-doctor-31.jpg" },
  { id: "32", name: "Dr. Sudhir Rao", specialty: "Paediatrics", degrees: "MBBS, DCH", experience: "16 Years", visitingDays: "Daily", timings: "7PM – 10PM", consultationFee: "₹450", image: "/placeholder-doctor-32.jpg" },
  
  // Physiotherapy
  { id: "33", name: "Dr. Arjun Pillai", specialty: "Physiotherapy", degrees: "BPT, MPT", experience: "11 Years", visitingDays: "Mon–Sat", timings: "8AM – 6PM", consultationFee: "₹350", image: "/placeholder-doctor-33.jpg" },
  { id: "34", name: "Dr. Sneha Jain", specialty: "Physiotherapy", degrees: "BPT", experience: "8 Years", visitingDays: "Mon–Fri", timings: "2PM – 8PM", consultationFee: "₹300", image: "/placeholder-doctor-34.jpg" },
  
  // Plastic Surgery
  { id: "35", name: "Dr. Ramesh Kumar", specialty: "Plastic Surgery", degrees: "MBBS, MS, MCH", experience: "22 Years", visitingDays: "Thu–Sun", timings: "10AM – 4PM", consultationFee: "₹1000", image: "/placeholder-doctor-35.jpg" },
  { id: "36", name: "Dr. Divya Shetty", specialty: "Plastic Surgery", degrees: "MBBS, MS", experience: "14 Years", visitingDays: "Tue–Fri", timings: "3PM – 7PM", consultationFee: "₹900", image: "/placeholder-doctor-36.jpg" },
  
  // Psychiatry
  { id: "37", name: "Dr. Rohit Malhotra", specialty: "Psychiatry", degrees: "MBBS, MD", experience: "17 Years", visitingDays: "Mon–Fri", timings: "6PM – 9PM", consultationFee: "₹700", image: "/placeholder-doctor-37.jpg" },
  { id: "38", name: "Dr. Madhuri Devi", specialty: "Psychiatry", degrees: "MBBS, DPM", experience: "13 Years", visitingDays: "Sat–Wed", timings: "11AM – 5PM", consultationFee: "₹650", image: "/placeholder-doctor-38.jpg" },
  
  // Pulmonology
  { id: "39", name: "Dr. Naveen Bhatt", specialty: "Pulmonology", degrees: "MBBS, MD", experience: "21 Years", visitingDays: "Mon–Sat", timings: "9AM – 1PM", consultationFee: "₹750", image: "/placeholder-doctor-39.jpg" },
  
  // Radiology
  { id: "40", name: "Dr. Santosh Reddy", specialty: "Radiology", degrees: "MBBS, MD", experience: "19 Years", visitingDays: "Mon–Fri", timings: "8AM – 5PM", consultationFee: "₹600", image: "/placeholder-doctor-40.jpg" }
];

const DoctorDetail = () => {
  const { id } = useParams();

  // Find the doctor based on the ID
  const doctor = doctorsData.find(doc => doc.id === id) || {
    id: "not-found",
    name: "Doctor Not Found",
    specialty: "N/A",
    degrees: "N/A",
    experience: "N/A",
    visitingDays: "N/A",
    timings: "N/A",
    consultationFee: "N/A",
    image: "/placeholder.svg",
  };

  // Additional doctor details
  const doctorDetails = {
    about: `${doctor.name} is a highly experienced ${doctor.specialty.toLowerCase()} specialist with ${doctor.experience} of expertise in treating patients. ${doctor.name.split(' ')[1]} has completed specialization from renowned institutions and has been serving patients with dedication and care.`,
    education: [
      `${doctor.degrees} from Leading Medical Institution`,
      "Additional Specialization Courses",
      "Advanced Training Programs"
    ],
    specializations: [
      `Advanced ${doctor.specialty} Care`,
      "Patient-Centered Treatment",
      "Modern Medical Techniques",
      "Preventive Care"
    ],
    achievements: [
      `Best ${doctor.specialty} Specialist Award`,
      "Excellence in Patient Care",
      "Research Publications"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Doctor Profile Header */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Doctor Image */}
                  <div className="text-center">
                    <div className="w-64 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-gradient-to-br from-slate-600 to-slate-700">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }}
                      />
                      {/* Enhanced fallback placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 flex flex-col items-center justify-center text-white relative" style={{ display: 'none' }}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-6xl font-bold mb-4">
                            {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="text-sm opacity-90 bg-white/20 px-4 py-2 rounded-full">
                            Doctor Photo
                          </div>
                          <div className="text-xs opacity-75 mt-2">
                            Placeholder Image
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">{doctor.name}</h1>
                      <Badge className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border-emerald-500/30 text-lg px-4 py-2">
                        {doctor.specialty}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-white/80">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-5 h-5 text-blue-400" />
                        <span>{doctor.degrees}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>{doctor.experience} Experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-emerald-400" />
                        <span>{doctor.timings}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <span>{doctor.visitingDays}</span>
                      </div>
                    </div>

                    <div className="text-center md:text-left pt-4">
                      <span className="text-emerald-400 font-bold text-2xl">
                        {doctor.consultationFee}
                      </span>
                      <span className="text-white/60 text-lg ml-2">consultation</span>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        onClick={() => window.location.href = `/appointment?doctor=${doctor.id}`}
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 rounded-2xl"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3 rounded-2xl">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* About & Education */}
            <div className="space-y-8">
              {/* About */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">About Dr. {doctor.name.split(' ')[1]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 leading-relaxed">{doctorDetails.about}</p>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2 text-blue-400" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {doctorDetails.education.map((edu, index) => (
                      <li key={index} className="text-white/80 flex items-start">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Specializations & Achievements */}
            <div className="space-y-8">
              {/* Specializations */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-400" />
                    Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {doctorDetails.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-white/5 text-white/80 border-white/20 px-3 py-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Award className="w-6 h-6 mr-2 text-purple-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {doctorDetails.achievements.map((achievement, index) => (
                      <li key={index} className="text-white/80 flex items-start">
                        <Award className="w-4 h-4 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 text-white/80">
                    <Phone className="w-5 h-5 text-emerald-400" />
                    <span>070223 16149 / 74060 07777</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>info@maiyahospital.in</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/80">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>Maiya Hospital, Jayanagar, Bengaluru</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorDetail;