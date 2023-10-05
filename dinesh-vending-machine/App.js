import './App.css';

function App() {

  const data = [
    {
      id : "Oreo",
      name : "Oreo",
      price : "10" ,
      image : require('./Images/oreo.png'),
      quantity : 20
    },
    {
      id : "Bourbon",
      name : "Bourbon",
      price : "15" ,
      image : require('./Images/bourbon.png'),
      quantity : 10
    },
    {
      id : "GoodDay",
      name : "GoodDay",
      price : "5" ,
      image : require('./Images/goodday.png'),
      quantity : 20
    },
    {
      id : "MarieGold",
      name : "MarieGold",
      price : "10" ,
      image : require('./Images/mariegold.png'),
      quantity : 15
    }
  ]

  const Evaluate = () => {
    document.getElementById('output').innerHTML = "";
    var e = document.getElementById("ddlViewBy");
    var selectedItem = e.options[e.selectedIndex].text;
    var quantity = document.getElementById("quantity").value;
    
    if(selectedItem !== "" && quantity !== ""){
      var price;
      // eslint-disable-next-line array-callback-return
      data.map(item => {
        if(selectedItem === item.name){
          price = quantity*item.price;
          document.getElementById('msg').innerHTML = `You choose ${quantity} ${selectedItem} and the price is ${price}`;
          if(parseInt(quantity) > item.quantity){
            document.getElementById('msg').innerHTML = 'quantity is too high'
          }
          else{
          document.getElementById(item.quantity).innerHTML = `Items ${item.quantity-quantity}`;
          document.getElementById('popup').innerHTML =
          `<div>Enter Amount <input id="eAmount" type="number"/></div> 
            <div><button type="button" id="btnId">Submit</button></div>
            `;
          }
          // console.log(document.getElementById(item.quantity));
        }
      })

    

      let obj = document.getElementById('btnId');
      let hit = 0,  prevAmount=0;
      let remainingBal;

      if(document.getElementById('popup').innerHTML !== ""){
        obj.addEventListener("click", () => {
          let eAmount = parseInt(document.getElementById("eAmount").value);
          if(eAmount<0){
            document.getElementById('output').innerHTML = `Negative numbers are not valid`;
            document.getElementById('eAmount').value = "";
          }
          else{
            if(eAmount >= price) 
            {
              correctAmount(eAmount,price);
            }
            else{
              hit++;
              if(hit === 1){ wrongAmount(eAmount,price); }
    
              else{
                if(eAmount >= remainingBal){ correctAmount(prevAmount+eAmount,price); }
                else{ wrongAmount(eAmount,remainingBal) }
              }
            }
          }
          
        });
      }

      const wrongAmount = (eAmount,price) => {
        remainingBal = price - eAmount;
        prevAmount+=eAmount;
        document.getElementById('output').innerHTML = `<span style="color:red"><b>Entered amount is ${prevAmount}!</b>
        please add &#8377;${remainingBal} more to make purchase</span>`;
        document.getElementById('eAmount').value = "";
      }

    }
  }

  const correctAmount = (eAmount,price) => {
    let remainingBal = eAmount - price;
    document.getElementById('output').innerHTML = `<span style="color:green"><b>Money received!</b></span> 
    <span style="color:orange">Please collect your purchase and</span> <span style="color:green">remaining amount ${remainingBal}</span>`;
    
    document.getElementById('msg').innerHTML = "";
    document.getElementById('popup').innerHTML = "";
    document.getElementById("ddlViewBy").selectedIndex = 0;
    document.getElementById("quantity").value = "";

  }

  // var itemCount = [], price = 0;
  // var selectedItem = [], count = 0;

  // const print = (e) => {
  //   var pItem = e.currentTarget.id;  
  //   // eslint-disable-next-line array-callback-return
  //   data.map(item => {
  //     if(pItem === item.name){
  //       price += parseInt(item.price);
  //       // selectedItem = pItem;
  //       if(count===0){
  //         // itemCount++;
  //         selectedItem.push(pItem);
  //         count++;
  //         // console.log(selectedItem);
  //       }
  //       else{
  //         // count=0;
  //         // document.getElementById('msg').innerHTML += `You choose ${itemCount} ${selectedItem}, `;
  //         if(selectedItem.includes(pItem)){
  //           count++;
  //           // console.log(count)
  //         }
  //         else{
  //           itemCount.push(count);
  //           count=0;
  //           // console.log(selectedItem,itemCount);
  //         }
  //       }
  //       // else{
  //       //   selectedItem = pItem;
  //       //   itemCount=1;
  //       // }
  //     }
  //   })
  //   console.log(itemCount,selectedItem);
  // };
  
  return (
    <div id='body'>
      <div>
        <div><h2>Available Items</h2></div>
        <div id='product'>
          {data.map(list => (
            <div>
              <b><p>{list.name}</p></b>
              <img src={list.image} alt="" id={list.id} />
              <b><p>&#8377;{list.price}</p></b>
              <b><p id={list.quantity}>Items {list.quantity}</p></b>
            </div>
          ))}
        </div>
      </div>
      <div id='itemlist'>
        <div><b>Select Item </b> 
          <select id='ddlViewBy'>
            <option value="">--select--</option>
            <option value="oreo">Oreo</option>
            <option value="bourbon">Bourbon</option>
            <option value="mariegold">MarieGold</option>
            <option value="goodday">GoodDay</option>
          </select>
        </div>
        <div> <b>Enter quantity</b>
          <input type='number' id='quantity'/>
        </div>
        <div> <button type="button" onClick={Evaluate}>Next</button></div>
      </div>
      <div id='msg'></div>
      <div id='popup'></div>
      <div id="output"></div>
    </div>
  );
}

export default App;