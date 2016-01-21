(function ($) {

    $.fn.extend({
        nautilusEditor: function (options) {
            var opts = $.extend({}, $.fn.nautilusEditor.defaults, options);
            var editor = $(this);
            var bBold = false;
            var bItalic = false;
            var bUnderline = false;
            var bEraser = false;
            var balignRight = false;
            var balignCenter = false;
            var balignLeft = false;
            var bEnvionmentVariable = false;
            var bFontStyle = false;
            var bFontSize = false;
            var bTrashAll = false;
            var contentEditor = $(editor).find('.content-editor');
            

            var currentTextColor = '',
                currentBackColor = '',
                currentElement,
                currentEnvironmentVariable = '$BOOK_TITLE',
                currentFont = 'HelveticaNeue   ';
           
            var defaults = {};
            
            //DECLARATIONS FOR ALL FUNCTION IN THE PLUGIN
            var onSetColot = function (color, element) {
                $(currentElement).css('color', color);
            },
                onSetTrash = function () {
                    var contActual = $(editor).find('.content-editor')[0].id;
                    $('#' + contActual).html('');
                },
                onSetFontFamily = function (fontFamily, element) {
                    $(currentElement).css('font-family', fontFamily);
                },
                onSetFontSize = function (fontSize, element) {
                    $(currentElement).css('font-size', fontSize);
                },
                onSetBackground = function (color, element) {
                    $(currentElement).css('background-color', color);
                },
                onSetFontWeight = function (fontWeight, element) {
                    !bBold ? $(currentElement).css('font-weight', 'bold') : $(currentElement).css('font-weight', 'normal');
                },
                onSetFontStyle = function (fontStyle, element) {
                    !bItalic ? $(currentElement).css('font-style', 'italic') : $(currentElement).css('font-style', 'normal');
                },
                onSetTextAlignLeft = function (textAlign, element) {
                    $(currentElement).css('text-align', 'left');
                },
                onSetTextAlignCenter = function (textAlign, element) {
                    $(currentElement).css('text-align', 'center');
                },
                onSetTextAlignRight = function (textAlign, element) {
                    $(currentElement).css('text-align', 'right');
                },
                onTextDecoration = function (textDecoration, element) {
                    !bUnderline ? $(currentElement).css('text-decoration', 'Underline') : $(currentElement).css('text-decoration', 'none');
                },
                onsetEraser = function (textDecoration, element) {
                    $(currentElement).css('font-style', 'normal');
                    $(currentElement).css('text-decoration', 'none');
                    $(currentElement).css('font-weight', 'lighter');
                    $(currentElement).html('');
                },
                onSetEnvironmentVariable = function (variable, element) {
                    $(currentElement).append(variable).addClass('p');
                },
            onSetImage = function (imageUrl, element) {
                var imageElement = $('<img>', {
                    'src': imageUrl,
                    'title': 'Image Unavailable'
                });
                $(currentElement).append(imageElement);
            },
                onSetTable = function (element) {
                    createTableModal(element);
                },
                onSetBorder = function (border, element) {
                    //TODO create a border for element after implement all functionality
                },
                onSetText = function (text, element) {
                    $(element).html(text);
                },
                onResetEditor = function () {
                    //TODO clean and reset all the element for editor
                },
                onCreateModalImage = function () {
                    //TODO display and create the modal for upload a image and call insert image
                },


               createtable = function (rows, cols, name) {
                   var table = $('<div id = ' + name + '>').addClass('table');
                   for (var i = 0; i < rows; i++) {
                       var tableRow = $('<div>').addClass('row');
                       for (var j = 0; j < cols; j++) {
                           tableRow.append($('<div id = ' + j + cols + ' contenteditable = true  >').addClass('cell')
                               .on('click', function () {
                                   currentElement = $(this);
                               }).html('').addClass('p'));
                       }
                       table.append(tableRow);
                   }
                   return table;
               };

            //END DECLARATION FOR ALL FUNCTION IN THE PLUGIN

            var toolButton = function (iElement, fn) {
                return $('<button>', {
                    'class': 'btn btn-default  btn-sm btn-small'
                }).append(iElement);
            };

            var group = function (className) {
                if (className === undefined) className = '';
                className = className + ' btn-group';
                return $('<div>', { 'class': className });
            };

            var toolGroup = function (classParamter) {
                btnGroup = $('<div>', {
                    'class': 'btn-group'
                }).append($('<button>', {
                    'class': 'btn btn-default btn-sm btn-small'
                }));
                return btnGroup;
            };

            var dropdownTool = function () {
                var groupTool = $('<button>', {
                    'class': 'btn btn-default btn-sm btn-small btn btn-default btn-sm btn-small dropdown-toggle',
                    'data-toggle': 'dropdown'
                });
                return groupTool;
            };

            var ulDropDown = function () {
                return $('<ul>', { 'Class': 'dropdown-menu' }).css({ 'text-align': 'center' });
            };

            var spanCaret = function () {
                return $('<span>', { 'class': 'caret' });
            };

            var liElement = function (htmlElement) {
                return $('<li>').append($('<a>', {
                    'class': '', 'href': '#'
                }).append($('<i>', { 'class': 'fa fa-check icon-ok' })).html(htmlElement)).
                click(function (e) {
                    e.preventDefault();
                    if (bEnvionmentVariable)
                        onSetEnvironmentVariable(htmlElement, currentElement);

                    if (bFontStyle)
                        onSetFontFamily(htmlElement, currentElement);

                    if (bFontSize)
                        onSetFontSize(htmlElement, currentElement);
                });
            };

            var spanDefault = function (className, htmlElement) {
                return $('<span>', { 'class': className }).html(htmlElement);
            };

            //#REGION FOR CREATE EDITOR, TOOLBAR AND ADD CONTENT TO EDIT
            var editorStyle = function () {
                var sizes = ['2em', '1.5em', '1.17em'];
                var btnGroup = group('note-style'),
                    iELement = $('<i>', { 'class': 'fa fa-magic icon-magic' }).append(spanCaret()),
                    btnElement = dropdownTool().append(iELement),
                    ulElement = $('<ul>', { 'class': 'dropdown-menu' });
                for (var i = 1; i < 5; i++) {
                    var tagHeader = '<h' + i + '>',
                        headerElement = $(tagHeader, { 'data-value': 'h' + i }).html('Header' + i),
                        liElement = $('<li>').append($('<a>', { 'href': '#' }).append(headerElement)).
                            on('click', function () {
                                var tagHtml = $(this).children().children();
                                tagHtml = tagHtml.attr('data-value');
                                onSetFontSize(tagHtml, currentElement);
                            });
                    ulElement.append(liElement);
                }
                return btnGroup.append(btnElement).append(ulElement);
            };


            var editorTextStyle = function () {
                var btnGroup = group('editor-font').append(toolButton($('<i>', {
                    'class': 'fa fa-bold icon-bold', 'title': 'Bold'
                })).click(function () {
                    onSetFontWeight('bold', editor);
                    bBold = !bBold ? true : false;
                }))
                    .append(toolButton($('<i>', {
                        'class': 'fa fa-italic icon-italic', 'title': 'Italic'
                    })).click(function () {
                        onSetFontStyle('Italic', editor);
                        bItalic = !bItalic ? true : false;
                    }))
                    .append(toolButton($('<i>', {
                        'class': 'fa fa-underline icon-underline', 'title': 'Underline'
                    })).click(function () {
                        onTextDecoration('Underline', editor);
                        bUnderline = !bUnderline ? true : false;
                    }))
                    .append(toolButton($('<i>', {
                        'class': 'fa fa-eraser icon-eraser', 'title': 'Eraser'
                    })).click(function () {
                        onsetEraser('Eraser', editor);
                        bEraser = !bEraser ? true : false;
                    }));
                return btnGroup;
            };
            
            var deleteAll = function () {
                var btnGroup = group('editor-delete').append(toolButton($('<i>', {
                    'class': 'fa fa-bold icon-trash btn-link', 'title': 'Trash All'
                })).click(function () {
                    onSetTrash();
                    bTrashAll = !bTrashAll ? true : false;
                }));
                return btnGroup;
            };

            var editorFont = function () {
                var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times', 'Times New Roam', 'Verdana'],
                    listFonts = ulDropDown();
                for (var i = 0; i < fonts.length; i++) {
                    listFonts.append(liElement(fonts[i]));
                }
                return group().append(dropdownTool().
                    append(spanDefault('font-name', currentFont)).
                    append(spanCaret())).append(listFonts).
                    click(function () {
                        bFontStyle = true;
                        bEnvionmentVariable = false;
                    });
            };



            var editorColor = function () {
                var elementColor = group('editor-color'),
                    ulContent = ulDropDown().append($('<li>').append(group().append(colorPalette())));
                elementColor.append(dropdownTool().append($('<i>',
                        { 'class': 'fa fa-font icon-font', 'title': 'FontColor' }).
                    css({
                        'color': 'inherit', 'background-color': currentTextColor
                    }).append(spanCaret().click()))).append(ulContent);
                return elementColor;
            };

            var colorPalette = function () {
                var colors = ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF', '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'],
                    menuColorContainer = $('<div>', { 'class': 'editor-palette-color' }),
                    index = 0;
                for (var i = 0; i < 8; i++) {
                    var sectionColor = $('<div>');
                    for (var j = 0; j < 8; j++) {
                        var currentColor = colors[index];
                        sectionColor.append($('<input>', {
                            'type': 'button', 'data-color': currentColor
                        }).css({
                            'background-color': currentColor,
                            'height': '18px',
                            'width': '18px',
                            'padding': '0',
                            'border': '1px solid #fff'
                        }).on('click', function () {
                            var color = $(this).attr('data-color');
                            onSetColot(color, currentElement);
                        }));
                        index++;
                    }
                    menuColorContainer.append(sectionColor);
                }
                return menuColorContainer;
            };

            var editorAlign = function () {
                var editorAlign = group().append(toolButton($('<i>', {
                    'class': 'fa fa-align-left icon-align-left',
                    'title': 'Align Left'
                })).click(function () {
                    onSetTextAlignLeft('left', currentElement);
                    balignLeft = !balignLeft ? true : false;
                })).append(toolButton($('<i>', {
                    'class': 'fa fa-align-center icon-align-center',
                    'title': 'Align Center'
                })).click(function () {
                    onSetTextAlignCenter('center', currentElement);
                    balignCenter = !balignCenter ? true : false;
                }))
                    .append(toolButton($('<i>', {
                        'class': 'fa fa-align-right icon-align-right',
                        'title': 'Align Right'
                    })).click(function () {
                        onSetTextAlignRight('right', currentElement);
                        balignRight = !balignRight ? true : false;
                    }));
                return editorAlign;
            };

            var editorEnvironmentVariable = function () {
                var envVariables = ['$BOOK_TITLE', '$BOOK_SECCION', '$CURRENT_DATE', '$PAGE_NUMBER', '$PAGE_NAME'],
                    listVariables = ulDropDown();
                for (var i = 0; i < envVariables.length; i++)
                    listVariables.append(liElement(envVariables[i]));

                return group().append(dropdownTool().
                    append(spanDefault('variable-name', currentEnvironmentVariable)).
                    append(spanCaret())).append(listVariables).
                    click(function () {
                        bEnvionmentVariable = true;
                        bFontStyle = false;
                    });
            };

            var editorSizeFont = function () {
                var sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24'], listSizes = ulDropDown();
                for (var i = 0; i < sizes.length; i++)
                    listSizes.append(liElement(sizes[i]));

                return group().append(dropdownTool().
                    append(spanDefault('size-name', 8)).append(spanCaret())).append(listSizes).
                    click(function () {
                        bEnvionmentVariable = false, bFontSize = true, bFontStyle = false;
                    });
            };

            var registerUploadImageControl = function () {
                var isUpload = false;
                var uploader = new plupload.Uploader({
                    runtimes: 'html5,flash,silverlight,html4',
                    browse_button: 'pickfiles', // you can pass in id...
                    container: document.getElementById('container'), // ... or DOM Element itself
                    url: opts.urlUploadImage,// '/Home/Upload',
                    flash_swf_url: 'Scripts/Moxie.swf',
                    silverlight_xap_url: 'Scripts/Moxie.xap',
                    urlstream_upload: true,

                    filters: {
                        max_file_size: '10mb',
                        mime_types: [
                            { title: "Image files", extensions: "jpg,gif,png" },
                            { title: "Zip files", extensions: "zip" }
                        ]
                    },

                    init: {
                        PostInit: function () {
                            document.getElementById('filelist').innerHTML = '';
                            document.getElementById('uploadfiles').onclick = function () {
                                uploader.start();
                                return false;
                            };
                        },

                        FilesAdded: function (up, files) {
                            plupload.each(files, function (file) {
                                document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                            });
                        },
                        FileUploaded: function (a, b, data) {
                            var image = $('<img align=left >').attr({ 'src': data.response, title: 'image' }).css({ 'width': 100, 'height': 100 });
                            
                            $(currentElement).append(image);
                            $('#myModal').modal('hide');
                        },
                        UploadProgress: function (up, file) {
                            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                        },

                        Error: function (up, err) { //TODO do the pathimage generic or passed by parameter in options plugin
                            if (!isUpload) {
                                isUpload = true;
                                if (err.file.percent == 100) {
                                    var pathImage = '/Uploads/' + err.file.name;
                                    var image = $('<img align=left >').attr({ 'src': pathImage, title: 'image' }).css({ 'width': 100, 'height': 100 });

                                    $(currentElement).append(image);
                                    $('#myModal').modal('hide');
                                }
                            }
                        }
                    }
                });
                uploader.init();
            };


            //var addEventFileUpload = function (formId) {
            //    var options = {
            //        target: '#divToUpdate',
            //        url: '/Home/Upload/',
            //        success: function () {

            //            var path = $('#divToUpdate').html();
            //            // console.log(path);
            //            var src = path.replace('<pre>', '').replace('</pre>', '');

            //            //var $image = $('<img align=left >').attr({ 'src': src, title: 'image' }).css({ 'width': 100, 'height': 100 });

            //            //console.log($image);

            //            //$(currentElement).append($image);

            //            //$('.note-image-dialog').modal('hide');
            //        }
            //    };

            //    // pass options to ajaxForm 
            //    $(formId).ajaxForm(options);
            //};


            //TODO remove the form and footer content and create dinamically using jquery
            var createAndShowModal = function () {
                var formContents = '<div id="filelist">Your browser doesnt have Flash, Silverlight or HTML5 support.</div><br /><div id="container"><a id="pickfiles" href="javascript:;">[Select files]</a></div><br /><pre id="console"></pre>';


                var formContent = '<input class="note-image-input" type="file" name="filename" accept="image/*" /><input type="submit" value="Submit" />';
                var contentFooter = '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button> <a class="btn btn-primary" id="uploadfiles" href="javascript:;">[Upload files]</a>';

                var modal = $('<div>', { 'id': 'myModal', 'class': 'modal hide fade', 'aria-hidden': 'true' }),
                    header = $('<div>').addClass('modal-header').append($('<button>', { 'type': 'button', 'class': 'close', 'data-dismiss': 'modal', 'aria-hidden': 'true' })).append('<h3>').html('Modal header').appendTo(modal),
                    body = $('<div>').addClass('modal-body').append($('<form>', { 'id': 'FormUpload', 'action': '/Home/Upload', 'enctype': 'multipart/form-data' }).html(formContents)).append($('<div>', { 'id': 'divToUpdate' })).appendTo(modal),
                    footer = $('<div>').addClass('modal-footer').html(contentFooter).appendTo(modal);

                $('.content-editor').append(modal);
                registerUploadImageControl();
                $('#' + modal.attr('id')).modal();
            };

            //TODO refactor after finish editor html change the hardcode with create dinamic elements
            var createTableModal = function (element) {

                var rows = ' Rows:   <input type="text" id="cantRows" value="2" maxlength="1" style="width: 50px;"/> ';
                var cols = ' </br> Cols:   <input type="text" id="cantCols" value="3" maxlength="1" style="width: 50px;"/> &nbsp;&nbsp; ';
                var formContents = $('<div >').html(cols + '  ' + rows);

                var contentFooter = '<button class="btn" id="btnClose"> Close </button> <a class="btn btn-primary" id="idSave" href="javascript:;"> Accept </a>';

                var modal = $('<div>', { 'id': 'myModalTable', 'class': 'modal hide fade', 'aria-hidden': 'true' }).css({ 'width': '300px' }),
                    header = $('<div>').addClass('modal-header').append($('<button>', { 'type': 'button', 'class': 'close', 'data-dismiss': 'modal', 'aria-hidden': 'true' })).append('<h2>').html('Ingrese Cantidad de Filas y Columnas').appendTo(modal),
                    body = $('<div>').addClass('modal-body').append($('<form>', { 'id': 'idBody' }).html(formContents)).append($('<div>', { 'id': 'divToUpdate' })).appendTo(modal),
                    footer = $('<div>').addClass('modal-footer').html(contentFooter).appendTo(modal);

                var contActual = $(editor).find('.content-editor')[0].id;

                contActual = '#' + contActual;
                $(editor).find(contActual).append(modal);
                addEventListenerModalTable(modal, contActual);
                $('#' + modal.attr('id')).modal('show');

            };

            var addEventListenerModalTable = function (modal, name) {
                name = name.substring(1, name.length);
                $(modal).find('#idSave').click(function () {
                    var rows = $(modal).find('#cantRows').val(),
                        cols = $(modal).find('#cantCols').val(),
                        table = createtable(rows, cols, 'tb' + name);

                    $('#myModalTable').parent().append(table);
                    $(modal).modal('hide');
                });

                $(modal).find('#btnClose').click(function () {
                    $(modal).modal('hide');
                });

                $(editor).find('.modal').on('hidden', function () {
                    $(modal).remove();
                });

            };

            var editorImageTableText = function () {
                var editorButtons = group().append(toolButton($('<i>', {
                    'class': 'fa fa-picture-o icon-picture',
                    'title': 'Imagen'
                })).on('click', function () {
                    $('#myModal').remove();
                    createAndShowModal();
                }))
                    .append(toolButton($('<i>', {
                        'class': 'fa fa-table icon-table',
                        'title': 'Table'
                    })).
                        click(function () {
                            onSetTable(editor);
                        }));
                return editorButtons;
            };

            var toolBar = $('<div>', {
                'class': 'btn-toolbar'
            }).append(editorTextStyle()).append(editorFont()).append(editorSizeFont()).
               append(editorColor()).append(editorAlign()).append(editorEnvironmentVariable()).
               append(editorImageTableText().append(deleteAll())); //.bind('click', 'input[type=button]', function (event) {

            var content = $('<div>', {
                'class': 'content-editor'
            }).attr('id', opts.id + opts.id),
                contentEditor = $('<div>', {
                    'class': 'nautilus-editor'
                }).append(toolBar).append(content);

            return this.each(function () {
                var currentElement = $(this);
                currentElement.append(contentEditor);
            });
        },
        getCode: function (sHtml) {
            var tb = 'tb' + sHtml + sHtml;
            if (document.getElementById(tb) != null)
                return document.getElementById(tb).innerHTML;
            else
                return "";
        },
        getCodeDiv: function (sHtml) {
            var div = sHtml + sHtml;
            if (document.getElementById(div) != null)
                return document.getElementById(div).innerHTML;
            else
                return "";
        },
        setcode: function (sHtml, element) {
            var div = '#' + sHtml + sHtml;
            return $(div).html(element);
        }

    });
    $.fn.nautilusEditor.defaults = {
        id: '',
        urlUploadImage: '/Document/UploadImageEditor'
    };
})(jQuery);