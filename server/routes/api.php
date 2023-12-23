<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskContoller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(["middleware" => "auth:api", "prefix" => "user"], function () {
    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);
    Route::get("profile", [AuthController::class, "profile"]);
    Route::get("tasks", [TaskContoller::class, "tasks"]);
    Route::get("markAsDone/{task_id}", [TaskContoller::class, "markAsDone"]);

    Route::group(["prefix" => "employer", "middleware" => "employer.valid"], function () {
        Route::get("create", [TaskContoller::class, "create"]);
        Route::get("edit/{task_id}", [TaskContoller::class, "edit"]);
        Route::get("delete/{task_id}", [TaskContoller::class, "delete"]);
    });
});

Route::post("login", [AuthController::class, "login"]);
Route::post("register", [AuthController::class, "register"]);