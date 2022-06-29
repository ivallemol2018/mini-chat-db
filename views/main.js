
const socket = io.connect();

function render(data){

  const htmlDetail = data.map((element,index)=>{
    return(`
    <tr>
        <td class="p-2">
            <div class="font-medium text-gray-800">
              ${element.title}
            </div>
        </td>
        <td class="p-2">
            <div class="text-left">
              ${element.price}                        
            </div>
        </td>
        <td class="p-2">
            <div class="text-left font-medium text-green-500">
              <img src="${element.thumbnail}" class="img-thumbnail" alt="...">
            </div>
        </td>
        <td class="p-2">
            <div class="flex justify-center">
                <button id="btnDeleteProduct" onclick="deleteProduct(${element.id})">
                  <a href="#">
                    <svg class="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                    </svg>
                  </a>
                </button>
            </div>
        </td>
    </tr>`)
  }).join(" ");

  const htmlTable = `
      <table class="table-auto w-full">
      <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
              <th class="p-2">
                  <div class="font-semibold text-left">Nombre</div>
              </th>
              <th class="p-2">
                  <div class="font-semibold text-left">Precio</div>
              </th>
              <th class="p-2">
                  <div class="font-semibold text-left">Foto</div>
              </th>
              <th class="p-2">
                  <div class="font-semibold text-center">Action</div>
              </th>
          </tr>
      </thead>
      <tbody class="text-sm divide-y divide-gray-100">
          ${htmlDetail}
      </tbody>
    </table>`;
  
  document.getElementById('dvListaProducto').innerHTML = htmlTable
  

}

function renderMensagges(data){

  htmlDetail = data.map((element,index)=>{
    return(`<tr>
    <td class="p-1">
        <div class="font-medium text-gray-800">
          <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
          </div>
        </div>
    </td>
    <td class="p-1">
      ${element.email}
    </td>
    <td class="p-1">
      ${element.date}
    </td>    
    <td class="p-3">
        <div class="text-left">
        ${element.message}                     
        </div>
    </td>
</tr>`)
  }).join(" ");

  const htmlTable = `
  <table class="table-auto w-full">
  <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
      <tr>
          <th class="p-2" />     
          <th class="p-2">
              <div class="font-semibold text-left">Email</div>
          </th>
          <th class="p-2">
              <div class="font-semibold text-left">Fecha y Hora</div>
          </th>          
          <th class="p-2">
              <div class="font-semibold text-left">Mensaje</div>
          </th>
      </tr>
  </thead>
  <tbody class="text-sm divide-y divide-gray-100">
      ${htmlDetail}
  </tbody>
</table>`;
  
document.getElementById('dvListMessage').innerHTML = htmlTable
}

function deleteProduct(id){
  fetch('/productos/'+id,{method: 'delete',headers: {'Content-Type': 'application/json','Accept':'application/json'}})
    // Exito
    .then(response => response.json())  
    .then(data => {render(data.products); socket.emit('loadProducts','message')})    
    .catch(err => console.log('Solicitud fallida', err)); 

}

socket.on('loadProductClient', messages=>{
  fetch('/productos')
    // Exito
    .then(response => response.json())  
    .then(data => render(data))    
    .catch(err => console.log('Solicitud fallida', err)); 
})

socket.on('loadMessageClient', messages=>{
  fetch('/mensajes')
    // Exito
    .then(response => response.json())  
    .then(data => renderMensagges(data))    
    .catch(err => console.log('Solicitud fallida', err)); 
})

function loadInfo(){
  socket.emit('loadProducts','message')
  socket.emit('loadMessages','message')
}

