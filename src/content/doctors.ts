export type DoctorRecord = {
  id: string;
  name: string;
  specialty: string;
  degrees: string;
  experience: string; // e.g., "7 Years"
  visitingDays: string;
  timings: string;
  consultationFee: string;
  image: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  about?: string;
};

export const doctorsData: DoctorRecord[] = [
  {
    id: "1",
    name: "Dr. B G Mahesh",
    specialty: "Radiology",
    degrees: "MBBS, MD, FRGUHS",
    experience: "7 Years",
    visitingDays: "Mon–Sat",
    timings: "9AM - 5PM",
    consultationFee: "₹600",
    image: "/doctor-profiles/DR-B.G-MAHESH.png",
    slug: "dr-b-mahesh-radiology",
    seoTitle: "Dr. B G Mahesh – Radiology at Maiya Hospital",
    metaDescription: "Meet Dr. B G Mahesh, a Radiology specialist with 7 years of experience. Available Mon–Sat from 9AM - 5PM at Maiya Hospital.",
    focusKeyword: "Dr. B G Mahesh Radiology in Bangalore",
    about: "Dr. B G Mahesh is a highly experienced radiology specialist with over 7 years of service. Available during Mon–Sat from 9AM - 5PM at Maiya Hospital."
  },
  {
    id: "2",
    name: "Dr. Chandra Shekar H S",
    specialty: "Orthopaedics",
    degrees: "MBBS, MS, FIJR",
    experience: "40 Years",
    visitingDays: "Mon–Sat",
    timings: "12:30PM - 2:30PM",
    consultationFee: "₹600",
    image: "/doctor-profiles/DR- CHANDRASHEKAR -H S.jpg",
    slug: "dr-chandra-s-orthopaedics",
    seoTitle: "Dr. Chandra Shekar H S – Orthopaedics at Maiya Hospital",
    metaDescription: "Meet Dr. Chandra Shekar H S, a Orthopaedics specialist with 40 years of experience. Available Mon–Sat from 12:30PM - 2:30PM at Maiya Hospital.",
    focusKeyword: "Dr. Chandra Shekar H S Orthopaedics in Bangalore",
    about: "Dr. Chandra Shekar H S is a highly experienced orthopaedics specialist with over 40 years of service. Available during Mon–Sat from 12:30PM - 2:30PM at Maiya Hospital."
  },
  {
    id: "3",
    name: "Dr. Akshay Dhanda",
    specialty: "Orthopaedics",
    degrees: "MBBS, MS, DNB(ORTHO), FRGUHS",
    experience: "10 Years",
    visitingDays: "Mon–Sat",
    timings: "5PM - 7PM",
    consultationFee: "₹400",
    image: "/doctor-profiles/dr-Askahy-dhanda.jpg",
    slug: "dr-akshay-dhanda-orthopaedics",
    seoTitle: "Dr. Akshay Dhanda – Orthopaedics at Maiya Hospital",
    metaDescription: "Meet Dr. Akshay Dhanda, a Orthopaedics specialist with 10 years of experience. Available Mon–Sat from 5PM - 7PM at Maiya Hospital.",
    focusKeyword: "Dr. Akshay Dhanda Orthopaedics in Bangalore",
    about: "Dr. Akshay Dhanda is a highly experienced orthopaedics specialist with over 10 years of service. Available during Mon–Sat from 5PM - 7PM at Maiya Hospital."
  },
  {
    id: "4",
    name: "Dr. Krishnappa R",
    specialty: "Surgical Oncology",
    degrees: "MBBS, MS, MCH",
    experience: "35 Years",
    visitingDays: "Mon–Sat",
    timings: "4PM - 6PM",
                      consultationFee: "₹600",
    image: "/doctor-profiles/DR-KRISHNAPPA- R.jpg",
    slug: "dr-krishnappa-r-surgical-oncology",
    seoTitle: "Dr. Krishnappa R – Surgical Oncology at Maiya Hospital",
    metaDescription: "Meet Dr. Krishnappa R, a Surgical Oncology specialist with 35 years of experience. Available Mon–Sat from 4PM - 6PM at Maiya Hospital.",
    focusKeyword: "Dr. Krishnappa R Surgical Oncology in Bangalore",
    about: "Dr. Krishnappa R is a highly experienced surgical oncology specialist with over 35 years of service. Available during Mon–Sat from 4PM - 6PM at Maiya Hospital."
  },
  {
    id: "5",
    name: "Dr. G L Maiya",
    specialty: "General Surgery",
    degrees: "MBBS, MS",
    experience: "30 Years",
    visitingDays: "Mon–Sat",
    timings: "10AM - 12PM",
    consultationFee: "₹600",
    image: "/doctor-profiles/DR-G L-MAIYA.png",
    slug: "dr-g-maiya-general-surgery",
    seoTitle: "Dr. G L Maiya – General Surgery at Maiya Hospital",
    metaDescription: "Meet Dr. G L Maiya, a General Surgery specialist with 30 years of experience. Available Mon–Sat from 10AM - 12PM at Maiya Hospital.",
    focusKeyword: "Dr. G L Maiya General Surgery in Bangalore",
    about: "Dr. G L Maiya is a highly experienced general surgery specialist with over 30 years of service. Available during Mon–Sat from 10AM - 12PM at Maiya Hospital."
  },
  {
    id: "6",
    name: "Dr. Hrishikesh Vemula",
    specialty: "Cardiology",
    degrees: "MBBS, MD, DM",
    experience: "20 Years",
    visitingDays: "Mon–Sat",
    timings: "5PM - 7PM",
    consultationFee: "₹800",
    image: "/doctor-profiles/DR-HRISHIKESH- VEMULA.jpg",
    slug: "dr-hrishikesh-vemula-cardiology",
    seoTitle: "Dr. Hrishikesh Vemula – Cardiology at Maiya Hospital",
    metaDescription: "Meet Dr. Hrishikesh Vemula, a Cardiology specialist with 20 years of experience. Available Mon–Sat from 5PM - 7PM at Maiya Hospital.",
    focusKeyword: "Dr. Hrishikesh Vemula Cardiology in Bangalore",
    about: "Dr. Hrishikesh Vemula is a highly experienced cardiology specialist with over 20 years of service. Available during Mon–Sat from 5PM - 7PM at Maiya Hospital."
  },
  {
    id: "7",
    name: "Dr. Sujay Rao",
    specialty: "Neurosurgery",
    degrees: "MBBS, MS, MCH",
    experience: "35 Years",
    visitingDays: "Mon–Sat",
    timings: "6PM - 8PM",
    consultationFee: "₹1200",
    image: "/doctor-profiles/DR-SUJAY- RAO.png",
    slug: "dr-sujay-rao-neurosurgery",
    seoTitle: "Dr. Sujay Rao – Neurosurgery at Maiya Hospital",
    metaDescription: "Meet Dr. Sujay Rao, a Neurosurgery specialist with 35 years of experience. Available Mon–Sat from 6PM - 8PM at Maiya Hospital.",
    focusKeyword: "Dr. Sujay Rao Neurosurgery in Bangalore",
    about: "Dr. Sujay Rao is a highly experienced neurosurgery specialist with over 35 years of service. Available during Mon–Sat from 6PM - 8PM at Maiya Hospital."
  },
  {
    id: "8",
    name: "Dr. Ishwarya B",
    specialty: "Obstetrics & Gynaecology",
    degrees: "MBBS, MS",
    experience: "10 Years",
    visitingDays: "Mon–Sat",
    timings: "6PM - 8PM",
    consultationFee: "₹500",
    image: "/doctor-profiles/DR-ISHWARYA- BHANDARI.jpg",
    slug: "dr-ishwarya-b-obstetrics-&-gynaecology",
    seoTitle: "Dr. Ishwarya B – Obstetrics & Gynaecology at Maiya Hospital",
    metaDescription: "Meet Dr. Ishwarya B, a Obstetrics & Gynaecology specialist with 10 years of experience. Available Mon–Sat from 6PM - 8PM at Maiya Hospital.",
    focusKeyword: "Dr. Ishwarya B Obstetrics & Gynaecology in Bangalore",
    about: "Dr. Ishwarya B is a highly experienced obstetrics & gynaecology specialist with over 10 years of service. Available during Mon–Sat from 6PM - 8PM at Maiya Hospital."
  },
  {
    id: "9",
    name: "Dr. N T Babu",
    specialty: "Ophthalmology",
    degrees: "MBBS, DOMS",
    experience: "15 Years",
    visitingDays: "Mon–Sat",
    timings: "10AM - 12PM",
    consultationFee: "₹600",
    image: "/doctor-profiles/DR-N T-BABU.jpg",
    slug: "dr-n-babu-ophthalmology",
    seoTitle: "Dr. N T Babu – Ophthalmology at Maiya Hospital",
    metaDescription: "Meet Dr. N T Babu, a Ophthalmology specialist with 15 years of experience. Available Mon–Sat from 10AM - 12PM at Maiya Hospital.",
    focusKeyword: "Dr. N T Babu Ophthalmology in Bangalore",
    about: "Dr. N T Babu is a highly experienced ophthalmology specialist with over 15 years of service. Available during Mon–Sat from 10AM - 12PM at Maiya Hospital."
  },
  {
    id: "10",
    name: "Dr. Murali P",
    specialty: "Medical Oncology",
    degrees: "MBBS, MD",
    experience: "10 Years",
    visitingDays: "Mon–Sat",
    timings: "2PM - 4PM",
    consultationFee: "₹750",
    image: "/doctor-profiles/DR-MURALI-P.jpeg",
    slug: "dr-murali-p-medical-oncology",
    seoTitle: "Dr. Murali P – Medical Oncology at Maiya Hospital",
    metaDescription: "Meet Dr. Murali P, a Medical Oncology specialist with 10 years of experience. Available Mon–Sat from 2PM - 4PM at Maiya Hospital.",
    focusKeyword: "Dr. Murali P Medical Oncology in Bangalore",
    about: "Dr. Murali P is a highly experienced medical oncology specialist with over 10 years of service. Available during Mon–Sat from 2PM - 4PM at Maiya Hospital."
  },
  // Legacy doctors kept with original details (unchanged)
  {
    id: "13-legacy",
    name: "Dr. Abhey Vasudev",
    specialty: "Orthopedics",
    degrees: "MBBS, MD",
    experience: "15 Years",
    visitingDays: "Mon–Sat",
    timings: "9AM – 5PM",
    consultationFee: "₹700",
    image: "/doctor-profiles/dr-abhey-vasudev.jpg",
    slug: "dr-abhey-vasudev",
    seoTitle: "Dr. Abhey Vasudev – Orthopedics at Maiya Hospital",
    metaDescription: "Meet Dr. Abhey Vasudev, Orthopedics specialist at Maiya Hospital Bangalore.",
    focusKeyword: "Dr. Abhey Vasudev Orthopedics Bangalore",
    about: "Dr. Abhey Vasudev provides Orthopedics consultations at Maiya Hospital."
  },
  {
    id: "11-legacy",
    name: "Dr. Chinmay Nagesh",
    specialty: "Vascular Surgery",
    degrees: "MBBS, MS",
    experience: "15 Years",
    visitingDays: "Mon–Sat",
    timings: "9AM – 5PM",
    consultationFee: "₹600",
    image: "/doctor-profiles/DR-CHINMAY- NAGESH.jpeg",
    slug: "dr-chinmay-nagesh",
    seoTitle: "Dr. Chinmay Nagesh – Vascular Surgery at Maiya Hospital",
    metaDescription: "Meet Dr. Chinmay Nagesh, Vascular Surgery specialist at Maiya Hospital Bangalore.",
    focusKeyword: "Dr. Chinmay Nagesh Vascular Surgery Bangalore",
    about: "Dr. Chinmay Nagesh provides Vascular Surgery consultations at Maiya Hospital."
  },
  {
    id: "15-legacy",
    name: "Dr. Geetha B V",
    specialty: "General Medicine",
    degrees: "MBBS, MD",
    experience: "20 Years",
    visitingDays: "Mon–Sat",
    timings: "9AM – 5PM",
    consultationFee: "₹600",
    image: "/doctor-profiles/DR-GEETHA-B V.png",
    slug: "dr-geetha-b-v",
    seoTitle: "Dr. Geetha B V – General Medicine at Maiya Hospital",
    metaDescription: "Meet Dr. Geetha B V, General Medicine specialist at Maiya Hospital Bangalore.",
    focusKeyword: "Dr. Geetha B V General Medicine Bangalore",
    about: "Dr. Geetha B V provides General Medicine consultations at Maiya Hospital."
  },
  {
    id: "11",
    name: "Dr. Lakshmi V Pandit",
    specialty: "Psychiatry",
    degrees: "MBBS, DPM, BPM, DNB",
    experience: "20 Years",
    visitingDays: "Mon–Sat",
    timings: "5PM - 7PM",
    consultationFee: "₹800",
    image: "/doctor-profiles/DR-LAKSHMI-V-PANDIT.jpg",
    slug: "dr-lakshmi-pandit-psychiatry",
    seoTitle: "Dr. Lakshmi V Pandit – Psychiatry at Maiya Hospital",
    metaDescription: "Meet Dr. Lakshmi V Pandit, a Psychiatry specialist with 20 years of experience. Available Mon–Sat from 5PM - 7PM at Maiya Hospital.",
    focusKeyword: "Dr. Lakshmi V Pandit Psychiatry in Bangalore",
    about: "Dr. Lakshmi V Pandit is a highly experienced psychiatry specialist with over 20 years of service. Available during Mon–Sat from 5PM - 7PM at Maiya Hospital."
  },
  {
    id: "12",
    name: "Dr. Ananth Krishna M.A",
    specialty: "Surgical Gastroenterology",
    degrees: "MBBS, MS, FSGE",
    experience: "15 Years",
    visitingDays: "Mon–Sat",
    timings: "Appointment Only",
    consultationFee: "₹600",
    image: "/doctor-profiles/DR-ANANTH-KRISHNA.jpeg",
    slug: "dr-ananth-m.a-surgical-gastroenterology",
    seoTitle: "Dr. Ananth Krishna M.A – Surgical Gastroenterology at Maiya Hospital",
    metaDescription: "Meet Dr. Ananth Krishna M.A, a Surgical Gastroenterology specialist with 15 years of experience. Available Mon–Sat from Appointment Only at Maiya Hospital.",
    focusKeyword: "Dr. Ananth Krishna M.A Surgical Gastroenterology in Bangalore",
    about: "Dr. Ananth Krishna M.A is a highly experienced surgical gastroenterology specialist with over 15 years of service. Available during Mon–Sat from Appointment Only at Maiya Hospital."
  }
];

export default doctorsData;


