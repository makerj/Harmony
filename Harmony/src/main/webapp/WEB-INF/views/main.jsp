<!--
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2015 JunHui Lee <ohenwkgdj@gmail.com>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO. -->
<%@page import="kr.mju.tonic.webhelper.Puzzles"%>
<%@page import="kr.mju.tonic.webhelper.Puzzle"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <!-- Meta Information -->
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="cache-control" content="no-cache" />
    <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/img/favicon.ico"/>
    <title>Harmony #${workspace_id}</title>
    <!-- CSS -->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main/font.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main/common.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main/main.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main/game.css"/>
</head>
<body>
<div class="root">
	<div class="title fontSize3 bold"><p style="display: inline;">Harmony project #${workspace_id}</p></div>
    <div id="shareButton" class="share fontSize3"><i class="fa fa-pulse fa-share"></i>Share</div>
    <div class="scoreContainer">
        <div class="scoreTitle fontSize2">Score</div>
        <div id="score" class="scoreNumber fontSize4">0</div>
    </div>
    <div class="center">
		<div class="playground">
            <div class="puzzleBoxWrap">
            <%for (int i = 0; i < 25; ++i) {%>
                <div class="puzzleBox" data-id="<%=i%>"></div>
            <%}%>
                <div class="clear"></div>
            </div>
        </div>

        <div id="drawer" class="drawer fontSize3 bold ">
            <div id="puzzles">
            <%for (String e : Puzzles.generateDefaultPuzzleTitles()) {%>
            	<div data-song-title="<%=e%>" class="songContainer">
        			<div class="songTitle"><%=e%></div>
        			<div class="songContents">
        			<%for (Puzzle p : Puzzles.generateDefaultPuzzle()) {
        				if (p.getSongTitle().equals(e)) {%>
        				<div class="prototypePuzzle code<%=p.getCode()%>" data-prototype-id="<%=p.getPrototypeId()%>" data-code="<%=p.getCode()%>" data-begin-note="<%=p.getBeginNote()%>" data-end-note="<%=p.getEndNote()%>"><p class="fontSize3">BEG:<%=p.getBeginNote()%><br>END:<%=p.getEndNote()%></p></div>
        			<%}}%>
        			</div>
    			</div>
    		<%}%>
            </div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="playBar">
        <img id="skipBtn_backward" src="resources/img/main/skipBtn_backward.png" alt="skipBtn_backward"/>
        <img id="playBtn" src="resources/img/main/playBtn.png" alt="playBtn"/>
        <img id="skipBtn_forward" src="resources/img/main/skipBtn_forward.png" alt="skipBtn_forward"/>
    </div>
</div>
<!-- Hidden Elements -->
<div id="HiddenElements" style="display: none">
	<form id="ajaxData" action="saveWorkspace" method="post">
        <input id="workspace_id" name="workspace_id" type="hidden" value='${workspace_id}'>
        <input id="savedState" name="savedState" type="hidden" value='${savedState}'>
    </form>
    <%for (Puzzle p : Puzzles.generateDefaultPuzzle()) {%>
    	<audio src="<%=p.getAudioFileURL()%>" data-prototype-id="<%=p.getPrototypeId()%>"></audio>
    <%}%>
</div>
<!-- Script -->
<script src="${pageContext.request.contextPath}/resources/assets/js/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/js/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/js/jquery.ui.touch-punch.min.js"></script> <!-- For mobile Drag&Drop support -->

<script src="${pageContext.request.contextPath}/resources/js/defines.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/util.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/main/types.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/main/game.js"></script>
</body>
</html>