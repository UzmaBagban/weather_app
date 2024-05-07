**<h1> Weather Event Recommender</h1>**

This project utilizes the Visual Crossing Weather API to fetch weather data for a specified location and date range. Based on the weather conditions, it suggests events that users might enjoy.

**<h1>Visual Crossing Weather API</h1>**

The Visual Crossing Weather API provides developers with weather data for various programming languages and scripts. It offers instant and scalable access to historical weather reports and forecasts in user-friendly JSON or text formats.

* **More Information:** [https://www.visualcrossing.com/resources/documentation/weather-api/weather-api-documentation/](https://www.visualcrossing.com/resources/documentation/weather-api/weather-api-documentation/)
* **Sign Up for Free Account:** [https://www.visualcrossing.com/](https://www.visualcrossing.com/)
* **API Documentation:** [https://www.visualcrossing.com/resources/documentation/weather-api/weather-api-documentation/](https://www.visualcrossing.com/resources/documentation/weather-api/weather-api-documentation/)
* **Weather Data Elements Documentation:** [https://www.visualcrossing.com/resources/documentation/weather-api/building-and-running-your-first-weather-api-query/](https://www.visualcrossing.com/resources/documentation/weather-api/building-and-running-your-first-weather-api-query/)
* **Weather Data Source:** [https://www.visualcrossing.com/](https://www.visualcrossing.com/)

**<h1>Visual Crossing Weather API Query Builder</h1>**

The Visual Crossing Weather API Query Builder provides a user-friendly interface for exploring, designing, and downloading weather data without writing code: https://www.visualcrossing.com/weather/weather-data-services

Interactive Interface: Build custom weather data queries visually.
Flexible Options: Specify location, date range, and desired weather elements.
Data Previews: Review data before downloading in CSV, Excel, or JSON formats.

**<h1> Project Functionality</h1>**

1. **Data Fetching:**
   - The `get_weather` function in `app.py` constructs a URL using the Visual Crossing Weather API endpoint, location, start and end dates, and your API key.
   - It then makes a GET request using `requests.get()`.

2. **Data Processing:**
   - The function checks the response status code.
   - If successful (code 200), the JSON data is returned.
   - In case of errors, an error message is printed and `None` is returned.

3. **Event Suggestion:**
   - The `suggest_events` function takes the weather data and suggests events based on weather conditions (clear, rain, etc.).

4. **Data Display:**
   - The Flask route `/weather` processes user requests.
   - Weather data is converted to a Pandas DataFrame for easier manipulation.
   - The DataFrame is transformed and converted to an HTML table using `to_html()`.
   - The route returns a JSON response containing the weather data and the HTML table.

5. **Frontend Interaction:**
   - `script.js` listens for form submissions.
   - It collects location and date inputs and sends them to the backend using a fetch request.
   - Upon receiving the JSON response, it dynamically updates the HTML content to display the weather forecast, suggested events, and weather data tables.

