/***************************************************** */
/*             Gestions des intéractions               */
/*******************************************************/

/**
 * Récupère la valeur de la couleur sélectionnée
 * @return {string} color
 */
 function selectColor() {
    color = this.value;
    }

/**
 * Récupère la valeur de la quantité choisie
 * @return {*} quantity
 */
 function getQuantity(){      
    quantity = this.value; //retourne la valeur sélectionnée  
    }

/**
 * Multiplie 2 valeurs
 * @param {number} value1 
 * @param {number} value2 
 */
function calculateTotalPrice (value1, value2){
    return value1 * value2;
    
//createObjectSelectio
/**
 * Récupère la valeur associée à la clé définie en paramètre sur localStorage s'il existe.
 * @param {string} key clé recherchée sur le localStorage
 * @param {string} arrayName variable où sera stockée le résultat retournée
 * @returns {*} arrayName retourne tableau d'objet s'il existe 
 */
function getCart() {
    cart = JSON.parse(localStorage.getItem("selection"));
    return cart;
    }    

/**
 * Vérifie si l'objet "selection" existe déjà dans "cart" en comparant l'id du produit et la couleur
 * @param {string} idCart id du produit se trouvant dans "cart"
 * @param {string} idSelection id du produit sélectionné
 * @param {string} colorCart couleur du produit se trouvant dans "cart"
 * @param {string} colorSelection couleur du produit sélectionnée
 * @returns {number} item index de l'objet à modifier s'il existe déjà 
 */
function isSelectionInCart(idCart, idSelection, colorCart, colorSelection, items){
    if(idCart != idSelection || colorCart != colorSelection ){
        productExists = false;                
    }else{
        productExists = true;
    
        obtToChange = cart[items]
    } 
    } 

/**
 * 
 * @param {number} quantityCart valeur de la quantité dans le panier
 * @param {number} quantitySelection valeur de la quantité sélectionnée
 * @returns {number} quantityCArt résultat de l'opération
 */    
function changeQuantityValue(quantityCart, quantitySelection) {
    quantityCart = addValues(quantityCart,quantitySelection);
    return quantityCart;
    }   

/**
 * Additionne 2 valeurs
 * @param {number} value1 
 * @param {number} value2 
 * @returns {number} value 3 résultat de l'opération
 */    
function AddValues(value1, value2, value3) {
    value3 = value1 += value2;
    return value3;
    }
/**
 * Modifie les valeurs "quantity" et "totalPrice" de l'objet existant dans "cart".
 * @param {number} quantityCart 
 * @param {number} quantitySelection 
 * @param {number} totalPriceCart  
 * @param {number} totalPriceSelection 
 */
function modifyExistingProduct(quantityCart, quantitySelection,totalPriceCart, totalPriceSelection, items, objToChangeQty, objToChangePrice, objToChange){

        addValues(quantityCart,quantitySelection, objToChangeQty);
        addValues(totalPriceCart,totalPriceSelection, objToChangePrice );
        cart.splice(items, 1,objToChange);
    }

function modifyObjInCart(objItems, objToChange){
    cart.splice(objItems, 1, objToChange)
}   
/**
 * Ajoute l'objet sélectionné à localStorage
 * @param {*} key nom de la clé à ajouté dans localStorage
 * @param {*} array tableau à ajouter
 */
function addSelectionToLocalStorage(key,array){
    localStorage.setItem(key, JSON.stringify(array));
    
/**
 * Affiche une fenètre pop up permettant d'accéder au panier ou à la page d'accueil
 * @param {*} quantity nombre d'articles à ajouter au panier
 */ 
function confirmationPopup(quantity){
    if (window.confirm(`${quantity} articles ajouté au panier, OK pour voir le panier Annuler pour retourner à la page d'accueil`)){
        window.location.href = "cart.html";
    }else{
        window.location.href = "index.html";
    }
    }

/**
 * ajout du produit sélectionné au panier
 */
function addToCart() {
    //Calcul du prix total de la sélection
    let totalPrice = calculateTotalPrice(quantity, product.price);


    //Création de l'objet "selection" à ajouter au localStorage
    let selection = new Selection(product._id, 
                                  product.name, 
                                  product.altTxt, 
                                  product.imageUrl, 
                                  //product.price,
                                  totalPrice, 
                                  color,  
                                  quantity);
    
    
    //on vérifie si le tableau cart existe dans le local storage 
    let cart = getCart();
    
    
    if(cart) {
        //On vérifie si le produit sélectionné existe dans le panier
        let productExists;
        let items;
    
        /*************************CREER FONCTION **************************************************** */
        for (items in cart) {
            if(cart[items].id != selection.id || cart[items].color != selection.color ){
                productExists = false;                
            }else{
                productExists = true;
                objItems = items; //si produit déjà existant = les valeurs de productExists et items sont stockées dans obj
            }
            }
        /********************************************************************************************* */  
        
        
        if (productExists) { //on change la valeur de qté et du prix tota
            /**********************CREER FONCTION MODIFICATION CART ******************************** */
            let objToChange = cart[objItems];
            let quantityCart = parseFloat(objToChange.quantity);
            let quantitySelection = parseFloat(selection.quantity);
            objToChange.quantity = quantityCart += quantitySelection;
            objToChange.totalPrice = objToChange.totalPrice += selection.totalPrice;
            modifyObjInCart(objItems, objToChange);
        
            /*************************************************************************************** */
            }else{   
                cart.push(selection);
            }    
    }else{
        cart = [];
        cart.push(selection); 
    }     
    addSelectionToLocalStorage("selection", cart);
    confirmationPopup(quantity);      
}}}