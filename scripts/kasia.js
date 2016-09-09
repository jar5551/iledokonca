$(document).ready(function () {
    window.setTimeout(function () {
        $('body').addClass('ready');
    }, 500);

    var btn = {
        settings: $('.ustawienia .btn')
    };

    var inputs = {
        option: $('.option input'),
        other: {
            from: $('#fromToFrom'),
            to: $('#fromToTo')
        }
    };

    function init() {
        firstRun();

        setTimer();
        setInterval(function () {
            setTimer();
        }, 1000);
    }

    function checkIsWeekend(day) {
        return day > 5 || day == 0;
    }

    function showElements(welcome, settings, notYet, toHome, weekend, weekdays) {
        var elements = {
                welcome: $('#welcome'),
                settings: $('#settings'),
                notYet: $('#notYet'),
                toHome: $('#toHome'),
                weekend: $('#weekend'),
                weekdays: $('#weekdays')
            },
            toShow = {
                welcome: welcome,
                settings: settings,
                notYet: notYet,
                toHome: toHome,
                weekend: weekend,
                weekdays: weekdays
            };

        $.each(toShow, function (key, val) {
            if(key == 'settings' || key == 'welcome') {
                return;
            }

            if(val) {
                elements[key].show();
            } else {
                elements[key].hide();
            }
        });
    }

    function showWelcome() {
        $('#welcome').show();
    }

    function hideWelcome() {
        $('#welcome').hide();
    }

    function showSettings() {
        showWithAnimation($('#settings'));
    }

    function hideSettings() {
        hideWithAnimation($('#settings'));
    }

    function toggleSettings() {

        if($('#settings').is(":visible")) {
            hideSettings();
        } else {
            showSettings();
        }
    }

    function showNotYet() {
        showElements(false, false, true, false, false, false);
    }

    function showGoHome() {
        showElements(false, false, false, true, false, false);
    }

    function showWeekend() {
        showElements(false, false, false, false, true, false);
    }

    function showWeekdays() {
        showElements(false, false, false, false, false, true);
    }

    function firstRun() {
        hideWelcome();
    }

    function showWithAnimation(element) {
        element.show();
        element.addClass('ng-hide-remove');
        window.setTimeout(function () {
            element.removeClass('ng-hide-remove');
        }, 500);
    }

    function hideWithAnimation(element) {
        element.addClass('ng-hide-add');
        window.setTimeout(function () {
            element.hide();
            element.removeClass('ng-hide-add');
        }, 500);
    }

    function setTimer() {
        var _this = this;
        _this.clock = $('.timeLeft');
        _this.now = new Date();

        showWeekdays();

        _this.timeEnd = new Date(2016, 8, 9, 17, 0, 0);

        _this.toEnd = parseInt(Math.abs(_this.timeEnd.getTime() - _this.now.getTime()) / 1000);

        if (_this.now > _this.timeEnd) {
            document.title = 'DO ZOBACZENIA KASIU...';
            showGoHome();
            return;
        }

        _this.clock.html(_this.toEnd.toString().toHHMMSS());
        var splitTime = _this.toEnd.toString().toHHMMSS().split(':');
        splitTime[0] = parseInt(splitTime[0]);
        splitTime[1] = parseInt(splitTime[1]);
        splitTime[2] = parseInt(splitTime[2]);
        var pageTitle = splitTime[0] > 0 ? splitTime[0] + 'h ' + splitTime[1] + 'min' : splitTime[1] + 'min ' + splitTime[2] + 's';

        document.title = '(' + pageTitle + ') ILE DO KOŃCA?';
    }


    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    };

    btn.settings.on('click', function (event) {
        toggleSettings();
    });

    $('.other input').on('change', function () {
        if(this.value != '') {
            $(this).addClass('filled');
        } else {
            $(this).removeClass('filled');

        }
    });

    inputs.option.on('change', function () {
        if(this.value == 3) {
            $('.other').show();
        } else {
            $('.other').hide();

        }
    });


    init();
});