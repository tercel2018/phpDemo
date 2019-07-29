function Position(){
    this.addListener();
    // this.load();
};
let temp = `
<div class="row">
<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
  <h1 class="page-header">海洋生物</h1>

  <div class="row placeholders">
    <div class="col-xs-6 col-sm-3 placeholder">
      <img src="/img/11.jpg" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail" style="width:200px;height:200px;">
      <h4>水母</h4>
      <span class="text-muted">Something else</span>
    </div>
    <div class="col-xs-6 col-sm-3 placeholder">
      <img src="/img/12.jpg" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail" style="width:200px;height:200px;">
      <h4>蓝鲸</h4>
      <span class="text-muted">Something else</span>
    </div>
    <div class="col-xs-6 col-sm-3 placeholder">
      <img src="/img/13.jpg" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail" style="width:200px;height:200px;">
      <h4>鱼</h4>
      <span class="text-muted">Something else</span>
    </div>
    <div class="col-xs-6 col-sm-3 placeholder">
      <img src="/img/14.jpg" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail" style="width:200px;height:200px;">
      <h4>海豚</h4>
      <span class="text-muted">Something else</span>
    </div>
  </div>
  <h2 class="sub-header">动物信息
      <button  data-toggle="modal" data-target="#addPost"
       class="btn btn-primary btn-add-pos navbar-right" style="margin-right:55px;">新添动物信息</button>
  </h2>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>照片</th>
          <th>名称</th>
          <th>入园时间</th>
          <th>吃什么</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr>
          <td><img src="/img/11.jpg"></td>
          <td>袋鼠</td>
          <td>20180808</td>
          <td>草</td>
          <td><button  >修改</button>&nbsp;<button class="">删除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>


`;

Position.paginationTemplate = `
<% for (var i = 1; i <= totalPages; i++)  {%>
    <li class="<%= currentPage == i ? 'active' : '' %>"><a href="#"><%= i %></a></li>
<% } %>
`


Position.listInfoTeplate = `
<% for(var i = 0; i< positions.length;i++) {%>
    <tr>
        <td><img src="../img/<%= positions[i].photos%>" alt="" style="width:60px"> 图片</td>
        <td><%= positions[i].name %></td>
        <td><%= positions[i].times %></td>
        <td><%= positions[i].eat %></td>
        <td><a href="">修改</a>&nbsp;<a href="javascript:void(0)" class="delete" >删_除</a></td>
      </tr>
    <%} %>
`;

$.extend(Position.prototype,{
    loads(){
        $(".addDom").html(temp);
        $.getJSON("/positions/list",data=>{
          const positions = data.res_body.data;
          console.log(positions,'++++');
          const html = ejs.render(Position.listInfoTeplate,{positions});
          $(".tbody").html(html);
            $(".animal-pavilion").children().removeClass("active");
            $(".sea").parent().addClass("active");
            $(".delete").on("click",this.delete)
        })
       // console.log($(".btns-add-pos")[0]);
    },
    load(){
      this.loadByPage(1);
  },
    loadByPage(event){
      console.log("ss")
      let page;
      if (typeof event === "number") // 直接传递页码
        page = event;
      else { // 获取待加载页码
      console.log(event.target)
      page = $(event.target).text();
      }
      $.getJSON("/positions/list?page="+page,data=>{


          //显示页码数据
          const pagination = ejs.render(Position.paginationTemplate, {totalPages: data.res_body.totalPages, currentPage : page})
          $(".nav-sidebar").html(pagination);
      })
  },
      addListener(){
        $(".sea").on("click",this.loads);
          $(".delete").on("click",this.delete)
        $(".btns-add-pos").on("click",this.addListPost);
         // 翻页
	    	$(".pagination").on("click", "li", this.loadByPage);
    },
    addListPost(){
        // console.log(aaa);
        $(".btns-add-pos").on("click",function(){
          const formData = new FormData($(".add-position-form").get(0));
        console.log(formData);
           //使用
           $.ajax({
            type:"post",
            url:"/positions/add",
            data:formData,
            processData:false,//静止将data转换为查询字符串
            contentType:false,//不设置contentType
            success:function(data){
                console.log(data);
            },
            dataType:"json"
        });

        });

    },
delete(){
 console.log('ppppppppp')
}

});
new Position();
