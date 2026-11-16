const main = document.getElementById('main')
const container = document.getElementById('container')
const input =document.getElementById('input')
const quantity = document.getElementById('quantity')
const restock = document.getElementById('restock')
const display = document.getElementById('display')
const inventoryValue = document.getElementById('inventoryValue')
const products = [
    { id: 1, name: "Laptop", price: 80000, stock: 1 },
    { id: 2, name: "Phone", price: 25000, stock: 2 },
    { id: 3, name: "Mouse", price: 1200, stock: 20 },
    { id: 4, name: "Keyboard", price: 2500, stock: 13 },
    { id: 5, name: "Monitor", price: 18000, stock: 12 },
];





// function getProductsToRestock(){

//     const filter = products.filter(product => product.stock < 4)
//     // const find = filter.find(produ=>produ.id === produ.stock)

//     if(filter.length > 0){

//         filter.forEach(function(pro){
    
//             const para = document.createElement('p')
    
//             para.innerHTML=`product ${pro.name} remainning-stock ${pro.stock}`
    
            
//             restock.append(para)
            
//         })

//     }else {
//         restock.innerHTML="everthing is oke"
//     }

  

// }



// getProductsToRestock()

    // Your logic here

   display.addEventListener('click',function search(){
        const inputs= input.value.trim()
        const quantitys = quantity.value.trim()

        if(inputs ==="" ||quantitys === "" || quantitys <= 0){
            console.log('fill in sumething')
            return
        }
if(!Number.isInteger(Number(quantitys))){
    console.log('what you type is not valid try again')
    return
}
        sellProduct(Number(inputs),Number(quantitys))

    })
function calculateInventoryValue(){
    // container.innerHTML=""
            inventoryValue.innerHTML = ""

const enventory = document.createElement('h3')
enventory.innerHTML="enventory value"
inventoryValue.append(enventory)

    const reducer= products.reduce(function(previous,result){

        return previous + result.price*result.stock
    },0)
inventoryValue.append("shopp product current wolth : ",reducer)

}




   calculateInventoryValue()

   

   function lowproductstock(){
restock.innerHTML = ""
    const stockOut= products.filter(product=>product.stock < 4)

    if(stockOut.length >0){

        const heading= document.createElement('h1')
        heading.innerHTML="list of product out of stock"
        restock.append(heading)
        stockOut.forEach(function(pro){
            const paragra = document.createElement('p')
            paragra.innerHTML=`product ${pro.name} remaining ${pro.stock}`

            restock.appendChild(paragra)

        })
    }
   }

   lowproductstock()


//    function sellProduct(id, quantity) {

//     // Step 1: Find the product using its ID


//     // Step 2: Check whether the product exists
    

//     // Step 3: Check whether enough stock is available

//     // Step 4: Reduce the stock

//     // Step 5: Display the remaining stock
// }


function sellProduct(id, quantity) {
if (!Number.isInteger(quantity) || quantity <= 0) {
    console.log("Invalid quantity");
    return;
}
    // Step 1: Find the product using its ID

    const newProduct=products.find(product=>product.id===id)

    // Step 2: Check whether the product exists
    if(!newProduct){
        console.log(" it does not exist")
        return
    }


    // Step 3: Check whether enough stock is available
    if(newProduct.stock < quantity){
     console.log("out of stock")
     return
    }

    // Step 4: Reduce the stock
    const previousstock= newProduct.stock
      newProduct.stock -= quantity;
const real =newProduct.stock

const par=document.createElement('p')


    // Step 5: Display the remaining stock
    
        par.innerHTML=`product ${newProduct.name} previous-stockstock${previousstock} remaining-stock ${real}`
        container.innerHTML = ""
container.append(par)


        calculateInventoryValue()
lowproductstock()

}

