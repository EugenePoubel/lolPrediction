<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Symfony\Component\Routing\Annotation\Route;

class DraftController extends AbstractController
{
    #[Route('/api/draft', name: 'draft', methods: ['POST'])]
    public function index(Request $request): JsonResponse
    {
        // Récupérez les paramètres POST du corps de la demande.
        $params = json_decode($request->getContent(), true);

        // Construisez la chaîne de paramètres pour le script Python.
        $team1 = $params['team1'];
        error_log('Team1 : ' . $team1);
        if ($params['team2'] == ""){
            $team2 = '';
        }else{
            $team2 = $params['team2'];
        }

        error_log('Team2 : ' . $team2);

        // Définissez le chemin vers votrescript Python.
        $pythonScriptPath = 'Script/draft.py';

        // Exécutez le script Python avec les paramètres.
        $process = new Process(['/data/lolprediction-docker/miniconda/back-end/bin/python3', $pythonScriptPath, $team1, $team2]);
        $process->run();

        // Vérifiez s'il y a eu une erreur lors de l'exécution du processus.
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        // Retournez la réponse.
        $output = $process->getOutput();
        error_log('Output : ' . $output);
        $winrate = json_decode($output, true); // Assuming your Python script returns JSON*/

        return new JsonResponse($winrate);
    }
}
