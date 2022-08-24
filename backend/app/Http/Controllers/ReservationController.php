<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Training;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function store(Request $request)
{
    $logged_user = auth()->user();
 

    $training = Training::find($request->id);

    $today = date('Y-m-d');  
    if($today >= $training->time){
        return response()->json(['success' => 'date', 'existed' => false]);
    }

    
    $reservation = Reservation::where('id_user', '=', $logged_user->id)->where('id_training', '=', $training->id)->first();

    if($reservation){
        return response()->json(['success'=>'false', 'existed'=>true]);
    }else{
        $reservation = Reservation::create([
            'id_training'=> $training->id,
            'id_user' => $logged_user->id
        ]);
        $training->update([
            'name'=> $training->name,
            'training_room'=> $training->training_room,
            'capacity'=> $training->capacity - 1,
            'time'=> $training->time
    
        ]);
        return response()->json(['success'=>'true', 'existed'=>'false']);
    }

    
}

public function destroy($trainingId)
{
    $logged_user = auth()->user();
   
    $reservation = Reservation::where('id_user', '=', $logged_user->id)->where('id_training', '=', $trainingId)->first();

    if($reservation!=null){
        $reservation -> delete();
        $training = Training::find($trainingId);

        $training->update([
           'name'=> $training->name,
           'training_room'=> $training->training_room,
           'capacity'=> $training->capacity + 1,
           'time'=> $training->time
   
       ]);
        return response()->json(['success' => 'true', 'training_id' => $trainingId]);
    }
    return response()->json(['success' => 'false', 'training_id' => $trainingId]);
    
}


    public function index (){ 

      $logged_user = auth()->user();

      $trainings = DB::table('trainings')
      ->join('reservations', 'trainings.id', '=', 'reservations.id_training')
      ->select('id_training as id', 'name', 'training_room', 'capacity', 'time')
      ->where('reservations.id_user', '=', $logged_user->id)->get();

        return response()->json($trainings);

    }
}
