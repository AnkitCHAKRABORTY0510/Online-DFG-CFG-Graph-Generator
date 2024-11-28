function run_code() {
    // selected_text = editor.session.getTextRange(editor.getSelectionRange());
    // input_arguments = document.getElementById("input_arguments").value;
    // connect_error = '';
    // var hint;
    // if (hint_glow !== undefined && hint_glow !== null) {
    //     clearInterval(hint_glow);
    // }
    // $("#share-btn").popover('hide');
    // if ($('.dropdown').dropdown('get value')[0] === '') {
    //     $("#lang-select").popover('show');
    //     return;
    // }

    // if (selected_text.length > 0) {
    //     editor_val = selected_text;
    // } else {
    //     editor_val = editor.getValue();
    // }

    // if (editor_val.trim() === '') {
    //     $('#run-btn').blur();
    //     toastr.info('Cannot Run Empty Code', 'INFO');
    // } else {
    //     prev_result = 'in';
    //     document.getElementById("hint-section").innerHTML = '';
    //     editor_list = $(".nav-tabs").children('li');
    //     code_contents = [];
    //     active_filename = '';
    //     for (let i = 0; i < editor_list.length - 1; i++) {
    //         editor_index = parseInt($(editor_list[i]).attr('id').split('-')[1]);
    //         code_content = {}
    //         code_content['code'] = editor_session[editor_index - 1].getValue();
    //         code_content['file_name'] = $(editor_list[i]).children('a')[0].innerText;
    //         if ($(editor_list[i]).hasClass('active')) {
    //             active_filename = code_content['file_name'];
    //         }
    //         code_contents.push(code_content);
    //     }

    //     active_file_name = active_editor_id.html();
    //     document.getElementById("download_file_name").value = active_file_name.replace(/\..*/g, '').toLowerCase() + '_output.txt';

    //     init_ts = performance.now();

    //     if (typeof socket !== "undefined") {
    //         socket.close();
    //     }
    //     output.innerHTML = '';
    //     progress_status.innerHTML = '';
    //     $('#output').append('<div class="wrapper" id="wrap"></div><form id="term-form"><input id="term-input" autocomplete="off"></form>');

    //     exec_detail.innerHTML = '<span class="label label-primary"><i class="fas fa-sync-alt fa-spin"></i>&ensp;Connecting to Server</span>';
    //     progress_status.innerHTML = '<div class="progress" id="progress-bar"><div class="progress-bar progress-bar-primary progress-bar-striped active" role="progressbar"></div></div>';
    //     document.getElementById('control-btn').innerHTML = '<button type="button" class="btn btn-danger btn-sm" id="stop-btn" onclick="stop_python()"><i class="fa fa-stop"></i>&ensp;<strong>Stop</strong></button>';
    //     $('#stop-btn').removeAttr('disabled');
    //     // $('#run-btn').attr('disabled', 'disabled');
    //     $('.status button').attr('disabled', 'disabled');

    //     document.getElementById('wrap').innerHTML = '';

    //     socket_options['query'] = { type: "script", "lang": lang };
    //     socket = io(repl_host, socket_options);
    //     socket.emit('code', code_contents, input_arguments.substring(0, 500), active_filename);

    //     socket.on('reconnecting', function() {
    //         console.log('Reconnecting to the server!');
    //     });

    //     socket.on('connect', function() {
    //         console.log('Client has connected to the server');
    //         // exec_detail.innerHTML = '<span class="label label-primary"><i class="fas fa-play"></i>&ensp;Executing</span>';
    //     });

    //     socket.on('exit', function(data, code) {
    //         if (code !== 0 && ['c', 'cpp', 'java'].indexOf(lang) >= 0) add_content(data, false);
    //         else add_content(data, true);
    //         // $('#progress-bar').css('display', 'none');
    //         final_ts = Math.floor(performance.now() - init_ts) / 1000;

    //         if (code == 0) {
    //             exe_cnt += 1;
    //             // exec_detail.innerHTML = '<span class="label label-success"><i class="fa fa-check"></i>&ensp;Completed</span>';
    //             progress_status.innerHTML = '<div class="progress" id="progress-bar"><div class="progress-bar progress-bar-success active" role="progressbar"></div></div>';
    //         } else if (code == 1000) {
    //             // exec_detail.innerHTML = '<span class="label label-warning"><i class="fa fa-exclamation-triangle"></i>&ensp;Killed</span>';
    //             progress_status.innerHTML = '<div class="progress" id="progress-bar"><div class="progress-bar progress-bar-warning active" role="progressbar"></div></div>';
    //         } else {
    //             // exec_detail.innerHTML = '<span class="label label-danger"><i class="fa fa-exclamation-circle"></i>&ensp;Failed</span>';
    //             progress_status.innerHTML = '<div class="progress" id="progress-bar"><div class="progress-bar progress-bar-danger active" role="progressbar"></div></div>';
    //         }

    //         // exec_detail.innerHTML += '&ensp;<span class="label label-default"><i class="far fa-clock"></i>&ensp;' + final_ts + ' sec</span>';
    //         document.getElementById('control-btn').innerHTML = '<button type="button" class="btn btn-success btn-sm" id="run-btn" onclick="run_code()"><i class="fa fa-play"></i>&ensp;<strong>Run</strong></button>';

    //         // $('#stop-btn').attr('disabled', 'disabled');
    //         $('#run-btn').removeAttr('disabled');
    //         $('.status button').removeAttr('disabled');
    //         if (exe_cnt === 5) {
    //             $("#share-btn").popover('show');
    //             exe_cnt += 1;
    //             setTimeout(function() { $("#share-btn").popover('hide') }, 7000);
    //         }
    //         if (hint !== undefined) {
    //             document.getElementById("hint-section").innerHTML = '<a tabindex="0" type="button" id="hint-btn" data-toggle="popover" data-placement="right" data-trigger="hover" data-content="' + hint + '" title="Hint" class="btn btn-default btn-sm status"><i class="fas fa-lightbulb"></i></button></a>';
    //             $("#hint-btn").popover('show');
    //             setTimeout(function() { $("#hint-btn").popover('hide') }, 7000);
    //             hint_glow = setInterval(function() {
    //                 if ($("#hint-btn").css('transform').search('1.5') !== -1) {
    //                     $("#hint-btn").css('transform', 'scale(1.2)')
    //                 } else {
    //                     $("#hint-btn").css('transform', 'scale(1.5)')
    //                 }
    //             }, 700);
    //         }
    //         if (!isMobile) editor.focus();
    //     })

    //     socket.on('input', function(data) {
    //         var encodedString = String.fromCharCode.apply(null, new Uint8Array(data));
    //         var buf = decodeURIComponent(escape(encodedString));
    //         // var buf = String.fromCharCode.apply(null, new Uint8Array(data));
    //         add_input_content(buf, true);
    //     });

    //     socket.on('output', function(data) {
    //         var encodedString = String.fromCharCode.apply(null, new Uint8Array(data));
    //         var buf = decodeURIComponent(escape(encodedString));
    //         // var buf = String.fromCharCode.apply(null, new Uint8Array(data));
    //         add_content(buf, true);
    //     });

    //     socket.on('err', function(data) {
    //         var encodedString = String.fromCharCode.apply(null, new Uint8Array(data));
    //         var buf = decodeURIComponent(escape(encodedString));
    //         // var buf = String.fromCharCode.apply(null, new Uint8Array(data));
    //         add_err(buf);
    //         if (hint === undefined) hint = check_hint(buf);
    //     });

    //     socket.on('reconnect_failed', function(err) {
    //         console.log("Connection Failed");
    //         clear_content();
    //         add_content("Problem in connecting to the server. Below could be the possible reasons:\n", true);
    //         add_content("  -  Your Page can be unresponsive. Please reload your page and try.\n", true);
    //         add_content("  -  Your Internet might be down. Check your internet connection.\n", true);
    //         add_content("  -  Server may not be reachable. Please try after sometime.\n", true);
    //         // if (connect_error !== "" || connect_error !== null || connect_error !== undefined) {
    //         //     add_content(connect_error, true);
    //         // }
    //         document.getElementById('control-btn').innerHTML = '<button type="button" class="btn btn-success btn-sm" id="run-btn" onclick="run_code()" id="#run"><i class="fa fa-play"></i>&ensp;<strong>Run</strong></button>';
    //         // $('#stop-btn').attr('disabled', 'disabled');
    //         $('#run-btn').removeAttr('disabled');
    //         $('.status button').removeAttr('disabled');
    //         socket.close();
    //     });

    //     socket.on('connect_error', function(err) {
    //         console.log("Connection Failed - " + err);
    //         connect_error = err;
    //     });


    //     $(document).ready(function() {
    //         $('#term-form').submit(function(event) {
    //             var input = $('#term-input');
    //             socket.send(input.val());
    //             //leave the content on the page
    //             return false;
    //         });
    //         //let a cursor focus on the input when the page is loaded
    //         $('#term-input').focus();
    //     });

    // }

}

function stop_python() {
    // document.getElementById('progress-status').innerHTML = '';
    // if (typeof socket !== "undefined") {
    //     socket.close();
    // }
    // final_ts = Math.floor(performance.now() - init_ts) / 1000;
    // progress_status.innerHTML = '<div class="progress" id="progress-bar"><div class="progress-bar progress-bar-warning active" role="progressbar"></div></div>';
    // exec_detail.innerHTML = '<span class="label label-warning"><i class="fa fa-exclamation-triangle"></i>&ensp;Aborted</span>';
    // document.getElementById('control-btn').innerHTML = '<button type="button" class="btn btn-success btn-sm" id="run-btn" onclick="run_code()" id="#run"><i class="fa fa-play"></i>&ensp;<strong>Run</strong></button>';
    // $('#run-btn').removeAttr('disabled');
    // // $('#stop-btn').attr('disabled', 'disabled');
    // $('.status button').removeAttr('disabled');
    // if (!isMobile) editor.focus();
    // add_err("** Process Stopped **");
}

function share_code() {
    // code_contents = [];
    // editor_list = $(".nav-tabs").children('li');
    // for (let i = 0; i < editor_list.length - 1; i++) {
    //     editor_index = parseInt($(editor_list[i]).attr('id').split('-')[1]);
    //     code_content = {}
    //     code_content['code'] = editor_session[editor_index - 1].getValue();
    //     code_content['file_name'] = $(editor_list[i]).children('a')[0].innerText;
    //     if ($(editor_list[i]).hasClass('active')) {
    //         code_content['active'] = 1;
    //     } else {
    //         code_content['active'] = 0;
    //     }
    //     code_contents.push(code_content);
    // }
    // request = $.ajax({
    //     url: site_url + "ide/share_code",
    //     method: "POST",
    //     timeout: 30000,
    //     data: {
    //         [csrf_token_name]: csrf_token,
    //         code_content: JSON.stringify(code_contents),
    //         exp_days: $("#expiry_select").val(),
    //         lang: lang
    //     },
    //     dataType: "JSON",
    //     success: function(response) {
    //         $("#shareModal").modal('hide');
    //         if (response['output'] === true) {
    //             share_url = site_url + response['share_id'];
    //             $("#share_url_box").val(share_url);
    //             addthis_share['url'] = share_url;
    //             $("#shareModalAfter").modal('show');
    //         } else {
    //             toastr.error('Error in saving the code to server. Please try after some time', 'ERROR', { timeOut: 6000 });
    //         }
    //     },
    //     error: function() {
    //         toastr.error('Error in connecting to the server. Please try after some time', 'ERROR', { timeOut: 60000 });
    //     },
    //     // complete(xhr, status) {
    //     //     console.log(status);
    //     // }
    // });
}


function get_code(share_id) {
    // request = $.ajax({
    //     url: site_url + "ide/get_code",
    //     method: "POST",
    //     timeout: 30000,
    //     data: {
    //         [csrf_token_name]: csrf_token,
    //         code_id: share_id
    //     },
    //     dataType: "JSON",
    //     success: function(response) {
    //         content = $.parseJSON(response['code']);
    //         if (content !== null) {
    //             lang = response['lang'];
    //             default_content = get_script(lang);
    //             editor.session.setMode("ace/mode/" + get_mode(response['lang']));
    //             $('.dropdown').dropdown('set selected', lang);
    //             active_index = 0;
    //             for (let i = 0; i < content.length; i++) {
    //                 editor_cnt += 1;
    //                 editor_index += 1;
    //                 if (content[i]['active'] === 1)
    //                     active_index = i;
    //                 if (i === 0)
    //                     $('.add-editor').closest('li').before('<li id="editor-' + editor_cnt + '"><a data-toggle="tab">' + content[i]['file_name'] + '</a> </li>');
    //                 else
    //                     $('.add-editor').closest('li').before('<li id="editor-' + editor_cnt + '"><a data-toggle="tab">' + content[i]['file_name'] + '</a> <span> <i class="fa fa-times"></i></span></li>');

    //                 editor_session[i] = ace.createEditSession('', "ace/mode/" + get_mode(lang));
    //                 editor_session[i].setValue(content[i]['code']);
    //             }
    //             editor.setSession(editor_session[active_index]);
    //             active_editor_id = $("#editor-" + (active_index + 1)).children('a').last();
    //             active_editor_id.tab('show');
    //         } else {
    //             toastr.info('Code does not exists. It may have expired', 'INFO', { "positionClass": "toast-top-center", "timeOut": 0 });
    //             lang = "python3";
    //             default_content = get_script(lang);
    //             editor_session[0] = ace.createEditSession('', "ace/mode/" + get_mode(lang));
    //             editor.setSession(editor_session[0]);
    //             $('.add-editor').closest('li').before('<li id="editor-1"><a data-toggle="tab">' + get_scriptname(lang) + '</a></li>');
    //             active_editor_id = $("#editor-1").children('a').last();
    //             active_editor_id.tab('show');
    //         }

    //         update_editor_footer();
    //     },
    //     error: function() {
    //         toastr.info('Unable to get the shared code from server. Please try after sometime', 'INFO', { "positionClass": "toast-top-center", "timeOut": 0 });
    //     },
    //     // complete(status) {
    //     //     console.log(status);
    //     // }
    // });
}



function update_editor_footer(editor) {
    var pos = editor.session.selection.getCursor();
    var row = pos.row + 1;
    var column = pos.column + 1;
    var selected_char = editor.session.getTextRange(editor.getSelectionRange()).length;

    var footer = document.getElementById("editor-footer"); // Ensure this element exists in your HTML
    if (selected_char > 0) {
        y.innerHTML = "&emsp;Ln: " + row + ",&ensp;Col: " + column + "&nbsp;(" + selected_char + " selected)"
    } else {
        y.innerHTML = "&emsp;Ln: " + row + ",&ensp;Col: " + column

    }
}


function clear_output() {
    // socket.close();
    // document.getElementById('progress-status').innerHTML = '';
    // output.innerHTML = '';
    // progress_status.innerHTML = '';
    // exec_detail.innerHTML = '';
    // $('#run-btn').removeAttr('disabled');
    // $('#stop-btn').attr('disabled', 'disabled');
    // $('.status button').removeAttr('disabled');
    // $('.status button').attr('disabled', 'disabled');
    // $('.status button').tooltip('hide');
}

function copy_share_url() {
    // var copyText = document.getElementById("share_url_box");
    // copyText.select();
    // copyText.setSelectionRange(0, 99999);
    // document.execCommand("copy");
    // toastr.success('Share URL Copied', 'INFO');
}

function copy_output() {
    // $('.status').blur();
    // result = document.getElementById("pre");
    // element_id = "pre";
    // if (result === undefined || result === null) {
    //     result = document.getElementById("wrap");
    //     element_id = "wrap";
    // }
    // if (result) {
    //     var copyText = '';
    //     divChildren = document.getElementById(element_id).childNodes;
    //     for (var i = 0; i < divChildren.length; i++) {
    //         copyText += divChildren[i].innerText;
    //     }
    //     const textArea = document.createElement('textarea');
    //     textArea.setAttribute("id", "hidden_textarea");
    //     textArea.textContent = copyText;
    //     document.body.append(textArea);
    //     textArea.select();
    //     document.execCommand("copy");
    //     toastr.success('Result Copied to Clipboard', 'INFO');
    // }
}

function download_output() {
    // result = document.getElementById("pre");
    // element_id = "pre";
    // if (result === undefined || result === null) {
    //     result = document.getElementById("wrap");
    //     element_id = "wrap";
    // }
    // filename = document.getElementById("download_file_name").value;
    // if (result) {
    //     var copyText = '';
    //     divChildren = document.getElementById(element_id).childNodes;
    //     for (var i = 0; i < divChildren.length; i++) {
    //         copyText += divChildren[i].innerText;
    //     }
    //     const textArea = document.createElement('textarea');
    //     textArea.setAttribute("id", "hidden_textarea");
    //     textArea.textContent = copyText;
    //     document.body.append(textArea);
    //     textArea.select();
    //     if (textArea.value !== '') {
    //         download(textArea.value, filename, "text/txt");
    //     } else {
    //         toastr.info('Cannot Download Empty Result', 'INFO');
    //     }
    //}
}


function download_code() {
    // filename = document.getElementById("code_file_name").value;
    // if (editor.getValue() !== '') {
    //     const copyText = editor.getValue();
    //     const textArea = document.createElement('textarea');
    //     textArea.setAttribute("id", "hidden_textarea");
    //     textArea.textContent = copyText;
    //     document.body.append(textArea);
    //     textArea.select();
    //     if (textArea.value !== '') {
    //         download(textArea.value, filename, "text/txt");
    //     }
    // } else {
    //     toastr.info('Code is blank to download', 'INFO');
    // }
}


function download(content, filename, contentType) {
    // if (!contentType) contentType = 'application/octet-stream';
    // var a = document.createElement('a');
    // var blob = new Blob([content], {
    //     'type': contentType
    // });
    // a.href = window.URL.createObjectURL(blob);
    // a.download = filename;
    // a.click();
}

function updateVal(currentEle, value) {
    // $(document).off('click');
    // $('.add-editor').attr('disabled', 'disabled');
    // $(currentEle).html('<input class="thVal" type="text" value="' + value + '" />');
    // $(".thVal").focus();
    // $(".thVal").keyup(function(event) {
    //     event.stopPropagation();
    //     event.preventDefault();
    //     if (event.keyCode == 13) {
    //         filenames = get_filenames();
    //         input_filename = $(".thVal").val();
    //         if (input_filename !== '' && input_filename !== undefined && input_filename !== null && filenames.indexOf(input_filename) < 0) $(currentEle).html(input_filename.replace(/[^0-9A-Za-z-_\.]/g, ''));
    //         else $(currentEle).html(value);
    //         if (filenames.indexOf(input_filename) >= 0) {
    //             toastr.info(input_filename + ' already exits. Please choose different name.', 'INFO');
    //         }
    //         editor.focus();
    //         $(document).off('click');
    //         $('.add-editor').removeAttr('disabled');
    //     }
    // });

    // $(document).click(function(e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     if ($(event.target).attr('class') != "thVal") {
    //         filenames = get_filenames();
    //         input_filename = $(".thVal").val();
    //         if (input_filename !== '' && input_filename !== undefined && input_filename !== null && filenames.indexOf(input_filename) < 0) $(currentEle).html(input_filename.replace(/[^0-9A-Za-z-_\.]/g, ''));
    //         else $(currentEle).html(value);
    //         if (filenames.indexOf(input_filename) >= 0) {
    //             toastr.info(input_filename + ' already exits. Please choose different name.', 'INFO');
    //         }
    //         editor.focus();
    //         $(document).off('click');
    //         $('.add-editor').removeAttr('disabled');
    //     }

    // });

}

function goodbye(e) {
    // if (!e) e = window.event;
    // //e.cancelBubble is supported by IE - this will kill the bubbling process.
    // e.cancelBubble = true;
    // e.returnValue = 'You sure you want to leave?'; //This is displayed on the dialog

    // //e.stopPropagation works in Firefox.
    // if (e.stopPropagation) {
    //     e.stopPropagation();
    //     e.preventDefault();
    // }
}

function close_editor_tab() {
    close_tab.prev().children('a').click();
    close_tab.remove();
    editor_index -= 1;
    editor.focus();
}

function save_code_modal() {
    // $('#save_file').blur();
    // if (active_editor_id.html().search('<input') === -1) {
    //     if (editor.getValue().trim() === '') {
    //         toastr.info('Code is empty to save', 'INFO');
    //     } else {
    //         active_file_name = active_editor_id.html();
    //         document.getElementById("code_file_name").value = active_file_name.replace(/\..*/g, '\.').toLowerCase() + get_script_ext(lang);
    //         $("#saveEditorTab").modal('show');
    //     }
    // }
}


function share_code_modal() {
    $('#share-btn').blur();
    $('#share-btn').popover('hide');
    $("#shareModal").modal('show');
}


function download_modal() {
    $("#downloadResult").modal('show');
}

function about_modal() {
    $("#aboutSiteModal").modal('show');
}

function ace_setting() {
    editor.showSettingsMenu();
    // ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
    //     module.init(editor);
    //     editor.showKeyboardShortcuts()
    // });
}



function dispFile(contents) {
    editor_cnt += 1;
    editor_index += 1;
    var id = editor_cnt;

    active_editor = id;
    editor_session[active_editor - 1] = ace.createEditSession('', "ace/mode/cpp");
    editor.setSession(editor_session[active_editor - 1]);

    $('.add-editor').closest('li').before('<li id="editor-' + id + '"><a data-toggle="tab">' + open_file_name + '</a> <span> <i class="fa fa-times"></i></span></li>');
    // $('.nav-tabs li:nth-child(' + id + ') a').click();

    active_editor_id = $(".nav-tabs li").children('a').last();
    active_editor_id.tab('show');

    editor.session.setValue(contents);
    editor.focus();

    update_editor_footer(editor);

    editor.selection.on('changeCursor', function(e) {
        update_editor_footer(editor);
    });

    editor.selection.on('changeSelection', function(e) {
        update_editor_footer(editor);
    });
}

function clickElem(elem) {
    var eventMouse = document.createEvent("MouseEvents")
    eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    elem.dispatchEvent(eventMouse)
}




//-------------------------------------------------------------------------------------------------------------------------------
//*functions to upload files from local machine to editor
//TODO: 1.improve the ui x sign jump
//TODO: 2.include X sign for main
//TODO: 3.enable chnage in filename option when a new editor or file is added or created
//TODO: 4.when i close a file from editor it goes to blank i want to show the last file from there elese if no editor show the default file


// Dictionary to store Ace editor instances
const editorSessions = {};

// Function to create a new editor session
function createEditorSession(editorDivId, mode = 'text', content = '// Start coding...') {
    // Initialize Ace editor for the given editorDivId
    const editor = ace.edit(editorDivId);
    editor.session.setMode(`ace/mode/${mode}`);
    editor.setValue(content, -1); // Load the content into the editor (-1 to move cursor to start)
    
    // Set editor options
    editor.setOptions({
        enableBasicAutocompletion: true, // Completes the statement on Ctrl + Space
        enableLiveAutocompletion: true, // Completes the statement while typing
        enableSnippets: true, // Enables snippet functionality
        showPrintMargin: false, // Hides the vertical limiting strip
        fixedWidthGutter: true, // Gutter has a fixed width
        autoScrollEditorIntoView: true, // Automatically scrolls editor into view
        copyWithEmptySelection: true, // Copies content even with no selection
        highlightActiveLine: false, // Does not highlight the active line
    });

    // Add event listeners to update the footer
    addEditorFooterListeners(editor);

    // Store the session in the dictionary for future reference
    editorSessions[editorDivId] = editor;
}

// Function to create a new editor tab
function createNewEditor() {
    const tabList = document.querySelector(".nav.nav-tabs");
    const editorContainer = document.getElementById("editor");

    // Only remove the editor with ID 1 (if it exists)
    removeEditorAndTab(1);

    // Find the next unique editor ID
    const editorId = getNextEditorId();
    const editorDivId = `editor-instance-${editorId}`;

    // Create a new tab for the new editor
    const tab = createTab(`Untitled${editorId}`, editorId);
    tabList.insertBefore(tab, tabList.querySelector("#new_file_btn"));

    // Create a new div for the Ace Editor and hide it initially
    const editorDiv = document.createElement("div");
    editorDiv.id = editorDivId;
    editorDiv.style.height = "100%";
    editorDiv.style.width = "100%";
    editorDiv.style.display = "none"; // Hidden until the tab is clicked

    editorContainer.appendChild(editorDiv);

    // Initialize the new Ace editor session
    createEditorSession(editorDivId, "c_cpp"); // Default mode for new files

    // Add click event to the new tab to display the corresponding editor
    tab.addEventListener('click', () => {
        activateEditor(tab, editorDivId);
    });

    // Automatically activate the new tab and editor
    tab.click();
}

// Function to open files and initialize Ace editor sessions for each
function openFile(func) {
    $('#open_file').blur();

    const readFiles = (e) => {
        const files = e.target.files; // Get all selected files
        if (!files.length) {
            return;
        }

        const tabList = document.querySelector(".nav.nav-tabs");
        const editorContainer = document.getElementById("editor");

        // Only remove the editor with ID 1 (if it exists)
        removeEditorAndTab(1);

        Array.from(files).forEach((file, index) => {
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;

                const editorId = getNextEditorId(); // Find the next unique editor ID
                const editorDivId = `editor-instance-${editorId}`;

                // Create a new tab for each file
                const tab = createTab(file.name, editorId);
                tabList.insertBefore(tab, tabList.querySelector("#new_file_btn"));

                // Create a div for the Ace Editor and hide it initially
                const editorDiv = document.createElement("div");
                editorDiv.id = editorDivId;
                editorDiv.style.height = "300px";
                editorDiv.style.width = "100%";
                editorDiv.style.display = "none"; // Hidden until the tab is clicked

                editorContainer.appendChild(editorDiv);

                // Get the correct mode based on the file extension
                const mode = getModeFromExtension(file.name);

                // Initialize Ace editor session for each file
                createEditorSession(editorDivId, mode, contents); // Create session and load contents

                // Add click event to the tab to display the corresponding editor
                tab.addEventListener('click', () => {
                    activateEditor(tab, editorDivId);
                });

                // Activate the first tab and editor by default
                if (index === 0) {
                    tab.classList.add("active");
                    editorDiv.style.display = "block";
                }

                // Optional: sync the file content with other functions
                if (func) {
                    func(contents, file.name); // Pass both file content and file name to the callback
                }
            };

            reader.readAsText(file);
        });

        document.body.removeChild(fileInput); // Cleanup
    };

    const fileInput = document.createElement("input");
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.multiple = true; // Allow multiple files to be selected
    fileInput.webkitdirectory = true; // Allow selecting directories (webkit only)
    fileInput.onchange = readFiles;
    document.body.appendChild(fileInput);

    clickElem(fileInput);
}


// Function to create a new tab
function createTab(fileName, editorId) {
    const tab = document.createElement("li");
    tab.id = `editor-${editorId}`;

    tab.innerHTML = `
        <style>
            #close_file {
                display: none; /* Hide button initially */
            }
            a:hover #close_file {
                display: inline-block; /* Show button when hovering over the a tag */
            }
        </style>
        <a style="padding: 7.5px;" data-toggle="tab" href="#">
            ${fileName}
            <button type="button" id="close_file" onclick="closeFile(event)" data-toggle="tooltip" data-container="body" data-placement="right" title="Remove file from editor" style="border: transparent; background-color: transparent;">
                <i class="fas fa-times" style="color: #f40707;"></i>
            </button>
        </a>
    `;

    return tab;
}

// Function to activate a specific editor
function activateEditor(tab, editorDivId) {
    // Hide all editors
    document.querySelectorAll("#editor > div").forEach(ed => ed.style.display = "none");
    // Show the clicked editor
    document.getElementById(editorDivId).style.display = "block";

    // Remove active class from other tabs
    document.querySelectorAll(".nav.nav-tabs li").forEach(li => li.classList.remove("active"));
    // Add active class to the current tab
    tab.classList.add("active");
}

// Function to add event listeners to update the footer
function addEditorFooterListeners(editor) {
    editor.session.selection.on('changeCursor', () => {
        update_editor_footer(editor);
    });
    editor.session.selection.on('changeSelection', () => {
        update_editor_footer(editor);
    });
}

function closeFile(event) {
    const button = event.target.closest('button');
    const tab = button.closest('li');
    const editorId = tab.id.match(/editor-(\d+)/)[1];
    const editorDivId = `editor-instance-${editorId}`;

    // Remove the corresponding editor div
    const editorDiv = document.getElementById(editorDivId);
    if (editorDiv) {
        editorDiv.remove();
    }

    // Remove the tab itself
    tab.remove();

    // If this was the active tab, activate the first available tab and editor
    const allTabs = document.querySelectorAll(".nav.nav-tabs li");
    if (allTabs.length > 0) {
        const firstTab = allTabs[0];
        const firstEditorId = firstTab.id.match(/editor-(\d+)/)[1];
        const firstEditorDiv = document.getElementById(`editor-instance-${firstEditorId}`);

        firstTab.classList.add("active");  // Set the first tab as active
        firstEditorDiv.style.display = "block";  // Show the first editor
    }
}

// Function to remove the editor and tab by ID
function removeEditorAndTab(editorId) {
    const editorToRemove = document.getElementById(`editor-instance-${editorId}`);
    const tabToRemove = document.getElementById(`editor-${editorId}`);

    if (editorToRemove) {
        editorToRemove.remove(); // Remove the editor content
    }
    if (tabToRemove) {
        tabToRemove.remove(); // Remove the tab
    }
}

// Function to find the next available editor ID
function getNextEditorId() {
    const tabs = document.querySelectorAll(".nav.nav-tabs li");
    let maxId = 1; // Start from 1 (since 2 is the next desired number)

    // Iterate over all tabs and find the highest editor ID
    tabs.forEach(tab => {
        const id = tab.id.match(/editor-(\d+)/);
        if (id && id[1]) {
            const num = parseInt(id[1], 10);
            if (num > maxId) {
                maxId = num;
            }
        }
    });

    // Return the next available ID, starting from 2
    return maxId + 1;
}

// Function to get the mode for Ace editor based on file extension
function getModeFromExtension(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();

    switch (ext) {
        case 'js': return 'javascript';
        case 'py': return 'python';
        case 'cpp':
        case 'h': return 'c_cpp';
        case 'java': return 'java';
        case 'html': return 'html';
        case 'css': return 'css';
        default: return 'text'; // Default mode
    }
}


//--------------------------------------------------------------------------------------------------------------
// Function to generate a random folder name
function generateRandomFolderName() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let folderName = '';
    for (let i = 0; i < 8; i++) { // Create a random string of 8 characters
        folderName += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return folderName;
}

// Function to extract editor content and create files inside a folder (ZIP)
function saveAllFiles() {
    const folderName = generateRandomFolderName(); // Generate random folder name
    const zip = new JSZip(); // Initialize JSZip object

    // Select all editor divs inside the editor container
    editors = document.querySelectorAll("#editor > div");
    
    editors.forEach(editorDiv => {
        // Use the editorDiv ID to get the corresponding editor from the sessions
        const editorDivId = editorDiv.id; // e.g., "editor-instance-2"
        
        // Check if the editor session exists in editorSessions
        if (editorSessions[editorDivId]) {
            content = editorSessions[editorDivId].getValue(); // Get the content of the editor
            
            // Get the file name from the corresponding tab element
            tab = document.querySelector(`#editor-${editorDivId.split('-')[2]}`);
            fileNameElement = tab.querySelector('a'); // Get the anchor tag
            fileName = fileNameElement ? fileNameElement.textContent.trim() : `Untitled_${editorId.split('-')[2]}.txt`; // Extract file name or default
            
            // Add file to ZIP with the editor content
            zip.file(`${folderName}/${fileName}`, content);
        } else {
            console.error(`No editor session found for ${editorDivId}`);
        }
    });

    // Generate the ZIP file and trigger the download
    zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, `${folderName}.zip`); // Save the ZIP with the folder name
    });
}


//-------------------------------------------------------------------------------------------------------------
//sending files to docker container test
async function sendAllFiles() {
    const folderName = generateRandomFolderName(); // Generate random folder name
    const zip = new JSZip(); // Initialize JSZip object

    // Select all editor divs inside the editor container
    editors = document.querySelectorAll("#editor > div");
    
    editors.forEach(editorDiv => {
        // Use the editorDiv ID to get the corresponding editor from the sessions
        const editorDivId = editorDiv.id; // e.g., "editor-instance-2"
        
        // Check if the editor session exists in editorSessions
        if (editorSessions[editorDivId]) {
            content = editorSessions[editorDivId].getValue(); // Get the content of the editor
            
            // Get the file name from the corresponding tab element
            tab = document.querySelector(`#editor-${editorDivId.split('-')[2]}`);
            fileNameElement = tab.querySelector('a'); // Get the anchor tag
            fileName = fileNameElement ? fileNameElement.textContent.trim() : `Untitled_${editorId.split('-')[2]}.txt`; // Extract file name or default
            
            // Add file to ZIP with the editor content
            zip.file(`${folderName}/${fileName}`, content);
        } else {
            console.error(`No editor session found for ${editorDivId}`);
        }
    });

    // Generate the ZIP file and trigger the download
    zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, `${folderName}.zip`); // Save the ZIP with the folder name
    });

    try {
        // Generate the ZIP file
        const content = await zip.generateAsync({ type: "blob" });
        
        // Create FormData to include the zip file
        const formData = new FormData();
        formData.append("zipFile", content, `${folderName}.zip`);

        // Send the ZIP file to the server
        const response = await fetch("http://localhost:7000/upload", { // Replace <SERVER_IP> with your server's IP
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const result = await response.json(); // Assuming server returns JSON
            console.log("Server Response:", result.message); // Display success message
        } else {
            console.error("Failed to send the zip file to the server.");
        }
    } catch (error) {
        console.error("Error while sending ZIP file:", error);
    }
}



//-------------------------------------------------------------------------------------------------------------
//send file to the server

// Function to set/get cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

// WebSocket object
let socket = null;

// Function to handle WebSocket connection
function startWebSocketConnection() {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket('ws://localhost:8080');

        socket.onopen = function(event) {
            console.log("Connected to the server");

            // If session ID doesn't exist, create a new one and save it in a cookie
            let sessionId = getCookie('sessionId');
            if (!sessionId) {
                sessionId = generateRandomSessionId(); // Random session ID generator
                setCookie('sessionId', sessionId, 1); // Store session ID in cookie for 1 day
            }

            // Now that the WebSocket is open, call the sendFiles function
            sendFiles(sessionId);
        };

        socket.onmessage = function(event) {
            console.log("Message from server:", event.data);
        };

        socket.onclose = function() {
            console.log("WebSocket connection closed");
        };
    } else {
        console.log("WebSocket is already open.");
        sendFiles(getCookie('sessionId')); // If connection is already open, send files
    }
}

// Function to send files through WebSocket





//---------------------------------------------------------------------------------------------------------
function add_content(bashOutput, focus) {
    bashOutput = $('<div>').text(bashOutput).html();
    $('.wrapper').append('<p id="term-output">' + bashOutput + '</p>');
    document.getElementById('term-form').innerHTML = '<input id="term-input" autocomplete="off">';
    if (focus) {
        $('#term-input').focus();
    }

    var scrolledWindow = $('body').height() - $(window).height() + 0;
    $(window).scrollTop(scrolledWindow);
    if (bashOutput !== '' && bashOutput.slice(-1) !== "\n") prev_result = 'out';
}

function add_input_content(bashOutput, focus) {
    if (prev_result === 'in') {
        bashOutput = bashOutput.replace(/^\n/, '');
    }
    bashOutput = $('<div>').text(bashOutput).html();
    $('.wrapper').append('<p id="term-output">' + bashOutput + '</p>');
    document.getElementById('term-form').innerHTML = '<input id="term-input" autocomplete="off">';
    if (focus) {
        $('#term-input').focus();
    }

    var scrolledWindow = $('body').height() - $(window).height() + 0;
    $(window).scrollTop(scrolledWindow);
    prev_result = 'in';
}


function clear_content() {
    progress_status.innerHTML = '';
    document.getElementById('wrap').innerHTML = '';
    exec_detail.innerHTML = '';
    $('#run-btn').removeAttr('disabled');
    $('#stop-btn').attr('disabled', 'disabled');
    $('.status button').removeAttr('disabled');
}


function add_err(bashError) {
    cur = bashError.slice(-4);
    if (cur === '>>> ' || cur === '... ') {
        bashError = bashError.slice(0, -4);
    } else {
        cur = ""
    }
    bashError = $('<div>').text(bashError).html();
    bashError_list = bashError.split("\n");
    document.getElementById('term-form').innerHTML = cur + '<input id="term-input" autocomplete="off">';

    for (i = 0; i < bashError_list.length; i++) {
        if (bashError_list[i].trim() === "") {
            continue;
        }
        if (['c', 'cpp', 'golang'].indexOf(lang) >= 0) {
            regexp = /(^[0-9A-Za-z-_\.\/]+:[0-9]+:[0-9]+:)(.*)/
        } else {
            regexp = /(^[0-9A-Za-z-_\.\/]+:[0-9]+:)(.*)/
        }
        if (bashError_list[i].search(/\:.*error\:/) !== -1) {
            line_num = bashError_list[i].replace(/^[0-9A-Za-z-_\.\/]+:([0-9]+):.*/, '$1');
            file_name = bashError_list[i].replace(/^([0-9A-Za-z-_\.\/]+):[0-9]+:.*/, '$1');
            span_text = bashError_list[i].replace(regexp, '<span class="error-msg" onclick="goto_line(' + line_num + ',\'' + file_name + '\')">$1</span>$2')
            $('.wrapper').append('<p id="term-output" class="error">' + span_text + '\n</p>');
        } else if (bashError_list[i].search(/\:.*warning:/) !== -1 || bashError_list[i].search(/\:.*:/) !== -1) {
            line_num = bashError_list[i].replace(/^[0-9A-Za-z-_\.\/]+:([0-9]+):.*/, '$1');
            file_name = bashError_list[i].replace(/^([0-9A-Za-z-_\.\/]+):[0-9]+:.*/, '$1');
            span_text = bashError_list[i].replace(regexp, '<span class="error-msg" onclick="goto_line(' + line_num + ',\'' + file_name + '\')">$1</span>$2')
            $('.wrapper').append('<p id="term-output" class="warning">' + span_text + '\n</p>');
        } else if (['c', 'cpp', 'java', 'golang'].indexOf(lang) >= 0) {
            $('.wrapper').append('<p id="term-output">' + bashError_list[i] + '\n</p>');
        } else {
            $('.wrapper').append('<p id="term-output" class="error">' + bashError_list[i] + '\n</p>');
        }
    }

    var scrolledWindow = $('body').height() - $(window).height() + 0
    $(window).scrollTop(scrolledWindow);
    // $('#term-input').focus();
}



function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

function goto_line(n, filename) {
    for (let i = 0; i < editor_list.length - 1; i++) {
        editor_index = parseInt($(editor_list[i]).attr('id').split('-')[1]);
        if (filename === $(editor_list[i]).children('a')[0].innerText) {
            $(editor_list[i]).children('a').click()
        }
    }

    editor.gotoLine(n, 0, true);
}

function get_filenames() {
    // editor_list = $(".nav-tabs").children('li');
    // filenames = []
    // for (let i = 0; i < editor_list.length - 1; i++) {
    //     filenames.push($(editor_list[i]).children('a')[0].innerText);
    // }
    // return filenames;
}

function get_host() {
    // return "https://portal.online-python.com:8443";
    // return "https://repl.online-cpp.com";
    // return "http://192.168.99.100:8080";
    // return "http://34.125.57.204:8080";
    // return "https://34.125.57.204:2096";
    // return "https://repl.online-ide.com:2096";
    // return "http://localhost:8080";
}

function get_mode(lang) {
    mode = {
        "c": "c_cpp",
        "cpp": "c_cpp",
        "cpp14": "c_cpp",
        "cpp17": "c_cpp",
        "python3": "python",
        "perl": "perl",
        "php": "php",
        "java": "java",
        "ruby": "ruby",
        "golang": "golang",
        "javascript": "javascript",
        "rlang": "r",
        "bash": "sh",
    }
    return mode[lang];
}

function get_scriptname(lang) {
    script = {
        "c": "main.c",
        "cpp": "main.cpp",
        "cpp14": "main.cpp",
        "cpp17": "main.cpp",
        "python3": "main.py",
        "perl": "main.pl",
        "php": "main.php",
        "java": "Main.java",
        "ruby": "main.rb",
        "golang": "main.go",
        "javascript": "main.js",
        "rlang": "main.r",
        "bash": "main.sh",
    }
    return script[lang];
}

function get_script_ext(lang) {
    script = {
        "c": "c",
        "cpp": "cpp",
        "cpp14": "cpp",
        "cpp17": "cpp",
        "python3": "py",
        "perl": "pl",
        "php": "php",
        "java": "java",
        "ruby": "rb",
        "golang": "go",
        "javascript": "js",
        "rlang": "r",
        "bash": "sh",
    }
    return script[lang];
}

function get_script(lang) {
    script = {
        "c": "\n\
// Online C Compiler - Build, Compile and Run your C programs online in your favorite browser\n\
\n\
#include<stdio.h>\n\
\n\
int main()\n\
{\n\
    printf(\"Welcome to Online IDE!! Happy Coding :)\");\n\
    return 0;\n\
}\n\
",

        "cpp": "\n\
// Online C++ Compiler - Build, Compile and Run your C++ programs online in your favorite browser\n\
\n\
#include<iostream>\n\
\n\
using namespace std;\n\
\n\
int main()\n\
{\n\
    cout<<\"Welcome to Online IDE!! Happy Coding :)\";\n\
    return 0;\n\
}\n\
",

        "cpp14": "main.cpp",
        "cpp17": "main.cpp",

        "python3": "\n\
# Online IDE - Code Editor, Compiler, Interpreter\n\
\n\
print('Welcome to Online IDE!! Happy Coding :)')\n\
",
        "perl": "",


        "php": "<?php\n\
\n\
// Online IDE - Code Editor, Compiler, Interpreter\n\
\n\
echo \"Welcome to Online IDE!! Happy Coding :)\";\n\
",

        "java": "\n\
// Online IDE - Code Editor, Compiler, Interpreter\n\
\n\
public class Main\n\
{\n\
    public static void main(String[] args) {\n\
        System.out.println(\"Welcome to Online IDE!! Happy Coding :)\");\n\
    }\n\
}\n\
",
        "ruby": "\n\
# Online IDE - Code Editor, Compiler, Interpreter\n\
\n\
puts 'Welcome to Online IDE!! Happy Coding :)'\n\
",


        "golang": "\n\
// Online IDE - Code Editor, Compiler, Interpreter\n\
\n\
package main\n\
\n\
import \"fmt\"\n\
\n\
func main() {\n\
    fmt.Println(\"Welcome to Online IDE!! Happy Coding :)\")\n\
}\n\
",

        "javascript": "main.js",


        "rlang": "\n\
# Online IDE - Code Editor, Compiler, Interpreter\n\
\n\
print('Welcome to Online IDE!! Happy Coding :)')\n\
",

        "bash": "\n\
# Online IDE - Code Editor, Compiler, Interpreter\n\
\n\
echo \"Welcome to Online IDE!! Happy Coding :)\"\n\
",
    }
    return script[lang];
}

function check_hint(err_text) {
    if (err_text.search('multiple definition of `main') !== -1) {
        hint = "Keep your main function in main.cpp";
    } else if (err_text.search('c: No such file or directory') !== -1) {
        hint = "Change the file name to main.c";
    } else if (err_text.search('cpp: No such file or directory') !== -1) {
        hint = "Change the file name to main.cpp";
    } else if (err_text.search('ModuleNotFoundError') !== -1) {
        hint = "Run command - help('modules') to find the list of available modules";
    } else {
        hint = undefined;
    }
    return hint;
}
