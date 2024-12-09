<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
{
    Schema::create('transacoes', function (Blueprint $table) {
        $table->id();
        $table->string('descricao', 255);
        $table->decimal('valor', 10, 2);
        $table->enum('tipo', ['Despesa', 'Receita']);
        $table->unsignedBigInteger('idCategoria');
        $table->date('data');
        $table->timestamps();

        // Definindo a chave estrangeira
        $table->foreign('idCategoria')->references('id')->on('categorias')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transacoes');
    }
};
