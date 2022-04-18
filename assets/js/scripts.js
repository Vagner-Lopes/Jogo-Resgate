function start() {
    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo'></div>");

    const fundoGame = document.getElementById("fundoGame")
    const jogador = document.getElementById("jogador")
    const inimigo1 = document.getElementById("inimigo1")
    const inimigo2 = document.getElementById("inimigo2")
    const amigo = document.getElementById("amigo")
    const disparo = document.getElementById("disparo")
    // Principais variaveis do jogo
    let jogo = {}
    let velocidade = 5
    let posicaoY = parseInt(Math.random() * 334)
    let podeAtirar = true
    let tempoDisparo;
    let TECLAS = {
        w: 87,
        s: 83,
        a: 65,
        d: 68,
        n: 78,
        m: 77,
    }
    jogo.pressionou = [];

    // Verrificar se tecla foi apertada

    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true
    });
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false
    });



    // Game loop

    jogo.timer = setInterval(loop, 50)
    function loop() {
        moveFundo()
        moveJogador()
        moveInimigo1()
        moveInimigo2()
        moveAmigo()
        
    }

    // Função que movimenta o fundo
    function moveFundo() {

        let esquerda = parseInt($(fundoGame).css("background-position"))
        $(fundoGame).css("background-position", esquerda - 1)
    }

    // Função que move o jogador

    let topo;
    function moveJogador() {
        if (jogo.pressionou[TECLAS.w]) {
            topo = parseInt($(jogador).css("top"))
            if (topo >= 10) {
                $(jogador).css("top", topo - 10)
            }
        }
        if (jogo.pressionou[TECLAS.s]) {
            topo = parseInt($(jogador).css("top"))
            if (topo <= 429) {
                $(jogador).css("top", topo + 10)
            }
        }
        if (jogo.pressionou[TECLAS.a]) {
            topo = parseInt($(jogador).css("left"))
            if (topo >= 0) {
                $(jogador).css("left", topo - 10)
            }
        }
        if (jogo.pressionou[TECLAS.d]) {
            topo = parseInt($(jogador).css("left"))
            if (topo <= 500) {
                $(jogador).css("left", topo + 10)
            }
        }
        if (jogo.pressionou[TECLAS.n]) {
            atirar()
        }
    }
    function moveInimigo1() {
        let topoInimigo = parseInt($(inimigo1).css("top"))
        if (topo < topoInimigo) {
            topoInimigo--
        } else {
            topoInimigo++
        }
        let posicaoX = parseInt($(inimigo1).css("left"))
        $(inimigo1).css("left", posicaoX - velocidade)
        $(inimigo1).css("top", topoInimigo)

        if (posicaoX <= -80) {
            posicaoY = parseInt(Math.random() * 334)
            $(inimigo1).css("left", 794)
            $(inimigo1).css("top", posicaoY)
        }
    }
    function moveInimigo2() {
        let posicaoX = parseInt($(inimigo2).css("left"))
        $(inimigo2).css("left", posicaoX - 2)
        if (posicaoX <= -80) {
            $(inimigo2).css("left", 894)
        }
    }
    function moveAmigo() {
        let posicaoX = parseInt($(amigo).css("left"))
        $(amigo).css("left", posicaoX + 1)
        if (posicaoX >= 940) {
            //morre
            $(amigo).css("left", 10)
        }
    }
    function atirar() {
        if( podeAtirar) {
            podeAtirar = false
            topo = parseInt($(jogador).css("top"))
            posicaoX = parseInt($(jogador).css("left"))
            tiroX = posicaoX + 205
            topoTiro = topo + 47
            $(fundoGame).append("<div id='disparo'></div>")
            $('#disparo').css("top", topoTiro)
            $('#disparo').css("left", tiroX)

            tempoDisparo = window.setInterval(executaDisparo, 30)
        }

        function executaDisparo() {
            posicaoX = parseInt($('#disparo').css("left"))
            $('#disparo').css("left", posicaoX + 20 )
            
            if ( posicaoX > 900 ) {
                window.clearInterval(tempoDisparo)
                tempoDisparo = null
                $('#disparo').remove()
                podeAtirar = true

            }
        }
    }
}



