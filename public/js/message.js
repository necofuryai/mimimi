const database = firebase.database();
const ref = database.ref('mimimi');
const refc = database.ref('mimimi_count');
var num = '';

$(document).ready(function(){
    // $('#text4').focus(function(){
    //     $('.password_box').animate({borderTopColor: '#0000ff', borderLeftColor: '#0000ff', borderRightColor: '#0000ff', borderBottomColor: '#0000ff'}, 200);
    // }).blur(function(){
    //     $('.password_box').animate({borderTopColor: '#0000ff', borderLeftColor: '#0000ff', borderRightColor: '#0000ff', borderBottomColor: '#0000ff'}, 200);
    // });

    // var elem = document.getElementById("mimimi");

    var nico = new nicoJS({
        app       : document.getElementById('ball'),
        width     : window.innerWidth,
        height    : window.innerHeight,
        font_size : 50,     // opt
        color     : '#fff'  // opt
    })
    
    // 初期表示と登録後のコールバック
    refc.on("child_added", (snapcount_c) => {
        dispCount({
            count: snapcount_c.val().count
        })
    });

    refc.on("child_changed", (snapcount_c) => {
        dispCount({
            count: snapcount_c.val().count
        });
    });

    // 初期表示と登録後のコールバック
    ref.on("child_added", (snapshot) => {
        dispTodo({
            id: snapshot.key,
            value: snapshot.val()
        });
    });

    const dispCount = (count_mimimi) => {
        num = count_mimimi.count;
        document.getElementById('red').innerHTML = num;
        // var tx = document.getElementById("red");
        $('#tweet-area').empty();
        twttr.widgets.createShareButton(
            "",
            document.getElementById("tweet-area"),
            {
                size: "large",
                text: "現在のみみみ愛は " + num + " みみみ！です！",
                hashtags: "友崎くん,七海みなみボタン", // ハッシュタグ
                url: "https://mimimi.web.app" // URL
            }
        );
    }

    // TODOを表示する
    const dispTodo = (todo) => {
        var todo_html = todo.value.mimimi_text
        // $("#ball").prepend(`<div id="${todo.id}">${todo_html}</div>`);

        // コメント待機
        nico.listen()

        var random = Math.floor( Math.random() * 161 ) + 40;
        // コメント送信
        var color = (Math.random() * 0xFFFFFF | 0).toString(16);
        var randomColor = "#" + ("000000" + color).slice(-6);

        nico.send(todo_html, randomColor, random);
        ref.child(todo.id).remove();
    }

    // //音の初期設定
    // ion.sound({
	// 	sounds: [{name: "mimimisound"}],
	// 	path: "./sounds/mimimi.ogg",
	// 	preload: true,
	// 	multiplay: true
    // });
    
    ion.sound({
        sounds: [
            {
                name: "mimimi"
            },
            {
                name: "onitada"
            },
            {
                name: "takei"
            },
        ],
        volume: 0.5,
        path: "./js/sounds/",
        preload: true,
        multiplay: true
    });

    // 登録処理
    const postAction = () => {
        var mimimi_text = $("#mimimi_text").val();

        var random = Math.floor( Math.random() * 101 );
        if (random == 0) {
            ion.sound.play("takei");

        } else if (random <= 6) {
            ion.sound.play("onitada");

        } else {
            ion.sound.play("mimimi");
        }

        // 入力値チェック
        if (!mimimi_text == '') {
            if (!mimimi_text.match(/(?:[-!#$%&*+<=>?@[\]~¥「」〜おただにみオタダニミー井竹！＃＄％＆＊＋＜＝＞？＠＾￥^]|\{|\})/)) {
                alert( "みみみ以外入力できないよ！" );
                return;
            }
        } else {
            if (random == 0) {
                mimimi_text = '竹井';
    
            } else if (random <= 6) {
                mimimi_text = 'おにただ';
    
            } else {
                mimimi_text = 'みみみ';
            }
        }

        if(mimimi_text && mimimi_text !== "") {
            ref.push({
                mimimi_text: mimimi_text,
                date: new Date().getTime()
            });
        }
        // とりあえず登録終わったら空にしとく
        // $("#mimimi_text").val("");
    };

    const countAction = (count_mimimi) => {
        // const num = count_mimimi.count;
        // const num = document.getElementById("red").textContent;
        num_1 = num - 0;
        num_1 += 1;
        str_num = '' + num_1;
        
        if(str_num && str_num !== "") {

            refc.child('count').set({
                count: str_num
            });
        } 
    }

    // 登録時のアクション
    $('#mimimi_button').click(() => postAction());
    $('#mimimi_button').click(() => countAction());
});
