import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import {
  getAllVendorPlants,
  getAllVendorProduce,
  getAllVendorTools,
  getAllVendorServices
} from '../services/vendor'
import { addPackage } from '../services/package'

const PackageForm = ({ authenticatedUser, setUpdated }) => {
  let navigate = useNavigate()
  let vendorId = authenticatedUser._id
  const [available, setAvailable] = useState(null)
  const [vendorPlants, setVendorPlants] = useState(null)
  const [vendorProduce, setVendorProduce] = useState(null)
  const [vendorTools, setVendorTools] = useState(null)
  const [vendorServices, setVendorServices] = useState(null)
  const [selectedPlants, setSelectedPlants] = useState(null)
  const [selectedProduce, setSelectedProduce] = useState(null)
  const [selectedServices, setSelectedServices] = useState(null)
  const [selectedTools, setSelectedTools] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    description: '',
    frequency: '',
    plants: [],
    services: [],
    produce: [],
    tools: [],
    available: null
  })

  useEffect(() => {
    const handleVendorPlants = async () => {
      const data = await getAllVendorPlants(vendorId)
      setVendorPlants(data)
    }
    const handleVendorProduce = async () => {
      const data = await getAllVendorProduce(vendorId)
      setVendorProduce(data)
    }
    const handleVendorServices = async () => {
      const data = await getAllVendorServices(vendorId)
      setVendorServices(data)
    }
    const handleVendorTools = async () => {
      const data = await getAllVendorTools(vendorId)
      setVendorTools(data)
    }
    handleVendorPlants()
    handleVendorProduce()
    handleVendorServices()
    handleVendorTools()
  }, [])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const vendorPackage = {
      ...formValues,
      available: available,
      plants: selectedPlants.map((plant) => plant._id),
      produce: selectedProduce.map((produce) => produce._id),
      services: selectedServices.map((service) => service._id),
      tools: selectedTools.map((tool) => tool._id),
      vendorId: vendorId
    }
    navigate(`/account`)
    await addPackage(vendorPackage)
    setUpdated((prev) => !prev)
    setFormValues({
      name: '',
      price: '',
      description: '',
      frequency: '',
      plants: [],
      services: [],
      produce: [],
      tools: [],
      available: null
    })
  }

  return (
    authenticatedUser && (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-700">
            Package
          </h2>
        </div>

        <div>
          <div className=" shadow-2xl max-w-2xl mx-auto flex justify-center pb-16 mt-10 mb-10">
            <form className="space-y-8  w-96 pt-10 " onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <InputText
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full "
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <InputText
                    id="description"
                    name="description"
                    type="text"
                    required
                    className="block w-full "
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="plants"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Plants
                </label>
                <div className="mt-2">
                  <MultiSelect
                    value={selectedPlants}
                    id="plants"
                    name="plants"
                    onChange={(e) => setSelectedPlants(e.value)}
                    options={vendorPlants}
                    optionLabel="name"
                    filter
                    className="w-full md:w-20rem"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="produce"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Produce
                </label>
                <div className="mt-2">
                  <MultiSelect
                    id="produce"
                    name="produce"
                    value={selectedProduce}
                    onChange={(e) => setSelectedProduce(e.value)}
                    options={vendorProduce}
                    optionLabel="name"
                    filter
                    className="w-full md:w-20rem"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="services"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Services
                </label>
                <div className="mt-2">
                  <MultiSelect
                    id="services"
                    name="services"
                    value={selectedServices}
                    onChange={(e) => setSelectedServices(e.value)}
                    options={vendorServices}
                    optionLabel="name"
                    filter
                    className="w-full md:w-20rem"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="tools"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tools
                </label>
                <div className="mt-2">
                  <MultiSelect
                    id="tools"
                    name="tools"
                    value={selectedTools}
                    onChange={(e) => setSelectedTools(e.value)}
                    options={vendorTools}
                    optionLabel="name"
                    filter
                    className="w-full md:w-20rem"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="available"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Available
                </label>
                <div className="mt-2">
                  <Dropdown
                    id="available"
                    name="available"
                    value={available}
                    onChange={(e) => setAvailable(e.value)}
                    options={[
                      { name: 'Yes', value: true },
                      { name: 'No', value: false }
                    ]}
                    optionLabel="name"
                    required
                    className=" w-full md:w-14rem "
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="frequency"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Frequency
                </label>
                <div className="mt-2">
                  <InputText
                    id="frequency"
                    name="frequency"
                    type="text"
                    required
                    className="block w-full "
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <InputText
                    id="price"
                    name="price"
                    type="number"
                    step=".001"
                    min={0}
                    required
                    className="block w-full "
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-14"
                >
                  Add Package
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default PackageForm
