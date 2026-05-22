# =============================================
#   PlantCare AI — Flask Backend
#   Run: python app.py
#   Open: http://localhost:5000
# =============================================

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

# ---- App Setup ----
app = Flask(__name__, static_folder=".")
CORS(app)

# ---- Model Path ----
MODEL_PATH = r"C:\Users\hp\Desktop\AI Project\model\plant_model_export"

# ---- Load Model ----
print("=" * 50)
print("  PlantCare AI — Starting Backend")
print("=" * 50)
print(f"Loading model from: {MODEL_PATH}")

try:
    model      = tf.saved_model.load(MODEL_PATH)
    infer      = model.signatures["serving_default"]
    OUTPUT_KEY = list(infer.structured_outputs.keys())[0]
    print(f"✅ Model loaded successfully!")
    print(f"   Output key : {OUTPUT_KEY}")
    print(f"   Classes    : 38")
except Exception as e:
    print(f"❌ Model load error: {e}")
    model      = None
    infer      = None
    OUTPUT_KEY = None

print("=" * 50)

# ---- Class Names ----
# Alphabetical order — matches image_dataset_from_directory assignment
CLASS_NAMES = [
    "Apple___Apple_scab",                                        #  0
    "Apple___Black_rot",                                         #  1
    "Apple___Cedar_apple_rust",                                  #  2
    "Apple___healthy",                                           #  3
    "Blueberry___healthy",                                       #  4
    "Cherry_(including_sour)___Powdery_mildew",                  #  5
    "Cherry_(including_sour)___healthy",                         #  6
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",        #  7
    "Corn_(maize)___Common_rust_",                               #  8
    "Corn_(maize)___Northern_Leaf_Blight",                       #  9
    "Corn_(maize)___healthy",                                    # 10
    "Grape___Black_rot",                                         # 11
    "Grape___Esca_(Black_Measles)",                              # 12
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",                # 13
    "Grape___healthy",                                           # 14
    "Orange___Haunglongbing_(Citrus_greening)",                  # 15
    "Peach___Bacterial_spot",                                    # 16
    "Peach___healthy",                                           # 17
    "Pepper,_bell___Bacterial_spot",                             # 18
    "Pepper,_bell___healthy",                                    # 19
    "Potato___Early_blight",                                     # 20
    "Potato___Late_blight",                                      # 21
    "Potato___healthy",                                          # 22
    "Raspberry___healthy",                                       # 23
    "Soybean___healthy",                                         # 24
    "Squash___Powdery_mildew",                                   # 25
    "Strawberry___Leaf_scorch",                                  # 26
    "Strawberry___healthy",                                      # 27
    "Tomato___Bacterial_spot",                                   # 28
    "Tomato___Early_blight",                                     # 29
    "Tomato___Late_blight",                                      # 30
    "Tomato___Leaf_Mold",                                        # 31
    "Tomato___Septoria_leaf_spot",                               # 32
    "Tomato___Spider_mites Two-spotted_spider_mite",             # 33
    "Tomato___Target_Spot",                                      # 34
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",                    # 35
    "Tomato___Tomato_mosaic_virus",                              # 36
    "Tomato___healthy",                                          # 37
]

# ---- Routes ----

# Serve frontend files
@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

# Health check
@app.route("/status", methods=["GET"])
def status():
    return jsonify({
        "status"  : "ok",
        "message" : "PlantCare AI backend is running!",
        "model"   : "MobileNetV2 SavedModel",
        "classes" : len(CLASS_NAMES),
        "loaded"  : infer is not None
    })

# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    if infer is None:
        return jsonify({"error": "Model not loaded. Check terminal for errors."}), 500

    if "image" not in request.files:
        return jsonify({"error": "No image received. Send as form-data with key 'image'."}), 400

    try:
        # Read and preprocess
        file = request.files["image"]
        img  = Image.open(io.BytesIO(file.read())).convert("RGB")
        img  = img.resize((224, 224))
        arr  = np.array(img) / 255.0
        arr  = np.expand_dims(arr, axis=0).astype(np.float32)

        # Inference
        output = infer(tf.constant(arr))
        preds  = output[OUTPUT_KEY].numpy()[0]

        # Top 3
        top3_idx   = np.argsort(preds)[::-1][:3]
        top_class  = CLASS_NAMES[top3_idx[0]]
        confidence = float(preds[top3_idx[0]])

        print(f"Prediction: {top_class} ({confidence*100:.1f}%)")

        return jsonify({
            "disease"    : top_class,
            "confidence" : confidence,
            "top3"       : [
                {"label": CLASS_NAMES[i], "confidence": float(preds[i])}
                for i in top3_idx
            ]
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("\nPlantCare AI is running!")
    print("   Frontend : http://localhost:5000")
    print("   Status   : http://localhost:5000/status")
    print("   Predict  : POST http://localhost:5000/predict")
    print("\nPress CTRL+C to stop.\n")
    app.run(debug=False, host="0.0.0.0", port=5000)