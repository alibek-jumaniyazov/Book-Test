import axios from "axios";
import md5 from "md5";

axios.defaults.baseURL = "https://0001.uz"

axios.interceptors.request.use(
    (config) => {

        const method = config.method
        const url = config.url
        const body = JSON.stringify(config.data)

        if (url == '/signup') {
            return config
        }

        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        const signature = method.toUpperCase() + url + (body ?? "") + userInfo.secret
        const sign = md5(signature)

        config.headers['Key'] = userInfo.key
        config.headers['Sign'] = sign

        return config
    }, 
    (error) => {
        console.log(error)
    }
)

const allBooks = async () => {
    try{
        const response = await axios.get("/books")
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

const signUp = async (body) => {
    try{
        const response = await axios.post("/signup", body)
        return response;
    }
    catch(err){
        console.log(err);
    }
}

const postBook = async (body) => {
    try{
        const response = await axios.post('/books' , body)
        return response
    }
    catch(err){
        console.log(err);
    }
}

const deleteBook = async (id) => {
    try{
        const response = await axios.delete(`/books/${id}`)
        console.log(response.data);
    }
    catch(err){
        console.log(err);
    }
}


export { allBooks, signUp , postBook , deleteBook};
