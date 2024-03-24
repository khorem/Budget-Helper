var budgetController = (function(){
    
    
    
    var Dépenses = function(id,desc,value){
        
        
        
        this.id = id;
        this.desc = desc;
        this.value = value;
        console.log(id);
        
    };      
    
    
      var Revenus = function(id,desc,value){
        
        
        
        this.id = id;
        this.desc = desc;
        this.value = value;
        
    };        
    
    
    
        var calculateTotal = function(type){
            
            var suma = 0;
            data.allItems[type].forEach(function(cur) {
                
                
                suma = suma + cur.value;
               
            })
            
            
            data.totals[type] = suma;
            
        };
      
    
        var data = {
            
            
            allItems : {
                
                exp: [],
                inc: []
                
            },
            totals:{
                exp:0,
                inc:0
                
            },
            
        
                
            budget: 0
                
            
            
            
        }
            
        return{
            
            addItem: function(type,des,val){
                
                var newItem, ID;
                
                
                if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id+1;
                }   else { ID = 0 ;}
                
                
                if (type === 'exp'){
                     newItem = new Dépenses(ID,des,val);
                    
                } else if(type === 'inc') {
                    newItem = new Revenus(ID,des,val);
                    
                }
                
               data.allItems[type].push(newItem);
               return newItem; 
                
                
                
            },
            
            
            calculateBudget : function(){
                
                calculateTotal('exp');
                calculateTotal('inc');

                
                data.budget = data.totals.inc - data.totals.exp;
                
                
                
                
            },
            
            
            deleteItem : function(type,id){
                
                var ids,index;
              
                
                
                ids = data.allItems[type].map(function(cur) {
                    return cur.id;
            });
            
                index = ids.indexOf(id);
                
                
                if(index !== -1 ){
                data.allItems[type].splice(index,1);
                }
                                             
                
                
            },
            
            
            getBudget: function(){
                
              return {
                  
                  budget : data.budget,
                  totalInc : data.totals.inc,
                  totalExp : data.totals.exp
                     
              };  
                
                
            },
            
            
            
            testing : function(){
                
                console.log(data.allItems.inc[0]);
                
            }
            
            
            
        };
         
        
})();


var UIController = (function(){
    

    var DOMstring = {
        
        type : '.add__type' ,
        description  : '.add__description' ,
        value : '.add__value',
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list',
        Revenus : '.budget__income--value',
        Dépenses : '.budget__expenses--value',
        AllBudgetValue : '.valeur_budget',
        conatainer : '.container'
        
    };
    
    
    return {
    
    getInput : function(){
        
        return {
            
        type : document.querySelector('.add__type').value,
        description  : document.querySelector('.add__description').value,
        value  : parseFloat(document.querySelector('.add__value').value)
            
            
        };
        
    },
        
    addListItem: function(obj,type) {
        
        var html,newHTML,element;
        
        if(type === 'inc'){
        
        element = DOMstring.incomeContainer;
            
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
        }
        else if(type === 'exp'){
        
        
        element = DOMstring.expenseContainer;
            
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
        }
        
        
        
        newHtml = html.replace('%id%',obj.id);
        console.log(obj.desc);
        newHtml = newHtml.replace('%description%',obj.desc);
        newHtml = newHtml.replace('%value%',obj.value);
        
        
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml); 
        
        
    },
        
    updateMonth(){
      
        
        now = new Date();
        
        months = now.getMonth();
        
        var month = new Array();
        month[0] = "Janvier";
        month[1] = "Février";
        month[2] = "Mars";
        month[3] = "Avril";
        month[4] = "Mai";
        month[5] = "Juin";
        month[6] = "Juillet";
        month[7] = "Aout";
        month[8] = "Septembre";
        month[9] = "Octobre";
        month[10] = "Novembre";
        month[11] = "Decembre";
        
        document.querySelector('.mois').textContent = month[months];
        
        
        
        
    }, 
         
        
    deleteList : function(selector){
        
        
        var el = document.getElementById(selector);
        el.parentNode.removeChild(el);
                
        
    },   
        
        
    clearField: function(){
        
        var fields,fieldsArr;
        
        fields = document.querySelectorAll(DOMstring.description + ',' + DOMstring.value)
        
        fieldsArr = Array.prototype.slice.call(fields);
        
        console.log(fieldsArr);
        
        
        
        
        fieldsArr.forEach(function(current,index,array){
            
            current.value = '';
            
        });
        fieldsArr[0].focus();
        
        
    },
        
    
    addHeader : function(IE){
            
            console.log(IE.totalInc);    console.log(IE.totalExp); 
        
        
            document.querySelector(DOMstring.Revenus).textContent = IE.totalInc;  

            document.querySelector(DOMstring.Dépenses).textContent = IE.totalExp;         

            document.querySelector(DOMstring.AllBudgetValue).textContent = IE.budget;
        
            
            
        }
  
    
};
    
    
})();


var controller = (function(UIcontroller,budgetcontroller){
    
    
        UIcontroller.updateMonth();
   
        var updateBudget = function () {
            
            budgetcontroller.calculateBudget();
            
            var budget =  budgetcontroller.getBudget(); 
            
            UIcontroller.addHeader(budget);
       
            
        }
        
    
        var addButton= function(){
        

            var input, newItem;

            var input = UIcontroller.getInput();


            if(input.description !=="" && !isNaN(input.value) && input.value > 0 ){    

            console.log(input.type,input.description,input.value);

            newItem =  budgetcontroller.addItem(input.type,input.description,input.value);

            UIcontroller.addListItem(newItem,input.type);

            UIcontroller.clearField();


            updateBudget();

            }
                else { 

                    alert("Vous devez mettre des données") };

        
    }
    
        
    var DeleteItem = function(event){
        
        var ItemID, splitID, type, ID;
                
        ItemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
         console.log(ItemID);
       
        splitID = ItemID.split('-');
        
        type = splitID[0];
        ID = parseInt(splitID[1]);
        
        budgetcontroller.deleteItem(type,ID);
        
        UIcontroller.deleteList(ItemID);
        
    
        updateBudget();
        
    }    

    
    document.querySelector('.add__btn').addEventListener('click',addButton);   
    
    
    
    document.querySelector('.container').addEventListener('click',DeleteItem);
    
    
})(UIController,budgetController);
