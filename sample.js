        var scrollWidth = 17;
        var scrollHeight = 17;
        var employeeWidth = 113;
        var wrapper = $('#datatable_wrapper');
        var yotei = $('#datatable');
        var columnCount = $('#datatable').find('tr').first().find('th').length - 1;
        var width = employeeWidth * ($(yotei).find('tr').first().find('th').length - 1);
        var headerHeight = $(yotei).find('thead').find('tr').height();

        var headerFixTable = $('<table id="datatable_fix_header" class="table table-bordered table-condensed table-hover table-striped"><thead></thead></table>');
        $(headerFixTable).append($(yotei).find('thead').find('th').first().clone(false));
        //var headerFixTable = $(yotei).clone(false);
        var headerFixWrapper = $('<div id="datatable_fix_header"></div>');
        $(headerFixTable).find('thead').find('tr').find('th:not(:first)').remove();
        $(headerFixTable).find('tbody').remove();
        $(headerFixTable).height(headerHeight);
        $(headerFixTable).attr('id', 'fix_table');
        $(headerFixTable).addClass('calendar-date').css('border-right-width', '0px');
        $(headerFixWrapper).addClass('calendar-date').css('overflow-x', 'hidden').css('overflow-y', 'hidden');
        $(headerFixWrapper).height(headerHeight);
        $(headerFixWrapper).append($(headerFixTable));
        $(headerFixWrapper).insertBefore($(wrapper));

        var headerTable = $('<table id="header_table" class="table table-bordered table-condensed table-hover table-striped"></table>');
        $(headerTable).append($(yotei).find('thead').clone(false));
        //var headerTable = $(yotei).clone(false);
        var headerWrapper = $('<div id="datatable_header"></div>');
        //$(headerTable).find('tbody').remove();
        $(headerTable).find('thead').find('th').first().remove();
        $(headerTable).height(headerHeight);
        $(headerTable).attr('id', 'header_table');
        $(headerTable).css('table-layout', 'fixed');
        $(headerTable).find('th').width(employeeWidth);
        $(headerWrapper).css('overflow-x', 'hidden').css('overflow-y', 'hidden');
        $(headerWrapper).width($(wrapper).width() - $(headerFixWrapper).width() - scrollWidth).height(headerHeight);
        $(headerWrapper).css('position', 'absolute').css('top', 0).css('left', $(headerFixWrapper).width());
        $(headerWrapper).append($(headerTable));
        $(headerWrapper).insertBefore($(wrapper));
        $(yotei).find('thead').remove();

        var headerColTable = $('<table id="header_col_table" class="table table-bordered table-condensed table-hover table-striped"><tbody></tbody></table>');
        $(yotei).find('tr').each(function () {
            $(headerColTable).append($(this).clone(false));
        });
        //var headerColTable = $(yotei).clone(false);
        var headerColWrapper = $('<div id="datatable_col_header"></div>');
        //$(headerColTable).find('thead').remove();
        //$(headerColTable).find('tr').find('td:not(:first)').remove();
        //$(headerColTable).attr('id', 'header_col_table');
        $(headerColTable).addClass('calendar-date');
        $(headerColTable).find('tr').find('td').css('vertical-align', 'middle');
        $(headerColTable).find('tr').height($(wrapper).find('tr').first().height());
        $(headerColWrapper).css('overflow-x', 'hidden').css('overflow-y', 'hidden');
        $(headerColWrapper).height($(wrapper).height() - scrollHeight);
        $(headerColWrapper).addClass('calendar-date').css('position', 'relative').css('top', '0');
        $(headerColWrapper).append($(headerColTable));
        $(headerColWrapper).insertBefore($(wrapper));

        $(yotei).find('tr').find('td:first').remove();
        //$(yotei).find('tr').find('td').width(employeeWidth);

        $(wrapper).css('position', 'absolute').css('top', headerHeight).css('left', $(headerColWrapper).width());
        $(wrapper).width($(wrapper).width() - $(headerColWrapper).width());
        $(yotei).width(width);
        $(headerTable).width($(yotei).width());

        $(wrapper).scroll(function () { //sync scroll
            $(headerWrapper).scrollLeft($(wrapper).scrollLeft());
            $(headerColWrapper).scrollTop($(wrapper).scrollTop());
        })