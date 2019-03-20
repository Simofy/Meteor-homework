import "tabulator-tables/src/scss/tabulator.scss";
import './main.html';


import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Mongo } from 'meteor/mongo'
import Tabulator from 'tabulator-tables'

Meteor.subscribe('products', {
   onReady: function(){

   }
});
FlowRouter.route('/storage_add', {
  action: function (params) {
    console.log(params)
    BlazeLayout.render("App", {
        content: "table"
    });
  }
});
products = new Meteor.Collection('products');
let arr = [];
arr = products.find().fetch();
Template.accordion.onRendered(function() {
    
  var table = new Tabulator("#Storage-table", {
    height:"100%", 
    data:arr, 
    layout:"fitColumns",
    columns:[ 
      {title:"Name", field:"name"},
      {title:"Type", field:"type"},
      {title:"Price", field:"price"},
      {title:"Date", field:"date"},
      {formatter:"buttonCross", width:30, align:"center",cellClick:function(e, cell){
        if(window.confirm("Delete this item?")){
          products.remove({_id:cell._cell.row.data.id})
          cell._cell.row.delete();
        }
      }},
    ],
  });


  const handle = products.find().observeChanges({
    added(id, data) {
      if(data.userId == Meteor.userId()){
        table.updateOrAddData([{id:id,...data}], true)
      }
    },
    removed(id, data) {
    },
  });
  
})
Template.accordion.events({
  'submit .form-inline'(event){
    event.preventDefault();
    let data = event.target;
    let date = new Date();
    products.insert({userId:Meteor.userId(), name:data.name.value, type:data.type.value,price:data.price.value,date:moment(date).format("YYYY.MM.DD") });
  }

})


let drawRect = function(ctx, p, s, size, gap, color, type){
  ctx.fillStyle = color;
  size = size / 2;
  s = s / 2;
  gap = gap / 2;
  switch (type) {
    case true:
      ctx.beginPath()
      ctx.moveTo(p.x + size - s, p.y - size)
      ctx.lineTo(p.x + size, p.y - size)
      ctx.lineTo(p.x + size, p.y - size + s)
      ctx.lineTo(p.x - size + s, p.y + size )
      ctx.lineTo(p.x - size, p.y + size )
      ctx.lineTo(p.x - size, p.y + size - s)
      ctx.closePath()
      ctx.fill()
    break;
    case false:
      ctx.beginPath()
      ctx.moveTo(p.x + size - s, p.y - size)
      ctx.lineTo(p.x + size, p.y - size)
      ctx.lineTo(p.x + size, p.y - size + s)


      ctx.lineTo(p.x + gap + s, p.y - gap)
      ctx.lineTo(p.x + gap, p.y - gap)
      ctx.lineTo(p.x + gap, p.y - gap - s)
      ctx.closePath()
      ctx.fill()
    break;
    case 2:
    break;
    case 3:
    break;
    default:
      break;
  }
}


Template.background.onRendered(function() {
  canvas = document.getElementById('background');
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  context = canvas.getContext('2d');
  let size = 50;
  for(let i = 0; i < window.innerWidth; i+=size){
    for(let k = 0; k < window.innerHeight; k+=size){
      drawRect(context, {x:i, y:k}, 10, size, 20, "#f6f6f6", Math.random() >= 0.5)
    }
  }
});
Template.body.events({

});

