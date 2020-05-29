import * as UI from './interfaz.js'
import { API } from './api.js'

UI.formularioBuscar.addEventListener('submit',(e)=>{
  e.preventDefault()
  
  //Obtener datos del formulario
  const artista = document.querySelector('#artista').value
  const cancion = document.querySelector('#cancion').value

  if(artista == '' || cancion==''){
    //prevenir que los campos sean vacios
    UI.divMensajes.innerHTML = 'Error... todos los campos son obligatorios'
    UI.divMensajes.classList.add('error')
    setTimeout(()=>{
      UI.divMensajes.innerHTML = ''
      UI.divMensajes.classList.remove('error')
    },3000)
  }else{
    const api = new API(artista,cancion)
    api.consultarAPI().then(res => {
      if(res.lyrics){
        //la cancion existe
        const letra = res.lyrics
        UI.divResultado.textContent = letra
      }else{
        //La cancion no existe
        UI.divMensajes.innerHTML = 'La cancion no existe, Prueba con otra busqueda'
        UI.divMensajes.classList.add('error')
        setTimeout(()=>{
          UI.divMensajes.innerHTML = ''
          UI.divMensajes.classList.remove('error')
          UI.formularioBuscar.reset() 
        },3000)
      }
    })
  }
})

