<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TestController
{

    #[Route('/api/test', name: 'test', methods: ['GET'])]
    public function test(): JsonResponse
    {
        $data = [
            'team1Winrate' => 0.6,
            'team2Winrate' => 0.4,
        ];

        return new JsonResponse($data);
    }
}
