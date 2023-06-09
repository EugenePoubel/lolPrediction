<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Symfony\Component\Routing\Annotation\Route;

class WinrateController extends AbstractController
{

    #[Route('/api/winrate', name: 'calculate_winrate', methods: ['POST'])]
    public function calculateWinrate(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        error_log(json_encode($data));
        $championsTeam1 = implode(',', $data['team1']); // Assuming this is an array
        error_log('championsTeam1 : ' . $championsTeam1);
        $championsTeam2 = implode(',', $data['team2']); // Assuming this is an array
        error_log('championsTeam2 : ' . $championsTeam2);

        $process = new Process(['/data/lolprediction-docker/miniconda/back-end/bin/python3', 'Script/test_model.py', $championsTeam1, $championsTeam2, json_encode($data["advancedOptions"])]);
        $process->run();


        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $output = $process->getOutput();
        error_log('Output : ' . $output);
        $winrate = json_decode($output, true); // Assuming your Python script returns JSON*/

        return new JsonResponse($winrate);
    }
}