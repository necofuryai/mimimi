// 任意のタイミングで呼べば狙ったとおりのテキストのボタンつくれる
// 引数増やしていろいろやってもよいですね。
// var text = document.getElementById("red");
// console.log(text)
// setTweetButton(text);

// function setTweetButton(text){
//     $('#tweet-area').empty(); //既存のボタン消す
//     // htmlでスクリプトを読んでるからtwttがエラーなく呼べる
//     // オプションは公式よんで。
//     twttr.widgets.createShareButton(
//         "https:\/\/mimimi.web.app",
//         document.getElementById("tweet-area"),
//         {
//             size: "large", //ボタンはでかく
//             text: text, // 狙ったテキスト
//             hashtags: "みみみボタン", // ハッシュタグ
//             url: "https://mimimi.web.app" // URL
//         }
//     );
// }