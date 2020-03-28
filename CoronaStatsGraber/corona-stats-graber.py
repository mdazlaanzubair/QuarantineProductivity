import requests
from bs4 import BeautifulSoup
import json

# FUNCTION TO FETCH DATA FROM URL
def fetchUrlContent(url):

    # GRABBING CONTENT FROM URL
    plainContent = requests.get(url)

    # CONVERTING PLAIN CONTENT TO HTML CONTENT
    htmlContent = plainContent.content

    # PARSING HTML CONTENT TO SOUP
    soup = BeautifulSoup(htmlContent, 'html.parser')

    # FINDING CORONA STATS INFO TABLE FROM SOUP
    get_stats_table = soup.find('table', {"id": "main_table_countries_today"})

    # FINDING TABLE BODY
    table_body = get_stats_table.find("tbody")

    # LIST OF DICTIONARIES TO COLLECT DATA OF EACH COUNTRY
    coronaData = []

    # GETTING ROWS OF THE TABLE
    for row in table_body.find_all('tr'):

        # COLLECTING ALL TABLE-DATA-CELLS FROM TABLE-ROWS
        cells = row.findAll('td')

        logitutde, latitude = coordinateFinder(cells[0].string)

        # CREATING DICTIONARY OF EACH COUNTRY SEPARATELY
        data = {
            'country': cells[0].string,
            'long': logitutde,
            'lat': latitude,
            'total_cases': cells[1].string,
            'new_cases': cells[2].string,
            'total_deaths': cells[3].string,
            'new_deaths': cells[4].string,
            'total_recovered': cells[5].string,
            'active_cases': cells[6].string,
            'critical_cases': cells[7].string,
            'total_cases_1m_pop': cells[8].string,
            'total_deaths_1m_pop': cells[9].string,
            'first_case_reported': cells[10].string.replace("\n", ""),
        }

        # APPENDING DICTIONARY TO LIST OF CORONA DATA
        coronaData.append(data)

    # CONVERTING DATA TO JSON FORMAT
    json_formatted_str = json.dumps(coronaData, indent=2)
    print(json_formatted_str)

    # WRITING JSON DATA TO FILE
    with open("dataset.json", "w") as outfile:
        outfile.write(json_formatted_str)


def coordinateFinder(country):

    # LOADING ALL COUNTRIES DATA
    with open('countries_coordinates_dataset.json', 'r') as f:
        countries_coordinates_dataset = json.load(f)

    long = "longitude"
    lat = "latitude"

    for j in countries_coordinates_dataset:
        if j['country'] == country:
            long = j["long"]
            lat = j["lat"]
            break
        else:
            pass

    return long, lat


fetchUrlContent("https://www.worldometers.info/coronavirus/#countries")
