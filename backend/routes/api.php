<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UserController;
use App\Http\Resources\TrainingCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
//Route::resource('/trainings', TrainingController::class)->only('index', 'show');
//Route::apiResource('trainings', TrainingController::class);
//Route::resource('/traningsStore', [TrainingController::class, 'store']);
//Route::post('/reservation/{id}', [TrainingController::class, 'makeReservation']);
//Route::get('/show/{id}', [TrainingController::class, 'show']);
//ili ApiResource
//Route::apiResource('users', [UserController::class]);
//Route::apiResource('/users', UserController::class); //OVO RADI
//Route::apiResource('/myReservations', ReservationController::class);
//Route::post('/users',[UserController::class, 'store']);
//Route::resource('/usersUpdate', UserController::class)->only('update'); //OVO RADI
//delete jos dodaj!!!!!
//Route::apiResource('/myReservations', [ReservationController::class, 'myReservations']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::apiResource('trainings', TrainingController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/reservation', ReservationController::class);
    //Route::get('myReservation', [ReservationController::class, 'myReservations']); //OVO RADI U POSTMANU
    Route::post('/logout', [AuthController::class, 'logout']);

});

