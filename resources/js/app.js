/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))



Vue.component('modal', {
    template: '#modal-template'
  })
  
  var app = new Vue({
    el: '#crud-wrapper',
  
    data: {
      items: [],
      hasError: true,
      hasDeleted: true,
      hasAgeError: true,
      showModal: false,
      e_name: '',
      e_age: '',
      e_country: '',
      e_id: '',
      e_profession: '',
      newItem: { 'name': '','age': '','country': '','profession': '' },
     },
    mounted: function mounted() {
      this.getVueItems();
    },
    methods: {
      getVueItems: function getVueItems() {
        var _this = this;
  
        axios.get('/data').then(function (response) {
          _this.items = response.data;
        });
      },
      setVal(val_id, val_name, val_age, val_country, val_profession) {
          
          this.e_id = val_id;
          this.e_name = val_name;
          this.e_age = val_age;
          this.e_country = val_country;
         
          this.e_profession = val_profession;
      },
  
      createItem: function createItem() {
       
        var _this = this;
        var input = this.newItem;
        
        if (input['name'] == '' || input['age'] == '' || input['country'] == '' || input['profession'] == '' ) {
          this.hasError = false;
        } else {
          this.hasError = true;
          axios.post('/data', input).then(function (response) {
            _this.newItem = { 'name': '', 'age': '',  'country': '', 'profession': '' };
            _this.getVueItems();
          });
          this.hasDeleted = true;
        }
      },
      editData: function(){
          
           var val_id = document.getElementById('e_id').value;
           var val_name = document.getElementById('e_name').value;
           var val_age= document.getElementById('e_age').value;
           var val_country= document.getElementById('e_country').value;
          
           var val_profession = document.getElementById('e_profession').value;
          
            axios.post('/editdata/' + val_id, {name: val_name, age: val_age,country: val_country,profession: val_profession })
              .then(response => {
                this.getVueItems();
                this.showModal=false
              });
            this.hasDeleted = true;
          
    },
      deleteItem: function deleteItem(item) {
        var _this = this;
        axios.post('/data/' + item.id).then(function (response) {
          _this.getVueItems();
          _this.hasError = true, 
          _this.hasDeleted = false
          
        });
      }
    }
  });
