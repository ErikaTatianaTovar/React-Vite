export default function UserList() {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>LastName</th>
                    <th>Identification</th>
                    <th>Avatar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Juan</td>
                    <td>Perez</td>
                    <td>juan@correo.com</td>
                    <td>85526</td>
                    <td><img style={{
                        width: 50,
                        height: 50
                        }}
                        src="https://img.freepik.com/fotos-premium/nina-ojos-verdes-mirando-camara_893012-140335.jpg"></img></td>
                </tr>
                <tr>
                <tr>
                    <td>Maria</td>
                    <td>Castro</td>
                    <td>maria@correo.com</td>
                    <td>85526</td>
                    <td><img style={{
                        width: 50,
                        height: 50
                        }}
                        src="https://t4.ftcdn.net/jpg/01/30/67/81/360_F_130678149_Uae3GxvZy68fgahjK4eExlMQQW9CFiPa.jpg"></img></td>
                </tr>
                <tr>
                <td>Cristina</td>
                    <td>sepulveda</td>
                    <td>cris@correo.com</td>
                    <td>85294</td>
                    <td><img style={{
                        width: 50,
                        height: 50
                        }}
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Amparo_Grisales_2023_01.jpg"></img></td>
                </tr>
                </tr>
            </tbody>
        </table>
    )
}