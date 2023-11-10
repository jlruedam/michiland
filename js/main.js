const API_KEY = "live_ut4wCKA7FK1cj4GU2eKCMg1ebAYBIa3tD2uu5qkcJjbV5yw1uNpRyUMvujVYzu73";

const api = axios.create({
    baseURL: "https://api.thecatapi.com/v1/",
    headers:{
        'x-api-key': API_KEY,
    }
});
// api.defaults.headers.common['x-api-key'] = API_KEY;


const URL = "https://api.thecatapi.com/v1/images/search?limit=3";
const URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const URL_DELETE_FAVORITES = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";
const URL_UPLOADED = "https://api.thecatapi.com/v1/images";

const btnLoadRandomMichis = document.querySelector("#btnLoadRandomMichis");
const imgGatito1 = document.querySelector('#imgGatito1');
const imgGatito2 = document.querySelector('#imgGatito2');
const imgGatito3 = document.querySelector('#imgGatito3');
const imgGatito4 = document.querySelector('#imgGatito4');
const btnGuardarMichi1 = document.querySelector('#btnGuardarMichi1');
const btnGuardarMichi2 = document.querySelector('#btnGuardarMichi2');
const btnGuardarMichi3 = document.querySelector('#btnGuardarMichi3');
const btnGuardarMichi4 = document.querySelector('#btnGuardarMichi4');

// const cambiarGatito = () => {
//     fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         imgGatito.src = data[0].url;
//     } );
// };
const msgError = document.querySelector("#msgError");

const loadRandomMichis = async () => {
    const respuesta = await fetch(URL);
    console.log(respuesta);

   
    if (respuesta.status !== 200) {
        msgError.innerHTML = "Hubo un error: " +  respuesta.status;
    }else{
        
        const data= await respuesta.json();
        // console.log(data);
    
        imgGatito1.src = data[0].url;
        imgGatito2.src = data[1].url;
        imgGatito3.src = data[2].url;
        imgGatito4.src = data[3].url;

        btnGuardarMichi1.onclick = () => saveFavoriteMichi(data[0].id);
        btnGuardarMichi2.onclick = () => saveFavoriteMichi(data[1].id);
        btnGuardarMichi3.onclick = () => saveFavoriteMichi(data[2].id);
        btnGuardarMichi4.onclick = () => saveFavoriteMichi(data[3].id);

    }


};

const loadFavoritesMichis = async () => {
    const respuesta = await fetch(URL_FAVORITES, {
        method: 'GET',
        headers:{
            'X-API-KEY':API_KEY,
        },
    });
    const sectionFavorites = document.querySelector('#favorites');
    const div = document.querySelector('#seccionFotosFavoritos');
    div.innerHTML = "";
    if (respuesta.status !== 200) {
        
        msgError.innerHTML = "Hubo un error: " +  respuesta.status;
    }else {
        const data = await respuesta.json();
        console.log(data)

        data.forEach( michi => {
            
            console.log(michi.image.url);

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = michi.image.url;
            const figcaption = document.createElement('figcaption');
            const button = document.createElement('button');
            button.onclick = () => deleteFavoriteMichi(michi.id);
            const btnText = document.createTextNode('Sacar de favoritos');
            
            button.appendChild(btnText);
            figcaption.appendChild(button);
            figure.appendChild(img);
            figure.appendChild(figcaption);
            div.appendChild(figure);

        });
        sectionFavorites.appendChild(div);
    }

};

const saveFavoriteMichi = async (id) => {

    const {data, status} = await api.post("/favourites",{
        image_id: id,
    });

    if( status !== 200){
        console.log("Hubo un error: ", status);
    }else{
        loadFavoritesMichis();
        loadRandomMichis();
    }
    // const res = await fetch(URL_FAVORITES,{
    //     method:'POST',
    //     headers:{
    //         'Content-Type':'application/json',
    //         'x-api-key': API_KEY,
    //     },
    //     body:JSON.stringify({
    //         image_id: id
    //     })
    // });
    // console.log(res);
    // loadFavoritesMichis();
    // loadRandomMichis();
    
}

const deleteFavoriteMichi = async (id) => {
    const res = await fetch(URL_DELETE_FAVORITES(id),{
        method:'DELETE',
        headers:{
            "content-type":"application/json",
            'x-api-key': API_KEY
        }
    });
    
    console.log(res);
    loadFavoritesMichis();
}

const uploadMichiPhoto = async () => {
    const uploadingForm = document.querySelector("#uploadingForm");
    const uploadingFormData = new FormData(uploadingForm);

    console.log(uploadingFormData.get('file'));

    const respuesta = await fetch(URL_UPLOAD, {
        method: 'POST',
        headers:{
            // 'Content-type': multipart
            'X-API-KEY':API_KEY,
        },
        body:uploadingFormData,
    });

    if (respuesta.status !== 201) {
        
        msgError.innerHTML = "Hubo un error: " +  respuesta.status;
    }else {
        const data = await respuesta.json();
        alert('Foto de michi subida 😸');
        console.log('Foto de michi subida 😸');
        console.log(data);
        console.log(data.url);

        
    }
    
}

const loadMyMichis = async () => {
    const respuesta = await fetch(URL_UPLOADED, {
        method: 'GET',
        headers:{
            'X-API-KEY':API_KEY,
        },
    });
    const myMichis = document.querySelector('#myMichis');
    const div = document.querySelector('#seccionMyMichis');
    div.innerHTML = "";
    if (respuesta.status !== 200) {
        
        msgError.innerHTML = "Hubo un error: " +  respuesta.status;
    }else {
        const data = await respuesta.json();
        console.log(data)

        data.forEach( michi => {
            
            console.log(michi);

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = michi.url;
            const figcaption = document.createElement('figcaption');
            // const button = document.createElement('button');
            // button.onclick = () => deleteFavoriteMichi(michi.id);
            const text = document.createTextNode(michi.id);
            
            // button.appendChild(btnText);
            figcaption.appendChild(text);
            figure.appendChild(img);
            figure.appendChild(figcaption);
            div.appendChild(figure);

        });
    }
}
// loadRandomMichis();
loadMyMichis();
loadFavoritesMichis();

window.addEventListener('load', loadRandomMichis)
btnLoadRandomMichis.addEventListener("click", loadRandomMichis);

