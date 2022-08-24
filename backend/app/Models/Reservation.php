<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_training'
    ];

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function training()
    {
        return $this->hasMany(Training::class);
    }
}
