<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransacaoController;
use App\Http\Controllers\CategoriaController;

// Rota para categorias
Route::prefix('categorias')->group(function () {
    Route::get('/', [CategoriaController::class, 'index']);
    Route::get('/{id}', [CategoriaController::class, 'show']);
    Route::post('/', [CategoriaController::class, 'store']);
    Route::delete('/{id}', [CategoriaController::class, 'destroy']);
});

// Rota para transações
Route::prefix('transacoes')->group(function () {
    Route::get('/', [TransacaoController::class, 'index']);
    Route::get('/{id}', [TransacaoController::class, 'show']);
    Route::put('/{id}', [TransacaoController::class, 'update']);
    Route::post('/', [TransacaoController::class, 'store']);
    Route::delete('/{id}', [TransacaoController::class, 'destroy']);
});
