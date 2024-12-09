<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriaController extends Controller
{
    // Exibe todas as categorias
    public function index()
    {
        $categorias = Categoria::all();

        return response()->json([
            'status' => true,
            'message' => 'Lista de categorias',
            'data' => $categorias,
        ], 200);
    }

    // Cria uma nova categoria
    public function store(Request $request)
    {
        // Validação para garantir que o campo 'nome' seja fornecido
        $request->validate([
            'nome' => 'required|string|max:50',  // Validação do campo 'nome'
        ]);

        // Criação da categoria
        $categoria = Categoria::create([
            'nome' => $request->nome,  // Atributo 'nome' correspondente na tabela 'categorias'
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Categoria criada com sucesso!',
            'data' => $categoria,
        ], 201);
    }

    // Exibe uma categoria específica
    public function show($id)
    {
        $categoria = Categoria::findOrFail($id);

        return response()->json([
            'status' => true,
            'message' => 'Categoria encontrada',
            'data' => $categoria,
        ], 200);
    }

    // Atualiza uma categoria existente
    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required|string|max:50',  // Validação para 'nome'
        ]);

        $categoria = Categoria::findOrFail($id);
        $categoria->update([
            'nome' => $request->nome,  // Atualiza 'nome'
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Categoria atualizada com sucesso!',
            'data' => $categoria,
        ], 200);
    }

    // Deleta uma categoria
    public function destroy($id)
    {
        $categoria = Categoria::findOrFail($id);
        $categoria->delete();

        return response()->json([
            'status' => true,
            'message' => 'Categoria excluída com sucesso!',
        ], 200);
    }
}
