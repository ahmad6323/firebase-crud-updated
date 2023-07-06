<script>
import product from "../firebase";
import {addDoc, deleteDoc, doc, getDocs, getDoc} from 'firebase/firestore'
import  {db} from '../firebase'

export default {
  data() {
    return {
      selectDoc: null,
      selectedProduct: {},
      productID: null,
      docRef : null,
      products: [],
      id: '',
      productName: '',
      quantity: '',
      price: ''
    }
  },
  methods: {
    async deleteRecord(productId) {
      let pro = doc(product, productId)
      await deleteDoc(pro)
      alert('delete product successfully')

    },
    async editProduct(id) {
      console.log('edited')
      console.log(id)

     let data=  await getDoc(doc(db, 'products',  id))
      console.log(data.data())
      let filterdata = data.data()
      // let pro = doc(product, id)
      // this.docRef = pro
      // let products = await getDocs(this.docRef)
      // let proData = products.data(id);
      this.id = filterdata.id
      this.productName = filterdata.productName
      this.quantity = filterdata.quantity
      this.price = filterdata.price
    },
    async addProduct() {
      console.log("creating documents")
      const addedDoc = await addDoc(product, this.$data)
      alert('product added successfully')
      console.log(addedDoc)
      this.push(product)
    },
    async fetchProducts() {
      let productSnapshot = await getDocs(product)
      let products = [];
      productSnapshot.forEach((p) => {
        let productData = p.data()
        productData.id = p.id


        products.push(productData)

      })
      this.products = products
      console.log(products)
    }
  },


  created() {
    this.fetchProducts();
    let proId = this.id
    this.id = proId
    this.editProduct(proId)


  },


}
</script>

<template>
  <div class="heading">
    <h1>LIST OF PRODUCTS</h1>
  </div>
  <div class="row">
    <div class="mx-auto col-10 col-md-8 col-lg-6">
      <form @submit.prevent="addProduct">

        <div class="form-outline mb-4">
          <input id="form5Example2" v-model="productName" class="form-control" required type="text"/>
          <label class="form-label" for="form5Example2">Product Name</label>
        </div>

        <div class="form-outline mb-4">
          <input id="form5Example1" v-model="quantity" class="form-control" required type="number"/>
          <label class="form-label" for="form5Example1">quantity</label>
        </div>
        <div class="form-outline mb-4">
          <input id="form5Example1" v-model="price" class="form-control" required type="number"/>
          <label class="form-label" for="form5Example1">Price</label>
        </div>

        <button class="btn btn-primary btn-block mb-4" type="submit">ADD</button>
      </form>
    </div>
  </div>
  <table class="table table-bordered" style="width: 800px; margin: 0 auto">
    <thead>
    <tr>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="p in products" :key="p.id">
      <td>{{ p.productName }}</td>
      <td>{{ p.quantity }}</td>
      <td>{{ p.price }}</td>
      <td>
        <button
            class="btn btn-warning"
            type="button"
            @click="editProduct(p.id)"
        >
          Edit
        </button>
      </td>
      <td>
        <button class="btn btn-danger" type="button" @click="deleteRecord(p.id)">
          Delete
        </button>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<style scoped>
.heading {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 2rem;

}

</style>
