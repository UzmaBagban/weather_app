from flask import Flask, render_template, request, jsonify
import requests
import pandas as pd
from datetime import datetime, timedelta

app = Flask(__name__)

def get_weather(location, api_key, date1=None, date2=None):
    if date1 and date2:  # Check if both start and end dates are provided
        start_date = date1
        end_date = date2
    else:
        # If no start or end date is provided, set both to the current date
        start_date = datetime.now().strftime("%Y-%m-%d")
        end_date = datetime.now().strftime("%Y-%m-%d")

    url = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/{start_date}/{end_date}?key={api_key}&contentType=json"
    
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error fetching weather data:", response.text)
        return None

def suggest_events(weather_data):
    # Example event suggestion logic based on weather conditions
    suggestions = []
    for day in weather_data.get('days', []):
        # Check weather conditions for each day and suggest events accordingly
        if day['conditions'] == 'Clear':
            suggestions.append("Picnic in the park")
            suggestions.append("Outdoor yoga")
            suggestions.append("Hiking")
            suggestions.append("Outdoor sports (e.g., soccer, basketball)")
        elif day['conditions'] == 'Rain':
            suggestions.append("Indoor movie night")
            suggestions.append("Cooking or baking session")
            suggestions.append("Board games or puzzles")
            suggestions.append("Visit a museum or art gallery")
        else:
            suggestions.append("Explore outdoor markets")
            suggestions.append("Cycling")
            suggestions.append("Botanical garden visit")
            suggestions.append("Outdoor concert or event")

    return suggestions

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather')
def weather():
    location = request.args.get('location')
    date1 = request.args.get('date1')
    date2 = request.args.get('date2')

    api_key = "98WPV7T9WKHU4GC58Z5SCWL3K"  # Your Visual Crossing Weather API key
    weather_data = get_weather(location, api_key, date1, date2)
    
    if weather_data:
        for day in weather_data['days']:
            day['events'] = suggest_events({'days': [day]})
        
        # Convert weather data to DataFrame
        df = pd.DataFrame(weather_data['days'])
        
        # Selecting columns and rearranging them
        columns_reordered = ['datetime', 
                             'tempmax', 'tempmin', 'temp', 
                             'dew', 'humidity', 'snow',
                             'snowdepth', 'windgust', 'windspeed', 'winddir', 
                             'pressure', 'cloudcover', 'visibility', 
                             'sunrise', 'sunset', 'moonphase',
                             'snowdepth', 'windgust', 'windspeed', 'winddir', 
                             'solarradiation', 'solarenergy', 'uvindex', 'severerisk']
        
        # Convert reordered DataFrame to HTML table
        weather_table_html = df[columns_reordered].to_html(index=False)
        
        return jsonify({'days': weather_data['days'], 'weather_table': weather_table_html})
    else:
        return jsonify({'error': 'No weather data available'})

if __name__ == "__main__":
    app.run(debug=True)
