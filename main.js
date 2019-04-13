//17 vamos hacer que una función esté accesible para todo
Vue.prototype.$log = function(message){
    console.log(message);
};



const app = new Vue ({
    //Lo primero es "engancharnos" al HTML
    //Tras el header del index tenemos un div con id "app"
    el: '#app',
    data: {
        //Para hacer una interpolación y mostrar este mensaje en el front, nos vamos al HTML y dentro del aside llamamos a message con {{}}(línea 18 de index)
        //Lo podemos meter en cualquier lugar dentro de nuestro scope y además meter js adicional dentro
        //En este momento, si vamos a la consola y machacamos app.message, veremos que se actualiza el contenido en el front auto. 
        //Esto es el concepto de que vue es reactivo
        message: 'Hola tu',
        //Ahora traemos los datos de pikachu desde el json
        /* pokemon:{
            "id":25,
            //2. Ahora nos vamos al html e interpolamos pokemon.name dnd aparece el nombre de bulbasur, que es el que hemos dejado para empezar
            "name":"pikachu",
            //Para interpolar la imagen no basta con usar la misma técnica, aunque si lo hacemos veremos un error muy bien explicado.
            //Hay que poner v-bind delante del atributo de la imagen.
            //Hacemos lo mismo con el nombre para el alt.
            //Si miramos el html en el inspector de elementos veremos html limpio
            //una forma abreviada de v-bind es simplemente : delante
            "image":"images/pokemons/pikachu.png",
            "types":[ 
                //Para el color asociamos el color al tipo de pokemon en el json type to color 
                "electric"
            ],
            "abilities":[  
                "lightning-rod",
                "static"
            ],
            "experience":112,
            "height":4,
            "weight":60
        }, */
        TYPE_COLOR:{
                "grass": "#78C850",
                "poison": "#A040A0",
                "fire": "#F08030",
                "flying": "#A890F0",
                "water": "#6890F0",
                "bug": "#A8B820",
                "normal": "#A8A878",
                "electric": "#F8D030"
        },
        //6 metemos los pokemons que hemos traido vía ajax
        pokemons: [],
        //15
        //16 Esto es como una réplica de los pokemons, para eso tenemos las propiedades computadas, lo creamos en una nueva sección
        //18 Al crear la computada eliminamos este
        //filteredPokemons: [],
        //14 Vamos a hacer funcionar el formulario de búsqueda
        searchText:'',
        //18 Creamos el control de los check boxes
        //filterByGrass: false,
        //20 Creamos un array para ir metiendo los tipos seleccionados
        selectedTypes:[],
    },
    //16 Para definir valores de la instancia como un objeto en una propiedad computada
    computed:{
        filteredPokemons(){
            return this.pokemons
                .filter(pokemon => pokemon.name.includes(this.searchText))
                //18 Agregaos el filtro para los checkbox
                .filter(pokemon => {
                    //20 comentamos: return this.filterByGrass ? pokemon.types.includes('grass') : true;
                    //lo de abajo es lo mismo que línea anterior
                    /* if (this.filterByGrass) {
                        return pokemon.types.includes('grass');
                    }
                    else {
                        return true;//un filter con un return true es que no filtra, saca todos
                    } */
                    //20
                    if (!this.selectedTypes.length) return true;//Si vacío todos pasan
                    let included= false;
                    this.selectedTypes.forEach(type => {
                        if(pokemon.types.includes(type)){
                            included = true;
                        }
                    });
                });
        }
    },

    //13 Agregamos método de eliminar
    methods:{
        removePokemon(pokemonToRemove){
            //const index =this.pokemons.findIndex(pokemon => pokemon.id === pokemonToRemove.id);
            //this.pokemons = this.pokemons.splice(index, 1);
            this.pokemons = this.pokemons
                .filter(pokemon => pokemon !== pokemonToRemove);
        },
        //14
 /*        setSearchText(event){
            //Si miramos aquí el debugger podemos mirar dónde se guarda
            //event target value va guardando el acumulado de los que se va escribiendo
            this.searchText=event.target.value;
            //15 Ahora le agregamos el filtro sobre una copia del array de pokemons que llamamos pokemonsfiltrados
            //Hay que crear el dato y agregarlo en la función created.
            //Pero esto en realidad es muy imperativo, y Vue tiene funcionalidades para ser reactivo
            this.pokemons=this.pokemons
                .filter(pokemon => pokemon.name.includes(this.searchText));
        }, */
    },
    //7 También podemos crear hooks. Se ejecuta en el momento de la creación
    //abreviatura ES6 de created: function(){
    created(){
        //8 nos guardamos el this para bajarlo
        //const that=this;
        //Con el arrow function ya no hace falta la ñapa de la línea anterior, recordar que arrow devuelve el this del padre
        //Si hacemos 
        //debugger;
        //Veremos que se para la ejecución antes de que se pinte el objeto
        //Otro hook es mounted, que empieza a montar el componente
        //Si en este momento paramos con debugger y hacemos un this veremos que tenemos todo el objeto, por tanto, podemos referenciarnos a nosotros mismos con this
        fetch('https://api.jsonbin.io/b/5ab37f77989617146bd6eb29')
            .then(response => response.json())
            //Podemos concatenar (hacer ambas cosas)con un or dentro de un arrow
            //El this devuelve el this padre
            .then(pokemons => console.table(pokemons) || (this.pokemons=pokemons));
                //console.table(pokemons);
                //La línea anterior era para mostrar y ver que funciona.
                //15 Aquí habría que agregar la carga de los pokemons foltrados
                
    },
})

//5 Vamos a hacer un fetch AJAX para cargar un json con los pokemon que está online
//fetch devuelve una promesa
/* fetch('https://api.jsonbin.io/b/5ab37f77989617146bd6eb29')
    .then(function(response){
        return response.json();
    })
    .then(function(pokemons){
        //console.table(pokemons);
        //La línea anterior era para mostrar y ver que funciona.
        app.pokemons=pokemons;
    }) */