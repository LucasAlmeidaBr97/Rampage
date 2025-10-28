import CrudService from "./CRUDService";

class ImageService extends CrudService {
    static _instance = null;
    constructor(){
        super("/rampage/imagen")

        if(ImageService._instance)
            return ImageService._instance;

        ImageService._instance = this;
    }

    async removeImage(id){
        await this.doDelete("/remove-by-id", id);
    }
    
}

const imageService = new ImageService();
export default imageService;