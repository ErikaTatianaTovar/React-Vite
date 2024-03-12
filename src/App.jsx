import { useState } from 'react'
import './App.css'

function App() {
  const saludar = () => {
alert("hola John, te amo <3")
}

const mostrarTexto = (e) => {
  console.log(e.target.value)
  }

  const keyUp = () => {
    console.log("Tecla dejo de ser presionada")
  }

function Profile({user}){
  return (
    <>
    <h1>{user.name}</h1>
    <br />
    <img
    className="avatar"
    src={user.imageUrl}
    style= {{
      width: 800,
      height: user.imageSize
    }}
    />
    </>
  )
}
const [count,setCount] = useState(0);

const users = [
  {
    name: 'Tatiana & John in Canada',
    imageUrl: 'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWJyZSUyMGhvcml6b250YWx8ZW58MHx8MHx8fDA%3D',
    imageSize: 540,
  },
  {
  name: 'Mariana',
  imageUrl: 'https://img.freepik.com/fotos-premium/nina-ojos-verdes-mirando-camara_893012-140335.jpg',
  imageSize: 540,
},
{
  name: 'Dario',
  imageUrl: 'https://t4.ftcdn.net/jpg/01/30/67/81/360_F_130678149_Uae3GxvZy68fgahjK4eExlMQQW9CFiPa.jpg',
  imageSize: 540,
},
{
  name: 'Familia Tovar Mendoza',
  imageUrl: 'https://images.unsplash.com/photo-1576014131795-d440191a8e8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWxpYSUyMGRlJTIwNHxlbnwwfHwwfHx8MA%3D%3D',
  imageSize: 540,
},
];

return (
  <> 
  <h1>💖MY FUTURE FAMILY👨‍👩‍👧‍👦</h1>
  <br />
  <br />
  {users.map(user => (
   < Profile user={user}/>
  ))}
  <br />
  <button onClick={() => saludar()}>Enviar</button>
  <input type="text" onChange={mostrarTexto} onKeyUp={keyUp}/>
  <button onClick={() => setCount(count+1)}>Sumar</button>
  <button onClick={() => setCount(count-1)}>Restar</button>
  <button onClick={() => setCount(count*10)}>Multiplicar por 10</button>
  <button onClick={() => setCount(count/10)}>Dividir por 10</button>
  <button onClick={() => setCount(count-count)}>Reestablecer</button>
  <p> El contador va en: {count}</p>

  </>
)
}
export default App
