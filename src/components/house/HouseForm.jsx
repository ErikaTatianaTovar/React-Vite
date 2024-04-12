import { useEffect, useState } from "react";
import {
  useGetDepartmentsQuery,
  useLazyGetCitiesByDepartmentQuery,
} from "../../features/api/apiColombiaSlice";
import {
  validateAddress,
  validateBathrooms,
  validateParking,
  validatePrice,
  validateRooms,
  validateSize,
  validateZipCode,
} from "./FormHouseValidations";

export default function HouseForm({ props }) {
  const {
    data: departments,
    isLoading,
    isError,
    error,
  } = useGetDepartmentsQuery();

  const { handleChangeImage, house, propertyType, setPropertyType } = props;
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [cities, setCities] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [getCities] = useLazyGetCitiesByDepartmentQuery();

  useEffect(() => {
    // Set the propertyType state when it changes in props
    if (house && house.type) {
      setPropertyType(house.type);
    }
  }, [house, setPropertyType]);

  const handleChangeDepartment = async (e) => {
    setCities([]);
    setSelectedDepartment(e.target.value);
    if (e.target.value) {
      const response = await getCities(e.target.value.split("-")[0]);
      setCities(response.data);
    }
  };

  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [errors, setErrors] = useState({
    address: "",
    zip_code: "",
    price: "",
    size: "",
    rooms: "",
    bathrooms: "",
    parking: "",
  });

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newErrors = {
      address: validateAddress(e.target.elements.address.value),
      zip_code: validateZipCode(e.target.elements.zip_code.value),
      price: validatePrice(e.target.elements.price.value),
      size: validateSize(e.target.elements.size.value),
      rooms: validateRooms(e.target.elements.rooms.value),
      bathrooms: validateBathrooms(e.target.elements.bathrooms.value),
      parking: validateParking(e.target.elements.parking.value),
    };

    setErrors(newErrors);

    const noErrors = Object.values(newErrors).every((error) => error === "");
    if (noErrors) {
      if (props.handleSubmit) {
        props.handleSubmit(e);
      } else {
        console.error("handleSubmit is not defined in props");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  else if (isError) return <div>Error: {error.message} </div>;

  return (
    <div className="max-w-md w-full mx-auto mt-10 mb-10 bg-white">
      <form
        onSubmit={handleSubmitForm}
        className="shadow-md rounded pt-6 pb-10 mb-4 "
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Tipo de Propiedad
          </label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                value="Casa"
                checked={propertyType === "Casa"}
                onChange={handlePropertyTypeChange}
              />
              <span className="ml-2">Casa</span>
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="Apartamento"
                checked={propertyType === "Apartamento"}
                onChange={handlePropertyTypeChange}
              />
              <span className="ml-2">Apartamento</span>
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="Finca"
                checked={propertyType === "Finca"}
                onChange={handlePropertyTypeChange}
              />
              <span className="ml-2">Finca</span>
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="Oficina"
                checked={propertyType === "Oficina"}
                onChange={handlePropertyTypeChange}
              />
              <span className="ml-2">Oficina</span>
            </label>
            <label>
              <input
                type="radio"
                value="Otro"
                checked={propertyType === "Otro"}
                onChange={handlePropertyTypeChange}
              />
              <span className="ml-2">Otro</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Departamento
          </label>
          <select
            name="department"
            required
            onChange={handleChangeDepartment}
            defaultValue={selectedDepartment}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
          >
            <option value="">Selecciona un departamento</option>
            {departments?.map((department) => (
              <option
                key={department.id}
                value={`${department.id}-${department.name}`}
              >
                {department.name}
              </option>
            ))}
          </select>
        </div>
        {cities.length === 0 ? null : (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Ciudad</label>
            <select
              name="city"
              required
              className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Dirección
          </label>
          <input
            type="text"
            required
            name="address"
            placeholder="Calle 5 B sur 12 - 36 apto 12 to 1"
            defaultValue={house?.address}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Código Postal
          </label>
          <input
            type="number"
            required
            name="zip_code"
            placeholder="11025"
            defaultValue={house?.zip_code}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.zip_code && (
            <p className="text-red-500 text-xs mt-1">{errors.zip_code}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Precio (sin puntos ni comas)
          </label>
          <input
            type="number"
            required
            name="price"
            placeholder="125300000"
            defaultValue={house?.price}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Tamaño en M²
          </label>
          <input
            type="number"
            required
            name="size"
            placeholder="45"
            defaultValue={house?.size}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.size && (
            <p className="text-red-500 text-xs mt-1">{errors.size}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Cuartos</label>
          <input
            type="number"
            required
            name="rooms"
            placeholder="2"
            defaultValue={house?.rooms}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.rooms && (
            <p className="text-red-500 text-xs mt-1">{errors.rooms}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Baños</label>
          <input
            type="number"
            required
            name="bathrooms"
            placeholder="1"
            defaultValue={house?.bathrooms}
            className="shadow a
            ppearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.bathrooms && (
            <p className="text-red-500 text-xs mt-1">{errors.bathrooms}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Parqueadero
          </label>
          <input
            type="number"
            required
            name="parking"
            placeholder="0"
            defaultValue={house?.parking}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.parking && (
            <p className="text-red-500 text-xs mt-1">{errors.parking}</p>
          )}
        </div>
        <div className="flex items-center justify-center w-full mb-4">
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div>
                <svg
                  className="w-8 h-8 mb-2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Haga clic para cargar</span> o
                  arrastrar y soltar
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              onChange={(e) => {
                handleImagePreview(e);
                handleChangeImage(e);
              }}
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              type="file"
              className="hidden"
            />
          </label>
        </div>
        {/* Botón de submit */}
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
