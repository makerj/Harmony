<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Harmony home</title>
        <!-- Bootstrap core CSS -->
        <link href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css" rel="stylesheet">
        <!-- Custom styles for this template -->
        <link href="${pageContext.request.contextPath}/resources/css/home.css" rel="stylesheet">
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    </head>
    <body>
        <!-- Wrap all page content here -->
        <div id="wrap">
            <!-- Fixed navbar -->
            <div class="navbar navbar-default navbar-fixed-top rimeback" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Harmony</a>
                    </div>
                    <div class="collapse navbar-collapse">
</div>
                    <!--/.nav-collapse -->
                </div>
            </div>
            <!-- Begin page content -->
            <div class="col-md-12" style="height: 40vh; background-image:url('${pageContext.request.contextPath}/resources/img/mainback.jpg'); background-size:auto"> 
</div>
            <div class="container">
                <div class="page-header"> 
                    <h1>Harmony에 오신 것을 환영합니다</h1>
                    <p>Harmony는 화성학 교육을 위해 만들어진 소프트웨어입니다. 여러분은 Harmony를 통해 다양한 음악 조각들을 갖고노는 게임을 하면서 <b>코드</b>, <b>음정</b>, 그리고 <b>세율</b>에 대해 공부할 수 있습니다</p>
                </div>
                <a class="btn btn-default pull-right btn-lg" href="#open" data-toggle="modal">불러오기</a>
                <a class="btn pull-right btn-lg btn-info" style="margin-right: 1em" href="${pageContext.request.contextPath}/newProject">처음부터</a>
            </div>
            <div class="modal fade pg-show-modal" id="open" tabindex="-1" role="dialog" aria-hidden="true"> 
                <div class="modal-dialog"> 
                    <div class="modal-content"> 
                        <div class="modal-header"> 
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>                             
                            <h4 class="modal-title"><b>프로젝트 불러오기</b></h4> 
                        </div>                         
                        <div class="modal-body"> 
                            <form role="form" action="${pageContext.request.contextPath}/workspace" method="get"> 
                                <div class="form-group"> 
                                    <label class="control-label" for="id">Workspace ID 입력</label>                                     
                                    <input type="text" class="form-control" name="id" placeholder="예: 1234">                                     
                                </div>
                                <input type="submit" class="btn btn-success pull-right" value="불러오기">
                            	<button type="button" class="btn btn-default pull-right" data-dismiss="modal">닫기</button>                                 
                            </form>
                        </div>                         
                        <div class="modal-footer"> 
                        </div>                         
                    </div>                     
                </div>                 
            </div>
        </div>
        <div id="footer">
            <div class="container">
                <p class="text-muted">Copyright 2015 Team Tonic (황보성우, 이준희, 심민찬)</p>
            </div>
        </div>
        <!-- Bootstrap core JavaScript
    ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="${pageContext.request.contextPath}/resources/assets/js/jquery.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.min.js"></script>
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script src="${pageContext.request.contextPath}/resources/assets/js/ie10-viewport-bug-workaround.js"></script>
    </body>
</html>
