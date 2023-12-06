from flask import Flask, request
import pandas as pd

app = Flask(__name__)

@app.route("/house")
def house():
    df = pd.read_csv('hpp.csv')
    bed = request.args.get('hroom')
    if bed:
        bed_no = int(bed)
    else:
        bed_no = bed
    fetch_data = df[df['Bedrooms'] == bed_no].head(100) 
    price_list = fetch_data['Price'].tolist()
    bedrooms = fetch_data['Bedrooms'].tolist()
    bathrooms = fetch_data['Bathrooms'].tolist()
    square = fetch_data['SquareFeet'].tolist()
    neighbours = fetch_data['Neighborhood'].tolist()

    return {"prices": price_list,"squares":square,"bedrooms":bedrooms,"bathrooms":bathrooms,"neighbors":neighbours}

if __name__ == "__main__":
    app.run(debug=True)
