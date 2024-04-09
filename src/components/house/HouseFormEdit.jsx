import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useGetHouseByCodeQuery, useUpdateHouseMutation, useUploadImageHouseMutation } from "../../features/api/apiHousesSlice";
import HouseForm from "./HouseForm";

export default function HouseFormEdit(){
    
      const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
      const params = useParams(); // Instanciamos la variable para obtener los parametros por URL
      const [updateHouse] = useUpdateHouseMutation();
      const [file, setFile] = useState(null);
      const [uploadHouseImage] = useUploadImageHouseMutation();
      
      const [propertyType, setPropertyType] = useState(""); 
    
      const handleChangeImage= (e) => {
        setFile(e.target.files);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const house = {
          code: params.code, // Seteamos en codigo por el que me llega como parametro
          type: propertyType, 
          department: e.target.department.value.split("-")[1],
          city: e.target.city.value,
          address: e.target.address.value,
          zip_code: e.target.zip_code.value,
          price: e.target.price.value,
          size: e.target.size.value,
          rooms: e.target.rooms.value,
          bathrooms: e.target.bathrooms.value,
          parking: e.target.parking.value
        };
        console.log(house);
        try {
          const response = await updateHouse(house);
          if (file) {
            const formData = new FormData();
            formData.append("file", file[0]);
            uploadHouseImage({ code: params.code, file: formData });
          }
          if (response.data.status == "error") {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title:
                "La vivienda no pudo ser actualizada, por favor verifique los datos",
              showConfirmButton: false,
              timer: 1500,
            });
            
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Vivienda Actualizada Correctamente",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate("/house"); // Hacemos la redireccion
            });
          }
        } catch (error) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title:
              "La vivienda no pudo ser actualizada, por favor verifique los datos",
            showConfirmButton: false,
            timer: 1500,
          });console.log(error)
        }
      };
      /** Se ejecuta al cargar el componente */
      const {
        data: house,
        isLoading,
        isError,
        error,
      } = useGetHouseByCodeQuery(params.code);
      if (isLoading)
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      );
    else if (isError) return <div>Error: {error.message} </div>;
    
      return (
        <HouseForm
          props={{
            handleSubmit: handleSubmit,
            handleChangeImage: handleChangeImage,
            onFileChange: null,
            house: house,
            propertyType: propertyType,
            setPropertyType: setPropertyType 
          }}
        />
      );
    }