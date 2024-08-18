import { ToastContainer } from "react-toastify"

const CheckoutForm = ({dataForm,handleFormSubmit,handleOnChange,error}) => {

  return (
    <div style={{ width: '50%' }}>
                <h2>Información del cliente</h2>
                <form onSubmit={handleFormSubmit} className="ms-4">

                    <div className="row mb-4 container w-75 g-1">
                        <div className="col ">
                            <div className="form-outline  ">
                                <label className="form-label">Nombre</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    name="name"
                                    value={dataForm.name}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline " >
                                <label className="form-label ">Apellido</label>
                                <input
                                    className=" form-control "
                                    type="text"
                                    name="lastname"
                                    value={dataForm.lastname}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>


                    <div className="form-outline mb-4">
                        <label className="form-label">Email</label>
                        <input
                            className="w-75 form-control"
                            type="email"
                            name="email"
                            value={dataForm.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label">Vuelva a ingresar el email</label>
                        <input
                            className="w-75 form-control"
                            type="remail"
                            name="remail"
                            value={dataForm.remail}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label">Direccion</label>
                        <input
                            className="w-75 form-control"
                            type="text"
                            name="address"
                            value={dataForm.address}
                            onChange={handleOnChange}
                            required
                        />
                    </div>


                    <div className="form-outline mb-4">
                        <label className="form-label">Telefono</label>
                        <input
                            className="w-75 form-control"
                            type="number"
                            name="phone"
                            value={dataForm.phone}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <ToastContainer />

                    <div className="mx-auto d-flex">
                        <button type="submit" className="btn btn-primary  mb-5 mx-auto" >Comprar</button>
                    </div>

                </form>

            </div>
  )
}

export default CheckoutForm