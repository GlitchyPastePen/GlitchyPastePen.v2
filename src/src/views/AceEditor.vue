<template>
  <span>
    <div v-if="loaded === false" id="loader">
      <center>
        <div class="donutSpinner"></div>
        <br /><br />
        <b>Loading...</b>
        <br /><br />
        <p style="font-family: 'Fira Code', 'IBM Plex Mono', monospace">
          {{ project_name }}
        </p>
        <Footer />
      </center>
    </div>
    <span v-else>
      <div
        id="editor-header"
        style="
          border-bottom: 0px solid black !important;
          background-color: #0f0f0f;
        "
      >
        <!--       <button class="deploy" onclick="beautify()" title="Beautify code!">
                    Beautify
                </button> -->
        <button class="deploy" @click="deploy" title="Save code!" v-html="deployingText"></button>
        <button class="deploy" onclick="simplecopy(editor.getValue())">
          Copy code
        </button>
        <button class="deploy">
          <a
            :href="'https://gppp.now.sh/' + project.name"
            id="preview-link"
            target="_blank"
            >Preview</a
          >
        </button>
        <input
          type="text"
          id="project-name"
          oninput="changename()"
          :value="project.name"
        />&nbsp;&nbsp;&nbsp;
        <p class="empty">
          by
          <a :href="'https://github.com/' + project.owner" class="owner">{{
            project.owner
          }}</a>
        </p>
      </div>
      <aside id="filetree">
        <div id="users">
          <img :src="user.avatar_url" id="project-owner-avatar" />&nbsp;&nbsp;&nbsp;
          <img v-for="active_user in active_users" class="active-users" :src="active_user.avatar_url" :key="active_user.id" />
        </div>
        <br /><br />
        <span id="files-label"><i>PROJECT FILES</i></span>
        <div id="files">
          <button class="file" @click="setHtml()">
            index<span class="html">.html</span>
          </button>
          <button class="file" @click="setCss()">
            style<span class="css">.css</span>
          </button>
          <button class="file" @click="setJs()">
            script<span class="js">.js</span>
          </button>
        </div>
        <div id="bottom">
          <a href="https://glitchypastepen.statuspage.io">System Status</a>
        </div>
      </aside>
      <editor
        ref="gpp"
        v-model="content"
        @init="editorInit"
        :lang="lang"
        theme="vibrant_ink"
        width="calc(100% - 300px)"
        height="calc(100vh - 117px)"
      ></editor>
      <footer id="editor-footer">
        <span
          class="left code"
          onclick="if (document.getElementById('devtool').style.display === 'none') { document.getElementById('devtool').style.display = 'block' } else { document.getElementById('devtool').style.display = 'none' };"
        >
          DEVTOOLS
        </span>
        <span
          class="left code"
          onclick="editor.execCommand('showSettingsMenu')"
          style="vertical-align: middle"
        >
          SETTINGS
        </span>
        <span class="right code" id="pos"> </span>
        <router-link to="/me">
          <span class="right code"> MY PROJECTS </span>
        </router-link>
        <a onclick="contributor()">
          <span class="right code" style="cursor: pointer">
            ADD CONTRIBUTOR
          </span>
        </a>
        <a onclick="TogetherJS(this); return false;">
          <span class="right code" style="cursor: pointer">
            INVITE CONTRIBUTOR
          </span>
        </a>
      </footer>
    </span>
  </span>
</template>

<script>
const axios = require("axios");
var fetch = require("node-fetch");

import { EditSession } from "brace";
import Footer from "@/components/Footer.vue";

export default {
  name: "AceEditor",
  data: function () {
    return {
      editor: null,
      content: null,
      lang: "html",
      htmlSession: new EditSession("<html></html>"),
      cssSession: new EditSession("body { color: red; }"),
      jsSession: new EditSession("console.log('//hi')"),
      htmlCode: null,
      cssCode: null,
      jsCode: null,
      loaded: false,
      project: null,
      project_name: null,
      user: this.$session.get("github"),
      active_users: [],
      deployingText: "Save & Deploy"
    };
  },
  components: {
    editor: require("vue2-ace-editor"),
    Footer,
  },
  methods: {
    editorInit: function (editor) {
      require("brace/ext/language_tools");
      require("brace/mode/html");
      require("brace/mode/javascript");
      require("brace/mode/css");
      require("brace/theme/vibrant_ink");
      require("brace/snippets/javascript");

      let project_name = this.$route.params.project;

      editor.setOptions({
        fontSize: "16px",
        fontFamily: "Fira Mono",
        enableSnippets: true,
        enableLiveAutocompletion: true,
        autoScrollEditorIntoView: true,
      });

      var that = this;

      axios
      .get(`https://api.github.com/users/${that.project.owner}`)
      .then((response) => {
        that.user = response.data;
      })

      let me = this.$session.get("github");

      if (me.login !== this.project.owner) {
        this.active_users.push({
          avatar_url: me.avatar_url,
          id: Math.random()
        })
      }

      editor.setSession(this.htmlSession);
      this.loaded = true;

      // let project_realtime_database = this.$realtimeDatabase.ref(
      //   "projects/" + this.project_name
      // );

      // this.$realtimeDatabase
      //   .ref("projects/" + this.project_name)
      //   .on("value", (snap) => {
      //     console.log("changes have been made!");
      //     console.log(snap.val().html);
      //     console.log("htmlSession value:")
      //     console.log(this.htmlSession.getValue());
      //     let isNotEqual = !!(this.htmlSession.getValue() !== snap.val().html);
      //     console.log(
      //       "Is the HTML session code and the snap value not equal? " + isNotEqual
      //     );
      //     if (isNotEqual === true) {
      //       this.htmlSession.setValue(snap.val().html);
      //       console.log("snap value:")
      //       console.log(snap.val().html);
      //       console.log("htmlsession value:");
      //       console.log(this.htmlSession.getValue());
      //     } else {
      //       console.log(
      //         "HTML session code and the snap value is the same! " + isNotEqual
      //       );
      //     }
      //     if (this.cssSession.getValue() != snap.val().css) {
      //       this.cssSession.setValue(snap.val().css);
      //     }
      //     if (this.jsSession.getValue() != snap.val().js) {
      //       this.jsSession.setValue(snap.val().js);
      //     }
      //   });

      // this.$realtimeDatabase.ref("projects/" + this.project_name).set({
      //   html: this.htmlSession.getValue(),
      //   css: this.cssSession.getValue(),
      //   js: this.jsSession.getValue(),
      // });

      // var _htmlSession = this.htmlSession;
      // var that = this;
      // this.htmlSession.on("change", function (e) {
      //   console.log("ace has detected changes in html file!");
      //   console.log(e);
      //   console.log(_htmlSession.getValue());
      //   let html = _htmlSession.getValue();
      //   // let css =
      //   that.$realtimeDatabase.ref("projects/" + that.project_name).set({
      //     html: html,
      //     css: that.cssSession.getValue(),
      //     js: that.jsSession.getValue(),
      //   });
      //   console.log("html document has been updated");
      // });
    },
    setHtml() {
      require("brace/mode/html");
      this.lang = "html";
      this.$refs.gpp.editor.setSession(this.htmlSession);
    },
    setCss() {
      require("brace/mode/css");
      this.lang = "css";
      this.$refs.gpp.editor.setSession(this.cssSession);
    },
    setJs() {
      require("brace/mode/javascript");
      this.lang = "javascript";
      this.$refs.gpp.editor.setSession(this.jsSession);
    },
    deploy() {
      (async () => {
        this.deployingText = "<i>Deploying...</i>";
        let data = {
          project: this.project_name,
          html: this.htmlSession.getValue(),
          css: this.cssSession.getValue(),
          js: this.jsSession.getValue(),
        };

        let req = await fetch(
          "https://3000-b74ec769-d86e-42a1-8f58-376e5ed7e7ca.ws-eu01.gitpod.io/api/deploy?project=" +
            this.project_name,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$session.get("idToken")}`,
            },
            body: JSON.stringify(data),
          }
        );

        let res = await req.json();
        let { status, message } = res;
        console.log(res);

        if (res.error) {
          Swal.fire({
            icon: "error",
            text: message,
          })
        } else if (status === 401 || status === 403) {
          Swal.fire({
            icon: "warning",
            text: message,
          })
        } else {
          Swal.fire({
            icon: "success",
            text: message,
          })
        }

        this.deployingText = "Save and Deploy";

      })();
    },
    update: function () {
      // this.$realtimeDatabase.ref('projects/' + this.project_name).set({
      //     html: this.htmlSession.getValue(),
      //     css: this.cssSession.getValue(),
      //     js: this.jsSession.getValue()
      // })
    },
  },
  created: function () {
    let project_name = this.$route.params.project;
    this.project_name = project_name;
    axios
      .get(`https://gppapi.now.sh/api/code?project=${project_name}`)
      .then((response) => {
        this.htmlCode = response.data.html;
        this.cssCode = response.data.css;
        this.jsCode = response.data.js;
        this.htmlSession.setValue(response.data.html);
        this.cssSession.setValue(response.data.css);
        this.jsSession.setValue(response.data.js);
        // this.loaded = true;
        var that = this;
        setTimeout(function () {
          that.loaded = true;
        }, 7000);
      });

    axios
      .get(`https://gppapi.now.sh/api/project?project=${project_name}`)
      .then((response) => {
        this.project = response.data;
      });
  },
  mounted() {
    var editorValues = this.$realtimeDatabase.ref("projects");
    var currentEditorValue = editorValues.child(this.project_name);
    var openPageTimestamp = Date.now();
    var uid = Math.random().toString();
    var that = this;

    currentEditorValue.child("content").once("value", function (contentRef) {
      var queueRef = currentEditorValue.child("queue");
      var htmlQueue = queueRef.child("html");
      var cssQueue = queueRef.child("css");
      var jsQueue = queueRef.child("js");
      var html_applyingDeltas = false;
      var css_applyingDeltas = false;
      var js_applyingDeltas = false;

      var thaaat = that;
      console.log(thaaat)

      that.htmlSession.on("change", function (e) {
        if (html_applyingDeltas) {
          return;
        }

        currentEditorValue.update({
          content: {
            html: thaaat.htmlSession.getValue(),
            css: thaaat.cssSession.getValue(),
            js: thaaat.jsSession.getValue()
          },
        });

        htmlQueue
          .child(
            Date.now().toString() + ":" + Math.random().toString().slice(2)
          )
          .set({
            event: e,
            by: uid,
          })
          .catch(function (e) {
            console.error(e);
          });
      });

      that.cssSession.on("change", function (e) {
        if (css_applyingDeltas) {
          return;
        }

        currentEditorValue.update({
          content: {
            html: thaaat.htmlSession.getValue(),
            css: thaaat.cssSession.getValue(),
            js: thaaat.jsSession.getValue()
          },
        });

        cssQueue
          .child(
            Date.now().toString() + ":" + Math.random().toString().slice(2)
          )
          .set({
            event: e,
            by: uid,
          })
          .catch(function (e) {
            console.error(e);
          });
      });

      that.jsSession.on("change", function (e) {
        if (js_applyingDeltas) {
          return;
        }

        currentEditorValue.update({
          content: {
            html: thaaat.htmlSession.getValue(),
            css: thaaat.cssSession.getValue(),
            js: thaaat.jsSession.getValue()
          },
        });

        jsQueue
          .child(
            Date.now().toString() + ":" + Math.random().toString().slice(2)
          )
          .set({
            event: e,
            by: uid,
          })
          .catch(function (e) {
            console.error(e);
          });
      });

      console.log(that);
      var html_doc = that.htmlSession.getDocument();
      var css_doc = that.cssSession.getDocument();
      var js_doc = that.jsSession.getDocument();

      htmlQueue.on("child_added", function (ref) {
        console.log(ref);
        var timestamp = ref.key.split(":")[0];

        if (openPageTimestamp > timestamp) {
          return;
        }

        var value = ref.val();

        if (value.by === uid) {
          return;
        }

        html_applyingDeltas = true;
        console.log(value)
        html_doc.applyDeltas([value.event]);
        // css_doc.applyDeltas([value.event]);
        // js_doc.applyDeltas([value.event]);

        html_applyingDeltas = false;
      });

      cssQueue.on("child_added", function (ref) {
        var timestamp = ref.key.split(":")[0];

        if (openPageTimestamp > timestamp) {
          return;
        }

        var value = ref.val();

        if (value.by === uid) {
          return;
        }

        css_applyingDeltas = true;
        console.log(value)
        // html_doc.applyDeltas([value.event]);
        css_doc.applyDeltas([value.event]);
        // js_doc.applyDeltas([value.event]);

        css_applyingDeltas = false;
      });

      jsQueue.on("child_added", function (ref) {
        var timestamp = ref.key.split(":")[0];

        if (openPageTimestamp > timestamp) {
          return;
        }

        var value = ref.val();

        if (value.by === uid) {
          return;
        }

        js_applyingDeltas = true;
        console.log(value)
        js_doc.applyDeltas([value.event]);
        // css_doc.applyDeltas([value.event]);
        // js_doc.applyDeltas([value.event]);

        js_applyingDeltas = false;
      });

      var val = contentRef.val();
      console.log(val);

      if (val === null) {
        // ...we will initialize a new one.
        // ...with this content:
        val = "/* Welcome to FireEdit! */";

        // Here's where we set the initial content of the editor
        editorValues.child(that.project_name).set({
          queue: {
            html: {},
            css: {},
            js: {}
          },
          content: {
            html: "<html></html>",
            css: "body { }",
            js: "console.log('hi!');"
          },
        });
      }

      html_applyingDeltas = true;
      css_applyingDeltas = true;
      js_applyingDeltas = true;

      that.htmlSession.setValue(val.html, -1);
      that.cssSession.setValue(val.css, -1);
      that.jsSession.setValue(val.js, -1);

      html_applyingDeltas = false;
      css_applyingDeltas = false;
      js_applyingDeltas = false;

      // that.htmlSession.focus(); 

    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap");

header {
  display: none !important;
}

.ace_editor {
  top: 20px;
  left: 300px;
  border-top: 1px solid white;
  bottom: 26px;
}

aside {
  position: absolute;
  float: left;
  display: inline-block;
  width: 299px;
  top: 90px;
  bottom: 26px;
  border-top: 1px solid white;
  background-color: var(--back);
  border-right: 1px solid white;
}

#files {
  padding-top: 30px;
  padding-left: 20px;
}

#filetree {
  padding-top: 30px;
}

.file {
  width: 100%;
  padding: 3px 0px !important;
  border-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: left;
  background-color: transparent;
  color: white;
  border: none !important;
  margin: 0px;
  font-family: "Roboto Mono", "IBM Plex Mono", monospace;
  transition: 150ms !important;
}

.html {
  color: pink;
}

.js {
  color: red;
}

.css {
  color: orange;
}

.file:hover {
  background-color: rgba(201, 76, 76, 0.3) !important;
  color: white !important;
  transition: 150ms !important;
}

#files-label {
  color: white;
  margin-left: 20px;
}

#bottom {
  position: absolute;
  color: white;
  bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

#bottom a {
  text-decoration: underline;
  color: blue;
}

#editor-footer {
  background-color: var(--background);
  width: 100%;
  font-family: "Inter", sans-serif;
  z-index: 10;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  color: white;
  height: 26px;
  padding-top: 0px !important;
  position: fixed;
  border-top: 1px solid white;
  margin-top: 400px;
}

#editor-header {
  margin-left: 0px;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  left: 0px;
  height: 30px;
}

.deploy {
  background-color: rgba(0, 0, 0, 0);
  display: inline-block;
  float: right;
  cursor: pointer;
  border: 1px solid white;
  margin-right: 20px;
  font-size: 16px;
  background-color: black;
  color: white;
  font-family: "Inter", sans-serif;
  transition: 300ms !important;
}

#project-name {
  margin-left: 10px;
  margin-top: 0px;
  font-family: "Inter", "Helvetica", "Arial", sans-serif;
  height: 20px;
  font-size: 20px;
  resize: none;
  overflow-y: hidden;
  outline: none;
  display: inline-block;
  border-radius: 5px;
  /* padding-left: 5px; */
  padding-right: 5px;
  background-color: inherit;
  color: yellow;
  border: none;
  width: 400px;
}

.owner {
  margin-top: 0px;
  color: aqua;
}

#blob {
  display: none;
}

#editor-footer p {
  margin: 0px !important;
  margin-top: 0px;
}

.right {
  float: right;
  margin-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
  color: white;
}

.right:hover {
  --hover: #8547ff;
  background-color: var(--hover);
}

.left {
  float: left;
  margin-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
}

.left:hover {
  --hover: #8547ff;
  background-color: var(--hover);
}

.code {
  font-family: "Fira Mono", "IBM Plex Mono", monospace;
}

a {
  color: inherit;
  text-decoration: none;
}

.empty {
  margin-left: 10px;
  margin-top: 0px;
}

#loader {
  height: 100%;
  width: 100%;
  margin-top: 30vh;
}

.donutSpinner {
  display: inline-block;
  border: 4px solid hsl(222, 100%, 95%);
  border-left-color: hsl(243, 80%, 62%);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

footer {
  position: absolute !important;
}

#users {
  border-bottom: 1px solid white;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

#project-owner-avatar {
  height: 30px;
  width: 30px;
  border-radius: 9px;
}

.active-users {
  height: 30px;
  width: 30px;
  border-radius: 9px;
}

.pulseAnim {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  display: inline-block;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0.4);
  animation: pulseAnim 2s infinite;
}

@keyframes pulseAnim {
    0% {
        box-shadow: 0 0 0 0 rgba(88, 120, 243, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(88, 120, 243, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(88, 120, 243, 0);
    }
}
</style>