let json = document.getElementById('json')
let params = document.getElementById('params')
let assbtn = document.getElementById('addbtn')
let inputRadio = document.querySelectorAll(`input[name='query']`)
let submitbtn = document.getElementById('submit')



async function fetchApi(URL,methods){

    let resultbox = document.getElementById('resultbox')

    try {
        let data = await fetch(URL,methods)
        let result = await data.json()
        const pretty = JSON.stringify(result, undefined, 4);
        resultbox.innerHTML = pretty;
        
    } catch (error) {
        resultbox.innerHTML = "error occured.....";
        
    }

}
submitbtn.addEventListener('click',()=>{
    let method = document.querySelector(`input[name='method']:checked`)
    let inputRadio = document.querySelector(`input[name='query']:checked`)
    let url = document.getElementById('url')
    


    if(method.value ==='GET')
    {
                
        resultbox.innerHTML = 'Getting Your Data...';
        fetchApi(url.value,{method:'GET'})
    }
    else if(method.value ==='POST')
    {
        if(inputRadio.value === 'params')
        {
         
            let params = document.getElementById('params').children
          let paramsVal = {}
        for(let c of Array.from(params))
        {
           let key = c.firstElementChild.nextElementSibling
           let val = c.firstElementChild.nextElementSibling.nextElementSibling
           if(key.value && val.value)
           {
            paramsVal[key.value] = val.value

           }
        }
        let URL = url.value
        resultbox.innerHTML = 'Getting Your Data...';
        let methods = {
            method:"POST",
            mode: 'cors',
            body: JSON.stringify(paramsVal),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        }
        fetchApi(URL,methods)
    }

    else{
        if(inputRadio.value === 'json')
        {
            let url = document.getElementById('url')

            let json = document.getElementById('jsonText')
            let URL = url.value
           // alert(JSON.parse(json.value).name)

              fetchApi(URL,{
                method: 'POST',
                body:json.value,
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                  }
              })
        }
    }

    }
    else if(method.value ==='DELETE')
    {

        let url = document.getElementById('url')
        let URL = url.value

        fetchApi(URL,{ method: 'DELETE'})
    }

    else if(method.value ==='PUT')
    {

        let url = document.getElementById('url')
        let URL = url.value
        let json = document.getElementById('jsonText')

           fetchApi(URL,{
            method: 'PUT',
            body:json.value,
            mode: 'cors',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
              }
          })
    }
    
})

addbtn.addEventListener('click',()=>{

    
    let html = `
                <div class="d-flex align-item-center my-3 justify-content-around">
                <span>Params:</span>
                <input type="text"  class="p-1"/>
                <input type="text" class="p-1" />
                <button class="btn btn-primary" id="removebtn">-</button>
            </div>
    `

    params.insertAdjacentHTML('beforeend',html)

    let removebtn = document.querySelectorAll('#removebtn')
    removebtn.forEach(e=>{

        e.addEventListener('click',({target})=>{
        target.parentElement.remove()
    })
    })


    
})

inputRadio.forEach(e=>{
    e.addEventListener('click',({target})=>{

        if(target.value === 'json')
        {
            json.style.display = "block"
            params.style.display = "none"
        }
        else{
            params.style.display = "block"
            json.style.display = "none"
        }
    })
})




function showInputs()
{
    let inputVal = document.querySelector(`input[name='query']:checked`)
    inputVal.value==='json'? params.style.display = "none" : json.style.display = "none"
}

showInputs()
