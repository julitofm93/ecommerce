import { productService } from "../services/services.js";


//CREATE

const addProduct = async (req, res) => {
  const newProduct = req.body;

  try {
    const savedProduct = await productService.save(newProduct);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}

//UPDATE
const updateProduct = async(req,res)=>{
  let {pid} = req.params;
  let content = req.body;
  let product = await productService.getBy({_id:pid})
  if(!product) res.status(404).send({status:"error",error:"Not found"})
  await productService.update(pid,content)
  res.send({status:"success",message:"Product updated"})
}

//DELETE
const deleteProduct = async (req, res) => {
  try {
    await productService.delete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET PRODUCT
/* const getProduct = async (req, res) => {
  try {
    const product = await productService.getBy({id: req.params.id});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}
 */
const getProduct = async (req,res) => {
  let id = req.params.pid;
  try{
      let product = await productService.getBy({_id:id})
      if(!product) res.status(404).send({status:"error",error:"Not found"})
      res.status(200).json(product);
  }catch(error){
      console.log(error);
  }
}

//GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await productService.getAll().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await productService.getAll({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await productService.getAll();
    }
    console.log(products)
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}


export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts
};