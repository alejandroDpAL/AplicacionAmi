function InputsUser({ formData, opcionesUsuario, handleInputChange }) {
    return (
      <form className="grid grid-cols-2 gap-4">
        <div className="mb-4 col-span-2">
          <label htmlFor="rol" className="block font-bold">
            Rol
          </label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          >
            <option value="">Seleccionar</option>
            {opcionesUsuario.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="nombres" className="block font-bold">
            Nombres
          </label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellidos" className="block font-bold">
            Apellidos
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="correo" className="block font-bold">
            Correo
          </label>
          <input
            type="text"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="finca" className="block font-bold">
            Finca
          </label>
          <input
            type="text"
            id="finca"
            name="finca"
            value={formData.finca}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rol" className="block font-bold">
            Rol
          </label>
          <input
            type="text"
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Enviar
          </button>
        </div>
      </form>
    );
  }
  
  export default InputsUser;
  