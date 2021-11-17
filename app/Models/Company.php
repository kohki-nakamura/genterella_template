<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;

class Company extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'name_kana', 'contract_status', 'contract_date', 'cancel_date', 'created_at', 'updated_at',
    ];

    use Sortable;
    public $sortable = ['id', 'name', 'contract_status', 'contract_date', 'cancel_date', 'created_at', 'updated_at',];

    use HasFactory;
}
