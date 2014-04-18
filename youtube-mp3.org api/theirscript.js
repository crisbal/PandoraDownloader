var h, hCaptcha, info, video_id, interval, interval_diff = 5,
    latest_id = "",
    ad_code = "",
    error_count = 0,
    bFrame = !1,
    iEl = new Image,
    ylog = new Image,
    tlog = new Image,
    yi = "unkown",
    yc = "unkown",
    ys = -1,
    yl = 31,
    ye = "",
    ycsl = "",
    ytry = 0,
    adcc = "glob",
    enableBetaAds = !1,
    lastAdRequest = (new Date).getTime(),
    adcnt = 0,
    convcomp = !1,
    asecl = 5,
    arell = 4,
    adhost = !1,
    disYA = !1,
    _bcb = null,
    inp_t = "";
createRequestObject = function () {
    var a = null;
    "undefined" != typeof XMLHttpRequest && (a = new XMLHttpRequest);
    if (!a && "undefined" != typeof ActiveXObject) try {
        a = new ActiveXObject("Msxml2.XMLHTTP"), XMLHttpRequest = function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }
    } catch (b) {
        try {
            a = new ActiveXObject("Microsoft.XMLHTTP"), XMLHttpRequest = function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        } catch (c) {
            try {
                a = new ActiveXObject("Msxml2.XMLHTTP.4.0"), XMLHttpRequest = function () {
                    return new ActiveXObject("Msxml2.XMLHTTP.4.0")
                }
            } catch (d) {
                a =
                    null
            }
        }
        return a
    }!a && window.createRequest && (a = window.createRequest());
    return a
};
getParameterByName = function (a, b) {
    b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var c = RegExp("[\\?&]" + b + "=([^&#]*)").exec(a);
    return null == c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
};
cnt = function (a, b, c) {
    a += "";
    b += "";
    if (0 >= b.length) return a.length + 1;
    var d = 0,
        e = 0;
    for (c = c ? 1 : b.length;;)
        if (e = a.indexOf(b, e), 0 <= e) d++, e += c;
        else break;
    return d
};
startswith = function (a, b) {
    return 0 == a.indexOf(b)
};
getId = function (a) {
    var b = a;
    0 < cnt(a, "?", 1) && (b = a.substr(0, a.indexOf("?")));
    if (1 == cnt(b, "youtu.be", 1)) return a.substr(a.lastIndexOf("/") + 1);
    !1 == startswith(a, "http://") && (a = "http://" + a);
    1 == cnt(a, "#!", 1) && 0 == cnt(a, "?", 1) && (a = a.replace("#!", "?"));
    1 == cnt(a, "/#/watch", 1) && (a = a.replace("/#/", "/"));
    1 == cnt(a, "#", 1) && 0 == cnt(a, "?", 1) && (a = a.replace("#", "?"));
    return getParameterByName(a, "v")
};
hs = function (a) {
    try {
        a.setRequestHeader("Accept-Location", "*"), a.setRequestHeader("Cache-Control", "no-cache")
    } catch (b) {}
};
g = function (a) {
    return document.getElementById(a)
};
tstamp = function () {
    return (new Date).getTime()
};
cFrame = function (a, b, c, d) {
    try {
        if (!0 != bFrame) {
            var e = a + "iiFrm",
                k = g(a);
            if (null != k && null == g(e)) {
                var f = document.createElement("iframe");
                f.id = e;
                f.scrolling = "no";
                f.frameBorder = "0";
                f.frameborder = "0";
                f.width = b + "px";
                f.height = c + "px";
                f.border = "0";
                f.style.border = "0";
                k.appendChild(f)
            }
            g(e).src = d
        }
    } catch (l) {}
};
loadAds = function () {
    _loadAds(!1)
};
_loadAds = function (a) {
    lastAdRequest = tstamp();
    adcnt += 1;
    var b = "edge.youtube-mp3.org";
    !1 != adhost && (b = adhost);
    var c = tstamp(),
        d = "http://" + b + "/acode/" + adcc + "/rectangle.htm",
        b = "http://" + b + "/acode/" + adcc + "/skyscraper.htm";
    !0 == a && (d += "?r=" + c, b += "?r=" + c);
    cFrame("rad", 300, 250, d);
    cFrame("sad", 160, 600, b)
};
s = function (a) {
    g("youtube-url").value = a;
    btnSubmitClick()
};
pushItemError = function () {
    resf();
    g("progress_info").className = "error";
    g("error_text").style.display = "block";
    g("error_text").innerHTML = "<b>" + _ytmp3Lang.INVALID_URL + ":</b><br />" + g("youtube-url").value;
    res()
};
submitCaptchaCallback = function () {
    4 == hCaptcha.readyState && ("false" == hCaptcha.responseText ? displayCaptcha(video_id) : "true" == hCaptcha.responseText && btnSubmitClick())
};
submitCaptcha = function () {
    g("captcha-result").disabled = !0;
    g("captcha-submit").disabled = !0;
    var a = new Date;
    hCaptcha = createRequestObject();
    a = "/api/solveCaptcha/?video_id=" + video_id + "&result=" + escape(g("captcha-result").value) + "&r=" + a.getTime();
    hCaptcha.onreadystatechange = submitCaptchaCallback;
    hCaptcha.open("GET", a, !0);
    hCaptcha.send(null);
    return !1
};
displayCaptcha = function (a) {
    resf();
    var b = new Date;
    g("progress_info").className = "captcha";
    g("error_text").style.display = "block";
    g("error_text").innerHTML = '<div style="text-align:center"><div style="padding:4px;"><b>Please type in the characters you see below:</b></div><form onsubmit="return submitCaptcha()"><div style="padding:3px;"><img src="/c?video_id=' + a + "&r=" + b.getTime() + '" style="border:solid 1px #ccc;" /></div><div style="padding:3px;"><input id="captcha-result" type="text" style="font-size:14px; padding:5px; width:190px; font-weight:bold; font-family:Arial;" autocomplete="off" /></div><div style="padding:3px;"><input id="captcha-submit" type="submit" /></div></form></div>';
    res()
};
pushItemMaintenance = function () {
    resf();
    g("progress_info").className = "error";
    g("error_text").style.display = "block";
    g("error_text").innerHTML = "<b>" + _ytmp3Lang.MAINTENANCE + "</b>";
    res()
};
pushItemYTError = function () {
    resf();
    g("progress_info").className = "error";
    g("error_text").style.display = "block";
    g("error_text").innerHTML = "<b>" + _ytmp3Lang.ERROR + "</b>";
    res()
};
limitError = function () {
    resf();
    g("progress_info").className = "error";
    g("error_text").style.display = "block";
    g("error_text").innerHTML = "<b>" + _ytmp3Lang.LIMIT + "</b>";
    res()
};
var __AM = 65521;

function _cc(a) {
    if ("string" != typeof a) throw Error("se");
    var b = 1,
        c = 0,
        d, e;
    for (e = 0; e < a.length; e++) d = a.charCodeAt(e), b = (b + d) % __AM, c = (c + b) % __AM;
    return c << 16 | b
}
utf8Decode = function (a) {
    for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;) d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((d & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
    return b
};
setAds = function (a) {
    g("dl_link").innerHTML += utf8Decode(unescape(a))
};
cc = function (a) {
    try {
        return _cc(a)
    } catch (b) {}
    return 0
};
gr = function (a, b) {
    for (var c = 0, d = "", c = 0; c < a; c++)
        if (0.5 < Math.random() || !0 == b && 0 == c) d += '<a href="/get?video_id=' + video_id + '&h=-1&r=-1.1" style="display:none"><b>' + _ytmp3Lang.DOWNLOAD + "</b></a>";
    return d
};
checkInfo = function () {
    if ("captcha" == info.status) displayCaptcha(video_id);
    else if ("unkown" == yc && 0 == ytry && 4E3 < tstamp() - ys) loadYA(!1, !0), ytry += 1, setTimeout(checkInfo, 200);
    else if ("unkown" == yc && 1 == ytry && 12E3 < tstamp() - ys) loadYA(!0, !1), ytry += 1, setTimeout(checkInfo, 200);
    else if ("unkown" == yc && 2 == ytry && 25E3 < tstamp() - ys) loadYA(!1, !0), ytry += 1, setTimeout(checkInfo, 200);
    else if ("serving" == info.status && "unkown" == yc && tstamp() - ys < 1E3 * yl) clearInterval(interval), setTimeout(checkInfo, 200);
    else if ("serving" == info.status &&
        "unkown" == yc && (ylog.src = "/pxel/_logTimeoutError.gif?u=" + escape(g("youtube-url").value) + "&aurl=" + escape(ycsl) + "&cnt=" + ytry + "&te=" + (tstamp() - ys) + "&ts=" + tstamp()), "error" == yc && (ylog.src = "/pxel/_logError.gif?u=" + escape(g("youtube-url").value) + "&id=" + escape(yi) + "&e=" + escape(ye) + "&ts=" + tstamp()), "error" != yc || "Video not found" != ye && "Private video" != ye) {
        "" != info.image && (g("image").style.display = "block", g("image").innerHTML = '<img src="' + info.image + '"/>');
        "" != info.title && (g("title").style.display = "block", g("title").innerHTML =
            _ytmp3Lang.TITLE.replace("$0", info.title));
        "" != info.length && (g("length").style.display = "block", g("length").innerHTML = _ytmp3Lang.LENGTH.replace("$0", info.length));
        "" != info.status && "pending" != info.status && ("converting" == info.status ? (g("progress").style.display = "block", g("progress").innerHTML = _ytmp3Lang.CONVERTING) : "" != info.progress && "" != info.progress_speed && (g("progress").style.display = "block", g("progress").innerHTML = _ytmp3Lang.PROGRESS.replace("$0", info.progress).replace("$1", info.progress_speed)));
        if ("serving" == info.status) {
            g("status_text").innerHTML = _ytmp3Lang.CONVERTED;
            g("title").style.display = "block";
            g("length").style.display = "block";
            g("loader").style.display = "none";
            g("dl_link").style.display = "block";
            g("progress").style.display = "none";
            var a = tstamp();
            g("dl_link").innerHTML = gr(3, !0) + '<a href="/get?ab=128&video_id=' + video_id + "&h=" + info.h + "&r=" + a + "." + cc(video_id + a) + '"><b>' + _ytmp3Lang.DOWNLOAD + "</b></a>" + gr(3, !1);
            g("progress_info").className = "success";
            "" != info.ads && setAds(info.ads);
            res()
        }
        if ("" !=
            info.pf) try {
            iEl.src != info.pf && (iEl.src = info.pf)
        } catch (b) {}
    } else pushItemYTError()
};
infoRehashCallback = function () {
    4 == h.readyState && ("$$$ERROR$$$" == h.responseText ? pushItemError() : 500 == h.status ? (error_count += 1, 4 < error_count && pushItemMaintenance()) : (eval(h.responseText), checkInfo()))
};
infoRehash = function () {
    var a = new Date;
    h = createRequestObject();
    a = "/a/itemInfo/?video_id=" + video_id + "&ac=www&t=grp&r=" + a.getTime();
    h.onreadystatechange = infoRehashCallback;
    h.open("GET", a, !0);
    hs(h);
    h.send(null)
};
startInfoRehash = function (a) {
    video_id = a;
    infoRehash();
    interval = window.setInterval("infoRehash()", 1E3 * interval_diff)
};
loadYA = function (a, b) {
    var c = "http";
    a && (c = "https");
    try {
        "https:" == document.location.protocol && (c = "https")
    } catch (d) {}
    var e = "gdata.youtube.com";
    b && (e = "yp.aclst.com");
    c = c + "://" + e + "/feeds/api/videos/" + yi + "?alt=jsonc&v=2&callback=pyc_" + ys + "&" + tstamp();
    e = document.createElement("script");
    e.type = "text/javascript";
    e.src = c;
    ycsl = e.src;
    document.body.appendChild(e)
};
pushItemCallback = function () {
    4 == h.readyState && ("$$$ERROR$$$" == h.responseText ? pushItemError() : "$$$LIMIT$$$" == h.responseText ? limitError() : 500 == h.status ? pushItemMaintenance() : (-1 != ys && (window["pyc_" + ys] = function (a) {}), ys = tstamp(), yi = h.responseText, window["pyc_" + ys] = pyc, loadYA(!1, !1), startInfoRehash(h.responseText)))
};
getBF = function () {
    return !0 == bFrame ? "true" : "false"
};
pyc = function (a) {
    if (a.hasOwnProperty("error")) {
        yc = "error";
        try {
            ye = a.error.message
        } catch (b) {}
    } else yc = "ok"
};
pushItem = function () {
    ytry = 0;
    yc = "unkown";
    ycsl = ye = "";
    var a = new Date;
    h = createRequestObject();
    var b = "/a/pushItem/?item=" + escape(g("youtube-url").value) + "&el=na&bf=" + getBF() + "&r=" + a.getTime();
    h.onreadystatechange = pushItemCallback;
    h.open("GET", b, !0);
    hs(h);
    h.send(null);
    "" != inp_t && null != inp_t && (a = inp_t.replace("$1", escape(g("youtube-url").value)) + "&r=" + a.getTime(), tlog.src = a)
};
debounce = function (a, b, c) {
    var d;
    return function () {
        var e = this,
            k = arguments;
        d ? clearTimeout(d) : c && a.apply(e, k);
        d = setTimeout(function () {
            c || a.apply(e, k);
            d = null
        }, b || 100)
    }
};
sendPartialInput = function () {
    var a = new Date;
    h = createRequestObject();
    var b = g("youtube-url").value;
    null != b && "" != b && (a = "/a/partialInput/?item=" + escape(b) + "&r=" + a.getTime(), h.open("GET", a, !0), hs(h), h.send(null))
};
preparePartialInputNotify = function () {
    try {
        g("youtube-url").onkeyup = debounce(function (a) {
            sendPartialInput()
        }, 250, !1)
    } catch (a) {}
};
strStartswith = function (a, b) {
    return a.substr(0, b.length) == b
};
btnSubmitClick = function () {
    !0 == enableBetaAds && !0 == convcomp && (tstamp() - lastAdRequest) / 1E3 > asecl && adcnt <= arell && _loadAds(!0);
    convcomp = !0;
    g("youtube-url");
    res();
    resf();
    info = video_id = null;
    g("submit").disabled = !0;
    g("youtube-url").disabled = !0;
    pushItem();
    g("progress_info").className = "normal";
    g("progress_info").style.display = "block";
    g("loader").style.display = "block";
    g("status_text").style.display = "block";
    g("status_text").innerHTML = _ytmp3Lang.PROCESSING;
    null != _bcb && _bcb();
    return !1
};
res = function () {
    clearInterval(interval);
    interval = h = null;
    g("submit-form").onsubmit = btnSubmitClick;
    g("submit").onclick = btnSubmitClick;
    g("submit").disabled = !1;
    g("youtube-url").disabled = !1
};
resf = function () {
    g("status_text").style.display = "none";
    g("dl_link").style.display = "none";
    g("title").style.display = "none";
    g("length").style.display = "none";
    g("image").style.display = "none";
    g("loader").style.display = "none";
    g("error_text").style.display = "none";
    g("link_box").style.display = "none"
};
cutTo = function (a, b) {
    var c = a.indexOf(b);
    return -1 < c ? a.substring(0, c) : a
};
getArg = function (a, b) {
    var c = a.indexOf(b + "=", 0);
    return -1 < c ? (c += 1 + b.length, c = a.substring(c), c = cutTo(c, ";"), c = cutTo(c, "?"), c = cutTo(c, "&")) : null
};
fixDisp = function () {
    try {
        g("rad").style.paddingTop = "6px", g("sad").style.paddingTop = "6px"
    } catch (a) {}
};
s = function (a) {
    g("youtube-url").value = a;
    btnSubmitClick()
};
checkForHash = function () {
    var a = getArg(window.location.hash, "v");
    null != a && a != latest_id && (s("http://www.youtube.com/watch?v=" + a + "&ft=li"), latest_id = a);
    window.setTimeout("checkForHash()", 750)
};
init = function () {
    g("submit-form").onsubmit = btnSubmitClick;
    g("submit").onclick = btnSubmitClick;
    g("submit").disabled = !1;
    g("youtube-url").disabled = !1;
    g("link_box_title").innerHTML = _ytmp3Lang.LINKIT;
    g("link_box_bb_code_title").innerHTML = _ytmp3Lang.BBCODELINK;
    g("link_box_html_code_title").innerHTML = _ytmp3Lang.HTMLCODELINK;
    g("link_box_direct_code_title").innerHTML = _ytmp3Lang.DIRECTCODELINK;
    checkForHash();
    fixDisp()
};
sAll = function (a) {
    a.focus();
    a.select()
};
showLinkBox = function () {
    if ("none" == g("link_box").style.display) {
        var a = "http://www.youtube-mp3.org/#v=" + video_id;
        g("BBCodeLink").value = "[url=" + a + "]" + info.title + "[/url]";
        g("HTMLLink").value = '<a href="' + a + '">' + info.title + "</a>";
        g("DirectLink").value = a;
        g("link_box").style.display = "block"
    } else g("link_box").style.display = "none"
};
iFrameRefresh = function () {
    resf();
    g("frame").style.display = "block"
};