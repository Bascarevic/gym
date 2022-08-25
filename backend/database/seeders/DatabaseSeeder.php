<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Reservation;
use App\Models\Training;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        UserRole::truncate();
        User::truncate();
        Training::truncate();
        Reservation::truncate();
/*
        $admin= UserRole::factory()->create([
            'role_name' => 'admin'
        ]);
*/
        User::factory()->create([
            'name_and_surname'=>"Admin Admin",
            'email'=>"admin@admin.com",
            'user_role'=>'admin',
        ]);
        /*
        UserRole::factory()->create([
            'role_name' => 'user'
        ]);
*/
/*
        Reservation::factory()->create([
            'id_user'=>1,
            'id_training'=>14
        ]);
        Reservation::factory()->create([
            'id_user'=>1,
            'id_training'=>8
        ]);
        */
       // Training::factory()->count(10)->create();


        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
