function start() {
    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='animaFundo'></div>");
    $("#fundoGame").append("<div id='inimigo1'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='saude'></div>");
    $("#fundoGame").append("<div id='saudeBox'></div>");
    $("#fundoGame").append("<div id='saudeBar'></div>");
    $("#fundoGame").append("<div id='limite'></div>");

    const somMusica = document.getElementById("somMusica")
    const somDisparo = document.getElementById("somDisparo")
    const somExplosao = document.getElementById("somExplosao")
    const somExplosao1 = document.getElementById("somExplosao1")
    const somGameOver = document.getElementById("somGameOver")
    const somPerdido = document.getElementById("somPerdido")
    const somResgate = document.getElementById("somResgate")

    const fundoGame = "#fundoGame"
    const jogador = "#jogador"
    const inimigo1 = "#inimigo1"
    const inimigo2 = "#inimigo2"
    const disparo = "#disparo"
    const amigo = "#amigo"
    const placar = "#placar"
    const saude = "#saude"
    const saudeBox = "#saudeBox"
    const saudeBar = "#saudeBar"

    // Principais variaveis do jogo
    let jogo = {}
    let velocidadeJogo = 1
    let posicaoY = parseInt(Math.random() * 334)
    let podeAtirar = true
    let tempoDisparo;
    let pontos = 0
    let salvos = 0
    let perdidos = 0
    let pontosVida = 200
    let TECLAS = {
        w: 87,
        s: 83,
        a: 65,
        d: 68,
        n: 78,
        m: 77,
    }
    jogo.pressionou = [];
    placar.innerHTML = "000"
    // Verrificar se tecla foi apertada

    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true
    });
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false
    });



    // Game loop
    let gameOver = false

    jogo.timer = setInterval(loop, 50)
    somMusica.addEventListener("ended", function () {
        somMusica.currentTime = 0; somMusica.play()
    }, false)
    somMusica.play()
    function loop() {

        if (pontosVida <= 0) {
            gameOver = true
            somGameOver.play()
            somMusica.pause()
        }
        if (!gameOver) {
            moveFundo()
            moveJogador(7)
            moveInimigo1(7.3)
            moveInimigo2(5.4)
            moveAmigo(0.5)
            colisao()
            atualizaPlacar()
        } else {
            game_Over()
        }

    }

    // Função que movimenta o fundo
    function moveFundo() {

        let esquerda = parseInt($(fundoGame).css("background-position"))
        $(fundoGame).css("background-position", esquerda - (1 + velocidadeJogo/2))
    }

    // Função que move o jogador

    let topoJogador;
    function moveJogador(vel) {
        if (jogo.pressionou[TECLAS.w]) {
            topoJogador = parseInt($(jogador).css("top"))
            if (topoJogador >= 10) {
                $(jogador).css("top", topoJogador - (vel + velocidadeJogo / 2))
            }
        }
        if (jogo.pressionou[TECLAS.s]) {
            topoJogador = parseInt($(jogador).css("top"))
            if (topoJogador <= 429) {
                $(jogador).css("top", topoJogador + (vel + velocidadeJogo / 2))
            }
        }
        if (jogo.pressionou[TECLAS.a]) {
            topoJogador = parseInt($(jogador).css("left"))
            if (topoJogador >= 0) {
                $(jogador).css("left", topoJogador - (vel + velocidadeJogo / 2))
            }
        }
        if (jogo.pressionou[TECLAS.d]) {
            topoJogador = parseInt($(jogador).css("left"))
            if (topoJogador <= 500) {
                $(jogador).css("left", topoJogador + (vel + velocidadeJogo / 2))
            }
        }
        if (jogo.pressionou[TECLAS.n]) {
            atirar()
        }
    }
    function moveInimigo1(vel) {
        let topoInimigo = parseInt($(inimigo1).css("top"))
        if (topoJogador < topoInimigo) {
            topoInimigo-= 2
        } else if(topoJogador > topoInimigo) {
            topoInimigo+= 2
        }
        let posicaoX = parseInt($(inimigo1).css("left"))
        $(inimigo1).css("left", posicaoX - (vel + velocidadeJogo))
        $(inimigo1).css("top", topoInimigo)

        if (posicaoX <= -80) {
            alteraSaude(50)
            posicaoY = parseInt(Math.random() * 334)
            $(inimigo1).css("left", 794)
            $(inimigo1).css("top", posicaoY)
        }
    }
    function moveInimigo2(vel) {
        let posicaoX = parseInt($(inimigo2).css("left"))
        $(inimigo2).css("left", posicaoX - (vel + velocidadeJogo))
        if (posicaoX <= -80) {
            alteraSaude(25)
            $(inimigo2).css("left", 894)
        }
    }
    function moveAmigo(vel) {
        let posicaoX = parseInt($(amigo).css("left"))
        $(amigo).css("left", posicaoX + (vel + velocidadeJogo/2))
        if (posicaoX >= 940) {
            //morre
            $(amigo).css("left", 10)
        }
    }

    // ATIRAR
    function atirar() {
        if (podeAtirar) {
            somDisparo.play()
            podeAtirar = false
            topo = parseInt($(jogador).css("top"))
            posicaoX = parseInt($(jogador).css("left"))
            tiroX = posicaoX + 205
            topoTiro = topo + 47
            $(fundoGame).append("<div id='disparo'></div>")
            $(disparo).css("top", topoTiro)
            $(disparo).css("left", tiroX)

            tempoDisparo = window.setInterval(executaDisparo, 30)
        }

        function executaDisparo() {
            posicaoX = parseInt($(disparo).css("left"))
            $(disparo).css("left", posicaoX + 20)
            posicaoTiro = parseInt($(disparo).css("left"))
            if (posicaoTiro > 900) {
                removeDisparo()
            }

        }


    }
    function removeDisparo() {
        window.clearInterval(tempoDisparo)
        tempoDisparo = null
        $(disparo).remove()
        podeAtirar = true

    }

    // COLISÃO -------------------------------------------
    function colidiu(colidido, colisor) {
        let aux = ($(colidido).collision($(colisor)))
        if (aux.length > 0) {
            return true
        } else {
            return false
        }
    }

    function colisao() {

        if (colidiu(jogador, inimigo1) || colidiu(jogador, inimigo2) ||
            colidiu(amigo, inimigo2)) {
            alteraSaude(50)
        }

        if (colidiu(jogador, inimigo1) || colidiu(disparo, inimigo1)) {
            removeDisparo()
            explosao(inimigo1)
            alteraPlacar(15)
            somExplosao.play()
            reposicionaInimigo(5)
        }

        if (colidiu(jogador, inimigo2) || colidiu(disparo, inimigo2)) {
            removeDisparo()
            explosao(inimigo2)
            alteraPlacar(10)
            somExplosao1.play()
            reposicionaInimigo2(3)
        }

        if (colidiu(inimigo2, amigo)) {
            sangueAmigo()
            alteraPlacar(-20)
            reposicionaAmigo(5)
        }

        if (colidiu(jogador, amigo)) {
            resgataAmigo(3)
        }
    }


    // EXPLOSÃO ------------------------------------------
    function explosao(inimigo) {
        let inimigoX = parseInt($(inimigo).css("left"))
        let inimigoY = parseInt($(inimigo).css("top"))
        $(fundoGame).append("<div id='explosao1'></div>")
        let div = $("#explosao1")
        div.css("top", inimigoY)
        div.css("left", inimigoX)
        div.animate({ width: 200, opacity: 0 }, "slow")

        let tempoExplosao = window.setInterval(removeExplosao, 1000)

        function removeExplosao() {
            $('#explosao1').remove()
            window.clearInterval(tempoExplosao)
            tempoExplosao = null
        }
    }
    function reposicionaInimigo(segundos) {
        let atraso = (segundos - velocidadeJogo/2) * 1000
        let tempoColisao1 = window.setInterval(reposiciona, atraso)
        $(inimigo1).remove()
        function reposiciona() {
            window.clearInterval(tempoColisao1)
            tempoColisao1 = null
            if (!gameOver) {
                $(fundoGame).append("<div id='inimigo1'></div>");
                moveInimigo1()
            }
        }
    }
    function reposicionaInimigo2(segundos) {
        let atraso = (segundos - velocidadeJogo/2) * 1000
        let tempoColisao2 = window.setInterval(reposiciona2, atraso)
        $(inimigo2).remove()
        function reposiciona2() {
            window.clearInterval(tempoColisao2)
            tempoColisao2 = null
            if (!gameOver) {
                $("#fundoGame").append("<div id='inimigo2'></div>");
                moveInimigo2()
            }
        }
    }
    function reposicionaAmigo(segundos) {
        let atraso;
        let inimigoX = parseInt($(inimigo2).css("left"))
        let jogadorX = parseInt($(jogador).css("left"))
        let jogadorY = parseInt($(jogador).css("top"))
        if (inimigoX < 230 || (jogadorX < 50 && jogadorY > 430)) {
            atraso = 8000
        } else {
            atraso = ((segundos - velocidadeJogo) + 1 )* 1000
        }
        let tempoColisaoA = window.setInterval(reposicionaA, atraso)
        $(amigo).remove()
        function reposicionaA() {
            window.clearInterval(tempoColisaoA)
            tempoColisaoA = null
            if (!gameOver) {
                $("#fundoGame").append("<div id='amigo'></div>");
                moveAmigo()
            }
        }
    }

    function resgataAmigo(segundos) {
        let atraso = (segundos - velocidadeJogo/2) * 1000
        let contando = window.setInterval(resgata, atraso)
        function resgata() {
            if (colidiu(jogador, amigo)) {
                somResgate.play()
                alteraPlacar(20)
                salvos++
                reposicionaAmigo(4)
                window.clearInterval(contando)
                contando = null
            } else {
                window.clearInterval(contando)
                contando = null
            }
        }
    }

    function sangueAmigo() {
        somPerdido.play()
        perdidos++
        let amigoX = parseInt($(amigo).css("left"))
        let amigoY = parseInt($(amigo).css("top"))
        $("#fundoGame").append("<div id='sangueAmigo' class='animaSangue'></div>");
        $('#sangueAmigo').css("left", amigoX)
        $('#sangueAmigo').css("top", amigoY - 20)
        let tempoSangue = window.setInterval(resetaSangue, 1000)
        function resetaSangue() {
            $('#sangueAmigo').remove()
            window.clearInterval(tempoSangue)
            tempoSangue = null
        }

    }

    function alteraPlacar(multiplicador) {
        pontos += multiplicador * 10
    }
    function atualizaPlacar() {
        $(placar).html("<h2>Pontos: " + pontos + "  Salvos : " + salvos + "  Perdidos: " + perdidos + "</h2>")
    }
    function alteraSaude(perde) {
        pontosVida -= perde
        $(saudeBar).css("width", pontosVida)
    }
    function game_Over() {
        somMusica.pause()
        $(jogador).remove()
        $(inimigo2).remove()
        $(inimigo1).remove()
        $(amigo).remove()
        $(saude).remove()
        $(saudeBar).remove()
        $(saudeBox).remove()
        $(disparo).remove()
        window.clearInterval(jogo.timer)
        jogo.timer = null
        $("#fundoGame").append("<div id='gameOver'></div>");
        $("#gameOver").html(
            "<h1>Game Over</h1><p>Pontos: " + pontos + "</p><h3 onclick='restart()'>Reiniciar</h3>"
        )

    }
}
function restart() {
    $("#gameOver").remove()
    const somGameOver = document.getElementById("somGameOver")
    somGameOver.pause()
    start()
}



