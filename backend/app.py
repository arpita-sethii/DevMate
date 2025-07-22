from flask import Flask, request, jsonify
from flask_cors import CORS
from model.code_interpretor import analyze_code  # ✅ Import here

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    code = file.read().decode('utf-8')

    try:
        result = analyze_code(code)  # ✅ Use your AI here
        return jsonify({'response': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
