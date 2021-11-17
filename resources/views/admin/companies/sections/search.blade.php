<div class="row">
    <div class="x_panel search_panel">
      <div class="x_title">
        <h2>検索</h2>
        <ul class="nav navbar-right panel_toolbox search_toolbox">
          <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
          <li><a class="close-link"><i class="fa fa-close"></i></a></li>
        </ul>
        <div class="clearfix"></div>
      </div>

      <div class="x_content">
        <form id="demo-form2" data-parsley-validate class="form-inline">

          <div class="search_column">
            <label class="control-label" for="search_id">ID</label>
            <input type="text" id="search_id" name="search_id" value="{{$search['search_id']}}">
          </div>

          <div class="search_column">
            <label class="control-label" for="search_name">名前</label>
            <input type="text" id="search_name" name="search_name" value="{{$search['search_name']}}">
          </div>

          <div class="search_column">
            <label class="control-label" for="search_email">メール</label>
            <input type="text" id="search_name" name="search_email" value="{{$search['search_email']}}">
          </div>

          <div class="search_column">
            <button type="submit" class="btn btn-success">検索</button>
          </div>

        </form>
      </div>
    </div>
</div>
