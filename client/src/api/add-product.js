const navigate = useNavigate()
import Axios from 'axios'




export const addProduct = (product) => {
  axios.post('http://localhost:8002/api/add-product', )
  // const url = `http://localhost:8002/api/add-product`;
  // const options = {
  //   method: "POST",
  //   headers: {
  //     // when we make a POST request, our API will respond with json data, so we make sure we accept application/json
  //     Accept: "application/json",

  //   },
  //   body: product // the form data
  // };
  return fetch(url, options)
    .then((response) => {
      return response.json({
        message: "success",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};