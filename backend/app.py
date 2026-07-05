'''from flask import Flask, request, jsonify
from flask_cors import CORS

from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)

# -------------------------
# LOAD MODELS
# -------------------------
stage1_model = load_model(
    "models/stage1_real_fake.h5"
)

stage2_model = load_model(
    "models/stage2_ai_morphed.h5"
)

# -------------------------
# CLASS LABELS
# -------------------------
STAGE1_CLASSES = ['fake', 'real']

STAGE2_CLASSES = ['ai', 'morphed']

# -------------------------
# UPLOAD FOLDER
# -------------------------
UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# -------------------------
# PREPROCESS IMAGE
# -------------------------
def preprocess_image(path):

    img = cv2.imread(path)

    if img is None:
        raise ValueError("Invalid image file")

    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    img = cv2.resize(
        img,
        (224, 224)
    )

    img = preprocess_input(
        img.astype("float32")
    )

    img = np.expand_dims(
        img,
        axis=0
    )

    return img
# -------------------------
# HOME ROUTE
# -------------------------
@app.route("/")
def home():

    return "2-Stage AI Detection Server Running"

# -------------------------
# PREDICTION ROUTE
# -------------------------
@app.route("/predict", methods=["POST"])
def predict():

    try:

        # -------------------------
        # CHECK FILE
        # -------------------------
        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]

        # -------------------------
        # SAVE IMAGE
        # -------------------------
        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(file_path)

        # -------------------------
        # PREPROCESS
        # -------------------------
        img = preprocess_image(file_path)

        # ==================================================
        # STAGE 1 : REAL vs FAKE
        # ==================================================
        stage1_prediction = stage1_model.predict(img)[0]

        stage1_confidence = float(
            np.max(stage1_prediction) * 100
        )

        stage1_idx = int(
            np.argmax(stage1_prediction)
        )

        stage1_label = STAGE1_CLASSES[
            stage1_idx
        ]

        fake_score = float(
            stage1_prediction[0] * 100
        )

        real_score = float(
            stage1_prediction[1] * 100
        )

        # ==================================================
        # IF IMAGE IS REAL
        # ==================================================
        if real_score > 90:

            return jsonify({

                "real": round(real_score, 2),

                "ai": 0,

                "morphed": 0,

                "stage1Prediction": "real",

                "stage2Prediction": None,

                "finalLabel": "real",

                "confidence": round(
                    stage1_confidence,
                    2
                )
            })

        # ==================================================
        # STAGE 2 : AI vs MORPHED
        # ==================================================
        stage2_prediction = stage2_model.predict(img)[0]

        stage2_confidence = float(
            np.max(stage2_prediction) * 100
        )

        stage2_idx = int(
            np.argmax(stage2_prediction)
        )

        stage2_label = STAGE2_CLASSES[
            stage2_idx
        ]

        ai_score = float(
            stage2_prediction[0] * 100
        )

        morphed_score = float(
            stage2_prediction[1] * 100
        )

        # -------------------------
        # FINAL CONFIDENCE
        # -------------------------
        final_confidence = (
            stage1_confidence +
            stage2_confidence
        ) / 2

        # -------------------------
        # LOW CONFIDENCE
        # -------------------------
        if final_confidence < 70:

            final_label = "uncertain"

        else:

            final_label = stage2_label

        # -------------------------
        # RETURN RESPONSE
        # -------------------------
        return jsonify({

            "real": round(real_score, 2),

            "ai": round(ai_score, 2),

            "morphed": round(morphed_score, 2),

            "stage1Prediction": stage1_label,

            "stage2Prediction": stage2_label,

            "finalLabel": final_label,

            "confidence": round(
                final_confidence,
                2
            )
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":

    app.run(debug=True)
'''

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from tensorflow.keras.models import load_model, Model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

from mtcnn import MTCNN

import tensorflow as tf
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)

# =====================================================
# LOAD MODELS
# =====================================================
stage1_model = None
stage2_model = None

def get_stage1():
    global stage1_model
    if stage1_model is None:
        stage1_model = load_model(
            "models/stage1_real_fake.keras",
            compile=False
        )
    return stage1_model

def get_stage2():
    global stage2_model
    if stage2_model is None:
        stage2_model = load_model(
            "models/stage2_ai_morphed.keras",
            compile=False
        )
    return stage2_model
stage1_model = get_stage1()
stage2_model = get_stage2()
# =====================================================
# FACE DETECTOR
# =====================================================
detector = None

def get_detector():
    global detector
    if detector is None:
        detector = MTCNN()
    return detector

# =====================================================
# CLASS LABELS
# =====================================================
STAGE1_CLASSES = ['fake', 'real']

STAGE2_CLASSES = ['ai', 'morphed']

# =====================================================
# FOLDERS
# =====================================================
UPLOAD_FOLDER = "uploads"

HEATMAP_FOLDER = "heatmaps"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

os.makedirs(
    HEATMAP_FOLDER,
    exist_ok=True
)

# =====================================================
# PREPROCESS STAGE 1
# =====================================================
def preprocess_stage1(path):

    img = cv2.imread(path)

    if img is None:
        raise ValueError("Invalid image")

    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    img = cv2.resize(
        img,
        (224,224)
    )

    img = preprocess_input(
        img.astype("float32")
    )

    return np.expand_dims(
        img,
        axis=0
    )

# =====================================================
# PREPROCESS STAGE 2
# =====================================================
def preprocess_stage2(path):

    img = cv2.imread(path)

    if img is None:
        raise ValueError("Invalid image")

    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    faces = get_detector().detect_faces(img)

    # Face crop
    if len(faces) > 0:

        x, y, w, h = faces[0]['box']

        x = max(0, x)
        y = max(0, y)

        img = img[
            y:y+h,
            x:x+w
        ]

    img = cv2.resize(
        img,
        (224,224)
    )

    img = preprocess_input(
        img.astype("float32")
    )

    return np.expand_dims(
        img,
        axis=0
    )

# =====================================================
# GENERATE GRAD-CAM HEATMAP
# =====================================================
def generate_gradcam(
    model,
    img_array,
    original_path,
    output_path
):

    # LAST CONVOLUTION LAYER
    last_conv_layer_name = "Conv_1"

    base_model = model.layers[0]

    classifier_input = tf.keras.Input(
        shape=(7, 7, 1280)
    )

    x = classifier_input

    for layer in model.layers[1:]:

        x = layer(x)

    classifier_model = Model(
        classifier_input,
        x
    )

    last_conv_layer = base_model.get_layer(
        last_conv_layer_name
    )

    grad_model = Model(
        inputs=base_model.input,
        outputs=last_conv_layer.output
    )

    with tf.GradientTape() as tape:

        conv_outputs = grad_model(
            img_array
        )

        tape.watch(conv_outputs)

        predictions = classifier_model(
            conv_outputs
        )

        class_idx = tf.argmax(
            predictions[0]
        )

        loss = predictions[:, class_idx]

    grads = tape.gradient(
        loss,
        conv_outputs
    )

    pooled_grads = tf.reduce_mean(
        grads,
        axis=(0,1,2)
    )

    conv_outputs = conv_outputs[0]

    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]

    heatmap = tf.squeeze(
        heatmap
    )

    heatmap = np.maximum(
        heatmap,
        0
    )

    heatmap = heatmap / np.max(
        heatmap
    )

    original_img = cv2.imread(
        original_path
    )

    original_img = cv2.resize(
        original_img,
        (224,224)
    )

    heatmap = cv2.resize(
        heatmap,
        (
            original_img.shape[1],
            original_img.shape[0]
        )
    )

    heatmap = np.uint8(
        255 * heatmap
    )

    heatmap = cv2.applyColorMap(
        heatmap,
        cv2.COLORMAP_JET
    )

    superimposed_img = cv2.addWeighted(
        original_img,
        0.6,
        heatmap,
        0.4,
        0
    )

    cv2.imwrite(
        output_path,
        superimposed_img
    )

# =====================================================
# HOME
# =====================================================
@app.route("/")
def home():

    return "2-Stage AI Detection Server Running"

# =====================================================
# SERVE HEATMAPS
# =====================================================
@app.route('/heatmaps/<filename>')
def serve_heatmap(filename):

    return send_from_directory(
        HEATMAP_FOLDER,
        filename
    )

# =====================================================
# PREDICT
# =====================================================
@app.route("/predict", methods=["POST"])
def predict():

    try:
          # DELETE OLD HEATMAPS
        for old_file in os.listdir(HEATMAP_FOLDER):

            old_file_path = os.path.join(
                HEATMAP_FOLDER,
                old_file
            )

            if os.path.isfile(old_file_path):

                os.remove(old_file_path)
        # =====================================================
        # CHECK IMAGE
        # =====================================================
        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]

        # =====================================================
        # SAVE IMAGE
        # =====================================================
        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(file_path)

        # =====================================================
        # STAGE 1
        # =====================================================
        img_stage1 = preprocess_stage1(
            file_path
        )

        stage1_prediction = stage1_model.predict(
            img_stage1
        )[0]

        fake_score = float(
            stage1_prediction[0] * 100
        )

        real_score = float(
            stage1_prediction[1] * 100
        )

        # =====================================================
        # REAL IMAGE
        # =====================================================
        if real_score >= 70:

            heatmap_filename = (
                f"heatmap_{file.filename}"
            )

            heatmap_path = os.path.join(
                HEATMAP_FOLDER,
                heatmap_filename
            )

            generate_gradcam(
                stage1_model,
                img_stage1,
                file_path,
                heatmap_path
            )

            return jsonify({

                "real": round(real_score, 2),

                "ai": round(
                    (100-real_score)/2,
                    2
                ),

                "morphed": round(
                    (100-real_score)/2,
                    2
                ),

                "finalLabel": "real",

                "confidence": round(
                    real_score,
                    2
                ),

                "heatmap":
                f"{request.host_url}heatmaps/{heatmap_filename}"
            })

        # =====================================================
        # UNCERTAIN
        # =====================================================
        if fake_score < 70:

            uncertain_part = fake_score / 2

            heatmap_filename = (
                f"heatmap_{file.filename}"
            )

            heatmap_path = os.path.join(
                HEATMAP_FOLDER,
                heatmap_filename
            )

            generate_gradcam(
                stage1_model,
                img_stage1,
                file_path,
                heatmap_path
            )

            return jsonify({

                "real": round(real_score, 2),

                "ai": round(
                    uncertain_part,
                    2
                ),

                "morphed": round(
                    uncertain_part,
                    2
                ),

                "finalLabel": "uncertain",

                "confidence": round(
                    max(real_score, fake_score),
                    2
                ),

                "heatmap":
                f"{request.host_url}heatmaps/{heatmap_filename}"
            })

        # =====================================================
        # STAGE 2
        # =====================================================
        img_stage2 = preprocess_stage2(
            file_path
        )

        stage2_prediction = stage2_model.predict(
            img_stage2
        )[0]

        ai_score = float(
            stage2_prediction[0] * 100
        )

        morphed_score = float(
            stage2_prediction[1] * 100
        )

        final_confidence = max(
            ai_score,
            morphed_score
        )

        final_label = STAGE2_CLASSES[
            np.argmax(stage2_prediction)
        ]

        # =====================================================
        # GENERATE HEATMAP
        # =====================================================
        heatmap_filename = (
            f"heatmap_{file.filename}"
        )

        heatmap_path = os.path.join(
            HEATMAP_FOLDER,
            heatmap_filename
        )

        generate_gradcam(
            stage2_model,
            img_stage2,
            file_path,
            heatmap_path
        )

        # =====================================================
        # RESPONSE
        # =====================================================
        return jsonify({

            "real": round(real_score, 2),

            "ai": round(ai_score, 2),

            "morphed": round(
                morphed_score,
                2
            ),

            "finalLabel": final_label,

            "confidence": round(
                final_confidence,
                2
            ),

            "heatmap":
            f"{request.host_url}heatmaps/{heatmap_filename}"
        })

    except Exception as e:

        import traceback

        print("\n\n===== ERROR START =====")
        traceback.print_exc()
        print("===== ERROR END =====\n\n")

        return jsonify({
            "error": str(e)
        }), 500
    
    finally:

        if (
            file_path and
            os.path.exists(file_path)
        ):

            os.remove(file_path)
# =====================================================
# RUN SERVER
# =====================================================
if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000, debug=True)
