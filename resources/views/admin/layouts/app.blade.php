<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

        {{--Common App Styles--}}
        <link href="{{ asset('css/admin/app.css') }}" rel="stylesheet">

        {{--Styles--}}
        @yield('styles')

        {{-- gentelella Styles --}}
        <link href="{{ asset('css/admin/custom.css') }}" rel="stylesheet">

    </head>
    <body class="@yield('body_class')">
        <div class="container body">
            <div class="main_container">
                @include('admin.layouts.sidebar')
                @include('admin.layouts.navbar')
                
                <div class="right_col" role="main">
                    <div class="page-title">
                        <div class="title_left">
                            @yield('breadcrumbs')
                        </div>
                        <div class="title_right">
                            @yield('action')
                        </div>
                    </div>
                @if(session()->has('message'))
                    @php
                        $alertStyle = "alert-info";
                        if (session()->has('status') && session('status') === false) {
                            $alertStyle = "alert-danger";
                        }
                    @endphp
                    <div style="clear: both"></div>
                    <div class="alert {{$alertStyle}} mb-3">
                        {{session('message')}}
                    </div>
                @endif
                    @yield('content')
                </div>

                @include('admin.layouts.footer')
            </div>
        </div>

        {{--Common Scripts--}}
        <script src="{{ asset('js/admin/app.js') }}" defer></script>

        {{--Scripts--}}
        @yield('scripts')

        {{--gentelella Scripts--}}
        <script src="{{ asset('js/admin/custom.js') }}" defer></script>
    </body>
</html>
