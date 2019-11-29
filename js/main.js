window.addEventListener('load', function () {
    var renderer = function () {
        // Generate
        (function () {
            var myCanvas = document.querySelector("#my-canvas-area");
            var data = {
                dateStr: (function () {
                    var lp2 = function (inputStr) {
                        if (inputStr.length >= 2) {
                            return inputStr;
                        } else {
                            return (new Array(2-inputStr.length)).fill(0) + inputStr;
                        }
                    };
                    var d = (new Date(Date.now()+7*24*3600*1000));
                    dateStr = d.toISOString().slice(0, 10).concat('日').replace(
                        '-', '年'
                    ).replace(
                        '-', '月'
                    ).replace(
                        /\d/g,
                        function (num) {
                            return '零一二三四五六七八九'.split('')[num];
                        }
                    ).replace(
                        /一([一二])月/,
                        '十$1月'
                    );
                    console.log(dateStr);
                    return dateStr;
                })(),
                jsInput_orgName: document.querySelector('#jsInput-orgName').value
            };
            myCanvas.innerHTML = (new Array(100)).fill(1).map(function (v, i) {
                return `<span class="WM-span" style="color: #${
                    ['F00','000'][%2]
                }">仅供【${data.jsInput_orgName}】使用，其他用途无效，${data.dateStr}后无效！！！</span>`
            }).join('');
        })();
        // Export
        html2canvas(document.querySelector("#my-canvas-area"), {
            backgroundColor: null,
            width: 600,
            height: 600
        }).then(canvas => {
            var img = document.createElement('img');
            img.src = canvas.toDataURL();
            document.querySelector('#my-img-export').innerHTML = '';
            document.querySelector('#my-img-export').appendChild(img);
        });
    };
    renderer();
    document.querySelector('#jsBtn-generate').addEventListener('click', renderer);
});
