<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class DraftController extends AbstractController
{
    #[Route('/api/draft', name: 'draft', methods: ['POST'])]
    public function index(Request $request): Response
    {
        // Récupérez les paramètres POST du corps de la demande.
        $params = json_decode($request->getContent(), true);

        // Construisez la chaîne de paramètres pour le script Python.
        $team1 = $params['team1'];
        $team2 = $params['team2'];

        // Définissez le chemin vers votre script Python.
        $pythonScriptPath = 'Script/draft.py';

        // Exécutez le script Python avec les paramètres.
        $process = new Process(['python3', $pythonScriptPath, $team1, $team2]);
        $process->run();

        // Vérifiez s'il y a eu une erreur lors de l'exécution du processus.
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        // Retournez la réponse.
        $output = $process->getOutput();
        $winrate = json_decode($output, true); // Assuming your Python script returns JSON*/

        return new JsonResponse($winrate);
    }
}
