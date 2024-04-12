import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteHouseMutation,
  useGetHousesQuery,
} from "../../features/api/apiHousesSlice";
import getApiBaseUrl from "../../features/api/api";

export default function HouseList() {
  /** Obtiene el estado de una variable con Redux */
  const { data: houses, isLoading, isError, error } = useGetHousesQuery();
  const [deleteHouse] = useDeleteHouseMutation();
  const baseUrl = getApiBaseUrl();
  const handleDelete = (house) => {
    Swal.fire({
      title: `¿Estas seguro que deseas eliminar la vivienda?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHouse(house.code);
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  else if (isError) return <div>Error: {error.message} </div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Viviendas</h1>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-3 py-2 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Acciones
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Código
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Departamento
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Ciudad
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Código Postal
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Tamaño en M²
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Cuartos
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Baños
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Parqueadero
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider ">
                  Imagen
                </th>
              </tr>
            </thead>
            <tbody>
              {houses.map((house) => (
                <tr key={house.code}>
                  <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <Link
                        to={`/house/${house.code}`}
                        className="inline-flex items-center px-1 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon-md"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4783 6.06414 21.4783 8.93588 19.7071 10.7071L18.7073 11.7069L11.1603 19.2539C10.7182 19.696 10.1489 19.989 9.53219 20.0918L4.1644 20.9864C3.84584 21.0395 3.52125 20.9355 3.29289 20.7071C3.06453 20.4788 2.96051 20.1542 3.0136 19.8356L3.90824 14.4678C4.01103 13.8511 4.30396 13.2818 4.7461 12.8397L13.2929 4.29291ZM13 7.41422L6.16031 14.2539C6.01293 14.4013 5.91529 14.591 5.88102 14.7966L5.21655 18.7835L9.20339 18.119C9.40898 18.0847 9.59872 17.9871 9.7461 17.8397L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                            fill="currentColor"
                          />
                        </svg>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          handleDelete(house);
                        }}
                        className="ml-2 inline-flex items-center px-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                    {house.code}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.type}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.department}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.city}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.address}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.zip_code}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.price}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.size}
                  </td>
                  <td className="px-2 py-2  border-b border-gray-200 bg-white text-sm">
                    {house.rooms}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.bathrooms}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    {house.parking}
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                    <img
                      className="h-20 w-20 rounded-lg"
                      src={`${baseUrl}/${house.image}`}
                      alt=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
