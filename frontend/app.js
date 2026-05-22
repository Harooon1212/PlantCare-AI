// =============================================
//   PlantCare AI – app.js
//   38 Classes — Full PlantVillage Dataset
//   Backend: Flask at http://localhost:5000
// =============================================

const DISEASE_DB = {
  "Apple___Apple_scab": {
    icon:"🍎",plant:"Apple",severity:"moderate",
    symptoms:["Olive-green or black velvety spots on leaves and fruit","Infected leaves curl and drop early","Fruit shows dark scabby lesions that crack as they enlarge","Severely infected fruit is small and misshapen"],
    treatment:["Apply myclobutanil, captan, or mancozeb fungicide","Start spraying at green tip stage before symptoms appear","Continue spray program through petal fall","Remove and destroy fallen infected leaves in autumn"],
    prevention:["Plant scab-resistant apple varieties","Prune trees to improve airflow","Rake and destroy fallen leaves each season","Apply dormant oil sprays in late winter"]
  },
  "Apple___Black_rot": {
    icon:"🍎",plant:"Apple",severity:"moderate",
    symptoms:["Brown circular lesions with purple borders on leaves","Mummified fruit turns black and remains on tree","Cankers on branches with reddish-brown sunken areas","Fruit rots from the blossom end inward"],
    treatment:["Apply copper or captan fungicide","Remove all mummified fruit from tree and ground","Prune out infected branches with cankers","Destroy infected debris — do not compost"],
    prevention:["Remove dead wood and mummified fruit annually","Maintain tree vigor with proper fertilization","Apply dormant oil spray in late winter","Ensure good airflow through annual pruning"]
  },
  "Apple___Cedar_apple_rust": {
    icon:"🍎",plant:"Apple",severity:"moderate",
    symptoms:["Bright orange-yellow spots on upper leaf surface","Pale yellow lesions with tube-like structures underneath","Premature leaf drop in severe infections","Fruit may show small orange lesions"],
    treatment:["Apply myclobutanil or propiconazole fungicide","Remove nearby juniper or cedar galls in late winter","Spray from pink bud stage through early summer","Repeat applications every 7–10 days during wet periods"],
    prevention:["Plant rust-resistant apple varieties","Remove Eastern red cedar trees near apple orchard","Apply preventative fungicide from bud break","Monitor for orange galls on nearby cedars in spring"]
  },
  "Apple___healthy": {
    icon:"🍎",plant:"Apple",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves are green and healthy","No spots lesions or abnormal growth","Plant is in excellent condition"],
    treatment:["No treatment required","Continue regular care and monitoring","Maintain proper fertilization schedule","Prune annually for shape and airflow"],
    prevention:["Apply dormant oil spray annually","Prune for good airflow each year","Monitor for early pest or disease signs","Rake and remove fallen leaves in autumn"]
  },
  "Blueberry___healthy": {
    icon:"🫐",plant:"Blueberry",severity:"mild",
    symptoms:["No disease symptoms detected","Foliage is green and vigorous","Berries developing normally","Plant is in good health"],
    treatment:["No treatment needed","Continue regular irrigation and fertilization","Maintain soil pH between 4.5 and 5.5","Monitor weekly for early signs of stress"],
    prevention:["Mulch heavily to retain moisture","Fertilize with acidic fertilizer","Prune old canes every 3–4 years","Net bushes to protect from birds"]
  },
  "Cherry_(including_sour)___Powdery_mildew": {
    icon:"🍒",plant:"Cherry",severity:"moderate",
    symptoms:["White powdery coating on young leaves and shoots","Infected leaves curl and distort","Shoot growth becomes stunted","Fruit may show russeting or cracking"],
    treatment:["Apply sulfur or potassium bicarbonate fungicide","Remove and destroy infected shoots","Apply neem oil as an organic alternative","Ensure good air circulation around trees"],
    prevention:["Plant resistant cherry varieties","Prune to open canopy for better airflow","Avoid excess nitrogen fertilization","Apply preventative sulfur sprays from early spring"]
  },
  "Cherry_(including_sour)___healthy": {
    icon:"🍒",plant:"Cherry",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves are green and vibrant","No spots powdery coating or lesions","Tree is growing normally"],
    treatment:["No treatment needed","Continue routine care","Fertilize in early spring","Prune after harvest to maintain shape"],
    prevention:["Apply dormant spray annually","Prune for good airflow","Monitor for early pest signs","Remove fallen leaves and debris in autumn"]
  },
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
    icon:"🌽",plant:"Corn",severity:"moderate",
    symptoms:["Long rectangular gray-brown lesions between leaf veins","Lesions appear water-soaked initially then dry out","Heavy infection causes leaves to die from tip downward","Reduced photosynthesis leads to lower yield"],
    treatment:["Apply strobilurin or triazole fungicide at tasseling","Scout fields regularly during warm humid weather","Ensure proper plant nutrition to boost resistance","Remove infected crop residue after harvest"],
    prevention:["Plant resistant hybrid corn varieties","Rotate crops — avoid continuous corn planting","Till residue after harvest to reduce inoculum","Avoid fields with history of gray leaf spot"]
  },
  "Corn_(maize)___Common_rust_": {
    icon:"🌽",plant:"Corn",severity:"moderate",
    symptoms:["Small cinnamon-brown pustules on both leaf surfaces","Heavy infection causes leaves to yellow and die early","Severely infected plants have reduced grain fill","Disease develops rapidly in cool humid conditions"],
    treatment:["Apply foliar fungicides (triazoles or strobilurins) at early stages","Most effective at or before silking stage","Scout fields regularly during warm humid weather","Ensure adequate fertilization for plant vigor"],
    prevention:["Plant rust-resistant hybrid corn varieties","Avoid planting corn in areas with rust history","Apply preventative fungicide when conditions favor rust","Practice crop rotation annually"]
  },
  "Corn_(maize)___Northern_Leaf_Blight": {
    icon:"🌽",plant:"Corn",severity:"moderate",
    symptoms:["Large cigar-shaped gray-green to tan lesions on leaves","Lesions can be 2.5 to 15 cm long","Severely infected leaves die prematurely","Disease spreads upward from lower leaves"],
    treatment:["Apply propiconazole or azoxystrobin at tasseling stage","Remove infected debris from field after harvest","Ensure balanced fertilization","Scout regularly from mid-season onward"],
    prevention:["Plant resistant or tolerant hybrid varieties","Rotate corn with non-host crops like soybean","Manage crop residue through tillage","Avoid dense planting that limits airflow"]
  },
  "Corn_(maize)___healthy": {
    icon:"🌽",plant:"Corn",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves are green and upright","No lesions or discoloration","Plant is developing normally"],
    treatment:["No treatment needed","Continue regular irrigation and fertilization","Monitor for pest pressure","Scout fields every 2 weeks"],
    prevention:["Use certified disease-free seed","Rotate crops annually","Maintain proper plant spacing","Apply balanced fertilizer at planting"]
  },
  "Grape___Black_rot": {
    icon:"🍇",plant:"Grape",severity:"severe",
    symptoms:["Reddish-brown circular lesions on leaves with dark borders","Berries shrivel and turn into hard black mummies","Infected shoots show dark elongated lesions","Mummified berries remain attached to cluster"],
    treatment:["Apply mancozeb or myclobutanil fungicide from bud break","Remove and destroy all mummified berries and infected shoots","Continue spray program through mid-summer","Prune out infected canes during dormant season"],
    prevention:["Prune vines to improve airflow through canopy","Remove infected debris from vineyard floor","Apply fungicide at bud break before infection occurs","Choose partially resistant grape varieties"]
  },
  "Grape___Esca_(Black_Measles)": {
    icon:"🍇",plant:"Grape",severity:"severe",
    symptoms:["Tiger-stripe pattern of yellow and brown on leaves","Berries develop small dark spots (measles appearance)","Internal wood shows dark brown streaking","Sudden vine collapse in severe cases"],
    treatment:["No effective chemical cure available","Remove and destroy infected wood during pruning","Protect large pruning wounds with wound sealant","Remove severely infected vines to prevent spread"],
    prevention:["Use clean certified planting material","Avoid large pruning cuts — prune in dry weather","Seal all pruning wounds immediately","Disinfect pruning tools between vines with bleach"]
  },
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
    icon:"🍇",plant:"Grape",severity:"moderate",
    symptoms:["Irregular dark brown lesions with yellow halos on leaves","Spots appear on upper and lower leaf surfaces","Infected leaves dry out and drop prematurely","Severe defoliation weakens vines"],
    treatment:["Apply copper-based fungicide at first sign of disease","Remove and dispose of infected fallen leaves","Improve canopy ventilation through pruning","Avoid overhead irrigation"],
    prevention:["Maintain good canopy management for airflow","Remove infected debris from vineyard floor","Apply preventative fungicide sprays in spring","Avoid overhead irrigation"]
  },
  "Grape___healthy": {
    icon:"🍇",plant:"Grape",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves are green and vibrant","No spots lesions or abnormal coloring","Vine is growing and producing normally"],
    treatment:["No treatment required","Continue regular care and nutrition program","Monitor for pest pressure weekly","Prune annually for shape and airflow"],
    prevention:["Prune annually to maintain open canopy","Apply dormant oil spray in late winter","Monitor vine health throughout season","Remove fallen leaves and debris after harvest"]
  },
  "Orange___Haunglongbing_(Citrus_greening)": {
    icon:"🍊",plant:"Orange",severity:"severe",
    symptoms:["Asymmetric yellowing (blotchy mottle) of leaves","Fruits remain small lopsided and bitter","Trees decline slowly over several years","Shoots die back progressively"],
    treatment:["No cure — remove and destroy infected trees immediately","Control Asian citrus psyllid with systemic insecticides","Apply nutritional sprays to manage symptoms in early stages","Replace removed trees with certified disease-free material"],
    prevention:["Use only certified disease-free planting material","Control Asian citrus psyllid populations aggressively","Inspect trees regularly for psyllid and yellowing symptoms","Quarantine new trees before introducing to grove"]
  },
  "Peach___Bacterial_spot": {
    icon:"🍑",plant:"Peach",severity:"moderate",
    symptoms:["Small water-soaked spots on leaves that turn purple-brown","Centers of spots fall out leaving shot-hole appearance","Fruit shows dark sunken pits or cracks","Severe defoliation in wet seasons"],
    treatment:["Apply copper bactericide starting at bud swell","Avoid overhead irrigation — water at base only","Remove and destroy infected tissue","Rotate copper products to prevent resistance"],
    prevention:["Plant resistant peach varieties where available","Protect from wind injury which creates entry wounds","Apply copper sprays preventatively from dormant stage","Avoid overhead irrigation throughout season"]
  },
  "Peach___healthy": {
    icon:"🍑",plant:"Peach",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves are green and healthy","No spots lesions or shot holes","Tree is growing and fruiting normally"],
    treatment:["No treatment required","Continue regular fertilization and irrigation","Thin fruit for better size and quality","Prune annually for shape and airflow"],
    prevention:["Apply dormant oil spray annually","Prune for good airflow through canopy","Monitor for early disease signs weekly","Maintain proper nutrition program"]
  },
  "Pepper,_bell___Bacterial_spot": {
    icon:"🫑",plant:"Pepper",severity:"moderate",
    symptoms:["Small brown water-soaked spots on leaves","Spots enlarge with dark centers and yellow halos","Raised scab-like lesions on fruit surface","Severe defoliation in warm wet conditions"],
    treatment:["Apply copper-based bactericide immediately at first sign","Remove and destroy infected plant parts","Avoid overhead irrigation completely","Use copper + mancozeb combination spray for better control"],
    prevention:["Use certified disease-free seeds and transplants","Treat seeds with hot water 50°C for 25 minutes before planting","Rotate crops with non-solanaceous plants every season","Avoid working in garden when plants are wet"]
  },
  "Pepper,_bell___healthy": {
    icon:"🫑",plant:"Pepper",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves appear green and vibrant","No spots lesions or discoloration observed","Plant is in excellent health"],
    treatment:["No treatment needed","Continue regular watering and fertilization","Monitor weekly for early symptom detection","Stake plants if needed for support"],
    prevention:["Maintain good garden hygiene","Ensure proper plant spacing for airflow","Water at the base in the morning","Keep garden free of weeds and debris"]
  },
  "Potato___Early_blight": {
    icon:"🥔",plant:"Potato",severity:"moderate",
    symptoms:["Dark brown spots with concentric rings (target pattern) on older leaves","Yellow tissue surrounding lesions","Defoliation starts from lower leaves spreading upward","Tubers may show dark dry corky lesions"],
    treatment:["Apply chlorothalonil or mancozeb fungicide preventatively","Remove and destroy infected plant material","Irrigate in the morning so leaves dry during the day","Ensure adequate potassium fertilization to boost resistance"],
    prevention:["Use certified disease-free seed potatoes","Rotate crops — avoid solanaceous plants for 2–3 years","Maintain proper plant spacing for good airflow","Avoid excessive nitrogen which promotes lush susceptible growth"]
  },
  "Potato___Late_blight": {
    icon:"🥔",plant:"Potato",severity:"severe",
    symptoms:["Dark water-soaked greasy-looking lesions on leaves and stems","White fuzzy mold visible on undersides in humid weather","Rapid browning and collapse of infected tissue","Tubers show reddish-brown granular rot inside"],
    treatment:["Apply metalaxyl or cymoxanil-based fungicide immediately","Destroy infected plants — do not compost them","Hill soil around plants to protect tubers from infection","Harvest tubers in dry conditions and cure before storage"],
    prevention:["Plant certified disease-resistant potato varieties","Apply preventative fungicides before symptoms appear","Avoid planting in poorly drained soils","Monitor weather — risk peaks in cool wet periods"]
  },
  "Potato___healthy": {
    icon:"🥔",plant:"Potato",severity:"mild",
    symptoms:["No disease symptoms detected","Foliage is green and healthy","No lesions discoloration or wilting","Plant is developing normally"],
    treatment:["No treatment required","Maintain regular irrigation schedule","Continue fertilization program","Scout regularly for early disease signs"],
    prevention:["Use certified disease-free seed potatoes","Practice crop rotation every season","Maintain good soil drainage","Monitor for pests and diseases regularly"]
  },
  "Raspberry___healthy": {
    icon:"🫐",plant:"Raspberry",severity:"mild",
    symptoms:["No disease symptoms detected","Canes and leaves are healthy","Normal fruit development","Plant is vigorous and productive"],
    treatment:["No treatment needed","Continue regular irrigation","Apply balanced fertilizer in early spring","Train canes to trellis system"],
    prevention:["Prune old fruited canes after harvest","Ensure good drainage to prevent root diseases","Monitor for aphids and mites regularly","Remove and destroy any diseased canes immediately"]
  },
  "Soybean___healthy": {
    icon:"🌱",plant:"Soybean",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves are green and trifoliate","Normal nodulation and growth","Plant is developing normally"],
    treatment:["No treatment required","Continue regular scouting and monitoring","Maintain proper fertility program","Ensure adequate drainage"],
    prevention:["Rotate crops with corn or small grains","Use certified disease-free seed","Select varieties with resistance to local diseases","Maintain optimal plant populations"]
  },
  "Squash___Powdery_mildew": {
    icon:"🥒",plant:"Squash",severity:"moderate",
    symptoms:["White powdery coating on upper and lower leaf surfaces","Infected leaves turn yellow and dry out","Stems and petioles may also show white coating","Severely infected plants produce small poor-quality fruit"],
    treatment:["Apply potassium bicarbonate sulfur or neem oil spray","Remove heavily infected leaves to slow spread","Apply baking soda solution as home remedy","Use horticultural oil sprays for organic control"],
    prevention:["Plant powdery mildew resistant squash varieties","Ensure good plant spacing for airflow","Avoid overhead irrigation — water at base","Apply preventative sulfur spray from early season"]
  },
  "Strawberry___Leaf_scorch": {
    icon:"🍓",plant:"Strawberry",severity:"moderate",
    symptoms:["Small purple to reddish-purple spots on upper leaf surface","Spots enlarge with gray or white centers","Heavily infected leaves appear scorched or dried","Plant vigor and yield reduced in severe cases"],
    treatment:["Apply captan or myclobutanil fungicide","Remove and destroy infected leaves","Avoid wetting foliage during irrigation","Renovate bed after harvest by mowing and thinning"],
    prevention:["Use certified disease-free transplants","Rotate strawberry beds every 3 years","Remove old foliage after harvest season","Plant in well-drained soil with good airflow"]
  },
  "Strawberry___healthy": {
    icon:"🍓",plant:"Strawberry",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves are green and vigorous","No spots lesions or discoloration","Plant is flowering and fruiting normally"],
    treatment:["No treatment required","Continue regular irrigation","Apply balanced fertilizer after harvest","Runner management to maintain plant density"],
    prevention:["Rotate beds every 3 years","Use certified disease-free plants","Mulch with straw to reduce soil splash","Monitor for slugs and spider mites regularly"]
  },
  "Tomato___Bacterial_spot": {
    icon:"🍅",plant:"Tomato",severity:"moderate",
    symptoms:["Small water-soaked greasy-looking lesions on leaves","Lesions turn dark brown with yellow halos","Raised scab-like spots on fruit surface","Severe defoliation in warm wet conditions"],
    treatment:["Apply copper-based bactericide at first signs","Avoid overhead watering — irrigate at base only","Remove infected plant debris from garden","Use fixed copper + mancozeb combination for better control"],
    prevention:["Use disease-free certified seed","Treat seeds with hot water 50°C for 25 minutes","Rotate crops with non-solanaceous plants","Avoid plant injuries that create pathogen entry points"]
  },
  "Tomato___Early_blight": {
    icon:"🍅",plant:"Tomato",severity:"moderate",
    symptoms:["Dark brown circular spots with concentric rings on lower leaves","Yellow halo surrounding each lesion","Leaves turn yellow and drop prematurely","Fruit shows dark leathery spots near the stem end"],
    treatment:["Apply copper-based or chlorothalonil fungicide every 7–10 days","Remove and destroy infected leaves immediately","Water plants at the base only — keep foliage dry","Apply thick mulch layer to prevent soil splash onto leaves"],
    prevention:["Rotate crops annually — avoid same spot for tomatoes","Use certified disease-free seeds and transplants","Space plants adequately for good air circulation","Avoid working in garden when plants are wet"]
  },
  "Tomato___Late_blight": {
    icon:"🍅",plant:"Tomato",severity:"severe",
    symptoms:["Water-soaked pale green patches on leaves","Dark brown or black lesions that expand rapidly","White fuzzy mold on underside of leaves in humid conditions","Infected fruit shows large firm dark brown areas"],
    treatment:["Apply mancozeb or metalaxyl-based fungicide immediately","Remove all infected material and dispose away from garden","Avoid overhead irrigation completely","Remove entire infected plants if infection is severe"],
    prevention:["Plant resistant tomato varieties when available","Apply preventative fungicide at start of humid season","Monitor weather — spreads fast in cool wet conditions","Keep garden tools clean and disinfected after each use"]
  },
  "Tomato___Leaf_Mold": {
    icon:"🍅",plant:"Tomato",severity:"moderate",
    symptoms:["Pale yellowish-green spots on upper leaf surface","Olive-green to gray-brown fuzzy mold on undersides","Infected leaves curl wither and drop prematurely","Mostly affects leaves — fruit infection is rare"],
    treatment:["Apply fungicides containing copper mancozeb or chlorothalonil","Improve ventilation in greenhouses to reduce humidity","Remove heavily infected leaves immediately","Avoid wetting foliage during irrigation"],
    prevention:["Grow resistant tomato varieties","Maintain greenhouse humidity below 85%","Ensure proper plant spacing for good airflow","Apply preventative sprays during humid weather periods"]
  },
  "Tomato___Septoria_leaf_spot": {
    icon:"🍅",plant:"Tomato",severity:"moderate",
    symptoms:["Small circular spots with dark brown borders and gray centers","Tiny black pycnidia dots visible inside lesions","Lower leaves affected first spreading upward rapidly","Heavy defoliation exposes fruit to sunscald"],
    treatment:["Apply chlorothalonil mancozeb or copper fungicide","Remove and dispose of infected lower leaves","Avoid overhead watering","Repeat fungicide applications every 7–10 days in wet weather"],
    prevention:["Remove all plant debris at end of growing season","Rotate tomatoes with non-solanaceous crops","Mulch around plants to reduce soil splash onto leaves","Choose partially resistant varieties where available"]
  },
  "Tomato___Spider_mites Two-spotted_spider_mite": {
    icon:"🍅",plant:"Tomato",severity:"moderate",
    symptoms:["Tiny yellow or white speckles (stippling) on upper leaf surface","Fine webbing visible on undersides of leaves","Leaves turn bronze yellow and dry out completely","Severe infestations cause complete leaf death"],
    treatment:["Apply miticide or insecticidal soap spray","Spray undersides of leaves thoroughly where mites live","Use neem oil as an effective organic alternative","Introduce predatory mites for biological control"],
    prevention:["Keep plants well watered — mites thrive on drought-stressed plants","Avoid dusty conditions around plants","Monitor undersides of leaves regularly for early detection","Avoid excessive nitrogen which promotes soft growth mites prefer"]
  },
  "Tomato___Target_Spot": {
    icon:"🍅",plant:"Tomato",severity:"moderate",
    symptoms:["Brown lesions with concentric rings resembling a target or bullseye","Spots appear on leaves stems and fruit surfaces","Lesions have dark border with lighter tan center","Defoliation and fruit spotting occurs in severe cases"],
    treatment:["Apply azoxystrobin or chlorothalonil fungicide","Remove infected leaves and dispose of them safely","Improve air circulation by pruning lower leaves","Avoid wetting foliage when watering plants"],
    prevention:["Rotate crops with non-host plants annually","Use resistant varieties where they are available","Maintain proper plant spacing between plants","Avoid working with wet plants to prevent spread"]
  },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    icon:"🍅",plant:"Tomato",severity:"severe",
    symptoms:["Upward curling and yellowing of young leaves","Stunted plant growth and severely reduced fruit set","Leaves become small crinkled and leathery in texture","Transmitted by silverleaf whitefly — check undersides of leaves"],
    treatment:["No cure once infected — remove and destroy all infected plants","Control whitefly populations with insecticides or yellow sticky traps","Apply reflective silver mulches to deter whiteflies","Use neem oil or insecticidal soap for whitefly management"],
    prevention:["Plant TYLCV-resistant tomato varieties","Use insect-proof netting to physically exclude whiteflies","Remove and destroy weeds that serve as whitefly host plants","Inspect transplants very carefully before introducing to garden"]
  },
  "Tomato___Tomato_mosaic_virus": {
    icon:"🍅",plant:"Tomato",severity:"severe",
    symptoms:["Mosaic pattern of light and dark green mottling on leaves","Leaves may be distorted curled or showing blister-like areas","Stunted overall plant growth","Fruit may show yellow blotches or internal browning"],
    treatment:["No chemical cure available — remove infected plants immediately","Disinfect all tools with 10% bleach solution after each use","Wash hands thoroughly with soap before handling healthy plants","Control aphids which can transmit the virus between plants"],
    prevention:["Use only certified virus-free seeds and transplants","Avoid using tobacco products near plants","Disinfect all tools and equipment regularly throughout season","Plant resistant tomato varieties where available"]
  },
  "Tomato___healthy": {
    icon:"🍅",plant:"Tomato",severity:"mild",
    symptoms:["No disease symptoms detected","Leaves are green and vigorous","No spots lesions or discoloration present","Plant appears fully healthy and productive"],
    treatment:["No treatment necessary at this time","Continue regular watering and care routine","Maintain consistent fertilization schedule","Keep monitoring for early signs of issues"],
    prevention:["Maintain good garden hygiene throughout season","Ensure proper spacing between plants for airflow","Water at the base in the morning only","Inspect plants weekly for early disease detection"]
  },
};

const FALLBACK_DISEASE = {
  icon:"🔬",plant:"Unknown",severity:"moderate",
  symptoms:["Disease symptoms detected in the uploaded image","Abnormal discoloration or lesions present","Further examination recommended","Contact an agricultural expert for on-site diagnosis"],
  treatment:["Isolate the affected plant from others immediately","Remove and destroy visibly infected parts","Apply a broad-spectrum fungicide as a precaution","Improve drainage and air circulation around the plant"],
  prevention:["Practice crop rotation annually","Use certified disease-free planting material","Maintain proper plant nutrition and watering practices","Monitor plants regularly for early symptoms"]
};

function formatDiseaseName(raw) {
  return raw.replace(/___/g," — ").replace(/_/g," ").replace(/,/g,"").replace(/\s+/g," ").trim();
}

let currentFile = null;
let activeTab = "symptoms";

// Dark Mode
const darkToggle = document.getElementById("darkToggle");
const toggleIcon = document.getElementById("toggleIcon");
const html = document.documentElement;
const savedTheme = localStorage.getItem("plantcare-theme") || "light";
html.setAttribute("data-theme", savedTheme);
toggleIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";
darkToggle.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  toggleIcon.textContent = next === "dark" ? "☀️" : "🌙";
  localStorage.setItem("plantcare-theme", next);
});

// Hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", () => navLinks.classList.remove("open")));

// Navbar scroll
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 10);
  const sections = ["home","detection","dataset","model","about"];
  let current = "home";
  sections.forEach(id => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 120) current = id; });
  document.querySelectorAll(".nav-link").forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
});

// File Upload
const fileInput    = document.getElementById("fileInput");
const uploadZone   = document.getElementById("uploadZone");
const previewState = document.getElementById("previewState");
const previewImg   = document.getElementById("previewImg");
const fileName     = document.getElementById("fileName");
const fileSize     = document.getElementById("fileSize");
const resultCard   = document.getElementById("resultCard");

uploadZone.addEventListener("click", () => fileInput.click());
uploadZone.addEventListener("dragover", e => { e.preventDefault(); uploadZone.classList.add("dragging"); });
uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("dragging"));
uploadZone.addEventListener("drop", e => {
  e.preventDefault(); uploadZone.classList.remove("dragging");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) handleFile(file);
});
fileInput.addEventListener("change", e => { if (e.target.files[0]) handleFile(e.target.files[0]); });

function handleFile(file) {
  currentFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    previewImg.src = e.target.result;
    uploadZone.classList.add("hidden");
    previewState.classList.remove("hidden");
    fileName.textContent = file.name;
    fileSize.textContent = (file.size / 1024).toFixed(1) + " KB";
  };
  reader.readAsDataURL(file);
}

function resetUpload() {
  fileInput.value = ""; currentFile = null;
  previewState.classList.add("hidden");
  uploadZone.classList.remove("hidden");
}

function resetAll() {
  resetUpload();
  resultCard.classList.add("hidden");
  document.getElementById("loadingState").classList.remove("hidden");
  document.getElementById("resultContent").classList.add("hidden");
}

// Prediction
async function runPrediction() {
  if (!currentFile) return;
  resultCard.classList.remove("hidden");
  document.getElementById("loadingState").classList.remove("hidden");
  document.getElementById("resultContent").classList.add("hidden");
  document.getElementById("scanImg").src = previewImg.src;
  setTimeout(() => resultCard.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

  const formData = new FormData();
  formData.append("image", currentFile);
  try {
    const res = await fetch("http://localhost:5000/predict", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Server error: " + res.status);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    showResult(data.disease, data.confidence, data.top3 || []);
  } catch (err) {
    console.error("Prediction failed:", err);
    document.getElementById("loadingState").classList.add("hidden");
    resultCard.classList.add("hidden");
    alert("❌ Could not reach backend.\n\nMake sure:\n1. Flask is running: python app.py\n2. You see 'Running on http://127.0.0.1:5000'\n3. Model loaded successfully in terminal\n\nError: " + err.message);
  }
}

function showResult(diseaseName, confidence, top3) {
  const info = DISEASE_DB[diseaseName] || { ...FALLBACK_DISEASE };
  const displayName = formatDiseaseName(diseaseName);
  document.getElementById("loadingState").classList.add("hidden");
  document.getElementById("resultContent").classList.remove("hidden");
  document.getElementById("diseaseIcon").textContent = info.icon;
  document.getElementById("diseaseName").textContent = displayName;
  const severityBadge = document.getElementById("severityBadge");
  severityBadge.textContent = info.severity;
  severityBadge.className = "severity-badge " + info.severity.toLowerCase();
  document.getElementById("plantBadge").textContent = info.plant;
  const pct = Math.round(confidence * 100);
  document.getElementById("confPct").textContent = pct + "%";
  setTimeout(() => { document.getElementById("confBarFill").style.width = pct + "%"; }, 100);
  const topPreds = document.getElementById("topPreds");
  topPreds.innerHTML = (top3 && top3.length > 0) ? top3.map((p, i) => `
    <div class="pred-row">
      <span class="pred-label">${formatDiseaseName(p.label)}</span>
      <div class="pred-track"><div class="pred-fill ${i===0?"top":""}" style="width:${Math.round(p.confidence*100)}%"></div></div>
      <span class="pred-pct">${Math.round(p.confidence*100)}%</span>
    </div>`).join("") : "";
  const buildList = items => `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  document.getElementById("tab-symptoms").innerHTML   = buildList(info.symptoms);
  document.getElementById("tab-treatment").innerHTML  = buildList(info.treatment);
  document.getElementById("tab-prevention").innerHTML = buildList(info.prevention);
  setActiveTab("symptoms");
  setTimeout(() => document.getElementById("resultContent").scrollIntoView({ behavior: "smooth", block: "nearest" }), 200);
}

// Tabs
document.addEventListener("click", e => { if (e.target.classList.contains("tab")) setActiveTab(e.target.dataset.tab); });
function setActiveTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
  document.querySelectorAll(".tab-content").forEach(c => {
    c.classList.toggle("active", c.id === "tab-" + tabName);
    c.classList.toggle("hidden", c.id !== "tab-" + tabName);
  });
}

// Counters
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const start = performance.now();
  function update(time) {
    const p = Math.min((time - start) / 2000, 1);
    el.textContent = Math.round((1 - Math.pow(1-p,3)) * target).toLocaleString();
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Observers
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); revealObs.unobserve(e.target); } });
}, { threshold: 0.15 });

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll("[data-target]").forEach(c => animateCounter(c)); counterObs.unobserve(e.target); } });
}, { threshold: 0.3 });

const accObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;

    e.target.querySelectorAll(".acc-fill").forEach(f => {
      
      // STEP 1: reset to 0 BEFORE paint
      f.style.width = "0%";

      // STEP 2: force reflow (VERY IMPORTANT)
      f.getBoundingClientRect();

      // STEP 3: animate to target (from data attribute or inline style)
      const target = f.dataset.width || f.style.width;

      requestAnimationFrame(() => {
        f.style.width = target + "%";
      });

    });

    accObs.unobserve(e.target);
  });
}, { threshold: 0.3 });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stat-card,.category-card,.gallery-card,.model-card,.about-card,.upload-card").forEach(el => { el.classList.add("reveal"); revealObs.observe(el); });
  document.querySelectorAll(".stats-grid,.hero-stats").forEach(el => counterObs.observe(el));
  document.querySelectorAll(".accuracy-wrap").forEach(el => accObs.observe(el));
  document.querySelectorAll(".stat-num[data-target]").forEach(el => {
    const o = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { animateCounter(el); o.disconnect(); } }, { threshold: 0.5 });
    o.observe(el);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const t = document.querySelector(link.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
});