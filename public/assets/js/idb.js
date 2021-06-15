let db;

const request = indexedDB.open('pizza-hunt', 1);

request.onupgradeneeded = function(event){
    db = event.target.result;
    db.createObjectStore('new-pizza', {autoIncrement: true});
}

request.onsuccess = function(event){
    db = event.target.result;
    if(navigator.onLine)
        uploadPizza();

}

request.onerror = function(err){
    console.log(err);
}


function savePizza(record){
    const transaction = db.transaction(['new-pizza'], 'readwrite');

    const pizzaObjectStore = transaction.ObjectStore('new-pizza')

    pizzaObjectStore.add(record);
}


function uploadPizza(){
    const transaction = db.transaction(['new-pizza'], 'readwrite');

    const pizzaObjectStore = transaction.ObjectStore('new-pizza');

    const getAll = pizzaObjectStore.getall();

    getAll.onsuccess = function(){
        if(getall.result.length > 0){
            fetch('api/pizza', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getAll.result)
            })
            .then(response => response.json)
            .then(serverResponse => {
                if(serverResponse.message)
                    throw new Error(serverResponse);
                
                const transaction = db.transaction(['new-pizza'], 'readwrite');

                const pizzaObjectStore = transaction.ObjectStore('new-pizza');

                pizzaObjectStore.clear();
                
                alert('All saved pizza has been submitted');
            })
            .catch(err => console.log(err));
        }
    }
}

window.addEventListener('online', uploadPizza);