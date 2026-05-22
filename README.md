# 🌱 PlantCare AI

An AI-powered Plant Disease Detection System built using Deep Learning and the PlantVillage Dataset.

The system detects plant diseases from uploaded leaf images and provides:

- Disease Prediction
- Confidence Score
- Symptoms
- Treatment Suggestions
- Prevention Methods

---

## Features

✅ 38 Plant Disease Classes  
✅ MobileNetV2 Deep Learning Model  
✅ Flask Backend API  
✅ Interactive Frontend (HTML, CSS, JavaScript)  
✅ Disease Confidence Visualization  
✅ Dark Mode UI  
✅ Drag & Drop Image Upload  
✅ Real-time Disease Prediction

---

## Technologies Used

- Python
- TensorFlow / Keras
- MobileNetV2
- Flask
- HTML
- CSS
- JavaScript

---

## Dataset

PlantVillage Dataset

Contains 38 plant disease classes across multiple crops including:

- Apple
- Tomato
- Potato
- Corn
- Grape
- Strawberry
- Peach
- Pepper
- Squash
- Soybean

---

## Model Architecture

Transfer Learning using:

**MobileNetV2**

Architecture:

```python
model = Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dropout(0.3),
    Dense(128, activation='relu'),
    Dropout(0.3),
    Dense(15, activation='softmax')
])
```

## Project Screenshots

### Home Page

<img width="1844" height="880" alt="image" src="https://github.com/user-attachments/assets/01fc080f-b63b-4dd7-acc0-7ccc57fd0641" />



### Disease Detection

(Add screenshot here)

### Prediction Results

(Add screenshot here)

---

## Installation

Clone repository:

```bash
git clone https://github.com/yourusername/PlantCare-AI.git
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run Flask server:

```bash
python app.py
```

Open browser:

```txt
http://localhost:5000
```

---

## Sample Images

Example plant leaf images are included in the project for testing.

---

## Future Improvements

- Live camera detection
- Multi-language support
- Disease severity estimation
- Deployment on cloud
- Mobile app integration

---

## Author

Muhammad Haroon
