/**
 * Nutra Queen Inc. - HTML 公共组件加载说明
 *
 * 由于浏览器 file:// 协议下 fetch 受 CORS 限制,
 * 当前页面采用直接嵌入方式。
 *
 * 公共组件文件保留在 includes/ 目录中，后续如果使用
 * 本地开发服务器(http://) 或构建工具时，可启用加载。
 *
 * 使用方法（需要 HTTP 服务器时）：
 *   <div data-include="header"></div>
 *   <script src="static/js/include.js"></script>
 *
 * includes/header.html  - 头部导航
 * includes/footer.html  - 页脚
 */
