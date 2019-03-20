import {
  Meteor
} from 'meteor/meteor';
import {
  Accounts
} from 'meteor/accounts-base'
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

SimpleSchema.debug = true


Meteor.startup(() => { 
  var schema = new SimpleSchema({
    name: {
      label: 'Name',
      type: String
    },
    type: {
      label: 'Type',
      type: String,
    },
    price: {
      label: 'Price',
      type: String,
    },
    date:{
      label: 'Date',
      type:String
    },
    userId:{
      label: 'userId',
      type:String
    }
  });
  Products = new Meteor.Collection('products');
  Products.schema = schema;

  var allowAll = function () {
    return true;
  };
  Products.allow({
    insert: allowAll,
    update: allowAll,
    remove: allowAll
  });
  
  Meteor.publish('products', function() {
    return Products.find();
  });
  
  //Products.remove({})
});
