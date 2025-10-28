function ProductForm(){
    return(
        <form>
            <input type='text' placeholder='Nome' className="form-control"/>
            <input type='text' placeholder='Marca' className="form-control"/> 
            <input type='button' value='Cadastrar' className="btn btn-primary"/>
            <input type='button' value='Alterar' className="btn btn-warning"/>
            <input type='button' value='Desativar' className="btn btn-danger"/>
            <input type='button' value='Cancelar' className="btn btn-secondary"/>
        </form>
    )       
}

export default ProductForm;