import json
import pandas as pd
import sys

good_with = pd.read_csv('Good_with.csv')
strong_against = pd.read_csv('Strong_against.csv')
role = pd.read_csv('Role.csv')

team1 = sys.argv[1]
team1 = team1.split(",")
team2 = sys.argv[2]
team2 = team2.split(",")

if team2 == ['']:
    team2 = []


team1_top = False
team1_jungle = False
team1_mid = False
team1_adc = False
team1_support = False

team2_top = False
team2_jungle = False
team2_mid = False
team2_adc = False
team2_support = False

list_of_dicts = []

for champion in team1:
    for index, row in role.iterrows():
        if row['Champion'] == champion.lower():
            column_name = row.index[row == True][0]
            break
    if column_name == 'Top':
        team1_top = True
    elif column_name == 'Jungle':
        team1_jungle = True
    elif column_name == 'Mid':
        team1_mid = True
    elif column_name == 'ADC':
        team1_adc = True
    elif column_name == 'Support':
        team1_support = True

for champion in team2:
    for index, row in role.iterrows():
        if row['Champion'] == champion.lower():
            column_name = row.index[row == True][0]
            break
    if column_name == 'Top':
        team2_top = True
    elif column_name == 'Jungle':
        team2_jungle = True
    elif column_name == 'Mid':
        team2_mid = True
    elif column_name == 'ADC':
        team2_adc = True
    elif column_name == 'Support':
        team2_support = True

if (len(team1) == 1 and len(team2) in [0,1]) or (len(team1) == 3 and len(team2) in [2,3]) or (len(team1) == 5):
    last_pick = team1[-1]
    for i in team2:
        reco = good_with[good_with['Good_with'] == i.lower()]
        reco_dict = reco.dropna(axis=1).iloc[0].to_dict()
        for name in team1 + team2:
            reco_dict.pop(name, None)
        keys_list = list(reco_dict.keys())[1:]
        for name in keys_list:
            roles = role[role['Champion'] == name.lower()]
            true_role = roles.iloc[:, 1:].idxmax(axis=1).values[0]
            if true_role == 'Top' and team2_top:
                reco_dict.pop(name, None)
            elif true_role == 'Jungle' and team2_jungle:
                reco_dict.pop(name, None)
            elif true_role == 'Mid' and team2_mid:
                reco_dict.pop(name, None)
            elif true_role == 'ADC' and team2_adc:
                reco_dict.pop(name, None)
            elif true_role == 'Support' and team2_support:
                reco_dict.pop(name, None)
        list_of_dicts.append(reco_dict)

    for j in team1:
        reco = strong_against[strong_against['Strong_against'] == j.lower()]
        reco_dict = reco.dropna(axis=1).iloc[0].to_dict()
        for name in team1 + team2:
            reco_dict.pop(name, None)
        keys_list = list(reco_dict.keys())[1:]
        for name in keys_list:
            roles = role[role['Champion'] == name.lower()]
            true_role = roles.iloc[:, 1:].idxmax(axis=1).values[0]
            if true_role == 'Top' and team2_top:
                reco_dict.pop(name, None)
            elif true_role == 'Jungle' and team2_jungle:
                reco_dict.pop(name, None)
            elif true_role == 'Mid' and team2_mid:
                reco_dict.pop(name, None)
            elif true_role == 'ADC' and team2_adc:
                reco_dict.pop(name, None)
            elif true_role == 'Support' and team2_support:
                reco_dict.pop(name, None)
        list_of_dicts.append(reco_dict)
else:
    last_pick = team2[-1]
    for i in team1:
        reco = good_with[good_with['Good_with'] == i.lower()]
        reco_dict = reco.dropna(axis=1).iloc[0].to_dict()
        for name in team1 + team2:
            reco_dict.pop(name, None)
        keys_list = list(reco_dict.keys())[1:]
        for name in keys_list:
            roles = role[role['Champion'] == name.lower()]
            true_role = roles.iloc[:, 1:].idxmax(axis=1).values[0]
            if true_role == 'Top' and team1_top:
                reco_dict.pop(name, None)
            elif true_role == 'Jungle' and team1_jungle:
                reco_dict.pop(name, None)
            elif true_role == 'Mid' and team1_mid:
                reco_dict.pop(name, None)
            elif true_role == 'ADC' and team1_adc:
                reco_dict.pop(name, None)
            elif true_role == 'Support' and team1_support:
                reco_dict.pop(name, None)
        list_of_dicts.append(reco_dict)
    for j in team2:
        reco = strong_against[strong_against['Strong_against'] == j.lower()]
        reco_dict = reco.dropna(axis=1).iloc[0].to_dict()
        for name in team1 + team2:
            reco_dict.pop(name, None)
        keys_list = list(reco_dict.keys())[1:]
        for name in keys_list:
            roles = role[role['Champion'] == name.lower()]
            true_role = roles.iloc[:, 1:].idxmax(axis=1).values[0]
            if true_role == 'Top' and team1_top:
                reco_dict.pop(name, None)
            elif true_role == 'Jungle' and team1_jungle:
                reco_dict.pop(name, None)
            elif true_role == 'Mid' and team1_mid:
                reco_dict.pop(name, None)
            elif true_role == 'ADC' and team1_adc:
                reco_dict.pop(name, None)
            elif true_role == 'Support' and team1_support:
                reco_dict.pop(name, None)
        list_of_dicts.append(reco_dict)
"""
print(team1_top, team1_jungle, team1_mid, team1_adc, team1_support)
print(team2_top, team2_jungle, team2_mid, team2_adc, team2_support)
"""
json_str = json.dumps(list_of_dicts)
print(json_str)