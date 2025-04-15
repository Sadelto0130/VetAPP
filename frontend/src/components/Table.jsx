import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePets } from "../context/PetContext";

function Table({ dataTable }) {
  const {inactiveRecordPet} = usePets()
  const [data, setData] = useState(dataTable);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sorted);
  };

  const handleEdit = (id) => {
    navigate(`/pet/edit_record/${id}`)
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de borrar el registro?");
    if (confirmDelete) {
      await inactiveRecordPet(id)
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
      window.alert("Registro Borrado")

      // Asegura que no se quede en una página vacía después de borrar
      const totalPages = Math.ceil(updated.length / itemsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const recordData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setData(dataTable || []);
  }, [dataTable]);

  return (
    <div className="overflow-x-auto space-y-4">
      {/* Selector de cantidad por página */}
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-gray-600">
          Mostrar:&nbsp;
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset page
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </label>
        <div className="text-sm">
          Página {currentPage} de {totalPages}
        </div>
      </div>

      {/* Tabla para escritorio */}
      <div className="hidden md:block max-h-[480px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer bg-gray-100"
                onClick={() => sortBy("nombre")}
              >
                Procedimiento
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer bg-gray-100"
                onClick={() => sortBy("especie")}
              >
                Descripcion
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer bg-gray-100"
                onClick={() => sortBy("edad")}
              >
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-100">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recordData.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.procedimiento}
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  {record.procedimiento_descrip}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(record.fecha_creacion).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2 w-max">
                    <button
                      onClick={() => handleEdit(record.id)}
                      className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tarjetas para móvil */}
      <div className="md:hidden space-y-4">
        {recordData.map((mascota) => (
          <div
            key={mascota.id}
            className="bg-white p-4 shadow rounded space-y-2 border"
          >
            <div className="text-sm">
              <span className="font-semibold">Procedimiento: </span>
              {mascota.procedimiento}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Descripcion: </span>
              {mascota.procedimiento_descrip}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Fecha: </span>
              {new Date(mascota.fecha_creacion).toLocaleDateString()}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleEdit(mascota.id)}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(mascota.id)}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Table;
