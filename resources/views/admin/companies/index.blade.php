@extends('admin.layouts.app')

@section('breadcrumbs')
{!!  Breadcrumbs::render('companies')  !!}
@endsection

@section('action')
    <div class="form-group pull-right">
        {{ Form::open(['route' => ['admin.companies.create'], 'method' => 'get', 'class'=>'form-horizontal form-label-left']) }}
        <button type="submit" class="btn btn-primary">
            <i class="fa fa-plus"></i> 追加
        </button>
        {{ Form::close() }}
    </div>
@endsection

@section('content')
  {{-- @include('admin.companies.sections.search') --}}
  <div class="row">
      <table class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0"
            width="100%">
          <thead>
          <tr>
              <th>@sortablelink('id', 'ID', ['page' => $companies->currentPage()])</th>
              <th>@sortablelink('name', '名前', ['page' => $companies->currentPage()])</th>
              <th>@sortablelink('contract_status', '契約状況', ['page' => $companies->currentPage()])</th>
              <th>@sortablelink('contract_date', '契約日', ['page' => $companies->currentPage()])</th>
              <th>@sortablelink('cancel_date', '解約日', ['page' => $companies->currentPage()])</th>
              <th>@sortablelink('created_at', '作成日', ['page' => $companies->currentPage()])</th>
              <th>@sortablelink('updated_at', '更新日', ['page' => $companies->currentPage()])</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          @foreach($companies as $company)
              <tr>
                  <td>{{ $company->id }}</td>
                  <td>{{ $company->name }}</td>
                  <td>{{ $company->contract_status }}</td>
                  <td>{{ $company->contract_date }}</td>
                  <td>{{ $company->cancel_status }}</td>
                  <td>{{ $company->created_at }}</td>
                  <td>{{ $company->updated_at }}</td>
                  <td>
                      {{-- @if ($company->permission->id >= Auth::company()->permission->id) --}}
                          <a class="btn btn-xs btn-info" href="{{ route('admin.companies.edit', [$company->id]) }}" data-toggle="tooltip" data-placement="top" data-title="編集">
                              <i class="fa fa-pencil"></i>
                          </a>
                      {{-- @endif --}}
                  </td>
              </tr>
          @endforeach
          </tbody>
      </table>
      <div class="pull-right">
          {{ $companies->links() }}
      </div>
  </div>
@endsection