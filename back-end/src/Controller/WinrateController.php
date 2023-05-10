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

$championsTeam1 = implode(',', $data['team1']); // Assuming this is an array
$championsTeam2 = implode(',', $data['team2']); // Assuming this is an array

$advancedOptions = $data['advancedOptions']; // Assuming this is an associative array

$process = new Process(['/data/lolprediction-docker/miniconda/back-end/bin/python3', 'Script/test.py', $championsTeam1, $championsTeam2, json_encode($advancedOptions)]);
$process->run();

// Executes after the command finishes
if (!$process->isSuccessful()) {
throw new ProcessFailedException($process);
}

$output = $process->getOutput();
$winrate = json_decode($output, true); // Assuming your Python script returns JSON

return new JsonResponse($output);
}
}
