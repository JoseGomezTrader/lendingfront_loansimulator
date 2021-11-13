from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/loan_decision', methods=["POST"])
def loan_decision():
    requested_amount = int(request.json["requestedAmount"])
    if(requested_amount > 50000):
        return jsonify({'status':"Declined"})
    elif(requested_amount == 50000):
        return jsonify({'status':"Undecided"})
    elif(requested_amount < 50000):
        return jsonify({'status':"Approved"})



if __name__ == "__main__":
    app.run(debug=True)