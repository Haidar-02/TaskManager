<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
            {
                try {
                    if (!$request->email || !$request->password) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Both email and password are required',
                        ]);
                    }
            
                    $credentials = $request->only('email', 'password');
            
                    if (Auth::attempt($credentials)) {
                        $user = Auth::user();
                        $token = Auth::attempt($credentials);
            
                        return response()->json([
                            'status' => 'success',
                            'user' => $user,
                            'token' => $token,
                        ]);
                    } else {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Wrong email or password',
                        ], 401);
                    }
                } catch (\Exception $e) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Login failed, try again later',
                    ], 500);
                }
            }
        
            public function register(Request $request)
            {
                try {
                    if (!$request->email || !$request->password || !$request->name) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Please fill in all fields',
                        ]);
                    }
                    $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'role_id' => 2,
                    ]);
            
                    return response()->json([
                        'status' => 'success',
                        'message' => 'User created successfully',
                        'user' => $user,
                    ]);
                } catch (\Exception $e) {
                    $existingUser = User::where('email', $request->email)->first();
                    if ($existingUser) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Email already in use',
                        ], 422);
                    }
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Registration failed, try again later',
                    ], 500);
                }
            }
            
        
            public function logout()
            {
                try{
                Auth::logout();
                return response()->json([
                'status' => 'success',
                'message' => 'Successfully logged out',]);
                }catch(\Exception $e){
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Logout failed, try again later',
                    ], 500);
                }
            }
            
            public function refresh()
            {
                try{
                $user = Auth::user();
                $token = Auth::refresh();
        
                return response()->json([
                    'status' => 'success',
                    'user' => $user,
                    'token' => $token,
                ]);
            }catch(\Exception $e){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Refresh failed, try again later',
                ], 500);
            }
            }
}
