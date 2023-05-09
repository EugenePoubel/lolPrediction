<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class WinrateController
{
    #[Route('/api/winrate', name: 'calculate_winrate', methods: ['POST'])]
    public function calculateWinrate(Request $request): JsonResponse
    {
        // Récupération du contenu de la requête
        $data = json_decode($request->getContent(), true);

        // Vérification des données reçues
        if (!isset($data['team1'], $data['team2'])) {
            return new JsonResponse(['error' => 'Invalid data'], 400);
        }

        // Ici, vous pouvez utiliser vos données pour calculer les winrates
        // Pour l'instant, je vais juste retourner les champions de chaque équipe

        $response = [
            'team1Champions' => $data['team1'],
            'team2Champions' => $data['team2'],
        ];
        return new JsonResponse($response);
    }
}