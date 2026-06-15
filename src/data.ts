import { Conference, Member, BlogPost, Partner, Service } from './types';

export const CONFERENCES: Conference[] = [
  {
    id: "ICETCS2026",
    name: "ICETCS 2026",
    full_name: "3rd International Conference on Emerging Trends in Cybersecurity",
    type: "upcoming",
    format: "hybrid",
    url: "https://ritechs.org/conferences/ICETCS2026",
    location: "University of Genoa, Italy",
    dates: { "start": "2026-10-12", "end": "2026-10-13", "display": "12-Oct-2026 to 13-Oct-2026" },
    deadlines: [
      { "label": "Paper Submission", "date": "2026-07-31" },
      { "label": "First Review Round", "date": "2026-08-31" },
      { "label": "Revised Manuscripts", "date": "2026-09-17" },
      { "label": "Author Registration", "date": "2026-10-01" }
    ],
    general_chairs: ["Prof. Dr. Arafatur Rahman", "Prof. Dr. Kim-Kwang Raymond Choo", "Prof. Fabio Patrone"],
    keynote_speakers: ["Emma Fadlon", "Giulio Ferro", "Hendrik Wöhrle", "Imed Ben Dhaou", "Luigi Coppolino", "Mario Marchese", "Matteo Repetto", "Paul Wooderson"],
    category: "Cybersecurity"
  },
  {
    id: "ITSS-IoE2026",
    name: "ITSS-IoE 2026",
    full_name: "International Conference on Intelligent Technology, System and Service for Internet of Everything",
    type: "upcoming",
    format: "hybrid",
    url: "https://ritechs.org/conferences/ITSS-IoE2026",
    location: "Babcock University, Nigeria",
    dates: { "start": "2026-10-27", "end": "2026-10-28", "display": "27-Oct-2026 to 28-Oct-2026" },
    deadlines: [
      { "label": "Paper Submission", "date": "2026-07-31" },
      { "label": "First Review Round", "date": "2026-08-31" },
      { "label": "Revised Manuscripts", "date": "2026-09-17" },
      { "label": "Author & Participant Registration", "date": "2026-10-01" }
    ],
    general_chairs: ["Prof. Dr. Arafatur Rahman", "Prof. AJAEGBU"],
    keynote_speakers: ["Dr. Zakirul Alam Bhuiyan", "Prof. Dr Md Arafatur Rahman", "Prof. Dr. Mohammed Atiquzzaman"],
    category: "AI-IoT"
  },
  {
    id: "AIoT-RSE2026",
    name: "AIoT-RSE 2026",
    full_name: "International Conference on AI–IoT Technologies for Renewable and Sustainable Energy",
    type: "upcoming",
    format: "hybrid",
    url: "https://ritechs.org/conferences/AIoT-RSE2026",
    location: "University of Genoa, Italy",
    dates: { "start": "2026-10-12", "end": "2026-10-13", "display": "12-Oct-2026 to 13-Oct-2026" },
    deadlines: [
      { "label": "Paper Submission", "date": "2026-07-31" },
      { "label": "First Review Round", "date": "2026-08-31" },
      { "label": "Revised Manuscripts", "date": "2026-09-17" },
      { "label": "Author Registration", "date": "2026-10-01" }
    ],
    general_chairs: ["Dr. Arafatur Rahman", "Dr. Abu Yousuf", "Prof. Dr. Mohammed Atiquzzaman"],
    keynote_speakers: ["Prof. Dr Md Arafatur Rahman", "Prof. Dr. Anurag Srivastava", "Prof. Dr. Thiago Jesus", "Professor Rajan Jose"],
    category: "Renewable Energy"
  },
  {
    id: "ITSS-IoE2025",
    name: "ITSS-IoE 2025",
    full_name: "International Conference on Intelligent Technology, System and Service for Internet of Everything",
    type: "past",
    format: "hybrid",
    url: "https://ritechs.org/conferences/ITSS-IoE2025",
    location: "Science Park, Wolverhampton",
    dates: { "start": "2025-10-27", "end": "2025-10-28", "display": "27-Oct-2025 to 28-Oct-2025" },
    deadlines: [
      { "label": "Full Paper Submission", "date": "2025-07-31" },
      { "label": "Author Notification", "date": "2025-09-15" },
      { "label": "Revised Submission", "date": "2025-09-15" },
      { "label": "Author Registration", "date": "2025-10-17" }
    ],
    general_chairs: ["Dr. Arafatur Rahman", "Md Zakirul Alam Bhuiyan"],
    keynote_speakers: ["Prof. Dr Md Arafatur Rahman", "Prof. Dr. Mohammed Atiquzzaman", "Dr. Vasilis Katos"],
    category: "AI-IoT"
  },
  {
    id: "ICETCS2025",
    name: "ICETCS 2025",
    full_name: "Proceeding of International Conference on Emerging Trends in Cybersecurity",
    type: "past",
    format: "hybrid",
    url: "https://ritechs.org/conferences/ICETCS2025",
    location: "Science Park, Wolverhampton",
    dates: { "start": "2025-10-27", "end": "2025-10-28", "display": "27-Oct-2025 to 28-Oct-2025" },
    deadlines: [
      { "label": "Paper Submission", "date": "2025-07-31" },
      { "label": "First Review Round", "date": "2025-09-15" },
      { "label": "Revised Manuscripts", "date": "2025-09-17" },
      { "label": "Author Registration", "date": "2025-10-17" }
    ],
    general_chairs: ["Prof. Dr. Kim-Kwang Raymond Choo", "Dr. Arafatur Rahman"],
    keynote_speakers: ["Dr. Houbing Herbert Song, IEEE Fellow", "Dr. Steven Furnell", "Dr. Zakirul Alam Bhuiyan", "Dr Ihsan Ullah"],
    category: "Cybersecurity"
  }
];

export const MEMBERS: Member[] = [
  { id: 14, name: "Md Arafatur Rahman", type: "mentor", title: "Assistant Professor", affiliation: "University of Wolverhampton", location: "UK", specializations: ["Cognitive Radio Networks", "IoT", "Machine learning", "Wireless networks"], featured: true },
  { id: 622, name: "LUHUR BAYUAJI", type: "mentor", title: "Assistant Professor", affiliation: "Universiti Malaysia Pahang", location: "Malaysia", specializations: ["Software Engineering", "Cloud Computing"], featured: true },
  { id: 608, name: "Gabriel Gomes de Oliveira", type: "mentor", title: "Researcher", affiliation: "UNICAMP", location: "Brazil", specializations: ["AI", "Embedded Systems"], featured: true },
  { id: 472, name: "Prof. Dr. Md. Rafiqul Islam", type: "mentor", title: "Professor", affiliation: "International Islamic University", location: "Gombak, Malaysia", specializations: ["Electromagnetics", "Antennas"], featured: true },
  { id: 412, name: "Dr. AKM Asif Iqbal", type: "mentor", title: "Assistant Professor", affiliation: "KUAS Engineering", location: "Kyoto, Japan", specializations: ["Robotics", "Mechatronics"], featured: true },
  { id: 159, name: "Dr Taha Hussein Rassem", type: "mentor", title: "Senior Lecturer", affiliation: "Bournemouth University", location: "Bournemouth, UK", specializations: ["Data Science", "Databases"], featured: true },
  { id: 614, name: "Mohammed Falah Mohammed", type: "mentor", title: "Lecturer", affiliation: "Nawroz University", location: "Duhok, Iraq", specializations: ["Information Security"], featured: true },
  { id: 34, name: "Md Zakirul Alam Bhuiyan", type: "mentor", title: "Assistant Professor", affiliation: "Fordham University", location: "NY, USA", specializations: ["Cybersecurity", "IoT"], featured: true },
  { id: 626, name: "Shah Samiur Rashid", type: "mentor", title: "Associate Professor", affiliation: "University of Science and Technology Chittagong (USTC)", location: "Chittagong, Bangladesh", specializations: ["Biochemistry", "Biotechnology"], featured: true },
  { id: 530, name: "Dr. Nader Sohrabi Safa", type: "mentor", title: "Assistant Professor", affiliation: "University of Wolverhampton", location: "Wolverhampton, UK", specializations: ["Cybersecurity", "Human Factors"], featured: true },
  { id: 475, name: "Prof. Dr. Prashant Pillai", type: "mentor", title: "Professor", affiliation: "University of Wolverhampton", location: "Wolverhampton, UK", specializations: ["Smart Grids", "Network Security"], featured: true },
  { id: 473, name: "ARIF REZA ANWARY", type: "mentor", title: "Research Associate (Data Scientist)", affiliation: "Edinburgh Napier University", location: "Edinburgh, Scotland", specializations: ["Data Science", "Bioinformatics"], featured: true },
  { id: 410, name: "Prof. Ts. Dr. Mustafizur Rahman", type: "mentor", title: "Professor", affiliation: "Universiti Malaysia Pahang", location: "Kuantan, Pahang, Malaysia", specializations: ["Advanced Manufacturing", "Mechanics"], featured: true },
  { id: 30, name: "ABDULRAHMAN AHMED MOHAMMED ALSEWARI", type: "mentor", title: "Senior Lecturer (Associate Professor)", affiliation: "Birmingham City University", location: "UK", specializations: ["Optimization Algorithms", "Soft Computing"], featured: true },
  { id: 695, name: "Tin T. Dang", type: "mentor", title: "Dean, Faculty of Foreign Languages", affiliation: "Ho Chi Minh City University of Technology and Education", location: "Ho Chi Minh City", specializations: ["Linguistics", "Education"], featured: true },
  { id: 639, name: "Bernardi Pranggono", type: "mentor", title: "Associate Professor", affiliation: "Anglia Ruskin University", location: "UK", specializations: ["Green ICT", "Cybersecurity", "IoT"], featured: true },
  { id: 476, name: "Shavan", "type": "mentor", title: "Associate Professor", affiliation: "IEEE Benelux", location: "Belgium", specializations: ["Telecommunications"], featured: true },
  { id: 692, name: "Md Asiful Islam", "type": "mentor", title: "Lecturer in Biomedical Science", affiliation: "University of Wolverhampton", location: "United Kingdom", specializations: ["Biomedicine", "Cancer Research"], featured: true },
  { id: 674, name: "Muhammad Ajmal Azad", "type": "mentor", title: "Senior Lecturer", affiliation: "Birmingham City University", location: "Birmingham", specializations: ["Cybersecurity", "IoT", "Machine learning", "Data Science"], featured: true },
  { id: 623, name: "Dr. Kazi Shahdat Kabir", "type": "mentor", title: "Professor", affiliation: "Northern University Bangladesh", location: "Dhaka", specializations: ["Industrial Relations", "Econ"], featured: true },
  { id: 353, name: "Dr. Farhat Anwar", "type": "mentor", title: "Professor", affiliation: "International Islamic University", location: "Gombak, Malaysia", specializations: ["Networking", "Routing Protocols"], featured: true },
  { id: 413, name: "Prof. Dr. Md Saiful Azad", "type": "mentor", title: "Professor", affiliation: "Green University of Bangladesh", location: "Dhaka, Bangladesh", specializations: ["Green Networking", "Cloud Computing"], featured: true },
  { id: 612, name: "Kamal Zuhairi Zamli", "type": "mentor", title: "Professor", affiliation: "Universiti Malaysia Pahang", location: "Pekan, Malaysia", specializations: ["Automated Software Testing"], featured: true },
  { id: 166, name: "Hussein Mohammed Abu Al-Rejal", "type": "mentor", title: "Senior Lecturer", affiliation: "Universiti Utara Malaysia", location: "Malaysia", specializations: ["MIS", "Health Informatics"], featured: true },
  { id: 470, name: "Dr. Mueen Uddin", "type": "mentor", title: "Assistant Professor", affiliation: "Universiti Brunei Darussalam", location: "Brunei Darussalam", specializations: ["Energy Efficient Data Centers"], featured: true },
  { id: 478, name: "Dr. Sazzad Hussain", "type": "mentor", title: "Data Scientist", affiliation: "Department of Customer Service, NSW", location: "Sydney, Australia", specializations: ["Data Analytics", "Policy Modeling"], featured: true },
  { id: 205, name: "Dr. Nour Moustafa", "type": "mentor", title: "Senior Lecturer", affiliation: "The University of New South Wales", location: "Canberra, Australia", specializations: ["Intrusion Detection", "Threat Intelligence"], featured: true },
  { id: 453, name: "Lakhveer Singh", "type": "mentor", title: "Associate Professor", affiliation: "SRM University-AP", location: "Vijayawada", specializations: ["Bioreactors", "Bio-energy", "Bioelectrochemical systems", "Electro catalyst", "Nano materials"], featured: true },
  { id: 467, name: "Mohammed N. Patwary", "type": "mentor", title: "Professor", affiliation: "University of Wolverhampton", location: "Wolverhampton, UK", specializations: ["5G & Beyond", "Signal Processing"], featured: true },
  { id: 606, name: "TAO HAI", "type": "mentor", title: "PhD", affiliation: "Baoji University of Arts and Sciences", "location": "China", "specializations": ["IoT Security", "Image Encryption"], featured: true },
  { id: 625, name: "Hossain M. Zabed", "type": "mentor", title: "Professor", affiliation: "Jiangsu University", "location": "Zhenjiang, China", "specializations": ["Protein and metabolic engineering", "Bio-energy", "Biocatalysis"], featured: true },
  { id: 10, name: "Dr. A. Taufiq Asyhari", "type": "mentor", title: "Associate Professor", affiliation: "Birmingham City University", "location": "Birmingham, UK", "specializations": ["Fundamental information theory", "Wireless networks", "IoT", "Machine learning", "Smart systems", "Cybersecurity"], featured: true },
  { id: 409, name: "Dr. Abu Yousuf", "type": "mentor", title: "Professor", affiliation: "Shahjalal University of Science and Technology", "location": "Sylhet, Bangladesh", "specializations": ["Renewable Energy", "Environmental Biotech"], featured: true },
  { id: 638, name: "Mohammed Atiquzzaman", "type": "mentor", title: "Professor", affiliation: "University of Oklahoma", "location": "Norman, Oklahoma, USA", "specializations": ["Space Comms", "Next Gen Internet"], featured: true },
  { id: 499, name: "Dr. Md Ashaduzzaman", "type": "mentor", title: "Post Doctoral Fellow", affiliation: "University of Naples Federico II", "location": "Naples, Italy", "specializations": ["Applied Physics", "Nano-optics"], featured: true },
  { id: 28, name: "Jasim Uddin", "type": "mentor", title: "Lecturer in Electronics", affiliation: "Cardiff University", "location": "Cardiff", "specializations": ["Analog IC Design", "Electromagnetics", "RF and Microwave Engineering"], featured: true },
  { id: 747, name: "Jasim", "type": "mentor", title: "Industrial Researcher", affiliation: "Bangladesh Civil Service", "location": "Bangladesh", "specializations": ["Agronomy", "Agriculture Extension"], featured: true },
  { id: 637, name: "Ramesh Nath Premnath", "type": "mentor", title: "Editor Applied Sciences", affiliation: "Springer Singapore", "location": "Singapore", "specializations": ["Editorial peer-review", "Scientific publishing"], featured: true },
  { id: 37, name: "Nadia Refat", "type": "mentor", "title": "Director", "affiliation": "Academic Publishing", "location": "Wolverhampton, West Midlands", "specializations": ["Editorial Guidelines", "Research Ethics"], featured: true },
  { id: 611, name: "Tahmina Yasmin", "type": "mentor", "title": "Research Fellow", affiliation: "University of Birmingham", "location": "UK", "specializations": ["Atmospheric Sciences"], featured: true },
  { id: 696, name: "Gurpinder Singh Lalli", "type": "mentor", "title": "Dr", affiliation: "University of Wolverhampton", "location": "Walsall, UK", "specializations": ["Educational Policy", "Social Sciences"], featured: true },
  { id: 748, name: "Emma Partners", "type": "mentor", "title": "Industrial Researcher", affiliation: "University of Wolverhampton", "location": "United Kingdom", "specializations": ["Materials Science"], featured: true },
  { id: 8, name: "S M Nazmus Sadat", "type": "mentor", "affiliation": "Universiti Malaysia Pahang", "location": "Kuantan, Malaysia", "specializations": ["Data Science"] },
  { id: 11, name: "M. SAEF ULLAH MIAH", "type": "mentor", "affiliation": "Universiti Malaysia Pahang", "location": "Malaysia", "specializations": ["Machine learning", "Data mining", "Data Science", "Database", "IoT", "Scraping"] },
  { id: 15, name: "Nafees Bin Zaman", "type": "mentee", "affiliation": "Universitat de Girona", "location": "Spain", "specializations": ["Cybersecurity Systems"] },
  { id: 24, name: "Nazmus Sakib Bin Khair", "type": "mentee", "affiliation": "Autonomous Systems Corp", "location": "Bangladesh", "specializations": ["Machine Learning"] },
  { id: 25, name: "Saydul Akbar Murad", "type": "mentee", "affiliation": "Network Tech Ltd", "location": "Bangladesh", "specializations": ["Wireless Sensors"] },
  { id: 27, name: "Md Shamimul Islam", "type": "mentee", "affiliation": "Independent Lab", "location": "Bangladesh", "specializations": ["Cloud Computing"] },
  { id: 31, name: "N H M Arafat", "type": "mentee", "affiliation": "Henan Polytechnic University", "location": "China", "specializations": ["Underground Sensors"] },
  { id: 44, name: "Abdur Rahman Emon", "type": "mentee", "affiliation": "Software Dev Corp", "location": "Bangladesh", "specializations": ["Mobile Architectures"] },
  { id: 604, name: "Dr R Sujatha", "type": "mentor", "affiliation": "Vellore Institute of Technology", "location": "India", "specializations": ["Graph Theory", "Optimization"] },
  { id: 610, name: "Dr. Santhana Krishnan", "type": "mentor", "affiliation": "University of Technology Malaysia", "location": "Malaysia", "specializations": ["Bioelectrochemical systems", "Bio-energy", "Bioreactors", "Electro catalyst"] },
  { id: 615, name: "Zeashan Hameed Khan", "type": "mentor", "affiliation": "Air University, Islamabad", "location": "Pakistan", "specializations": ["Control engineering", "Machine learning"] },
  { id: 616, name: "Ashis Kumar Mandal", "type": "mentor", "affiliation": "Hajee Mohammad Danesh Science and Technology University", "location": "Bangladesh", "specializations": ["Veterinary medicine", "Genetics"] },
  { id: 617, name: "Md. Kafiul Islam", "type": "mentor", "affiliation": "Independent University, Bangladesh", "location": "Bangladesh", "specializations": ["BCI classification", "Machine learning"] },
  { id: 618, name: "Mohiuddin Ahmad", "type": "mentor", "affiliation": "Khulna University of Engineering & Technology (KUET)", "location": "Khulna, Bangladesh", "specializations": ["Signal processing", "Medical electronics"] },
  { id: 619, name: "Dr. Md. Rakibul Hoque", "type": "mentor", "affiliation": "University of Dhaka", "location": "Dhaka, Bangladesh", "specializations": ["Management Information Systems", "Healthcare Tech"] },
  { id: 620, name: "Dr. M. F. Mridha", "type": "mentor", "affiliation": "American International University-Bangladesh (AIUB)", "location": "Bangladesh", "specializations": ["Machine learning", "Data mining", "BCI classification", "Data Science"] },
  { id: 621, name: "Ferdib-Al-Islam", "type": "mentee", "affiliation": "Northern University of Business and Technology Khulna", "location": "Khulna, Bangladesh", "specializations": ["Deep Learning", "Machine learning", "IoT", "Data Science"] },
  { id: 650, name: "Bryar Hassan", "type": "mentor", "affiliation": "Charmo University", "location": "Sulaimani, Iraq", "specializations": ["Machine Learning", "Cloud Networks"] },
  { id: 665, name: "Amin Noroozi Fakhabi", "type": "mentor", "affiliation": "The University of Wolverhampton", "location": "Wolverhampton, UK", "specializations": ["Antennas", "Optoelectronics"] },
  { id: 749, name: "Md Tarikul", "type": "mentor", "affiliation": "University of Greenwich", "location": "United Kingdom", "specializations": ["Machine learning", "Bio-mimicry"] }
];

export const SERVICES: Service[] = [
  { name: "Mentoring", url: "https://ritechs.org/mentoring-directory", icon: "Users", description: "Creates a platform to learn and support technology for students and experts around the world" },
  { name: "Conference / Workshop", url: "https://ritechs.org/conference", icon: "Presentation", description: "Ready to organize any size of conference or workshop on a grand or focused scale" },
  { name: "Publication", url: "https://ritechs.org/publication", icon: "BookOpen", description: "Provide an expert roadmap to publish high-tier scientific journals or technical book chapters" },
  { name: "Academic Modification", url: "https://ritechs.org/academic-modification", icon: "FileEdit", description: "Rigorous proofreading, stylistic editing, and metadata formatting by native English scholars" },
  { name: "Events", url: "https://ritechs.org/event", icon: "Calendar", description: "Connect with distinguished technology leaders and enjoy stimulating world-class content" },
  { name: "e-Learning", url: "https://ritechs.org/eLearning", icon: "GraduationCap", description: "RiTECHS eLearning provides high-level certified digital programs across frontier sciences" }
];

export const PARTNERS: Partner[] = [
  { name: "RiTECHS HQ", url: "https://ritechs.org/" },
  { name: "United International University", url: "https://www.uiu.ac.bd/" },
  { name: "Fordham University", url: "https://www.fordham.edu/" },
  { name: "University of Science and Technology", url: "https://ust.edu/" },
  { name: "University of Wolverhampton", url: "https://www.wlv.ac.uk/" },
  { name: "Al-Ahgaff University", url: "http://en.ahgaff.edu/" },
  { name: "Cyber Quarter", url: "https://www.cyberquarter.co.uk/" },
  { name: "University of Asia Pacific", url: "https://www.uap-bd.edu/" },
  { name: "Birmingham City University (BCU)", "url": "https://www.bcu.ac.uk/" },
  { name: "Cardiff University", "url": "https://www.cardiff.ac.uk/" },
  { name: "Cardiff Metropolitan University", "url": "https://www.cardiffmet.ac.uk/" },
  { name: "Ajman University", "url": "https://www.ajman.ac.ae/" },
  { name: "King Saud University", "url": "https://ksu.edu.sa/en" },
  { name: "Springer", "url": "https://www.springer.com/" },
  { name: "Aston University", "url": "https://www.aston.ac.uk/" },
  { name: "BRAC University", "url": "https://bu.ac.bd/" },
  { name: "University of Galway", "url": "https://www.universityofgalway.ie/" },
  { name: "University of Genoa", "url": "https://unige.it/en" },
  { name: "Babcock University", "url": "https://babcock.edu.ng/" },
  { name: "Sycom Solutions", "url": "https://sycomsolutions.com/" }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Mastering Quantitative Data Analysis: Essential Tools and Methods",
    date: "2024-12-14",
    url: "https://ritechs.org/blog/details/7",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    excerpt: "The Doctorate Research Group of VietTESOL hosted its fourth webinar on Mastering Quantitative Data Analysis. The post covers essential tools and methods for quantitative research."
  },
  {
    title: "Reflections on ICETCS 2024 and the Cyber VehiCare Workshop",
    date: "2024-09-10",
    url: "https://ritechs.org/blog/details/6",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    excerpt: "Reflections on the recently concluded International Conference on Emerging Trends in Cybersecurity (ICETCS 24) and the associated Cyber VehiCare Workshop."
  },
  {
    title: "RiTECHS Seminar 2022: How to Publish Review Paper in High Impact Journal",
    date: "2022-04-20",
    url: "https://ritechs.org/blog/details/5",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600",
    excerpt: "Keynote Speaker: Dr. Arafatur Rahman, Senior Lecturer, University of Wolverhampton, UK. The seminar focused on strategies for publishing review papers in high-impact journals."
  },
  {
    title: "Closing the works of the First International Conference on Smart Technology in Systems",
    date: "2021-11-02",
    url: "https://ritechs.org/blog/details/4",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
    excerpt: "The conclusion of the First International Conference on Smart Technology, Systems and Internet of Things and related activities."
  }
];

export const COURSES = [
  {
    id: "elearn-cyber",
    title: "Frontier Cyber Defence Operational Training",
    instructor: "Prof. Dr. Kim-Kwang Raymond Choo",
    level: "Advanced",
    duration: "12 Weeks",
    rating: 4.9,
    subscribers: 1420,
    price: "£249",
    category: "Cybersecurity"
  },
  {
    id: "elearn-iot",
    title: "Internet of Everything: Systems Architecture & Scaling",
    instructor: "Prof. Dr. Md Arafatur Rahman",
    level: "Intermediate",
    duration: "8 Weeks",
    rating: 4.8,
    subscribers: 2180,
    price: "£189",
    category: "IoT & Networking"
  },
  {
    id: "elearn-ml",
    title: "Scientific Machine Learning in Physical Systems",
    instructor: "Dr. A. Taufiq Asyhari",
    level: "Advanced",
    duration: "10 Weeks",
    rating: 4.9,
    subscribers: 980,
    price: "£299",
    category: "AI & Machine Learning"
  },
  {
    id: "elearn-writing",
    title: "Publishing High-Impact Scientific Review Articles",
    instructor: "Nadia Refat & Dr. Abu Yousuf",
    level: "Foundational",
    duration: "4 Weeks",
    rating: 5.0,
    subscribers: 3410,
    price: "Free for Members",
    category: "Academic Solutions"
  }
];
