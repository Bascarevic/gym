<?php

namespace App\Http\Resources;

use App\Models\UserRole;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'user';

    public function toArray($request) {
        return [
            'id' => $this->resource->id,
            'name_and_surname' => $this->resource->name_and_surname,
            'email' => $this->resource->email,
            'user_role_id' => new UserRoleResource(UserRole::find($this->resource->id_role))
        ];
    }
}
