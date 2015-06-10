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
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main/font.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main/common.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main/main.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/main/game.css"/>
</head>
<body>
<div class="root">
    <div class="title fontSize3 bold"><p style="display: inline;">Harmony project #${workspace_id}</p></div>
    <div class="center">
		<div class="playground">
            <div class="puzzleBoxWrap">
                <div class="puzzleBox" data-id="0"></div>
                <div class="puzzleBox" data-id="1"></div>
                <div class="puzzleBox" data-id="2"></div>
                <div class="puzzleBox" data-id="3"></div>
                <div class="puzzleBox" data-id="4"></div>
                <div class="puzzleBox" data-id="5"></div>
                <div class="puzzleBox" data-id="6"></div>
                <div class="puzzleBox" data-id="7"></div>
                <div class="puzzleBox" data-id="8"></div>
                <div class="puzzleBox" data-id="9"></div>
                <div class="puzzleBox" data-id="10"></div>
                <div class="puzzleBox" data-id="11"></div>
                <div class="puzzleBox" data-id="12"></div>
                <div class="puzzleBox" data-id="13"></div>
                <div class="puzzleBox" data-id="14"></div>
                <div class="puzzleBox" data-id="15"></div>
                <div class="puzzleBox" data-id="16"></div>
                <div class="puzzleBox" data-id="17"></div>
                <div class="puzzleBox" data-id="18"></div>
                <div class="puzzleBox" data-id="19"></div>
                <div class="puzzleBox" data-id="20"></div>
                <div class="puzzleBox" data-id="21"></div>
                <div class="puzzleBox" data-id="22"></div>
                <div class="puzzleBox" data-id="23"></div>
                <div class="puzzleBox" data-id="24"></div>
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
        				<div class="prototypePuzzle code<%=p.getCode()%>" data-prototype-id="<%=p.getPrototypeId()%>" data-code="<%=p.getCode()%>" data-begin-note="<%=p.getBeginNote()%>" data-end-note="<%=p.getEndNote()%>"></div>
        			<%}}%>
        			</div>
    			</div>
    		<%}%>
            </div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="playBar">
        <img id="skipBtn_backward" src="resource/img/main/skipBtn_backward.png" alt="skipBtn_backward"/>
        <img id="playBtn" src="resource/img/main/playBtn.png" alt="playBtn"/>
        <img id="skipBtn_forward" src="resource/img/main/skipBtn_forward.png" alt="skipBtn_forward"/>
    </div>
</div>
<!-- Hidden Elements -->
<div id="HiddenElements" style="display: none">
	<div id="puzzleBase" class="puzzle puzzle_prototype"><div class="puzzleImg"></div> </div>
    <div id="songContainerBase" data-song-title="" class="songContainer">
        <div class="songTitle"></div>
        <div class="songContents"></div>
    </div>
    <%for (Puzzle p : Puzzles.generateDefaultPuzzle()) {%>
    	<audio src="<%=p.getAudioFileURL()%>" data-prototype-id="<%=p.getPrototypeId()%>"></audio>
    <%}%>
</div>
<!-- Script -->
<script src="${pageContext.request.contextPath}/resources/assets/js/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/js/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/js/jquery.ui.touch-punch.min.js"></script> <!-- For mobile Drag&Drop support -->

<script src="${pageContext.request.contextPath}/resources/js/util.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/main/types.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/main/game.js"></script>
</body>
</html>