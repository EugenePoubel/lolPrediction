from bs4 import BeautifulSoup
import requests
import pandas as pd
import csv


# Récupération des liens des champions
def url():
    # Récupère le contenu HTML de la page web
    response = requests.get(
        url='https://proxy.scrapeops.io/v1/',
        params={
            'api_key': 'ea786521-3bc8-4901-b362-d554db6abdb7',
            'url': 'https://www.leagueofgraphs.com/fr/champions/counters',
        },
    )
    # Vérifie que la requête a fonctionné
    if response.ok:
        links = []
        soup = BeautifulSoup(response.text, 'html.parser')
        tds = soup.findAll('td', {'class': 'championCell'})
        for td in tds:
            links.append('https://www.leagueofgraphs.com' + td.find('a')['href'])

    # Sauvegarde les liens dans un fichier
    with open('urls.txt', 'w') as file:
        for i in range(0, len(links), 4):
            file.write(links[i] + '\n')


def data():

    with open('urls.txt', 'r') as file:
        outf = pd.read_csv('Strong_against.csv')
        for row in file:
            url = row.strip()
            response = requests.get(
                url='https://proxy.scrapeops.io/v1/',
                params={
                    'api_key': 'ea786521-3bc8-4901-b362-d554db6abdb7',
                    'url': url,
                },
            )
            if response.ok:
                soup = BeautifulSoup(response.text, 'html.parser')
                div = soup.find('div', {'class': 'txt'})
                Champ = div.find('h2').text
                table = soup.find('table', {'class': 'data_table sortable_table'})
                trs = table.findAll('tr', {'class': ''})
                for i in range(1, len(trs)):
                    tds = trs[i].findAll('td')
                    valeur = tds[1].get('data-sort-value')
                    nom = trs[i].find('span', {'class': 'name'}).text
                    # Find the row(s) where Strong_against is equal to Champ
                    champ_rows = outf.loc[outf['Strong_against'] == Champ.replace(',', '')]
                    # Modify the value
                    outf.loc[champ_rows.index, nom] = valeur
                    #print(str(Champ)+' fort contre : ' + str(nom) + ' valeur : ' + str(valeur))
        outf.to_csv('Strong_against.csv', index=False)


def csvStrong():
    data = pd.read_csv('dataset.csv')
    data.sort_values(by=['Champion1_Name'], inplace=True)
    Champions_Names = data['Champion1_Name'].unique()
    with open('Strong_against.csv', 'w') as file:
        file.write('Strong_against,')
        for i in range(0, len(Champions_Names)):
            if i == len(Champions_Names) - 1:
                file.write(Champions_Names[i])
            else:
                file.write(Champions_Names[i] + ',')
        file.write('\n')


def ajoutMilioCol():
    # Open the CSV file for reading
    with open('Strong_against.csv', 'r') as csvfile:
        # Create a CSV reader object
        reader = csv.reader(csvfile)

        # Get the header row and add the new column name
        header = next(reader)
        header.insert(78, 'Milio')

    # Open the CSV file for writing and write the updated rows
    with open('Strong_against.csv', 'w', newline='') as csvfile:
        # Create a CSV writer object
        writer = csv.writer(csvfile)

        # Write the header row
        writer.writerow(header)


def ajoutNom():
    # Read the dataset CSV file and sort by Champion1_Name
    inf = pd.read_csv('dataset.csv')
    inf.sort_values(by=['Champion1_Name'], inplace=True)
    Champions_Names = inf['Champion1_Name'].unique()

    # Read the existing Strong_against CSV file
    outf = pd.read_csv('Strong_against.csv')

    # Loop over the unique Champion1_Name values and append to the Strong_against dataframe
    for name in Champions_Names:
        new_row = {'Strong_against': name}
        # Append the new row to the existing dataframe
        outf = outf._append(new_row, ignore_index=True)

    # Write the updated dataframe to the CSV file
    outf.to_csv('Strong_against.csv', index=False)


def ajoutMilioligne():
    # Read the CSV file into a pandas dataframe
    data = pd.read_csv('Strong_against.csv')

    # Create a new row with the new values
    new_row = pd.DataFrame({'Strong_against': ['Milio']}, index=[0])

    # Split the original dataframe into two parts: the top part before the new row, and the bottom part after the new row
    index = 77  # the index at which to insert the new row
    top = data[:index]
    bottom = data[index:]

    # Combine the three dataframes in the desired order
    new_data = pd.concat([top, new_row, bottom], ignore_index=True)

    # Write the updated dataframe to the CSV file
    new_data.to_csv('Strong_against.csv', index=False)

def reset():
    csvStrong()
    ajoutMilioCol()
    ajoutNom()
    ajoutMilioligne()
