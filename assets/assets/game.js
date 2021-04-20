//読み込んだJSON
var game_json;
//ステージごとのクリア必要数
var tasks = [5, 9];
//ステージごとのパネルサイズ
var panel_size = [
    [77, 58],
    [58, 44]
];
//ステージの間違い箇所リスト
var stage_data;
//答えた枚数
var total_cnt;
//正解数
var correct_cnt;
//答えられるか否か
var canplay = false;
//ステージ毎の点数
var score = [0, 0];
//お手つき回数
var wrong = 0;
//トータルスコア
var total_score;
//現在のステージ
var now_stage;
/*音声関連*/
var context;
var bufferLoader;
var se;
var bgm;

//ボリューム
var gainNode;
var btn_move;
//音を鳴らすかどうか(1 or 0)
var soundOn = 1;
var bgm_instance;
var se_instance;

$(document).ready(function() {


    //JSONファイルを読み込む
    $.getJSON("/kids/machigaisagashi/idata/q.json", function() {
            console.log("読込開始");
        })
        .success(function(json) {
            console.log("解析完了");
            //解析完了したデータが game_json に入る
            game_json = json;
            now_stage = 1;
            set_sound();
            set_stage();
            $("#btn_start").fadeIn();

        })
        .error(function(jqXHR, textStatus, errorThrown) {
            console.log("エラー：" + textStatus);
            console.log("テキスト：" + jqXHR.responseText);
        })
        .complete(function() {
            console.log("完了");
        });

    //スタートボタンを上下に揺らす
    var sineWaveY = function(y) {
        return (Math.sin(y * Math.PI) / 2) + 0.5;
    };
    var y = 0;
    btn_move = setInterval(function() {
        y += 0.003;
        $('#btn_start').css({
            top: 290 - 10 + sineWaveY(y) * 10 + 'px'
        });
        $('#btn_back_number').css({
            top: 735 - 10 + sineWaveY(y) * 10 + 'px'
        });
    }, 2);

    //音声をセットする
    function set_sound() {
        createjs.Sound.registerSound( "/kids/machigaisagashi/sound/bgm.mp3", "soundBGM");
        createjs.Sound.registerSound( "/kids/machigaisagashi/sound/start.mp3", "soundSTART");
        createjs.Sound.registerSound( "/kids/machigaisagashi/sound/result.mp3", "soundRESULT");
        createjs.Sound.registerSound( "/kids/machigaisagashi/sound/over.mp3", "soundOVER");
        createjs.Sound.registerSound( "/kids/machigaisagashi/sound/clear.mp3", "soundCLEAR");
        createjs.Sound.registerSound( "/kids/machigaisagashi/sound/check.mp3", "soundCHECK");
        createjs.Sound.registerSound( "/kids/machigaisagashi/sound/se_0.mp3", "soundSE0");
        createjs.Sound.registerSound( "/kids/machigaisagashi/sound/se_1.mp3", "soundSE1");

    }

    //ステージをセットする
    function set_stage() {
        //replay = false;
        correct_cnt = 0;
        if (now_stage == 1) {
            total_cnt = 0;
            total_score = 0;
            score = [0, 0];
            $("#score").text(0);
        }
        $('#timer div').css({
            transform: 'rotate(0deg)'
        });

        $('#stage').css('background-image', 'url(img/stage_' + now_stage + '.png)');

        //間違いパターン6種からランダムで抜き出す
        var ran = Math.floor(Math.random() * 6) + 1;
        stage_data = eval("game_json.stage_" + now_stage + ".mode_" + ran);

        //拡張子より前のベース名「image73」など
        var base_name = eval("game_json.stage_" + now_stage + ".image_name").split(".")[0];
        //拡張子「jpg」など
        var base_ext = "." + eval("game_json.stage_" + now_stage + ".image_name").split(".")[1];
        //左側のエリアに元となる画像を設定
        $("#sample_base").css('background-image', 'url(/kids/machigaisagashi/idata/' + base_name + base_ext + ')');
        //右側のエリアに間違いパターン画像を設定
        $("#panel_base").css('background-image', 'url(/kids/machigaisagashi/idata/' + base_name + "0" + ran + base_ext + ')');

        //区切り線を表示（cover_1.png or cover_2.png）
        $("#panel_base").html("");
        var cover = '<div class="cover cover_' + now_stage + '"></div>';
        $("#panel_base").append(cover);
        //設問データに基づいて◯☓ボタンを設定
        for (var i = 0; i < stage_data.length; i++) {
            console.log(stage_data[i]);
            var btn = '<div class="res_' + stage_data[i] + '"><div class="flg"></div><div class="res"></div></div>';
            $("#panel_base").append(btn);
        }

        //◯☓ボタンのサイズを調整
        $(".res_0,.res_1").css({
            width: (panel_size[now_stage - 1][0]),
            height: (panel_size[now_stage - 1][1])
        });
        $(".res").css({
            top: panel_size[now_stage - 1][0] / 2,
            left: panel_size[now_stage - 1][1] / 2
        });

        //マスクリック時の正誤判定
        $(".res_0,.res_1").click(function() {
            if (canplay) {
                //('.flg').text()が1ならクリック済み
                if ($(this).children('.flg').text() != '1') {
                    total_cnt++;
                    $(this).children('.flg').text('1');
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $(this).children('.res').animate({
                        top: 0,
                        left: 0,
                        width: panel_size[now_stage - 1][0],
                        height: panel_size[now_stage - 1][1]
                    }, {
                        duration: 1000,
                        easing: 'easeOutElastic',
                    });

                    /*点数カウント*/
                    console.log($(this).attr('class'));
                    if ($(this).attr('class') == 'res_0') {
                        wrong++;
                        if (total_score > 0) {
                            total_score--;
                        }
                        if (score[now_stage - 1] > 0) {
                            score[now_stage - 1]--;
                        }
                        score_chg(-1);
                    } else {
                        total_score++;
                        score[now_stage - 1]++;
                        score_chg(1);
                        correct_cnt++;

                        $("#find").text(task - correct_cnt);

                    }

                    $("#score").text(total_score);
                    if (correct_cnt >= tasks[now_stage - 1]) {
                        canplay = false;
                        $('#timer').stop();
                        now_stage++;
                        //ステージクリアの演出
                        result_anime(1);
                    } else {
                        if ($(this).attr('class') == 'res_0') {
                            se_play('soundSE0');
                        } else {
                            se_play('soundSE1');
                        }
                    }
                }
            }
        });

        //のこり数
        var task = tasks[now_stage - 1];
        $("#task").text(task);
        $("#find").text(task);
    }

    //スタート時のカウントダウンアニメ演出
    function cound_down(no) {
        if (no == 0) {
            $('#count').css('background-image', 'url(img/start.png)');
        } else {
            $('#count').css('background-image', 'url(img/no_' + no + '.png)');
        }
        $('#count').css({
            top: '367px',
            left: '191px'
        });
        $('#count').width(0).height(0);
        $('#count').show();
        $("#count").animate({
            top: 337,
            left: 91,
            width: 200,
            height: 100
        }, {
            duration: 1000,
            easing: 'easeOutElastic',
            complete: function() {
                //完了
                no--;
                if (no == -1) {
                    $('#count').fadeOut();
                    game_start();
                } else {
                    //noが0になるまでは再起
                    cound_down(no);
                }
            }
        });
    }

    //ゲーム結果演出
    function result_anime(no) {
        //1:timeover   2:clear
        $("#info").fadeOut();
        if (bgm_instance != null) {
            bgm_instance.paused = true;
            bgm_instance.setPosition(0);
        }
        if (no) {
            se_play('soundCLEAR');
        } else {
            se_play('soundOVER');
        }
        var res_list = ["over", "clear"];
        $('#count').hide();
        $('#count').css('background-image', 'url(img/' + res_list[no] + '.png)');
        $('#count').css({
            top: '367px',
            left: '191px'
        });
        $('#count').width(0).height(0);
        $('#count').show();
        $('#count').animate({
            top: 337,
            left: 91,
            width: 200,
            height: 100
        }, {
            duration: 2000,
            easing: 'easeOutElastic',
            complete: function() {
                //完了
                if (now_stage == 2) {


                    $('#shutter2').animate({
                        height: 172
                    }, {
                        duration: 500,
                        easing: 'linear'
                    });
                    $('#shutter').animate({
                        height: 172
                    }, {
                        duration: 500,
                        easing: 'linear',
                        complete: function() {
                            //完了
                            setTimeout(function() {
                                //ステージ2をセット
                                set_stage();
                                se_play('soundSTART');
                                cound_down(3);
                            }, 1000);

                        }
                    });
                } else {
                    //最終結果画面
                    setTimeout(function() {
                        se_play('soundRESULT');

                        $('#timer div').css({
                            transform: 'rotate(0deg)'
                        });

                        $('#timer').css('zIndex', 0);

                        $("#result #score_1").text(score[0]);
                        $("#result #score_2").text(score[1]);
                        $("#result #score_total").text(total_score);
                        //点数の数字は縦長画像のバックグラウンドポジションで変更
                        /*
                        $("#result #score_1").css({
                            'background-position': 0 + 'px ' + score[0] * -18 + 'px'
                        });
                        $("#result #score_2").css({
                            'background-position': 0 + 'px ' + score[1] * -18 + 'px'
                        });
                        $("#result #score_total").css({
                            'background-position': 0 + 'px ' + total_score * -18 + 'px'
                        });
                        */
                        $("a.btn_present").hide();

                        if (wrong == 0 && total_score == 14) {
                            $("#score_parfect").fadeIn("slow");
                            $('#score_parfect').css('background-image', 'url(img/parfect.png)');
                        } else {
                            $("#score_parfect").fadeOut("slow");
                        }

                        //ボタンを上下に揺らす
                        var sineWaveY = function(y) {
                            return (Math.sin(y * Math.PI) / 2) + 0.5;
                        };
                        var y = 0;

                        if (total_score >= 10) {


                            //プレゼント応募ボタン

                            $("a.btn_present").fadeIn("slow");
                            $("a.btn_point").css({
                                top: '712px'
                            });
                            $("a.btn_point").fadeIn("slow");

                            $('#congra').css('background-image', 'url(img/congrats.png)');

                            $("a.btn_again").css({
                                top: '790px'
                            });
                            $("a.btn_again").fadeIn("slow");
                            $("#game_base").height(920);

                            btn_move = setInterval(function() {
                                y += 0.003;
                                $('a.btn_point').css({
                                    top: 713-10 + sineWaveY(y) * 10 + 'px'
                                });
                                $('a.btn_again').css({
                                    top: 790-10 + sineWaveY(y) * 10 + 'px'
                                });
                                $('a.btn_present').css({
                                    top: 637-10 + sineWaveY(y) * 10 + 'px'
                                });
                            }, 2);

                        } else {
                            //$('.btn_right').css('background-image', 'url(img/btn_replay.png)');
                            //再挑戦ボタン表示"
                            $("a.btn_point").css({
                                top: '637px'
                            });
                            $("a.btn_point").fadeIn("slow");
                            $("a.btn_again").css({
                                top: '712px'
                            });

                            if (total_score >= 6) {
                            $('#congra').css('background-image', 'url(img/bitmore.png)');
                            } else {
                            $('#congra').css('background-image', 'url(img/calmdown.png)');
                            }

                            $("a.btn_again").fadeIn("slow");
                            $("#game_base").height(825);
                            $("#foot").css({
                                bottom: 0
                            });
                            $("#foot").show();

                            btn_move = setInterval(function() {
                                y += 0.003;
                                $('a.btn_point').css({
                                    top: 637-10 + sineWaveY(y) * 10 + 'px'
                                });
                                $('a.btn_again').css({
                                    top: 712-10 + sineWaveY(y) * 10 + 'px'
                                });
                            }, 2);
                        }



                        $("#result").fadeIn("slow");
                        //ページの頭出し
                        var targetOffset = $('#result').offset().top;
                        $('html,body').animate({
                            scrollTop: targetOffset
                        }, 400, "easeInOutQuart");

                    }, 1000);
                }
            }
        });
    }

    //制限時間タイマー処理
    function timer_start(sec) {
        $('#face').css('background-image', 'url(img/face1.png)');
        $('#timer').css('zIndex', 0);
        $('#timer').animate({
            zIndex: 1
        }, {
            duration: sec * 1000,
            easing: 'linear',
            step: function(now) {
                $('#timer div').css({
                    transform: 'rotate(' + (now * 360) + 'deg)'
                });

                if (now < 0.25) {
                    $('#face').css('background-image', 'url(img/face2.png)');
                } else if (now < 0.5) {
                    $('#face').css('background-image', 'url(img/face3.png)');
                } else if (now < 0.75) {
                    $('#face').css('background-image', 'url(img/face4.png)');
                } else if (now < 0.9) {
                    $('#face').css('background-image', 'url(img/face5.png)');
                } else {
                    $('#face').css('background-image', 'url(img/face6.png)');
                }


            },
            complete: function() {
                //完了
                canplay = false;
                $('#timer').stop();
                now_stage++;
                result_anime(0);
                $('#timer').css('zIndex', 0);
                $('#face').css('background-image', 'url(img/face6.png)');
            }
        });
    }

    //シャッターアニメ演出
    function game_start() {
        $('#shutter2').animate({
            height: 0
        }, {
            duration: 500,
            easing: 'linear'
        });

        $('#shutter').animate({
            height: 0
        }, {
            duration: 500,
            easing: 'linear',
            complete: function() {
                //完了
                $("#info").fadeIn();
                canplay = true;
                if (now_stage == 1) {
                    timer_start(30);
                } else {
                    timer_start(20);
                }
                if (bgm_instance != null) {
                    bgm_instance.setPosition(0);
                    bgm_instance.paused = false;
                }
            }
        });
    }
    /*音声関連*/
    //効果音
    function se_play(soundName) {
        if (soundOn) {
            se_instance = createjs.Sound.play(soundName);
        } else {
        }
    }
//BGMの処理
    function bgm_play() {
        bgm_instance = createjs.Sound.play('soundBGM', {loop:-1});
        if (soundOn) {
            bgm_instance.setVolume(1);
        } else {
            bgm_instance.setVolume(0);
        }
    }

    //読み込み完了を待って発声（効果音）
    function finishedLoading_se(bufferList) {

    }
    //読み込み完了を待って発声（BGM）
    function finishedLoading_bgm(bufferList) {

    }

    //スタートボタンの処理
    $("#btn_start").click(function() {

        $("#sound").css({
            top: '520px',
            left: '19px',
            zIndex: 0
        });

        $("#game_base").height(609);
        //ページの頭出し
        var targetOffset = $('#howto').offset().top;
        $('html,body').animate({
            scrollTop: targetOffset
        }, 400, "easeInOutQuart");
        wrong = 0;
        now_stage = 1;
        $("#howto").fadeOut("fast");
        $("#btn_start").fadeOut("fast");

        se_play('soundSTART');
        bgm_play();
        bgm_instance.setPosition(0);
        bgm_instance.paused = true;
        cound_down(3);
        clearInterval(btn_move);
    });

    //バックナンバーボタンの処理
    $("#btn_back_number").click(function() {
        window.location.href = 'backnumber.html';
    });

    //マンスリーポイントゲットボタン
    $(".btn_point").click(function() {
        window.open('/member/game_point/index?game_category=53', '_blank');
    });

    //プレゼント応募ボタン
    $(".btn_present").click(function() {
        window.open('/event/form/581810f298df25762237a7b733465a8d', '_blank');
    });

    //もういちど挑戦ボタン
    $(".btn_again").click(function() {
        clearInterval(btn_move);

        if (se_instance != null) {
            se_instance.setVolume(0);
            se_instance = null;
        }
        $("#info").fadeOut();
        $('#count').hide();

        $("a.btn_present").fadeOut("slow");
        $("a.btn_point").fadeOut("slow");
        $("a.btn_again").fadeOut("slow");
        $("#result").fadeOut("slow");

        $("#game_base").height(788);
        $("#foot").hide();


        $("#howto").fadeIn("fast");
        $("#btn_start").fadeIn("fast");
        $("#score").text(0);
        $('#stage').css('background-image', 'url(img/stage_1.png)');
        now_stage = 1;
        //スタートボタンを上下に揺らす
        var sineWaveY = function(y) {
            return (Math.sin(y * Math.PI) / 2) + 0.5;
        };
        var y = 0;
        btn_move = setInterval(function() {
            y += 0.003;
            $('#btn_start').css({
                top: 290 - 10 + sineWaveY(y) * 10 + 'px'
            });
            $('#btn_back_number').css({
                top: 735 - 10 + sineWaveY(y) * 10 + 'px'
            });
        }, 2);

        set_stage();

        //ページの頭出し
        var targetOffset = $('#howto').offset().top;
        $('html,body').animate({
            scrollTop: targetOffset
        }, 400, "easeInOutQuart");


        $('#shutter,#shutter2').height(172);

        $("#sound").css({
            top: '144px',
            left: '229px',
            zIndex: 999
        });

    });

    //ミュートの処理
    $("#sound").click(function() {
        if (soundOn) {
        	soundOn = 0;
            if (bgm_instance != null) {
                bgm_instance.setVolume(0);
            }
            if (se_instance != null) {
                se_instance.setVolume(0);
            }
            $('#sound').css('background-image', 'url(img/snd_off.png)');
        } else {
        	soundOn = 1;
            if (bgm_instance != null) {
                bgm_instance.setVolume(1);
            }
            if (se_instance != null) {
                se_instance.setVolume(1);
            }
            $('#sound').css('background-image', 'url(img/snd_on.png)');
        }
    });

    //-1 +1 などのスコア演出
    function score_chg(no) {
        $('#score_anim').hide();
        var move_pt;
        if (no == 1) {
            $('#score_anim').css('background-image', 'url(img/plus.png)');
            move_pt = -30;
        } else {
            $('#score_anim').css('background-image', 'url(img/minus.png)');
            move_pt = 30;
        }
        $('#score_anim').css({
            top: '678px',
            opacity: 1
        });
        $('#score_anim').show();
        $('#score_anim').stop().animate({
            top: 339 + move_pt,
            opacity: 0
        }, {
            duration: 1000,
            easing: 'swing'
        });
    }
});
