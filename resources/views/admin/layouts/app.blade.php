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
                @yield('content')
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
