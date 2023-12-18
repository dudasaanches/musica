import { useRef, useState } from "react";
import css from './Musica.module.css'



function Musica(props) {
    const [musica, setMusica] = useState(null);
    const [pesquisa, setPesquisa] = useState("");
    const [tempo, setTempo] = useState(0)
    // criou a const destaque e deixou ela vazia para depois usa-la quando selecionar a musica para ela ficar como principal
    const [destaque, setDestaque] = useState(null)
    const [display, setDisplay] = useState("none")
    const somRef = useRef(new Audio());
    const lista = [
        {
            "id": 72544949,
            "title": "Story of My Life",
            "preview": "https://cdns-preview-4.dzcdn.net/stream/c-4dc28238148e53db19c99a0b81c28c1f-5.mp3",
            "artist": {
                "name": "One Direction",
                "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/6760dba71ba14145eec5478d8b135c55/250x250-000000-80-0-0.jpg"
            }
        },
        {
            "id": 135411206,
            "title": "Seu Astral (Ao Vivo)",
            "title_short": "Seu Astral",
            "preview": "https://cdns-preview-7.dzcdn.net/stream/c-7bdf746ad65cfe226736cea0de38a2c4-5.mp3",
            "artist": {
                "name": "Jorge & Mateus",
                "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/07307d349e19e95208fc3ee32c64297e/250x250-000000-80-0-0.jpg",
            }
        },
        {
            "id": 1384368942,
            "title": "Emaús (Ao Vivo)",
            "title_short": "Emaús",
            "preview": "https://cdns-preview-7.dzcdn.net/stream/c-7a12d1af1ff55be35d059c5d3e7cc76b-3.mp3",
            "artist": {
                "name": "MORADA",
                "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/4b8f9bac6e111ee8b8feed8ddcfa73b9/250x250-000000-80-0-0.jpg"
            }
        },
        {
            "id": 2271327847,
            "title": "Novo Balanço",
            "preview": "https://cdns-preview-1.dzcdn.net/stream/c-13fa1bd9d10322104964ae30dad7b544-6.mp3",
            "md5_image": "b300e05a1b78466f15c81677e4ba33d9",
            "artist": {
                "name": "Veigh",
                "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/1a7f6ef627b0793d5773478299a06cf3/250x250-000000-80-0-0.jpg",
            }
        }

    ]

    async function buscarMusica() {
        somRef.current.pause();
        somRef.current = new Audio();
        let url =
            "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" +
            pesquisa;
        let resposta = await fetch(url);
        resposta = await resposta.json();
        setMusica(resposta.data);
        setDestaque(resposta.data[0])
        setDisplay("grid")
    }


    function tocar(item) {
        console.log("Tocar")
        setDestaque(item)
        setDisplay('grid')
        somRef.current.pause();
        somRef.current = new Audio();
        somRef.current.src = item.preview;
        somRef.current.load();
        somRef.current.play();
        props.setMusic("fa-solid    fa-circle-pause")

        somRef.current.addEventListener('timeupdate', () => {
            let total = somRef.current.duration;
            let atual = somRef.current.currentTime;
            let porcentagem = (atual * 100) / total;
            setTempo(porcentagem);
        });
    }

    function botao() {
         if (somRef.current.paused){
             somRef.current.play();
             props.setMusic("fa-solid fa-circle-pause")
         }
         else{
             console.log("Play")
             somRef.current.pause();
            props.setMusic("fa-solid fa-circle-play")
         }

    }



    return (
        <div className={css.main}>
            <nav style={{backgroundColor:"black", padding:'0'}} className={css.header + " navbar navbar-expand-lg bg-body-tertiary"}>
                <div style={{backgroundColor:"black"}} className="container-fluid">
                    <img className={css.logo} src={'/logobeat.jpg'}/>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={css.inp}
                        id="navbarSupportedContent">
                        <div  className="d-flex" role="Busque aqui">
                              <input
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                                className={css.pesq}
                                type="text"
                                placeholder="  Busque aqui"
                                aria-label="  Busque aqui"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        buscarMusica()
                                }}

                            />

                            <button className={css.btn} type="button" onClick={buscarMusica}>
                                    Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {destaque === null && (
                <div className={css.banner} >
                    <img className={css.banner} src={'/bannermusica.png'}/>

                </div>

            )}
            <div className={css.tudo} style={{display: display}} >

                <div className={css.principal} style={{display: display}} >
                    {destaque !== null &&  (
                        // quando clicar em qualquer musica ela fica como principal/destaque
                        <div >
                            <img onClick={() => tocar(destaque)} src={destaque.artist.picture_medium}/>
                            <h2>{destaque.title}</h2>
                            <h4 className={css.artistaprinci}>{destaque.artist.name}</h4>
                            <div className={css.barra} style={{background: "linear-gradient(90deg, #7720c4 "+tempo+"%, rgba(77,77,77,1) "+tempo+"%)"}}></div>
                            <div className={css.play}>
                                <i onClick={botao} className={props.music}></i>
                            </div>
                        </div>

                    )}
                </div>


                <div className={css.resto} style={{display: display}}>
                    {musica !== null && musica.map((item) => (
                        <div className={css.nome} key={item.id} onClick={() => tocar(item)}>
                            <img className={css.pequena} src={item.artist.picture_small} alt={item.title}/>
                            <div className={css.info}>
                                <p>{item.title}<br/>{item.artist.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h1 className={css.h1destaques}>Músicas mais ouvidas</h1>
            <div className={css.destaques}>
                    {lista.map((item) => (
                        <div key={item.id} onClick={() => tocar(item)}>
                            <img className={css.imgdestaques} src={item.artist.picture_medium} alt={item.title}/>
                            <div className={css.dest}>
                                <h3 className={css.titulo}>{item.title}</h3>
                                <h4 className={css.h4dest}>{item.artist.name}</h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>

    );
}

export default Musica;
