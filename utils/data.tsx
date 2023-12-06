import { Iconify } from "react-native-iconify";
import { Service } from "./interface";
import { StyleProp, ViewStyle } from "react-native";

export const slides = [
  {
    id: "1",
    title: "Welcome to HealthCare Plus!",
    description: "Your journey to better health starts here.",
    image: require("../assets/images/onboarding_one.png"),
  },
  {
    id: "2",
    title: "Find Doctors",
    description:
      "Easily locate and connect with a variety of doctors specialized in different fields.",
    image: require("../assets/images/onboarding_two.png"),
  },
  {
    id: "3",
    title: "Medication Tracking",
    description: "Keep track of your medications and medical history",
    image: require("../assets/images/onboarding_three.png"),
  },
  {
    id: "4",
    title: "Fitness and Gym",
    description: "Keep track of your medications and medical history",
    image: require("../assets/images/onboarding_four.png"),
  },
  {
    id: "5",
    title: "Emergency Assistance",
    description:
      "Quickly find nearby emergency contacts and medical facilities.",
    image: require("../assets/images/onboarding_five.png"),
  },
  {
    id: "6",
    title: "Convenient Shopping",
    description: "Purchase medications and have them delivered hassle-free.",
    image: require("../assets/images/onboarding_six.png"),
  },
];

export const months = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 },
];

export const services: Service[] = [
  {
    text: "Practitioner",
    icon: <Iconify icon="mdi:doctor" size={24} color="#BB6063" />,
    route: "/(user)/practitioners/",
    iconContainerStyles: {
      backgroundColor: "#F4D4D5",
    },
  },
  {
    text: "Hospital",
    icon: <Iconify icon="mingcute:hospital-fill" size={24} color="#A751C3" />,
    route:
      "/(user)/facilities/category/Hospital+2437540e-8aff-4967-8f90-1a6b18df9c49" as Service["route"],
    iconContainerStyles: {
      backgroundColor: "#ECD4F4",
    },
  },
  {
    text: "Pharmacy",
    icon: <Iconify icon="maki:pharmacy" size={24} color="#2A578F" />,
    route:
      "/(user)/facilities/category/Pharmacy store+7f988968-c8bb-4a07-9c87-5df2005b8c3e" as Service["route"],
    iconContainerStyles: {
      backgroundColor: "#D4E2F4",
    },
  },
  {
    text: "Fitness & Gym",
    icon: <Iconify icon="basil:heartbeat-solid" size={24} color="#22954D" />,
    route:
      "/(user)/facilities/category/Gym+94c4f484-cd03-436f-906a-332c7b139045" as Service["route"],
    iconContainerStyles: {
      backgroundColor: "#D4F4E0",
    },
  },
  {
    text: "Laboratory",
    icon: (
      <Iconify icon="material-symbols:lab-panel" size={24} color="#AC9E39" />
    ),
    route:
      "/(user)/facilities/category/Laboratory+815217f2-2723-42b2-ace9-3c243ad736b1" as Service["route"],
    iconContainerStyles: {
      backgroundColor: "#F4F0D4",
    },
  },
  {
    text: "Imaging Center",
    icon: <Iconify icon="mdi:x-ray-box" size={24} color="#D47300" />,
    route:
      "/(user)/facilities/category/Imaging Center+3ee9062d-779e-4203-a86a-600d762cbb5c" as Service["route"],
    iconContainerStyles: {
      backgroundColor: "#FFECD0",
    },
  },
];

export const icons: Record<
  any,
  { icon: React.JSX.Element; styles: StyleProp<ViewStyle> }
> = {
  Doctors: {
    styles: {
      backgroundColor: "#E9F3FF",
    },
    icon: (
      <Iconify
        icon="healthicons:doctor-male-outline"
        size={24}
        color="#003A82"
      />
    ),
  },
  Therapists: {
    icon: <Iconify icon="octicon:people-16" size={24} color="#A30000" />,
    styles: {
      backgroundColor: "#FFDDDD",
    },
  },
  Dieticians: {
    icon: <Iconify icon="ep:food" size={24} color="#D47300" />,
    styles: {
      backgroundColor: "#FFECD0",
    },
  },
  Neurology: {
    icon: <Iconify icon="ph:brain-bold" size={24} color="#3DBD00" />,
    styles: {
      backgroundColor: "#D1FCCA",
    },
  },
  Surgery: {
    icon: <Iconify icon="heroicons-solid:scissors" size={24} color="#007F9B" />,
    styles: {
      backgroundColor: "#E3FAFF",
    },
  },
  Psychiatry: {
    icon: <Iconify icon="icon-park-solid:brain" size={24} color="#7600BE" />,
    styles: {
      backgroundColor: "#F8E9FF",
    },
  },
  Pediatrics: {
    icon: (
      <Iconify
        icon="fluent-emoji-high-contrast:children-crossing"
        size={24}
        color="#A30000"
      />
    ),
    styles: {
      backgroundColor: "#FFDDDD",
    },
  },
  Dermatology: {
    icon: <Iconify icon="ion:body-outline" size={24} color="#AF004A" />,
    styles: {
      backgroundColor: "#FFE8F3",
    },
  },
  Radiology: {
    icon: <Iconify icon="healthicons:xray-outline" size={24} color="#0F00B8" />,
    styles: {
      backgroundColor: "#E8E4FF",
    },
  },
  Cardiology: {
    icon: <Iconify icon="octicon:heart-16" size={24} color="#D47300" />,
    styles: {
      backgroundColor: "#FFECD0",
    },
  },
  "Eating Disorder Treatment": {
    icon: <Iconify icon="mdi:food-outline" size={24} color="#2074E0" />,
    styles: {
      backgroundColor: "#D4E2F4",
    },
  },
  "Eating Disorder Dietitians": {
    icon: <Iconify icon="mdi:food-outline" size={24} color="#2074E0" />,
    styles: {
      backgroundColor: "#D4E2F4",
    },
  },
  "Relationship and Family Counseling": {
    icon: (
      <Iconify icon="fluent-mdl2:people-repeat" size={24} color="#24DE6A" />
    ),
    styles: {
      backgroundColor: "#D4F4E0",
    },
  },
  "Occupational Therapy": {
    icon: <Iconify icon="iconoir:user-love" size={24} color="#637021" />,
    styles: {
      backgroundColor: "#EFF4D4",
    },
  },
  "Psychotherapy and Counseling": {
    icon: (
      <Iconify icon="mdi:head-thinking-outline" size={24} color="#847618" />
    ),
    styles: {
      backgroundColor: "#F4F0D4",
    },
  },
  "Trauma Recovery": {
    icon: (
      <Iconify
        icon="healthicons:traumatism-outline"
        size={24}
        color="#BE1AB4"
      />
    ),
    styles: {
      backgroundColor: "#F4D4F2",
    },
  },
  "Social and Emotional Support": {
    icon: (
      <Iconify
        icon="streamline:interface-favorite-give-heart-reward-social-rating-media-heart-hand"
        size={24}
        color="#C27D24"
      />
    ),
    styles: {
      backgroundColor: "#F4E6D4",
    },
  },
  "Substance Abuse Treatment": {
    icon: <Iconify icon="mdi:drug-off" size={24} color="#CB2429" />,
    styles: {
      backgroundColor: "#F4D4D5",
    },
  },
  "Clinical Dietitians": {
    icon: <Iconify icon="bx:clinic" size={24} color="#3B25B4" />,
    styles: {
      backgroundColor: "#D9D4F4",
    },
  },
  "Public Health Dietitians": {
    icon: (
      <Iconify icon="fluent-mdl2:people-repeat" size={24} color="#2A6174" />
    ),
    styles: {
      backgroundColor: "#D4ECF4",
    },
  },
  "Sports Dietitians": {
    icon: <Iconify icon="icon-park-outline:sport" size={24} color="#24C761" />,
    styles: {
      backgroundColor: "#D4F4E0",
    },
  },
  "Pediatric Dietitians": {
    icon: <Iconify icon="cil:child" size={24} color="#8A7E2C" />,
    styles: {
      backgroundColor: "#F4F0D4",
    },
  },
  "Gerontological Dietitians": {
    icon: <Iconify icon="tabler:old" size={24} color="#B12CA9" />,
    styles: {
      backgroundColor: "#F4D4F2",
    },
  },
  "Renal Dietitians": {
    icon: <Iconify icon="ri:eye-line" size={24} color="#486A22" />,
    styles: {
      backgroundColor: "#E5F4D4",
    },
  },
  "Oncology Dietitians": {
    icon: <Iconify icon="ph:virus" size={24} color="#8B3F25" />,
    styles: {
      backgroundColor: "#F4DCD4",
    },
  },
  "Weight Management Dietitians": {
    icon: (
      <Iconify
        icon="healthicons:overweight-outline"
        size={24}
        color="#176D51"
      />
    ),
    styles: {
      backgroundColor: "#D4F4F3",
    },
  },
  "Community Dietitians": {
    icon: (
      <Iconify
        icon="fluent:people-community-16-regular"
        size={24}
        color="#C22E61"
      />
    ),
    styles: {
      backgroundColor: "#F4D4DF",
    },
  },
  "Registered Dietitian Nutritionists": {
    icon: <Iconify icon="la:registered" size={24} color="#515C0A" />,
    styles: {
      backgroundColor: "#E2E5D0",
    },
  },
  Dentistry: {
    icon: (
      <Iconify icon="fluent:dentist-16-regular" size={24} color="#A100A5" />
    ),
    styles: {
      backgroundColor: "#FFDBF9",
    },
  },
  Oncology: {
    icon: <Iconify icon="ph:circles-three-bold" size={24} color="#CC0000" />,
    styles: {
      backgroundColor: "#FFE5E5",
    },
  },
  Urology: {
    icon: (
      <Iconify
        icon="icon-park-outline:clothes-pants-short"
        size={24}
        color="#C74800"
      />
    ),
    styles: {
      backgroundColor: "#FFECE3",
    },
  },
  Pathology: {
    icon: (
      <Iconify
        icon="material-symbols:lab-research-outline"
        size={24}
        color="#BE9400"
      />
    ),
    styles: {
      backgroundColor: "#FFF8E0",
    },
  },
  Rheumatology: {
    icon: (
      <Iconify icon="healthicons:joints-outline" size={24} color="#5DA600" />
    ),
    styles: {
      backgroundColor: "#F5FEDC",
    },
  },
  Endocrinology: {
    icon: (
      <Iconify
        icon="material-symbols:endocrinology-outline"
        size={24}
        color="#17A400"
      />
    ),
    styles: {
      backgroundColor: "#E2FFE1",
    },
  },
  Pulmonology: {
    icon: <Iconify icon="carbon:pedestrian-family" size={24} color="#00AB8C" />,
    styles: {
      backgroundColor: "#DFFFF7",
    },
  },
  Anesthesiology: {
    icon: (
      <Iconify icon="icon-park-outline:injection" size={24} color="#004294" />
    ),
    styles: {
      backgroundColor: "#DDECFF",
    },
  },
  "General Practice": {
    icon: <Iconify icon="icon-park-outline:family" size={24} color="#2C00A9" />,
    styles: {
      backgroundColor: "#EFEAFF",
    },
  },
  "Internal Medicine": {
    icon: (
      <Iconify
        icon="icon-park-outline:medicine-chest"
        size={24}
        color="#640087"
      />
    ),
    styles: {
      backgroundColor: "#FFE5FE",
    },
  },
  "Obstetrics & gynaecology": {
    icon: <Iconify icon="ion:woman-outline" size={24} color="#7AAE46" />,
    styles: {
      backgroundColor: "#E5F4D6",
    },
  },
  Otolaryngology: {
    icon: <Iconify icon="ion:ear-outline" size={24} color="#D16B3E" />,
    styles: {
      backgroundColor: "#F2E2DB",
    },
  },
  "Family Medicine": {
    icon: (
      <Iconify
        icon="healthicons:doctor-female-outline"
        size={24}
        color="#25A3A3"
      />
    ),
    styles: {
      backgroundColor: "#E5F3F3",
    },
  },
  Nephrology: {
    icon: <Iconify icon="game-icons:kidneys" size={24} color="#2D63B2" />,
    styles: {
      backgroundColor: "#E3F0FF",
    },
  },
  Ophthalmology: {
    icon: <Iconify icon="ph:eye" size={24} color="#1D664B" />,
    styles: {
      backgroundColor: "#D9F9ED",
    },
  },
  Gastroenterology: {
    icon: (
      <Iconify icon="healthicons:stomach-outline" size={24} color="#61961F" />
    ),
    styles: {
      backgroundColor: "#EFF5E6",
    },
  },
  Optometry: {
    icon: <Iconify icon="ph:eye" size={24} color="#5A1272" />,
    styles: {
      backgroundColor: "#F5D6FF",
    },
  },
  Geriatrics: {
    icon: <Iconify icon="tabler:old" size={24} color="#3A7BCB" />,
    styles: {
      backgroundColor: "#E6E9FB",
    },
  },
  "Allergy & Immunology": {
    icon: <Iconify icon="cil:mood-very-bad" size={24} color="#B79C08" />,
    styles: {
      backgroundColor: "#F4EFD4",
    },
  },
  "General Hospitals": {
    icon: <Iconify icon="fa:hospital-o" size={24} color="#A81F9F" />,
    styles: {
      backgroundColor: "#F4D4F2",
    },
  },
  Government: {
    icon: <Iconify icon="solar:hospital-outline" size={24} color="#4630BE" />,
    styles: {
      backgroundColor: "#D9D4F4",
    },
  },
  "Specialty Hospitals": {
    icon: (
      <Iconify
        icon="healthicons:doctor-male-outline"
        size={24}
        color="#2866B6"
      />
    ),
    styles: {
      backgroundColor: "#D4E2F4",
    },
  },
  "Teaching Hospitals": {
    icon: <Iconify icon="fa6-regular:hospital" size={24} color="#1F7054" />,
    styles: {
      backgroundColor: "#D4F4E9",
    },
  },
  Clinics: {
    icon: (
      <Iconify
        icon="icon-park-outline:hospital-bed"
        size={24}
        color="#317C18"
      />
    ),
    styles: {
      backgroundColor: "#DCF4D4",
    },
  },
  "Psychiatric Hospitals": {
    icon: <Iconify icon="iconoir:brain-warning" size={24} color="#217692" />,
    styles: {
      backgroundColor: "#D4ECF4",
    },
  },
  "Rehabilitation Hospitals": {
    icon: <Iconify icon="ion:body-outline" size={24} color="#568324" />,
    styles: {
      backgroundColor: "#E5F4D4",
    },
  },
  "Pediatric Hospitals": {
    icon: (
      <Iconify
        icon="healthicons:child-program-outline"
        size={24}
        color="#5C6A12"
      />
    ),
    styles: {
      backgroundColor: "#EFF4D4",
    },
  },
  "Trauma Center Hospitals": {
    icon: (
      <Iconify
        icon="icon-park-outline:hospital-two"
        size={24}
        color="#9A2226"
      />
    ),
    styles: {
      backgroundColor: "#F4D4D5",
    },
  },
  "Retail Pharmacy": {
    icon: (
      <Iconify
        icon="fluent:building-retail-toolbox-24-regular"
        size={24}
        color="#5C6A12"
      />
    ),
    styles: {
      backgroundColor: "#EFF4D4",
    },
  },
  "Online Pharmacy": {
    icon: (
      <Iconify
        icon="icon-park-outline:hospital-two"
        size={24}
        color="#9A2226"
      />
    ),
    styles: {
      backgroundColor: "#F4D4D5",
    },
  },
  "Hospital Pharmacy": {
    icon: (
      <Iconify icon="iconoir:pharmacy-cross-circle" size={24} color="#217692" />
    ),
    styles: {
      backgroundColor: "#D4ECF4",
    },
  },
  "Compounding Pharmacy": {
    icon: <Iconify icon="map:pharmacy" size={24} color="#568324" />,
    styles: {
      backgroundColor: "#E5F4D4",
    },
  },
  "Specialty Pharmacy": {
    icon: (
      <Iconify
        icon="healthicons:pharmacy-alt-outline"
        size={24}
        color="#2866B6"
      />
    ),
    styles: {
      backgroundColor: "#D4E2F4",
    },
  },
  "Mail-Order Pharmacy": {
    icon: (
      <Iconify icon="fluent:mail-add-24-regular" size={24} color="#1F7054" />
    ),
    styles: {
      backgroundColor: "#D4F4E9",
    },
  },
  "Independent Pharmacy": {
    icon: (
      <Iconify
        icon="icon-park-outline:hospital-bed"
        size={24}
        color="#317C18"
      />
    ),
    styles: {
      backgroundColor: "#DCF4D4",
    },
  },
  "Chain Pharmacy": {
    icon: <Iconify icon="healthicons:cold-chain" size={24} color="#B79C08" />,
    styles: {
      backgroundColor: "#F4EFD4",
    },
  },
  "Closed-Door Pharmacy": {
    icon: <Iconify icon="mdi:door-closed" size={24} color="#A81F9F" />,
    styles: {
      backgroundColor: "#F4D4F2",
    },
  },
  "Veterinary Pharmacy": {
    icon: <Iconify icon="map:veterinary-care" size={24} color="#4630BE" />,
    styles: {
      backgroundColor: "#D9D4F4",
    },
  },
  "Fitness Center": {
    styles: {
      backgroundColor: "#E9F3FF",
    },
    icon: (
      <Iconify
        icon="material-symbols:fitness-center"
        size={24}
        color="#003A82"
      />
    ),
  },
  "Health Club": {
    icon: (
      <Iconify
        icon="healthicons:health-data-sync-outline"
        size={24}
        color="#A30000"
      />
    ),
    styles: {
      backgroundColor: "#FFDDDD",
    },
  },
  "CrossFit Gym": {
    icon: <Iconify icon="mdi:crossfit" size={24} color="#D47300" />,
    styles: {
      backgroundColor: "#FFECD0",
    },
  },
  "Yoga Studio": {
    icon: <Iconify icon="tabler:yoga" size={24} color="#3DBD00" />,
    styles: {
      backgroundColor: "#D1FCCA",
    },
  },
  "Personal Training Studio": {
    icon: (
      <Iconify
        icon="material-symbols:model-training"
        size={24}
        color="#007F9B"
      />
    ),
    styles: {
      backgroundColor: "#E3FAFF",
    },
  },
  "Boxing Gym": {
    icon: (
      <Iconify icon="icon-park-outline:boxing-one" size={24} color="#7600BE" />
    ),
    styles: {
      backgroundColor: "#F8E9FF",
    },
  },
  "Pilates Studio": {
    icon: <Iconify icon="guidance:pilates" size={24} color="#A30000" />,
    styles: {
      backgroundColor: "#FFDDDD",
    },
  },
  "Martial Arts Dojo": {
    icon: (
      <Iconify
        icon="fluent-emoji-high-contrast:martial-arts-uniform"
        size={24}
        color="#AF004A"
      />
    ),
    styles: {
      backgroundColor: "#FFE8F3",
    },
  },
  "Spin Studio": {
    icon: <Iconify icon="guidance:spinning" size={24} color="#0F00B8" />,
    styles: {
      backgroundColor: "#E8E4FF",
    },
  },
  "Functional Fitness Gym": {
    icon: <Iconify icon="simple-icons:openaigym" size={24} color="#D47300" />,
    styles: {
      backgroundColor: "#FFECD0",
    },
  },
  "Pathology Laboratory": {
    icon: (
      <Iconify
        icon="healthicons:blood-cells-outline"
        size={24}
        color="#56792D"
      />
    ),
    styles: {
      backgroundColor: "#E5F4D4",
    },
  },
  "Blood Bank": {
    icon: <Iconify icon="healthicons:blood-bag" size={24} color="#48954D" />,
    styles: {
      backgroundColor: "#D4F4D6",
    },
  },
  "Genetics Laboratory": {
    icon: <Iconify icon="la:hospital-alt" size={24} color="#328B88" />,
    styles: {
      backgroundColor: "#D4F4F3",
    },
  },
  "Toxicology Laboratory": {
    icon: <Iconify icon="icon-park-outline:toxins" size={24} color="#882544" />,
    styles: {
      backgroundColor: "#F4D4DE",
    },
  },
  "Histopathology Laboratory": {
    icon: <Iconify icon="icon-park-outline:cell" size={24} color="#353E81" />,
    styles: {
      backgroundColor: "#D4D8F4",
    },
  },
  "Forensic Laboratory": {
    icon: (
      <Iconify
        icon="fluent-mdl2:internal-investigation"
        size={24}
        color="#2C5992"
      />
    ),
    styles: {
      backgroundColor: "#D4E2F4",
    },
  },
  Bacteriology: {
    icon: (
      <Iconify icon="healthicons:bacteria-outline" size={24} color="#216681" />
    ),
    styles: {
      backgroundColor: "#D4EBF4",
    },
  },
  "Medical Laboratory": {
    icon: (
      <Iconify icon="guidance:medical-laboratory" size={24} color="#813197" />
    ),
    styles: {
      backgroundColor: "#EDD4F4",
    },
  },
  "Clinical Laboratory": {
    styles: {
      backgroundColor: "#E9F3FF",
    },
    icon: <Iconify icon="healthicons:clinical-a" size={24} color="#003A82" />,
  },
  "Research Laboratory": {
    icon: (
      <Iconify
        icon="healthicons:virus-research-outline"
        size={24}
        color="#A30000"
      />
    ),
    styles: {
      backgroundColor: "#FFDDDD",
    },
  },
  "Microbiology Laboratory": {
    icon: (
      <Iconify
        icon="material-symbols:microbiology-outline"
        size={24}
        color="#D47300"
      />
    ),
    styles: {
      backgroundColor: "#FFECD0",
    },
  },
  "Serology Lab": {
    icon: (
      <Iconify
        icon="healthicons:biochemistry-laboratory-outline"
        size={24}
        color="#3DBD00"
      />
    ),
    styles: {
      backgroundColor: "#D1FCCA",
    },
  },
  Angiography: {
    icon: (
      <Iconify
        icon="healthicons:blood-pressure-monitor-outline"
        size={24}
        color="#307862"
      />
    ),
    styles: {
      backgroundColor: "#D4F4EA",
    },
  },
  Echocardiogram: {
    icon: (
      <Iconify icon="medical-icon:i-ultrasound" size={24} color="#2F598F" />
    ),
    styles: {
      backgroundColor: "#D4E2F4",
    },
  },
  "Electro cardiogram (ECG)": {
    icon: (
      <Iconify
        icon="streamline:computer-chip-2-core-microprocessor-device-electronics-chip-computer"
        size={24}
        color="#841C5D"
      />
    ),
    styles: {
      backgroundColor: "#F4D4E8",
    },
  },
  "X-ray Center": {
    icon: (
      <Iconify
        icon="fluent-emoji-high-contrast:x-ray"
        size={24}
        color="#4FB633"
      />
    ),
    styles: {
      backgroundColor: "#DBF4D4",
    },
  },
  "Ultrasound Clinic": {
    icon: <Iconify icon="game-icons:ultrasound" size={24} color="#2F7A97" />,
    styles: {
      backgroundColor: "#D4EBF4",
    },
  },
  "CT Scan Center": {
    icon: <Iconify icon="mdi:x-ray-box-outline" size={24} color="#3F488C" />,
    styles: {
      backgroundColor: "#D4D8F4",
    },
  },
  "PET/CT Imaging Center": {
    icon: (
      <Iconify
        icon="streamline:interface-alert-radio-active-3-warning-radioactive-radiation-emergency-danger-safety"
        size={24}
        color="#813197"
      />
    ),
    styles: {
      backgroundColor: "#EDD4F4",
    },
  },
  "MRI Center": {
    icon: <Iconify icon="solar:magnet-broken" size={24} color="#805240" />,
    styles: {
      backgroundColor: "#F4DDD4",
    },
  },
  "Radiology Center": {
    styles: {
      backgroundColor: "#E9F3FF",
    },
    icon: (
      <Iconify
        icon="material-symbols:radiology-outline"
        size={24}
        color="#003A82"
      />
    ),
  },
  "Mammography Center": {
    icon: (
      <Iconify icon="medical-icon:i-mammography" size={24} color="#A30000" />
    ),
    styles: {
      backgroundColor: "#FFDDDD",
    },
  },
  "Bone Densitometry Center": {
    icon: <Iconify icon="mingcute:bone-line" size={24} color="#D47300" />,
    styles: {
      backgroundColor: "#FFECD0",
    },
  },
  "Nuclear Medicine Center": {
    icon: <Iconify icon="ion:nuclear-outline" size={24} color="#17A400" />,
    styles: {
      backgroundColor: "#E2FFE1",
    },
  },
  "Cardiac Imaging Center": {
    icon: (
      <Iconify
        icon="healthicons:cardiology-outline"
        size={24}
        color="#00AB8C"
      />
    ),
    styles: {
      backgroundColor: "#DFFFF7",
    },
  },
  Orthopedics: {
    icon: <Iconify icon="icon-park-outline:muscle" size={24} color="#CC3467" />,
    styles: {
      backgroundColor: "#EEDFE4",
    },
  },
  Hepatology: {
    icon: (
      <Iconify icon="healthicons:liver-outline" size={24} color="#BD4E24" />
    ),
    styles: {
      backgroundColor: "#F5EDEA",
    },
  },
  More: {
    icon: (
      <Iconify icon="icon-park-outline:more-four" size={24} color="#545D69" />
    ),
    styles: {
      backgroundColor: "#F4F6F9",
    },
  },
  Default: {
    icon: (
      <Iconify icon="fluent-mdl2:video-360-generic" size={24} color="#8863F2" />
    ),
    styles: {},
  },
};
