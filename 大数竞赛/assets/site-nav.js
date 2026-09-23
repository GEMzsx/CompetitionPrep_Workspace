/**
 * 全站导航栏 —— 大数竞赛复习中心
 *
 * 接入方式（body 开头）：
 *   <nav id="site-nav" data-base="../" data-current="01"></nav>
 *   <script src="../assets/site-nav.js"></script>
 *
 *   根目录页面（index.html）：data-base 留空、data-current="home"
 *   专题页：data-base="../"、data-current 为专题编号（"01"~"09"）
 *
 * 维护方式：新专题页面完成后，把下方对应条目 ready 改为 true，
 * 全站所有页面的导航自动更新，无需逐页修改。
 */
(function () {
  "use strict";

  var TOPICS = [
    { no: "01", label: "极限与连续", full: "函数、极限与连续",   dir: "01_函数极限与连续",     ready: true  },
    { no: "02", label: "一元微分",   full: "一元微分学",         dir: "02_一元微分学",         ready: true  },
    { no: "03", label: "一元积分",   full: "一元积分学",         dir: "03_一元积分学",         ready: false },
    { no: "04", label: "向量几何",   full: "向量与空间解析几何", dir: "04_向量与空间解析几何", ready: false },
    { no: "05", label: "多元微分",   full: "多元微分学",         dir: "05_多元微分学",         ready: false },
    { no: "06", label: "重积分",     full: "重积分",             dir: "06_重积分",             ready: false },
    { no: "07", label: "线面积分",   full: "曲线曲面积分",       dir: "07_曲线曲面积分",       ready: false },
    { no: "08", label: "无穷级数",   full: "无穷级数",           dir: "08_无穷级数",           ready: false },
    { no: "09", label: "微分方程",   full: "常微分方程",         dir: "09_常微分方程",         ready: false }
  ];
  var ENTRY = "01_知识框架.html";

  var mount = document.getElementById("site-nav");
  if (!mount) return;
  var base = mount.getAttribute("data-base") || "";
  var current = mount.getAttribute("data-current") || "";
  var atHome = current === "home";

  var css = ""
    + "#site-nav{position:sticky;top:0;z-index:1000;background:rgba(255,255,255,.92);"
    + "-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);"
    + "border-bottom:1px solid var(--line,#e3e5ee);}"
    + "#site-nav .sn-inner{max-width:920px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:14px;height:52px;}"
    + "#site-nav .sn-brand{display:flex;align-items:center;gap:8px;text-decoration:none;"
    + "color:var(--ink,#1e2130);font-weight:800;font-size:14.5px;letter-spacing:1px;white-space:nowrap;}"
    + "#site-nav .sn-logo{width:26px;height:26px;border-radius:7px;flex:0 0 auto;"
    + "background:linear-gradient(135deg,#322bc0,#6f6fff);color:#fff;"
    + "display:inline-flex;align-items:center;justify-content:center;font-size:16px;}"
    + "#site-nav .sn-sub{font-weight:500;letter-spacing:0;color:var(--ink-faint,#8a90a6);}"
    + "#site-nav .sn-links{display:flex;align-items:center;gap:2px;flex:1;min-width:0;"
    + "overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;}"
    + "#site-nav .sn-links::-webkit-scrollbar{display:none;}"
    + "#site-nav .sn-item{flex:0 0 auto;display:inline-flex;align-items:center;gap:5px;"
    + "padding:5px 10px;border-radius:8px;font-size:13.5px;white-space:nowrap;"
    + "color:var(--ink-soft,#4a5068);text-decoration:none;}"
    + "#site-nav .sn-item b{font-size:11px;font-weight:700;letter-spacing:.5px;color:var(--accent,#4338d6);}"
    + "#site-nav a.sn-item:hover{background:var(--accent-soft,#eef0ff);color:var(--accent,#4338d6);}"
    + "#site-nav .sn-item.active{background:var(--accent,#4338d6);color:#fff;}"
    + "#site-nav .sn-item.active b{color:rgba(255,255,255,.75);}"
    + "#site-nav .sn-item.todo{opacity:.38;cursor:default;-webkit-user-select:none;user-select:none;}"
    + "@media (max-width:640px){#site-nav .sn-inner{padding:0 14px;gap:10px;}}"
    + "@media (max-width:480px){#site-nav .sn-sub{display:none;}}"
    + "@media print{#site-nav{display:none!important;}}"
    + "section[id]{scroll-margin-top:64px;}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var inner = document.createElement("div");
  inner.className = "sn-inner";

  var brand = document.createElement(atHome ? "span" : "a");
  brand.className = "sn-brand";
  if (!atHome) {
    brand.href = base + "index.html";
    brand.title = "回到首页";
  }
  var logo = document.createElement("span");
  logo.className = "sn-logo";
  logo.textContent = "∑";
  brand.appendChild(logo);
  brand.appendChild(document.createTextNode("大数竞赛"));
  var sub = document.createElement("span");
  sub.className = "sn-sub";
  sub.textContent = "复习中心";
  brand.appendChild(sub);

  var links = document.createElement("div");
  links.className = "sn-links";

  TOPICS.forEach(function (t) {
    var item;
    if (t.ready) {
      item = document.createElement("a");
      item.href = base + t.dir + "/" + ENTRY;
      item.title = "专题 " + t.no + " · " + t.full;
    } else {
      item = document.createElement("span");
      item.title = "该专题复习推进中，完成后自动上线";
    }
    item.className = "sn-item" + (t.ready ? "" : " todo") + (current === t.no ? " active" : "");
    var no = document.createElement("b");
    no.textContent = t.no;
    item.appendChild(no);
    item.appendChild(document.createTextNode(t.label));
    links.appendChild(item);
  });

  inner.appendChild(brand);
  inner.appendChild(links);
  mount.appendChild(inner);
})();
