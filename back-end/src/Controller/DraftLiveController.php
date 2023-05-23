<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PredictionLiveController extends AbstractController
{
    #[Route('/api/draftLive', name: 'draftLive', methods: ['POST'])]

    public function index(Request $request): Response
    {
        $api_key = "RGAPI-2b2d0a4a-7f33-4d84-8bdc-9f89994df4ce";
        $summoner_name = $request->get('summoner_name');

        if (!$summoner_name) {
            return $this->json(['error' => 'You must provide a summoner name.'], 400);
        }

        $champions_data = $this->getChampionData();
        $summoner_id = $this->getSummonerId($summoner_name, $api_key);

        if ($summoner_id) {
            $current_game_info = $this->getCurrentGameInfo($summoner_id, $api_key);
            if ($current_game_info) {
                $champion_ids = array_column($current_game_info['participants'], 'championId');
                $champion_names = array_map(function ($champion_id) use ($champions_data) {
                    return $this->getChampionName($champion_id, $champions_data);
                }, $champion_ids);
                return $this->json($champion_names);
            } else {
                return $this->json(['message' => $summoner_name . " is not currently in a game."], 404);
            }
        }

        return $this->json(['error' => 'Summoner not found.'], 404);
    }

    private function getSummonerId($summoner_name, $api_key)
    {
        $url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' . $summoner_name . '?api_key=' . $api_key;
        $response = file_get_contents($url);
        if ($response !== FALSE) {
            $data = json_decode($response, true);
            return $data['id'] ?? null;
        }
        return null;
    }

    private function getCurrentGameInfo($summoner_id, $api_key)
    {
        $url = 'https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' . $summoner_id . '?api_key=' . $api_key;
        $response = file_get_contents($url);
        if ($response !== FALSE) {
            return json_decode($response, true);
        }
        return null;
    }

    private function getChampionData()
    {
        $url = 'https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json';
        $response = file_get_contents($url);
        if ($response !== FALSE) {
            $data = json_decode($response, true);
            return $data['data'];
        }
        return null;
    }

    private function getChampionName($champion_id, $champions_data)
    {
        foreach ($champions_data as $champion) {
            if ((int) $champion['key'] === $champion_id) {
                return $champion['name'];
            }
        }
        return "Champion not found";
    }


}
