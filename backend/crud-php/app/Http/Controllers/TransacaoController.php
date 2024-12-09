<?php

namespace App\Http\Controllers;

use App\Models\Transacao;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TransacaoController extends Controller
{
    // Exibe todas as transações
    public function index()
    {
        $transacoes = Transacao::with('categoria')->get();

        return response()->json([
            'status' => true,
            'message' => 'Lista de transações',
            'data' => $transacoes,
        ], 200);
    }

    // Cria uma nova transação
    public function store(Request $request)
    {
        // Validação dos dados recebidos
        $validated = $request->validate([
            'descricao' => 'required|string|max:255',
            'valor' => 'required|numeric',
            'tipo' => 'required|in:Despesa,Receita',
            'idCategoria' => 'required|exists:categorias,id', // Certifica-se de que o idCategoria existe
            'data' => 'required|date',
        ]);

        try {
            // Convertendo a data para o formato correto
            $validated['data'] = Carbon::parse($validated['data'])->format('Y-m-d H:i:s');

            // Criação da transação
            $transacao = Transacao::create($validated);

            return response()->json([
                'status' => true,
                'message' => 'Transação criada com sucesso!',
                'data' => $transacao,
            ], 201);
        } catch (\Exception $e) {
            // Log do erro
            Log::error('Erro ao criar transação: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Erro ao criar transação.',
            ], 500);
        }
    }

    // Exibe uma transação específica com a categoria associada
    public function show($id)
    {
        try {
            $transacao = Transacao::with('categoria')->findOrFail($id);

            return response()->json([
                'status' => true,
                'message' => 'Transação encontrada',
                'data' => $transacao,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Transação não encontrada.',
            ], 404);
        }
    }

    // Atualiza uma transação existente
    public function update(Request $request, $id)
    {
        // Log dos dados recebidos para depuração
        Log::info('Dados recebidos para atualizar a transação: ', $request->all());

        // Validação dos dados recebidos
        $validated = $request->validate([
            'descricao' => 'required|string|max:255',
            'valor' => 'required|numeric',
            'tipo' => 'required|in:Despesa,Receita',
            'idCategoria' => 'required|exists:categorias,id',
            'data' => 'required|date',
        ]);

        try {
            // Busca e atualização da transação
            $transacao = Transacao::findOrFail($id);
            $validated['data'] = Carbon::parse($validated['data'])->format('Y-m-d H:i:s');
            $transacao->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Transação atualizada com sucesso!',
                'data' => $transacao,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar transação: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Erro ao atualizar transação.',
            ], 500);
        }
    }

    // Deleta uma transação
    public function destroy($id)
    {
        try {
            $transacao = Transacao::findOrFail($id);
            $transacao->delete();

            return response()->json([
                'status' => true,
                'message' => 'Transação excluída com sucesso!',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir transação: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Erro ao excluir transação.',
            ], 500);
        }
    }
}
