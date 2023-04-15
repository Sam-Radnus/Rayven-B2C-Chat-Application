import React,{useState,useEffect} from 'react'
import CommonUtil from '../../util/commonUtil'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PaymentPage = () => {
    const navigate=useNavigate();
    const [products,setProducts]=useState([]);
    const [productState, setProductState] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
  const handleQuantityChange = (index, event) => {
    
    const newQuantity = event.target.value;
    const newTotalPrice = products[index].price * newQuantity;
    console.log(newTotalPrice)
    setProductState(prevState => {
      const newState = [...prevState];
      newState[index] = { quantity: newQuantity, price: newTotalPrice };
      return newState;
    });
    let newFinal = productState.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    setTotalPrice(newFinal);
  };
  useEffect(() => {
    let newFinal = productState.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    setTotalPrice(newFinal);
  }, [productState]);
    const getProducts = async () => {
    
        // console.warn(CommonUtil.getUserId());
        const business_id=sessionStorage.getItem('business_id');
        try {



            const response = await axios.post(
                "http://127.0.0.1:8000/api/v1/getProducts",
                {

                    'user_id': `${business_id}`

                }
            );

            console.log(response?.data?.products?.products)
            setProducts(response?.data?.products?.products);
            const initialProductState = response.data.products.products.map(product => {
                return {
                  quantity: 0,
                  price: product.price
                };
              });
              console.log(initialProductState);
              setProductState(initialProductState);
        
      }
      catch(error){
        console.log(error);
      }
    };
    useEffect(()=>{
       console.log(products);
       getProducts();
       
      console.log(productState)
    },[products?.length,productState?.length])
  return (
    <div>
        <section class="h-100 h-custom">
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="h5">Shopping Bag</th>
                <th scope="col">Current Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Selected Price</th>
              </tr>
            </thead>
            <tbody>
                { products && productState && products.map((product,index)=>( 
                                 <tr>
                <th scope="row">
                  <div class="d-flex align-items-center">
                    <img src={product.image_url} class="img-fluid rounded-3"
                      style={{width: "120px"}} alt="Book"/>
                    <div class="flex-column ms-4">
                      <p class="mb-2">{product.name}</p>
                      <p class="mb-0">Daniel Kahneman</p>
                    </div>
                  </div>
                </th>
                <td class="align-middle">
                  <p class="mb-0" style={{fontWeight: "500"}}>${product.price}</p>
                </td>
                <td class="align-middle">
                  <div class="d-flex flex-row">
                    

                    <input id="form1" min="0" name="quantity"  type="number"
                      class="form-control form-control-sm" style={{width: "50px",backgroundColor:'white'}}  value={productState[index] ? productState[index]?.quantity:0}
                      onChange={(event) => handleQuantityChange(index, event)
                      }/>

                    
                  </div>
                </td>
                <td class="align-middle">${productState[index] ? productState[index].price*productState[index].quantity:0}</td>
              </tr>
            ))  }
            </tbody>
          </table>
        </div>

        <div class="card shadow-2-strong mb-5 mb-lg-0" style={{borderRadius: "16px"}}>
          <div class="card-body p-4">

            <div class="row">
              <div class="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                <form>
                  <div class="d-flex flex-row pb-3">
                    <div class="d-flex align-items-center pe-2">
                      <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v"
                        value="" aria-label="..." checked />
                    </div>
                    <div class="rounded border w-100 p-3">
                      <p class="d-flex align-items-center mb-0">
                        <i class="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Credit
                        Card
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row pb-3">
                    <div class="d-flex align-items-center pe-2">
                      <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2v"
                        value="" aria-label="..." />
                    </div>
                    <div class="rounded border w-100 p-3">
                      <p class="d-flex align-items-center mb-0">
                        <i class="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>Debit Card
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex align-items-center pe-2">
                      <input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3v"
                        value="" aria-label="..." />
                    </div>
                    <div class="rounded border w-100 p-3">
                      <p class="d-flex align-items-center mb-0">
                        <i class="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>PayPal
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-md-6 col-lg-4 col-xl-6">
                <div class="row">
                  <div class="col-12 col-xl-6">
                    <div class="form-outline mb-4 mb-xl-5">
                      <input type="text" id="typeName" class="form-control form-control-lg bg-light" siez="17"
                        placeholder="John Smith" />
                      <label class="form-label" for="typeName">Name on card</label>
                    </div>

                    <div class="form-outline mb-4 mb-xl-5">
                      <input type="text" id="typeExp" class="form-control form-control-lg bg-light" placeholder="MM/YY"
                        size="7"  minlength="7" maxlength="7" />
                      <label class="form-label" for="typeExp">Expiration</label>
                    </div>
                  </div>
                  <div class="col-12 col-xl-6">
                    <div class="form-outline mb-4 mb-xl-5">
                      <input type="text" id="typeText" class="form-control form-control-lg bg-light" siez="17"
                        placeholder="1111 2222 3333 4444" minlength="19" maxlength="19" />
                      <label class="form-label" for="typeText">Card Number</label>
                    </div>

                    <div class="form-outline mb-4 mb-xl-5">
                      <input type="password" id="typeText" class="form-control form-control-lg bg-light"
                        placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                      <label class="form-label" for="typeText">Cvv</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-xl-3">
                <div class="d-flex justify-content-between" style={{fontWeight: 500}}>
                  <p class="mb-2">Subtotal</p>
                  <p class="mb-2">${totalPrice}</p>
                </div>

                <div class="d-flex justify-content-between" style={{fontWeight: 500}}>
                  <p class="mb-0">Shipping</p>
                  <p class="mb-0">${(totalPrice*0.02).toFixed(2)}</p>
                </div>

               

                <div class="d-flex justify-content-between mb-4" style={{fontWeight: 500}}>
                  <p class="mb-2">Total (tax included)</p>
                  <p class="mb-2">${totalPrice +(totalPrice*0.02)}</p>
                </div>

                <button type="button" class="btn btn-primary btn-block btn-lg">
                  <div onClick={()=>{
                    navigate('/Success');
                  }} class="d-flex justify-content-between">
                    <span>Checkout</span>
                    <span>${(totalPrice +(totalPrice*0.02)).toFixed(2)}</span>
                  </div>
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default PaymentPage