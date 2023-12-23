<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id', 'is_done', 'due_date', 'title', 'description',
    ];

    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    public function getStateAttribute()
    {
        if ($this->is_done) {
            return 'Done';
        } elseif ($this->due_date >= now()->toDateString()) {
            return 'In Progress';
        } else {
            return 'Late';
        }
    }
}
