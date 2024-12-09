<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categorias';
    protected $fillable = ['nome'];
    public $timestamps = false;

    public function transacoes()
    {
        return $this->hasMany(Transacao::class);
    }
}
