<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'training_room',
        'capacity',
        'time'
    ];

    public function user()
    {
        return $this->hasMany(User::class);
    }
}
