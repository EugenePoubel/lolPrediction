import requests


def get_summoner_id(summoner_name, api_key):
    url = f"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner_name}"
    headers = {
        "X-Riot-Token": api_key
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()['id']
    else:
        return None


def get_current_game_info(summoner_id, api_key):
    url = f"https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/{summoner_id}"
    headers = {
        "X-Riot-Token": api_key
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return None


def get_champion_data():
    url = "https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()['data']
    else:
        return None


def get_champion_name(champion_id, champions_data):
    for champion in champions_data.values():
        if int(champion['key']) == champion_id:
            return champion['name']
    return "Champion not found"


def main():
    api_key = "RGAPI-184029c8-c3c6-415a-82e4-983c7e83d0d0"
    summoner_name = "JeanCate"

    champions_data = get_champion_data()

    summoner_id = get_summoner_id(summoner_name, api_key)
    if summoner_id:
        current_game_info = get_current_game_info(summoner_id, api_key)
        if current_game_info:
            champion_ids = [participant['championId'] for participant in current_game_info['participants']]
            champion_names = [get_champion_name(champion_id, champions_data) for champion_id in champion_ids]
            print(champion_names)
        else:
            print(f"{summoner_name} is not currently in a game.")


if __name__ == "__main__":
    main()
