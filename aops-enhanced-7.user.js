// ==UserScript==
// @name        AoPS Enhanced 7
// @namespace   https://github.com/epiccakeking/aops-enhanced
// @match       https://artofproblemsolving.com/*
// @grant       none
// @version     7.0.1
// @author      epiccakeking, firebolt360, vEnhance, forester2015
// @description AoPS Enhanced adds and improves various features of the AoPS website.
// @license     MIT
// ==/UserScript==

// Functions for settings UI elements
let settings_ui = {
  toggle: label => (name, value, settings_manager) => {
    let checkbox_label = document.createElement('label');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = name;
    checkbox.checked = value;
    checkbox.addEventListener('change', e => settings_manager.set(name, e.target.checked));
    checkbox_label.appendChild(checkbox);
    checkbox_label.appendChild(document.createTextNode(' ' + label));
    return checkbox_label;
  },
  select: (label, options) => (name, value, settings_manager) => {
    let select_label = document.createElement('label');
    select_label.innerText = label + ' ';
    let select = document.createElement('select');
    select.name = name;
    for (let option of options) {
      let option_element = document.createElement('option');
      option_element.value = option[0];
      option_element.innerText = option[1];
      select.appendChild(option_element);
    }
    select.value = value;
    select.addEventListener('change', e => settings_manager.set(name, e.target.value));
    select_label.appendChild(select);
    return select_label;
  },
}

let themes = {
  'None': '',
  'PLACEHOLDER': '*{color: red}',
  'Optimal':`
#header:not(.shrunken-header) .dropdown-visible .site-link {
    background-color: #ababab!important
}
.sharedsite-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    top: -35px;
    height: 35px;
    background-color: #6d6d6d;
    line-height: 37px;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    z-index: 1
}
.site-dropdown-wrapper {
    display: none;
    position: absolute;
    top: 100%;
    left: -100px;
    min-width: 500px;
    height: 125px;
    padding: 10px;
    background: #ababab;
    z-index: 1;
    cursor: default;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text
}
.site-dropdown-wrapper .aops-primary {
    color: #0093ad
}
.sharedsite-links .site {
    position: relative;
    color: #000000;
}

.site-link {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    color: #000000
}

.sharedsite-links .site-link.selected,
.sharedsite-links .site-link.selected:hover {
    background-color: #b1b1b1
}
.site-dropdown-wrapper .academy-primary {
    color: #549600
}
body {
    font-family: Roboto, sans-serif;
    color: #333;
    font-size: 16px;
    line-height: 1.428571429;
    background-image: none;
    background-color: rgb(196, 196, 196)
}
#variant1-container .our-books {
    position: relative;
    margin-top: 0;
    padding-top: 100px;
    padding-bottom: 60px;
    background-color: rgb(176, 176, 176)
}
#variant1-container .math-category-section {
    position: relative;
    width: 100%;
    padding-top: 80px;
    padding-bottom: 140px;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    background-image: url("https://raw.githubusercontent.com/Aadit-Ambadkar/AoPS-Enhanced-Assets/main/clouds-bg3.jpg");
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat
}
@media screen and (min-width:992px) and (max-width:1239px) {
    #variant1-container .math-category-section {
        padding-top: 80px;
        padding-bottom: 140px;
        background-image: url("https://raw.githubusercontent.com/Aadit-Ambadkar/AoPS-Enhanced-Assets/main/clouds-bg3.jpg");
        background-position: 50% 50%;
        background-size: cover;
        background-repeat: no-repeat
    }
}
#variant1-container .intro-video {
    background-color: rgb(196, 196, 196);
}
#header {
    background-color: rgb(196, 196, 196)
}
#variant1-container .student-resources {
    background-color: #0a797d;
}

img.top-brush-image {
    content: url("https://raw.githubusercontent.com/Aadit-Ambadkar/AoPS-Enhanced-Assets/main/Brushed_bg_grn-top.svg")
}

img.bottom-brush-image {
    content: url("https://raw.githubusercontent.com/Aadit-Ambadkar/AoPS-Enhanced-Assets/main/Brushed_bg_grn-bottom.svg")
}

img.other-programs-image {
    content: url("https://raw.githubusercontent.com/Aadit-Ambadkar/AoPS-Enhanced-Assets/main/other_programs_image.jpg")
}

#variant1-container .online-callout {
    background-color: rgb(196, 196, 196);
}

#variant1-container .callout-text {
    background-color: rgb(225, 225, 225);
}
#variant1-container .math-category-card {
    background-color: rgb(225, 225, 225);
}
.cmty-category-cell-bottom {
    background-color: rgb(225, 225, 225);
}
a.cmty-full-cell-link {
    background-color: rgb(205, 205, 205);
}
.cmty-category-itembox-wrapper {
    background-color: rgb(196, 196, 196);
}
.cmty-topic-cell {
    background-color: rgb(215, 215, 215);
}
.cmty-folder-grid .cmty-category-cell-folder {
    background-color: #d6d6d6;
}
.cmty-category-cell-folder .cmty-category-itembox-wrapper {
    background-color: rgb(225, 225, 225);
}
.topic-unread .cmty-topic-watchers {
    background-color: rgb(240, 240, 240);
}
.cmty-topic-watchers {
    background-color: rgb(214, 214, 214);
}
.cmty-topic-cell.topic-unread {
    background-color: rgb(240, 240, 240);
}
`
}

class EnhancedSettingsManager {
  /** Default settings */
  DEFAULTS = {
    notifications: true,
    post_links: true,
    feed_moderation: true,
    kill_top: false,
    quote_primary: 'enhanced',
    quote_secondary: 'enhanced',
    quote_trinary: 'enhanced',
    theme: 'None',
  };

  /**
   * Constructor
   * @param {string} storage_variable - Variable to use when reading or writing settings
   */
  constructor(storage_variable) {
    this.storage_variable = storage_variable;
    this._settings = JSON.parse(localStorage.getItem(this.storage_variable) || '{}');
    this.hooks = {};
  }

  /**
   * Retrieves a setting.
   * @param {string} setting - Setting to retrieve
   */
  get = setting => setting in this._settings ? this._settings[setting] : this.DEFAULTS[setting];

  /**
   * Sets a setting.
   * @param {string} setting - Setting to change
   * @param {*} value - Value to set
   */
  set(setting, value) {
    this._settings[setting] = value;
    localStorage.setItem(this.storage_variable, JSON.stringify(this._settings));
    // Run hooks
    if (setting in this.hooks) for (let hook of this.hooks[setting]) hook(value);
  }

  /**
   * Add a hook that will be called when the associated setting is changed.
   * @param {string} setting - Setting to add a hook to
   * @param {function} callback - Callback to run when the setting is changed
   * @param {boolean} run_on_add - Whether to immediately run the hook
   */
  add_hook(setting, callback, run_on_add = false) {
    setting in this.hooks ? this.hooks[setting].push(callback) : this.hooks[setting] = [callback];
    if (run_on_add) callback(this.get(setting));
  }

  // No functions for removing hooks, do it manually by modifying the hooks attribute.
}

let enhanced_settings = new EnhancedSettingsManager('enhanced_settings');


enhanced_settings.add_hook('theme', (() => {
  let theme_element = document.createElement('style');
  return value => {
    theme_element.textContent = themes[value];
    if (value != 'None') {
      document.head.appendChild(theme_element);
    } else if (theme_element.parentNode) theme_element.parentNode.removeChild(theme_element);
    window.dispatchEvent(new Event('resize')); // Recalculate sizes of elements
  };
})(), true);

// Simplified header
enhanced_settings.add_hook('kill_top', (() => {
  const menubar_wrapper = document.querySelector('.menubar-links-outer');
  if (!menubar_wrapper) return _ => null;
  let kill_element = document.createElement('style');
  menubar_wrapper_normal_position = menubar_wrapper.nextSibling;
  kill_element.textContent = `
#header {
  display: none !important;
}
.menubar-links-outer {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  flex-direction: row-reverse;
}

.menubar-labels{
  line-height: 10px;
  margin-right: 10px;
}

.menubar-label-link.selected{
  color: #fff !important;
}

.menu-login-item {
  color: #fff !important;
}
#small-footer-wrapper {
  display: none !important;
}
.login-dropdown-divider {
  display:none !important;
}
.login-dropdown-content {
  padding: 12px 12px 12px !important;
  border-top: 2.4px #009fad solid;
}
`;
  return value => {
    if (value) {
      document.getElementById('header-wrapper').before(menubar_wrapper);
      document.head.appendChild(kill_element);
    } else {
      menubar_wrapper_normal_position.before(menubar_wrapper);
      if (kill_element.parentNode) kill_element.parentNode.removeChild(kill_element);
    }
    window.dispatchEvent(new Event('resize')); // Recalculate sizes of elements
  };
})(), true);

// Feed moderator icon
enhanced_settings.add_hook('feed_moderation', (() => {
  let style = document.createElement('style');
  style.textContent = '#feed-topic .cmty-topic-moderate{ display: inline !important; }';
  return value => {
    if (value) {
      document.head.appendChild(style);
    } else {
      if (style.parentNode) style.parentNode.removeChild(style);
    }
  };
})(), true);

// Notifications
enhanced_settings.add_hook('notifications', (() => {
  let notify_functions = [
    AoPS.Ui.Flyout.display,
    a => {
      var textextract = document.createElement("div");
      textextract.innerHTML = a.replace('<br>', '\n');
      var y = $(textextract).text()
      var notification = new Notification("AoPS Enhanced", { body: y, icon: 'https://artofproblemsolving.com/online-favicon.ico', tag: y });
      setTimeout(notification.close.bind(notification), 5000);
    }
  ];
  return value => {
    if (value && Notification.permission != "granted") Notification.requestPermission();
    AoPS.Ui.Flyout.display = notify_functions[+value];
  };
})(), true);

function show_enhanced_configurator() {
  const QUOTE_SCHEME_NAMES = {
    aops: 'AoPS',
    enhanced: 'Enhanced',
    link: 'Link',
    simple_hide: 'Simple Hide',
    fancy_hide: 'Fancy Hide',
  };
  UI_ELEMENTS = {
    notifications: settings_ui.toggle('Notifications'),
    post_links: settings_ui.toggle('Post links'),
    feed_moderation: settings_ui.toggle('Feed moderate icon'),
    kill_top: settings_ui.toggle('Simplify UI'),
    quote_primary: settings_ui.select('Primary quote', Object.entries(QUOTE_SCHEME_NAMES)),
    quote_secondary: settings_ui.select('Ctrl quote', Object.entries(QUOTE_SCHEME_NAMES)),
    quote_trinary: settings_ui.select('Alt quote', Object.entries(QUOTE_SCHEME_NAMES)),
    theme: settings_ui.select('Theme', Object.keys(themes).map(k => [k, k])),
  }
  let settings_modal = document.createElement('div');
  for (let key in UI_ELEMENTS) {
    settings_modal.appendChild(UI_ELEMENTS[key](key, enhanced_settings.get(key), enhanced_settings));
    settings_modal.appendChild(document.createElement('br'));
  }
  alert(settings_modal);
}

// Add "Enhanced" option to login dropdown
(el => {
  if (el === null) return;
  let enhanced_settings_element = document.createElement('a');
  enhanced_settings_element.classList.add('menu-item');
  enhanced_settings_element.innerText = 'Enhanced';
  enhanced_settings_element.addEventListener('click', e => { e.preventDefault(); show_enhanced_configurator(); });
  el.appendChild(enhanced_settings_element);
})(document.querySelector('.login-dropdown-content'));

// Prevent errors when trying to modify AoPS Community on pages where it doesn't exist
if (AoPS.Community) {
  // Quotes
  const QUOTE_SCHEMES = {
    aops: AoPS.Community.Views.Post.prototype.onClickQuote,
    enhanced: function () { this.topic.appendToReply("[quote name=\"" + this.model.get("username") + "\" url=\"/community/p" + this.model.get("post_id") + "\"]\n" + this.model.get("post_canonical").trim() + "\n[/quote]\n\n") },
    link: function () { this.topic.appendToReply(`@[url=https://aops.com/community/p${this.model.get("post_id")}]${this.model.get("username")} (#${this.model.get("post_number")}):[/url]`); },
    fancy_hide: function () {
      this.topic.appendToReply(`[hide=Post #${this.model.get("post_number")} by ${this.model.get("username")}][url=aops.com/community/user/${this.model.get("poster_id")}][b]${this.model.get("username")}[/b][/url] · ${this.model.get("date_rendered")} [url=aops.com/community/p${this.model.get("post_id")}](view)[/url][color=transparent]helo[/color]\n${this.model.get("post_canonical").trim()}\n\n-----------\n[color=#5b7083][aops]x[/aops] ${this.model.get("post_number")}[color=transparent]hellloolo[/color] [aops]Y[/aops] ${this.model.get("thanks_received")} [color=transparent]hellloolo[/color] [/hide]\n\n[tip=@${this.model.get("username")}][img]https:${this.model.get("avatar")}[/img]\nAoPS User[/tip]\n\n`);

    },
    simple_hide: function() {
        this.topic.appendToReply(`[hide=Post #${this.model.get("post_number")} by ${this.model.get("username")}]
[url=https://aops.com/user/${this.model.get("poster_id")}]${this.model.get('username')}[/url] [url=https://aops.com/community/p${this.model.get("post_id")}](view original)[/url]
${this.model.get('post_canonical').trim()}
[/hide]
`);
    },
  };
  AoPS.Community.Views.Post.prototype.onClickQuote = function (e) {
    if (e.ctrlKey) {
        QUOTE_SCHEMES[enhanced_settings.get('quote_secondary')].call(this)
    } else if (e.altKey) {
        QUOTE_SCHEMES[enhanced_settings.get('quote_trinary')].call(this)
    } else {
        QUOTE_SCHEMES[enhanced_settings.get('quote_primary')].call(this);
    }
  };

  // Direct links
  (() => {
    let real_onClickDirectLink = AoPS.Community.Views.Post.prototype.onClickDirectLink;
    function direct_link_function(e) {
      let url = 'https://aops.com/community/p' + this.model.get("post_id");
      navigator.clipboard.writeText(url);
      AoPS.Ui.Flyout.display(`Url copied (${url})`);
    }
    AoPS.Community.Views.Post.prototype.onClickDirectLink = function (e) {
      (enhanced_settings.get('post_links') ? direct_link_function : real_onClickDirectLink).call(this, e);
    }
  })();
}
