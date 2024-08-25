from flask import Flask, request, jsonify
import json
import pickle
import numpy as np

app = Flask(__name__)

def load_saved_model():
    global __data_columns
    with open("columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        
    global __model
    with open("titanic_model.pickle", 'rb') as f:
        __model = pickle.load(f)

@app.route('/')
def home():
    return "Welcome to the Titanic Survival Prediction API"

@app.route('/get_survival', methods=['POST'])
def get_survival():
    pclass = int(request.form['pclass'])
    age = float(request.form['age'])
    sibsp = int(request.form['sibsp'])
    fare = float(request.form['fare'])
    sex_female = int(request.form['sex_female'])
    sex_male = int(request.form['sex_male'])
    
    X = np.zeros(len(__data_columns))
    X[0] = pclass
    X[1] = age
    X[2] = sibsp
    X[3] = fare
    X[4] = sex_female
    X[5] = sex_male

    prediction = __model.predict([X])[0]
    
    return jsonify({
        'survival_prediction': int(prediction)
    })

if __name__ == "__main__":
    load_saved_model()
    print("Starting Flask server...")
    app.run(debug=True)

