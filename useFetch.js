import { useEffect, useRef, useState } from 'react'

export const useFetch = (url) => {  //Este Hook extrae los datos de la api y establece el state
    
    const isMounted = useRef(true); // Cuando el hook esta vivo o el componente que usa este hook esta montado ref=true (referencia)

    const [state, setState] = useState({data: null, loading: true, error: null}); //valor inicial del state

    useEffect( () => {                               // Cuando el state de useFetch se termine de cargar (montar)
                                                     // la ref isMounted = false   
        return () => isMounted.current = false;

    },[]); // Este efecto se realizará cuando se carga por primera vez

    useEffect(()=>{

        setState({data:null, loading:true, error:null});  // Reseteo State

        fetch(url)
            .then(resp => resp.json())
            .then(data =>{

                if (isMounted.current){                   // La actualización del state solo se producirá  si
                                                          // la ref isMounted = true. Con esto evitamos errores  
                    setState({                            // donde no se puede hacer el setState por cancelaciones      
                                                          // apresuradas del los usuarios en las peticiones al server         
                        loading: false,
                        error: null,
                        data: data
                    });
                }else{
                    console.log('setState no se llamo');
                }

            })
            .catch(()=>{                                
                setState({
                    data:null,
                    loading:false,
                    error: 'No se pudo cargar la info'      // Gestión del posible error
                })
            })

    },[url])

    return state;  // Este custom Hook nos devuelve un state compuesto de una 
                   // petición a un server y otras dos props
                   // La petición = data = [] 
}
