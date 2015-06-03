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

        </div>

        <div id="drawer" class="drawer fontSize3 bold ">
            <div id="properties">
                <div class="properties_title"></div>
                <div class="properties_content">
                    <label>Overdrive</label>
                    <input type="range" name="overdrive" min="0" max="100" step="1" value="0"/>
                    <label>Filter</label>
                    <input type="range" name="filter" min="0" max="100" step="1" value="0"/>
                    <label>Cabinet</label>
                    <input type="range" name="cabinet" min="0" max="100" step="1" value="0"/>
                    <label>Delay</label>
                    <input type="range" name="delay" min="0" max="100" step="1" value="0"/>
                    <label>Convolver</label>
                    <input type="range" name="convolver" min="0" max="100" step="1" value="0"/>
                    <label>Compressor</label>
                    <input type="range" name="compressor" min="0" max="100" step="1" value="0"/>
                    <label>WahWah</label>
                    <input type="range" name="wahwah" min="0" max="100" step="1" value="0"/>
                    <label>Tremolo</label>
                    <input type="range" name="tremolo" min="0" max="100" step="1" value="0"/>
                    <label>Phaser</label>
                    <input type="range" name="phaser" min="0" max="100" step="1" value="0"/>
                    <label>Chorus</label>
                    <input type="range" name="chorus" min="0" max="100" step="1" value="0"/>
                </div>
            </div>

            <div id="puzzles">
                <div class="puzzles_title"></div>
                <div class="puzzles_content"></div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="playBar">
        <img id="skipBtn_backward" src="${pageContext.request.contextPath}/resources/img/main/skipBtn_backward.png" alt="skipBtn_backward"/>
        <img id="playBtn" src="${pageContext.request.contextPath}/resources/img/main/playBtn.png" alt="playBtn"/>
        <img id="skipBtn_forward" src="${pageContext.request.contextPath}/resources/img/main/skipBtn_forward.png" alt="skipBtn_forward"/>
    </div>
</div>
<!-- Hidden Elements -->
<div id="HiddenElements" style="display: none">
    <div id="puzzleBase" class="puzzle puzzle_prototype"><div class="puzzleImg"></div> </div>
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