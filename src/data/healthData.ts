// Sample Health Data

export const healthTips = {
  vegetarian: {
    label: 'Vegetarian',
    color: '#22c55e',
    energyNeeds: [
      { ageGroup: 'Children (4-8)', calories: 1400, protein: '19g', carbs: '130g', fat: '39g' },
      { ageGroup: 'Teens (9-18)', calories: 1800, protein: '34g', carbs: '130g', fat: '50g' },
      { ageGroup: 'Adults (19-50)', calories: 2000, protein: '50g', carbs: '225g', fat: '65g' },
      { ageGroup: 'Seniors (51+)', calories: 1800, protein: '56g', carbs: '200g', fat: '60g' },
    ],
    macronutrients: {
      protein: { sources: ['Lentils', 'Chickpeas', 'Tofu', 'Quinoa', 'Greek Yogurt', 'Paneer'], percentage: '15-20%' },
      carbohydrates: { sources: ['Brown Rice', 'Oats', 'Sweet Potato', 'Whole Wheat', 'Millets'], percentage: '45-65%' },
      fats: { sources: ['Nuts', 'Seeds', 'Avocado', 'Olive Oil', 'Coconut Oil'], percentage: '20-35%' },
    },
    micronutrients: [
      { name: 'Iron', sources: 'Spinach, Lentils, Fortified cereals', tip: 'Pair with Vitamin C for better absorption' },
      { name: 'Vitamin B12', sources: 'Dairy, Fortified foods, Nutritional yeast', tip: 'Consider B12 supplements' },
      { name: 'Calcium', sources: 'Milk, Cheese, Broccoli, Almonds', tip: 'Get 1000mg daily for bone health' },
      { name: 'Zinc', sources: 'Pumpkin seeds, Legumes, Nuts', tip: 'Soak legumes to improve zinc absorption' },
      { name: 'Omega-3', sources: 'Flaxseeds, Walnuts, Chia seeds', tip: 'ALA converts to EPA/DHA in body' },
    ],
    weeklyPlanWeightLoss: [
      { day: 'Monday', breakfast: 'Oats with berries & chia seeds', lunch: 'Dal + 1 roti + salad', dinner: 'Vegetable soup + 1 chapati', snack: 'Apple + 10 almonds' },
      { day: 'Tuesday', breakfast: 'Idli (2) + sambar', lunch: 'Rajma + brown rice', dinner: 'Mixed veg curry + 1 roti', snack: 'Cucumber + hummus' },
      { day: 'Wednesday', breakfast: 'Poha with vegetables', lunch: 'Chole + 1 roti + salad', dinner: 'Palak paneer + 1 roti', snack: 'Greek yogurt + honey' },
      { day: 'Thursday', breakfast: 'Smoothie (banana, spinach, flaxseed)', lunch: 'Moong dal + brown rice + salad', dinner: 'Vegetable khichdi', snack: 'Mixed seeds + 1 fruit' },
      { day: 'Friday', breakfast: 'Whole wheat toast + peanut butter', lunch: 'Sambar + 2 idli', dinner: 'Tofu stir fry + brown rice', snack: 'Roasted chana' },
      { day: 'Saturday', breakfast: 'Besan chilla + mint chutney', lunch: 'Dal makhani + 1 roti', dinner: 'Veg salad bowl', snack: 'Fruit salad' },
      { day: 'Sunday', breakfast: 'Upma with vegetables', lunch: 'Quinoa pulao + raita', dinner: 'Lentil soup + multigrain bread', snack: 'Sprouts chaat' },
    ],
    weeklyPlanWeightGain: [
      { day: 'Monday', breakfast: 'Oats with banana, nuts & full cream milk', lunch: 'Dal + 3 roti + paneer', dinner: 'Pasta + cheese sauce', snack: 'Peanut butter smoothie' },
      { day: 'Tuesday', breakfast: 'Paratha (2) + butter + curd', lunch: 'Rajma + 2 cups rice + raita', dinner: 'Paneer butter masala + naan', snack: 'Dry fruits mix' },
      { day: 'Wednesday', breakfast: 'Banana shake + boiled eggs (vegetarian: tofu scramble)', lunch: 'Chole bhature', dinner: 'Veg biryani + raita', snack: 'Cheese toast' },
      { day: 'Thursday', breakfast: 'Granola with full cream yogurt', lunch: 'Palak paneer + 3 roti', dinner: 'Pasta primavera + garlic bread', snack: 'Avocado toast' },
      { day: 'Friday', breakfast: 'Poha with extra ghee + banana', lunch: 'Dal tadka + 2 cups rice', dinner: 'Paneer tikka + naan', snack: 'Protein shake with milk' },
      { day: 'Saturday', breakfast: 'Masala omelette (veg: tofu) + toast', lunch: 'Veg pulao + dal + papad', dinner: 'Pizza with extra cheese', snack: 'Mixed nuts + dates' },
      { day: 'Sunday', breakfast: 'French toast + maple syrup', lunch: 'Biryani + raita + salad', dinner: 'Butter paneer + rice', snack: 'Banana milkshake' },
    ]
  },
  nonVegetarian: {
    label: 'Non-Vegetarian',
    color: '#ef4444',
    energyNeeds: [
      { ageGroup: 'Children (4-8)', calories: 1500, protein: '24g', carbs: '130g', fat: '42g' },
      { ageGroup: 'Teens (9-18)', calories: 2000, protein: '46g', carbs: '130g', fat: '56g' },
      { ageGroup: 'Adults (19-50)', calories: 2200, protein: '60g', carbs: '225g', fat: '73g' },
      { ageGroup: 'Seniors (51+)', calories: 1900, protein: '65g', carbs: '210g', fat: '63g' },
    ],
    macronutrients: {
      protein: { sources: ['Chicken breast', 'Fish', 'Eggs', 'Lean beef', 'Turkey', 'Shrimp'], percentage: '25-30%' },
      carbohydrates: { sources: ['Brown Rice', 'Oats', 'Whole Wheat', 'Sweet Potato', 'Quinoa'], percentage: '40-55%' },
      fats: { sources: ['Fatty fish', 'Nuts', 'Olive oil', 'Avocado', 'Egg yolks'], percentage: '25-35%' },
    },
    micronutrients: [
      { name: 'Iron (Heme)', sources: 'Red meat, Chicken liver, Oysters', tip: 'Heme iron is 2-3x more absorbable than plant iron' },
      { name: 'Vitamin B12', sources: 'Beef, Fish, Eggs, Dairy', tip: 'Naturally abundant in animal products' },
      { name: 'Omega-3', sources: 'Salmon, Sardines, Tuna, Mackerel', tip: 'Eat fatty fish 2-3 times per week' },
      { name: 'Zinc', sources: 'Beef, Oysters, Crab, Pork', tip: 'Animal sources provide highly bioavailable zinc' },
      { name: 'Vitamin D', sources: 'Fatty fish, Egg yolks, Fortified milk', tip: 'Get 600-800 IU daily' },
    ],
    weeklyPlanWeightLoss: [
      { day: 'Monday', breakfast: 'Egg whites (3) + whole wheat toast', lunch: 'Grilled chicken + salad + brown rice (small)', dinner: 'Fish curry + 1 roti', snack: '1 boiled egg + cucumber' },
      { day: 'Tuesday', breakfast: 'Oats + skim milk', lunch: 'Tuna salad wrap', dinner: 'Chicken soup + multigrain bread', snack: 'Greek yogurt' },
      { day: 'Wednesday', breakfast: 'Scrambled eggs + vegetables', lunch: 'Grilled fish + quinoa + salad', dinner: 'Chicken tikka (no sauce) + roti', snack: 'Apple + string cheese' },
      { day: 'Thursday', breakfast: 'Smoothie with protein powder', lunch: 'Prawn stir fry + brown rice', dinner: 'Egg curry + 1 roti', snack: 'Roasted nuts' },
      { day: 'Friday', breakfast: 'Whole grain toast + poached eggs', lunch: 'Chicken breast + steamed veggies', dinner: 'Fish tacos (2)', snack: 'Cottage cheese' },
      { day: 'Saturday', breakfast: 'Egg bhurji + 1 roti', lunch: 'Turkey sandwich + salad', dinner: 'Baked chicken + vegetables', snack: '1 fruit + boiled egg' },
      { day: 'Sunday', breakfast: 'Mushroom omelette', lunch: 'Grilled fish + salad', dinner: 'Chicken clear soup + bread', snack: 'Sprouts + eggs' },
    ],
    weeklyPlanWeightGain: [
      { day: 'Monday', breakfast: '4 eggs + avocado toast + juice', lunch: 'Chicken biryani + raita', dinner: 'Mutton curry + 3 roti', snack: 'Protein shake + banana' },
      { day: 'Tuesday', breakfast: 'Egg paratha + butter', lunch: 'Fish curry + 2 cups rice', dinner: 'Chicken pasta + garlic bread', snack: 'Mixed nuts + cheese' },
      { day: 'Wednesday', breakfast: 'Omelette (3 eggs) + bread + milk', lunch: 'Mutton biryani', dinner: 'Grilled chicken + mashed potato', snack: 'Peanut butter shake' },
      { day: 'Thursday', breakfast: 'Chicken sandwich + juice', lunch: 'Prawn curry + rice', dinner: 'Egg fried rice + chicken gravy', snack: 'Dry fruits + eggs' },
      { day: 'Friday', breakfast: 'Pancakes + eggs + bacon', lunch: 'Fish biryani + raita', dinner: 'Chicken tikka masala + naan', snack: 'Whey protein + milk' },
      { day: 'Saturday', breakfast: 'Egg bhurji + paratha + butter', lunch: 'Chicken rice bowl', dinner: 'Mutton kebab + naan', snack: 'Banana + peanut butter' },
      { day: 'Sunday', breakfast: 'Full English breakfast', lunch: 'Prawn biryani + salad', dinner: 'Butter chicken + rice', snack: 'Protein bar + milk' },
    ]
  },
  eggetarian: {
    label: 'Eggetarian',
    color: '#f59e0b',
    energyNeeds: [
      { ageGroup: 'Children (4-8)', calories: 1450, protein: '22g', carbs: '130g', fat: '40g' },
      { ageGroup: 'Teens (9-18)', calories: 1900, protein: '40g', carbs: '130g', fat: '53g' },
      { ageGroup: 'Adults (19-50)', calories: 2100, protein: '55g', carbs: '225g', fat: '70g' },
      { ageGroup: 'Seniors (51+)', calories: 1850, protein: '60g', carbs: '205g', fat: '62g' },
    ],
    macronutrients: {
      protein: { sources: ['Eggs', 'Greek Yogurt', 'Paneer', 'Lentils', 'Quinoa', 'Tofu'], percentage: '20-25%' },
      carbohydrates: { sources: ['Oats', 'Brown Rice', 'Sweet Potato', 'Whole Wheat', 'Millets'], percentage: '45-60%' },
      fats: { sources: ['Egg yolks', 'Nuts', 'Seeds', 'Olive Oil', 'Avocado'], percentage: '20-35%' },
    },
    micronutrients: [
      { name: 'Vitamin B12', sources: 'Eggs, Dairy, Fortified foods', tip: 'Eggs provide excellent B12 for eggetarians' },
      { name: 'Iron', sources: 'Egg yolks, Lentils, Spinach', tip: 'Combine with vitamin C for better absorption' },
      { name: 'Choline', sources: 'Egg yolks, Soybeans', tip: 'Important for brain health - eggs are excellent source' },
      { name: 'Calcium', sources: 'Dairy, Broccoli, Almonds, Egg shells (calcium)', tip: 'Dairy + leafy greens combination works well' },
      { name: 'Omega-3', sources: 'Flaxseeds, Walnuts, Omega-3 enriched eggs', tip: 'Look for omega-3 enriched eggs' },
    ],
    weeklyPlanWeightLoss: [
      { day: 'Monday', breakfast: 'Boiled eggs (2) + oats', lunch: 'Egg salad + brown rice', dinner: 'Egg curry + 1 roti', snack: '1 fruit + 1 egg' },
      { day: 'Tuesday', breakfast: 'Vegetable omelette', lunch: 'Dal + 1 roti + salad', dinner: 'Egg bhurji + 1 roti', snack: 'Greek yogurt' },
      { day: 'Wednesday', breakfast: 'Smoothie + boiled egg', lunch: 'Egg fried rice (less oil)', dinner: 'Palak with egg + 1 roti', snack: 'Cucumber + hummus' },
      { day: 'Thursday', breakfast: 'Whole wheat toast + egg', lunch: 'Chole + egg + salad', dinner: 'Vegetable soup + egg', snack: 'Mixed nuts' },
      { day: 'Friday', breakfast: 'Poached eggs + multigrain toast', lunch: 'Egg sandwich + salad', dinner: 'Tofu + egg scramble + roti', snack: 'Apple + cheese' },
      { day: 'Saturday', breakfast: 'Egg white omelette', lunch: 'Rajma + brown rice', dinner: 'Egg wrap + salad', snack: 'Sprouts' },
      { day: 'Sunday', breakfast: 'Shakshuka (eggs in tomato)', lunch: 'Dal khichdi + curd', dinner: 'Paneer bhurji + roti', snack: 'Fruit salad' },
    ],
    weeklyPlanWeightGain: [
      { day: 'Monday', breakfast: '4 eggs + avocado + toast + juice', lunch: 'Egg biryani + raita', dinner: 'Paneer + egg curry + 3 roti', snack: 'Banana shake + nuts' },
      { day: 'Tuesday', breakfast: 'Egg paratha (3) + butter + curd', lunch: 'Rajma + 2 cups rice + eggs', dinner: 'Pasta with egg + cream sauce', snack: 'Peanut butter toast' },
      { day: 'Wednesday', breakfast: 'Omelette (4 eggs) + bread + milk', lunch: 'Chole + 3 roti + egg', dinner: 'Egg fried rice + dal', snack: 'Protein shake + egg' },
      { day: 'Thursday', breakfast: 'Pancakes + eggs + maple syrup', lunch: 'Dal makhani + rice + egg', dinner: 'Egg masala + naan', snack: 'Mixed nuts + banana' },
      { day: 'Friday', breakfast: 'French toast + jam + juice', lunch: 'Egg pulao + raita', dinner: 'Paneer + egg scramble + roti', snack: 'Cheese toast + boiled eggs' },
      { day: 'Saturday', breakfast: 'Egg bhurji + paratha + butter', lunch: 'Biryani (veg) + fried egg', dinner: 'Egg tikka masala + naan', snack: 'Dry fruits + eggs' },
      { day: 'Sunday', breakfast: 'Big breakfast bowl with eggs', lunch: 'Quinoa + paneer + egg', dinner: 'Butter egg masala + rice', snack: 'Milkshake + boiled egg' },
    ]
  }
};

export const youtubeVideos = {
  // Yoga flows: morning, stress relief, back pain, hormonal balance, PCOS, menstrual support, beginner & advanced
  yoga: [
    { id: 'v7AYKMP6rOE', title: 'Yoga for Stress Relief & Flexibility', channel: 'Yoga With Adriene', duration: '30 min', level: 'Beginner' },
    { id: 'VaoV1PrYft4', title: 'Yoga for Back Pain Relief', channel: 'SarahBethYoga', duration: '22 min', level: 'Beginner' },
    { id: '7kgZnJqzNaU', title: 'Morning Yoga Full Body Stretch', channel: 'Yoga With Bird', duration: '15 min', level: 'Beginner' },
    { id: '4pKly2JojMw', title: '30-Minute Yoga Flow for Strength & Balance', channel: 'Boho Beautiful Yoga', duration: '30 min', level: 'Intermediate' },
    { id: 'UqgK3H1-8iY', title: 'Hormonal Balance Yoga | PCOS & Thyroid Support', channel: 'Satvic Movement', duration: '28 min', level: 'Beginner' },
    { id: 'Qv4q1v7tbX0', title: 'Yoga for Menstrual Cramps & Relaxation', channel: 'Yoga With Adriene', duration: '20 min', level: 'Beginner' },
    { id: '4pKly2JojMw', title: 'Power Yoga Fat Burn & Toning', channel: 'Boho Beautiful Yoga', duration: '35 min', level: 'Advanced' },
    { id: 'sTANio_2E0Q', title: '40-Minute Power Yoga Full Body Workout', channel: 'Yoga With Adriene', duration: '40 min', level: 'Advanced' },
  ],
  // Exercise workouts: beginner, no-equipment, strength, cardio, senior-friendly
  exercise: [
    { id: 'UItWltVZgDQ', title: '30-Min Full Body Workout – No Equipment', channel: 'FitnessBlender', duration: '30 min', level: 'Beginner' },
    { id: 'cbKkB3POqaY', title: 'Low-Impact HIIT Cardio for Beginners', channel: 'FitnessBlender', duration: '26 min', level: 'Beginner' },
    { id: 'UBMk30rjy0o', title: '20-Minute Full Body Strength Workout at Home', channel: "Heather Robertson", duration: '20 min', level: 'Intermediate' },
    { id: 'ml6cT4AZdqI', title: '30-Min Dance Workout for Weight Loss', channel: 'POPSUGAR Fitness', duration: '30 min', level: 'Beginner' },
    { id: 'I9nG-G4B5Bs', title: 'Low Impact Cardio for Fat Loss (Knee Friendly)', channel: 'MadFit', duration: '25 min', level: 'Beginner' },
    { id: 'vc1E5CfRfos', title: 'Full Body Stretch & Cool Down Routine', channel: 'FitnessBlender', duration: '15 min', level: 'Beginner' },
    { id: 'eGo4IYlbE5g', title: 'Strength Training with Dumbbells – Full Body', channel: 'Caroline Girvan', duration: '30 min', level: 'Intermediate' },
    { id: 'kGXa8dQ3UZI', title: 'Senior Friendly Chair Exercises', channel: 'HASfit', duration: '25 min', level: 'Beginner' },
  ],
  // Healthy food & nutrition: Indian meals, weight loss/gain, veg & non-veg
  healthyFood: [
    { id: 'O1U5-bw5Q1Q', title: 'High Protein Meal Prep for the Week', channel: 'Fit Couple Cooks', duration: '24 min', level: 'Beginner' },
    { id: 'f0X1Tl8aHtA', title: '5 Healthy Indian Lunch Box Recipes', channel: 'Your Food Lab', duration: '21 min', level: 'Beginner' },
    { id: 'rFkJYd4vLng', title: '5 Healthy Indian Dinner Ideas', channel: 'Hebbars Kitchen', duration: '19 min', level: 'Beginner' },
    { id: '2vW89i0Q5v0', title: 'Budget Friendly Healthy Meals (Veg)', channel: 'Pick Up Limes', duration: '23 min', level: 'Beginner' },
    { id: '9u3NQDPZWSk', title: 'Weekly Meal Prep – Easy & Healthy', channel: 'Downshiftology', duration: '26 min', level: 'Intermediate' },
    { id: 'D5uWuz8w7dA', title: '7 Healthy Breakfasts for Weight Loss', channel: 'Mind Over Munch', duration: '17 min', level: 'Beginner' },
    { id: '4gq4cLe-OfM', title: 'Healthy Indian Breakfast & Snack Ideas', channel: 'Chef Ranveer Brar', duration: '25 min', level: 'Beginner' },
    { id: 'i7NkrPdh9dI', title: 'High Protein Vegetarian Recipes', channel: 'Fit Tuber', duration: '21 min', level: 'Intermediate' },
  ],
};

export const symptomsData = [
  {
    symptom: 'Headache',
    possibleConditions: ['Tension headache', 'Migraine', 'Dehydration', 'Sinusitis'],
    homeRemedies: ['Rest in a dark, quiet room', 'Apply cold or warm compress', 'Stay hydrated (8-10 glasses water)', 'Gentle scalp massage'],
    ayurvedicRemedies: ['Brahmi oil head massage', 'Ginger + tulsi tea', 'Triphala with warm water', 'Peppermint oil on temples'],
    suggestedSpecialty: 'Neurologist',
    severity: 'mild',
    whenToSeeDoctor: 'If headache is severe (worst of your life), persistent >72 hrs, or with fever/stiff neck'
  },
  {
    symptom: 'Fever',
    possibleConditions: ['Viral infection', 'Bacterial infection', 'Common cold', 'Flu'],
    homeRemedies: ['Stay hydrated', 'Rest adequately', 'Cool compress on forehead', 'Light diet (khichdi, soups)', 'Paracetamol if >101°F'],
    ayurvedicRemedies: ['Tulsi + ginger + honey tea', 'Giloy kadha', 'Neem leaf decoction', 'Turmeric milk at night'],
    suggestedSpecialty: 'General Physician',
    severity: 'moderate',
    whenToSeeDoctor: 'If fever >103°F, persists >3 days, or accompanied by rash/breathing difficulty'
  },
  {
    symptom: 'Cough & Cold',
    possibleConditions: ['Common cold', 'Allergic rhinitis', 'Bronchitis', 'Sinusitis'],
    homeRemedies: ['Honey + ginger (1 tsp each)', 'Steam inhalation', 'Warm saline gargling', 'Turmeric milk', 'Vitamin C foods'],
    ayurvedicRemedies: ['Sitopaladi churna with honey', 'Trikatu powder with honey', 'Vasaka syrup', 'Tulsi + pepper + ginger kadha'],
    suggestedSpecialty: 'ENT Specialist',
    severity: 'mild',
    whenToSeeDoctor: 'If cough persists >2 weeks, blood in sputum, or breathing difficulty'
  },
  {
    symptom: 'Back Pain',
    possibleConditions: ['Muscle strain', 'Herniated disc', 'Poor posture', 'Kidney stones', 'Spondylitis'],
    homeRemedies: ['Hot/cold therapy', 'Gentle stretching', 'Maintain proper posture', 'Avoid heavy lifting', 'RICE method'],
    ayurvedicRemedies: ['Mahanarayan oil massage', 'Ashwagandha + warm milk', 'Nirgundi leaves compress', 'Yoga - Balasana, Bhujangasana'],
    suggestedSpecialty: 'Orthopedist',
    severity: 'moderate',
    whenToSeeDoctor: 'If pain radiates to legs, numbness, loss of bladder/bowel control'
  },
  {
    symptom: 'Stomach Pain',
    possibleConditions: ['Indigestion', 'Gastritis', 'IBS', 'Appendicitis', 'Food poisoning'],
    homeRemedies: ['Ginger tea', 'Fennel seeds (saunf) after meals', 'BRAT diet (banana, rice, applesauce, toast)', 'Warm compress on abdomen', 'ORS solution'],
    ayurvedicRemedies: ['Haritaki powder', 'Hingwashtak churna', 'Triphala decoction', 'Jeera (cumin) water', 'Ajwain with black salt'],
    suggestedSpecialty: 'Gastroenterologist',
    severity: 'moderate',
    whenToSeeDoctor: 'If severe pain (especially right lower side), blood in stool, vomiting >24hrs'
  },
  {
    symptom: 'Skin Rash',
    possibleConditions: ['Allergic reaction', 'Eczema', 'Psoriasis', 'Heat rash', 'Contact dermatitis'],
    homeRemedies: ['Cool compress', 'Calamine lotion', 'Oatmeal bath', 'Avoid scratching', 'Wear loose cotton clothing', 'Aloe vera gel'],
    ayurvedicRemedies: ['Neem paste application', 'Turmeric + sandalwood paste', 'Chandan (sandalwood) oil', 'Panchakarma (Virechana)'],
    suggestedSpecialty: 'Dermatologist',
    severity: 'mild',
    whenToSeeDoctor: 'If rash spreads rapidly, with fever/difficulty breathing, or doesn\'t improve in 1 week'
  },
  {
    symptom: 'Joint Pain',
    possibleConditions: ['Arthritis', 'Gout', 'Bursitis', 'Vitamin D deficiency', 'Rheumatoid arthritis'],
    homeRemedies: ['RICE method', 'Warm/cold compress', 'Gentle exercises', 'Maintain healthy weight', 'Omega-3 rich foods'],
    ayurvedicRemedies: ['Shallaki (Boswellia) supplements', 'Guggul tablets', 'Turmeric + black pepper milk', 'Sesame oil massage'],
    suggestedSpecialty: 'Rheumatologist',
    severity: 'moderate',
    whenToSeeDoctor: 'If joint is red/swollen/warm, severe pain, or unable to move the joint'
  },
  {
    symptom: 'Fatigue',
    possibleConditions: ['Anemia', 'Thyroid disorders', 'Vitamin deficiency', 'Sleep disorders', 'Depression'],
    homeRemedies: ['Regular sleep schedule (7-9 hrs)', 'Balanced diet with iron & B12', 'Regular exercise', 'Limit caffeine/alcohol', 'Stay hydrated'],
    ayurvedicRemedies: ['Ashwagandha with warm milk', 'Shatavari supplements', 'Chyawanprash daily', 'Brahmi supplement'],
    suggestedSpecialty: 'General Physician',
    severity: 'mild',
    whenToSeeDoctor: 'If fatigue is severe/persistent (>2 weeks), with unexplained weight loss, or chest pain'
  },
  {
    symptom: 'Anxiety & Stress',
    possibleConditions: ['Anxiety disorder', 'Stress response', 'Panic disorder', 'PTSD'],
    homeRemedies: ['Deep breathing exercises', 'Regular exercise', 'Journaling', 'Limit caffeine', 'Social connection', 'Adequate sleep'],
    ayurvedicRemedies: ['Brahmi + Ashwagandha supplements', 'Jatamansi powder', 'Shankhpushpi syrup', 'Abhyanga (oil massage)'],
    suggestedSpecialty: 'Psychiatrist / Psychologist',
    severity: 'mild',
    whenToSeeDoctor: 'If anxiety interferes with daily life, panic attacks, or thoughts of self-harm'
  },
  {
    symptom: 'Chest Pain',
    possibleConditions: ['Cardiac issue', 'Acid reflux', 'Muscle strain', 'Anxiety', 'Costochondritis'],
    homeRemedies: ['SEEK EMERGENCY CARE IMMEDIATELY if cardiac suspected', 'Antacids for reflux', 'Rest for muscle strain', 'Deep breathing for anxiety'],
    ayurvedicRemedies: ['Arjuna bark tea (for cardiac support after doctor consultation)', 'Ashwagandha for stress-related chest pain'],
    suggestedSpecialty: 'Cardiologist / Emergency',
    severity: 'severe',
    whenToSeeDoctor: '⚠️ IMMEDIATE - Chest pain is always serious. Call emergency services if pain radiates to arm/jaw, sweating, shortness of breath'
  },
  {
    symptom: 'Dizziness',
    possibleConditions: ['Low blood pressure', 'Vertigo', 'Anemia', 'Dehydration'],
    homeRemedies: ['Sit or lie down immediately', 'Sip water or ORS', 'Avoid sudden head movements', 'Eat small, frequent meals'],
    ayurvedicRemedies: ['Ginger tea', 'Brahmi supplements', 'Draksharishta (only after medical advice)'],
    suggestedSpecialty: 'Neurologist / ENT',
    severity: 'moderate',
    whenToSeeDoctor: 'If dizziness is recurrent, associated with hearing loss, chest pain, difficulty speaking or walking.'
  },
  {
    symptom: 'Sore Throat',
    possibleConditions: ['Viral infection', 'Strep throat', 'Allergy', 'Acid reflux'],
    homeRemedies: ['Warm salt-water gargles', 'Honey + ginger', 'Stay hydrated', 'Avoid cold & fried foods'],
    ayurvedicRemedies: ['Yashtimadhu (licorice) lozenges', 'Tulsi + clove + ginger kadha'],
    suggestedSpecialty: 'ENT Specialist',
    severity: 'mild',
    whenToSeeDoctor: 'If sore throat lasts more than 7 days, high fever, or difficulty swallowing/breathing.'
  },
  {
    symptom: 'Acidity / Heartburn',
    possibleConditions: ['Gastritis', 'GERD', 'Peptic ulcer'],
    homeRemedies: ['Avoid late-night and spicy meals', 'Small frequent meals', 'Drink cold milk or buttermilk', 'Elevate head end of bed'],
    ayurvedicRemedies: ['Jeera-dhaniya-saunf water', 'Amla juice', 'Avipattikar churna (under supervision)'],
    suggestedSpecialty: 'Gastroenterologist',
    severity: 'mild',
    whenToSeeDoctor: 'If pain is severe, recurrent, or associated with chest pain, vomiting or weight loss.'
  },
  {
    symptom: 'Insomnia / Poor Sleep',
    possibleConditions: ['Stress', 'Anxiety', 'Depression', 'Hormone imbalance'],
    homeRemedies: ['Maintain fixed sleep schedule', 'Limit screens 1 hour before bed', 'Light walk after dinner', 'Avoid caffeine late evening'],
    ayurvedicRemedies: ['Warm milk with nutmeg', 'Ashwagandha at night', 'Abhyanga (oil massage) before sleep'],
    suggestedSpecialty: 'Psychiatrist / Sleep Specialist',
    severity: 'mild',
    whenToSeeDoctor: 'If insomnia persists for weeks, affects daily functioning, or coexists with anxiety/depression.'
  },
  {
    symptom: 'PCOS Symptoms (Irregular periods, acne, hair fall)',
    possibleConditions: ['Polycystic Ovary Syndrome', 'Hormonal imbalance'],
    homeRemedies: ['Regular exercise & weight management', 'Balanced low-sugar diet', 'Adequate sleep', 'Practice yoga & breathing for stress'],
    ayurvedicRemedies: ['Ashoka & Lodhra formulations', 'Shatavari', 'Cinnamon & flax seeds as dietary support'],
    suggestedSpecialty: 'Gynecologist / Endocrinologist',
    severity: 'moderate',
    whenToSeeDoctor: 'If cycles are irregular for several months, difficulty conceiving, or severe acne/weight gain.'
  }
];

export const hospitals = [
  { name: 'AIIMS Delhi', location: 'New Delhi', specialty: 'Multi-specialty', rating: 4.9, type: 'Government', phone: '011-26588500', emergency: true },
  { name: 'Apollo Hospitals', location: 'Multiple Cities', specialty: 'Multi-specialty', rating: 4.8, type: 'Private', phone: '1860-500-1066', emergency: true },
  { name: 'Fortis Healthcare', location: 'Multiple Cities', specialty: 'Multi-specialty', rating: 4.7, type: 'Private', phone: '1800-111-700', emergency: true },
  { name: 'Manipal Hospitals', location: 'Bangalore', specialty: 'Multi-specialty', rating: 4.7, type: 'Private', phone: '080-25024444', emergency: true },
  { name: 'Medanta - The Medicity', location: 'Gurugram', specialty: 'Cardiac, Neurology', rating: 4.8, type: 'Private', phone: '0124-4141414', emergency: true },
  { name: 'Tata Memorial Hospital', location: 'Mumbai', specialty: 'Oncology', rating: 4.9, type: 'Government', phone: '022-24177000', emergency: false },
  { name: 'Christian Medical College', location: 'Vellore', specialty: 'Multi-specialty', rating: 4.9, type: 'Private (Non-profit)', phone: '0416-2281000', emergency: true },
  { name: 'NIMHANS', location: 'Bangalore', specialty: 'Mental Health, Neurology', rating: 4.8, type: 'Government', phone: '080-46110007', emergency: true },
];
