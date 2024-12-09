<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSessionsTable extends Migration
{
    /**
     * Execute a migração.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); // ID da sessão (chave primária)
            $table->text('payload'); // Dados da sessão serializados
            $table->integer('last_activity'); // Timestamp da última atividade
            $table->timestamps(0); // Cria as colunas 'created_at' e 'updated_at' (se necessário)
        });
    }

    /**
     * Reverter a migração.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
}
